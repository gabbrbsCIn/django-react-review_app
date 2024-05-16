import React, { useEffect, useState } from 'react';
import UserContext from '../contexts/userContext';
import { useContext } from 'react';

import MainLayout from '../components/MainLayout';
import AddButton from '../components/AddButton';
import Card from '../components/Card';
import ButtonCard from '../components/ButtonCard';


function Revision() {
    const { user } = useContext(UserContext);
    const title = 'Seus Fichamentos';

    return (

        <MainLayout title={title}>
            <div className='flex flex-col'>
                <div className='flex flex-col pl-36'>
                    <AddButton user_id={user.user_id} />
                </div>
                <div className='flex flex-wrap py-8 ml-36'>
                    <Card text={"Fichamento de Matemática"}>
                        <ButtonCard type={"abrir"} />
                    </Card>
                    <Card text={"Fichamento de Matemática"}>
                        <ButtonCard type={"excluir"} />
                        <ButtonCard type={"abrir"} />

                    </Card>

                </div>
            </div>
        </MainLayout>

    )

}

export default Revision;