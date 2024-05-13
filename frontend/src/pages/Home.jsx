import TextBox from '../components/TextBox';
import Card from '../components/Card';
import ButtonCard from '../components/ButtonCard';
import AddButton from '../components/AddButton';
import { useEffect, useState } from 'react';
import api from '../api';
import { ACCESS_TOKEN } from '../constants';


function Home() {
    const route = '/users/get_username/';
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem(ACCESS_TOKEN);
                if (token) {
                    const response = await api.get(route);
                    setUsername(response.data.data);
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
            <div className='flex flex-col'>

                <div className='flex px-36 pt-20 text-2xl'>
                    <h1 className='py-5 font-semibold mr-5'>Olá, {username}!</h1>
                    <div className='flex items-center h-full justify-center '>

                        <AddButton />
                    </div>
                </div>
                <div className='flex flex-row flex-wrap'>

                    <Card text={"Fichamento de Matemática"}>
                        <ButtonCard />
                    </Card>
                    <Card text={"Fichamento de Matemática"}>
                        <ButtonCard />
                    </Card>
                    <Card text={"Fichamento de Matemática"}>

                    </Card>


                </div>
            </div>


        </>

    )
}

export default Home;