import { useContext, useState, useEffect } from 'react';
import Select from 'react-select';
import { LoaderIcon } from 'lucide-react';

import api from '../services/api';

import UserContext from '../contexts/userContext';
import RevisionContext from '../contexts/revisionContext';

import MainLayout from '../components/MainLayout';
import Card from '../components/Card';
import ButtonCard from '../components/ButtonCard';

function Quiz() {
    const { user } = useContext(UserContext);
    const { revisions, isLoading: revisionsLoading } = useContext(RevisionContext);

    const [quiz, setQuiz] = useState([]);
    const [quizLoading, setQuizLoading] = useState(true);
    const [selectedRevision, setSelectedRevision] = useState(null);
    const [deletedQuizId, setDeletedQuizId] = useState(null);

    const title = 'Quiz do ' + user.username;

    useEffect(() => {
        const fetchQuizzes = async () => {
            setQuizLoading(true);
            try {
                let url = 'quiz';
                if (selectedRevision) {
                    url += `?revision_id=${selectedRevision.value}`;
                }
                const response = await api.get(url);
                setQuiz(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setQuizLoading(false);
            }
        };

        fetchQuizzes();
    }, [selectedRevision]);

    const handleRemoveQuiz = async (id) => {
        try {
            setDeletedQuizId(id);
            setQuiz(quiz.filter(quizItem => quizItem.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const revisionOptions = revisions.map(revision => ({
        value: revision.id,
        label: revision.title
    }));

    return (
        <MainLayout title={title}>
            <div className='flex flex-col'>
                <div className='flex pl-36 py-4'>
                    <Select
                        options={revisionOptions}
                        onChange={setSelectedRevision}
                        isLoading={revisionsLoading}
                        placeholder="Selecione uma revisão"
                    />
                </div>

                <div className='flex flex-wrap py-8 ml-36 overflow-y-auto max-h-[calc(100vh-9rem)]'>
                    {selectedRevision === null && <h1 className='text-xl w-full'>Selecione um Fichamento</h1>}
                    {quizLoading ? (
                        <div><LoaderIcon /></div>
                    ) : (
                        (quiz.length === 0 && selectedRevision !== null) ? (
                            <h1 className='text-xl w-full'>Nenhum quiz encontrado</h1>
                        ) : (
                            quiz
                                .filter(quizItem => quizItem.id !== deletedQuizId)
                                .map((quizItem) => (
                                    <Card title={quizItem.title} key={quizItem.id} {...quizItem}>
                                        <ButtonCard type={"abrir"} id={quizItem.id} />
                                        <ButtonCard type={"excluir"} id={quizItem.id} onRemove={handleRemoveQuiz} route={"quiz"} />
                                    </Card>
                                ))
                        )
                    )}
                </div>
            </div>

        </MainLayout>
    );
}

export default Quiz;
