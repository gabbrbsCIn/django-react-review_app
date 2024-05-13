import React, { useEffect, useState } from 'react';
import api from '../api';
import { ACCESS_TOKEN } from '../constants';
import AddButton from '../components/AddButton';


function Revision() {
    const route = '/users/get_user/';
    const [user_id, setUser_id] = useState();
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem(ACCESS_TOKEN);
                if (token) {
                    const response = await api.get(route);
                    setUser_id(response.data.user_id);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div className='flex items-center h-full px-36 py-10 justify-center '>
                <AddButton user_id={user_id} />
            </div>
        </>
    )

}

export default Revision;