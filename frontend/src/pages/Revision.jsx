import React, { useEffect, useState } from 'react';
import AddButton from '../components/AddButton';

import UserContext from '../contexts/userContext';
import { useContext } from 'react';
import MainLayout from '../components/MainLayout';

function Revision() {
    const { user } = useContext(UserContext);
    const title = 'Seus Fichamentos';

    return (

        <MainLayout title={title}>
            <div className='flex items-center h-full pl-36 pt-10 justify-center '>
                <AddButton user_id={user.user_id} />
            </div>
        </MainLayout>

    )

}

export default Revision;