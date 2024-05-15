import React, { useEffect, useState } from 'react';
import AddButton from '../components/AddButton';

import UserContext from '../contexts/userContext';
import { useContext } from 'react';

function Revision() {
    const { user } = useContext(UserContext);

    return (
        <div className='flex items-center h-full px-36 py-10 justify-center '>
            <h1>Revision do {user.username}</h1>
            <AddButton user_id={user.user_id} />
        </div>
    )

}

export default Revision;