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
    const [revisions, setRevisions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const title = 'Seus Fichamentos';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('revision');
                console.log(response.data);
                setRevisions(response.data);
                console.log(revisions);
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

    const handleRemoveRevision = (id) => {
        setRevisions(revisions.filter(revision => revision.id !== id));
    };

    return (
        <>
            {isLoading ? <div className="flex w-full justify-center items-center h-20"><LoaderIcon size={30} /></div> :
                <MainLayout title={title}>
                    <div className='flex flex-col'>
                        <div className='flex flex-col pl-36'>
                            <AddButton onAdd={handleAddRevision} />
                        </div>
                        <div className='flex flex-wrap py-8 ml-36 overflow-y-auto max-h-[calc(100vh-9rem)]'>
                            {revisions.length === 0 ? <h1 className='text-xl w-full'>Nenhum fichamento encontrado </h1> :
                                revisions.map((revision) => (
                                    <Card title={revision} key={revision.id} {...revision}>
                                        <ButtonCard type={"abrir"} id={revision.id} />
                                        <ButtonCard type={"excluir"} id={revision.id} onRemove={handleRemoveRevision} />
                                    </Card>
                                ))}
                        </div>
                    </div>
                </MainLayout>}
        </>
    );
}

export default Revision;
