import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import api from '../services/api';
import UserContext from '../contexts/userContext';
import { LoaderIcon } from 'lucide-react';
import MainLayout from '../components/MainLayout';
import AddButton from '../components/AddButton';
import Card from '../components/Card';
import ButtonCard from '../components/ButtonCard';

function Revision() {
    const { user } = useContext(UserContext);
    const [revisions, setRevisions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const title = 'Seus Fichamentos';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('revision');
                setRevisions(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const handleAddRevision = (newRevision) => {
        setRevisions([...revisions, newRevision]);
    };

    return (
        <>
            {isLoading ? <div className="flex w-screen justify-center items-center animate-spin"><LoaderIcon size={30} /></div> :
                <MainLayout title={title}>
                    <div className='flex flex-col'>
                        <div className='flex flex-col pl-36'>
                            <AddButton onAdd={handleAddRevision} />
                        </div>
                        <div className='flex flex-wrap py-8 ml-36  overflow-y-auto max-h-[calc(100vh-9rem)]'>
                            {revisions.length === 0 ? <h1 className='text-xl w-full'>Nenhum fichamento encontrado : </h1> :
                                revisions.map((revision) => (
                                    <Card text={revision.title} key={revision.id} {...revision}>
                                        <ButtonCard type={"abrir"} />
                                        <ButtonCard type={"excluir"} />
                                    </Card>
                                ))}
                        </div>
                    </div>
                </MainLayout>}
        </>
    );
}

export default Revision;
