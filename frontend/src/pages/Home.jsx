import Card from '../components/Card';
import ButtonCard from '../components/ButtonCard';
import { useEffect, useState } from 'react';
import api from '../api';
import { ACCESS_TOKEN } from '../constants';
import { LoaderIcon } from 'lucide-react';


function Home() {
    const route = '/users/get_user/';
    const [username, setUsername] = useState('');
    const [user_id, setUser_id] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem(ACCESS_TOKEN);
                if (token) {
                    const response = await api.get(route);
                    setUsername(response.data.username);
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
            {isLoading ? (
                <div className='p-36'><LoaderIcon/></div>
            ) : (
                <div className='flex flex-col'>
                    <div className='flex px-36 pt-20 text-2xl'>
                        <h1 className='py-5 font-semibold mr-5'>Olá, {username}!</h1>
                    </div>
                    <div className='flex flex-row flex-wrap'>
                        <Card text={"Fichamento de Matemática"}>
                            <ButtonCard />
                        </Card>
                        <Card text={"Fichamento de Matemática"}>
                            <ButtonCard />
                        </Card>
                    </div>
                </div>
            )}
        </>
    );
}

export default Home;