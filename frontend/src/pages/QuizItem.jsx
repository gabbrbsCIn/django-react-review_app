import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

import QuizBox from '../components/QuizBox';

function QuizItem() {
    const { revision_id, quiz_id } = useParams();
    const [isValid, setIsValid] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const validateQuiz = async () => {
            try {
                const response = await api.get(`quiz/${revision_id}/${quiz_id}`);
                if (response.status === 200) {
                    setIsValid(true);
                }
            } catch (error) {
                navigate('/not-found');
            }
        };

        validateQuiz();
    }, [revision_id, quiz_id, navigate]);

    if (!isValid) {
        return null;
    }

    return (
        <div className='h-screen w-screen'>
            <QuizBox />
        </div>
    );
}

export default QuizItem;
