import React, { useContext } from 'react';
import RevisionContext from '../contexts/revisionContext';
import { LoaderIcon } from 'lucide-react';
import MainLayout from '../components/MainLayout';
import AddButton from '../components/AddButton';
import Card from '../components/Card';
import ButtonCard from '../components/ButtonCard';

function Revision() {
    const { revisions, isLoading, addRevision, removeRevision } = useContext(RevisionContext);
    const title = 'Seus Fichamentos';

    return (
        <>
            {isLoading ? <div className="flex w-full justify-center items-center h-20"><LoaderIcon size={30} /></div> :
                <MainLayout title={title}>
                    <div className='flex flex-col'>
                        <div className='flex flex-col pl-36'>
                            <AddButton onAdd={addRevision} />
                        </div>
                        <div className='flex flex-wrap py-8 ml-36 overflow-y-auto max-h-[calc(100vh-9rem)]'>
                            {revisions.length === 0 ? <h1 className='text-xl w-full'>Nenhum fichamento encontrado </h1> :
                                revisions.map((revision) => (
                                    <Card title={revision} key={revision.id} {...revision}>
                                        <ButtonCard type={"abrir"} id={revision.id} route={"revision"}/>
                                        <ButtonCard type={"excluir"} id={revision.id} onRemove={removeRevision} route={"revision"} />
                                    </Card>
                                ))}
                        </div>
                    </div>
                </MainLayout>}
        </>
    );
}

export default Revision;
