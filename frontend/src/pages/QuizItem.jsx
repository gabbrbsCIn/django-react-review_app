import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

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
        <div>
            <h1>QuizItem : {revision_id} {quiz_id}</h1>
            {/* Outros conteúdos do componente */}
        </div>
    );
}

export default QuizItem;
