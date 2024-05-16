import UserContext from '../contexts/userContext';
import { useContext } from 'react';
import MainLayout from '../components/MainLayout';

function Quiz() {
    const { user } = useContext(UserContext);
    const title = 'Quiz do '+ user.username;


    return (
        <MainLayout title={title}>
            
        </MainLayout>
    )
}

export default Quiz;