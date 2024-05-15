import UserContext from '../contexts/userContext';
import { useContext } from 'react';

function Quiz() {
    const { user } = useContext(UserContext);
    
    return (
        <h1>Quiz Page do {user.username}</h1>
    )
}

export default Quiz;