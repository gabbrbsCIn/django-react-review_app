import { useState, useEffect } from 'react';
import { getQuestions, getChoices } from '../services/quizService';

export const useQuizData = (quiz_id) => {
    const [questions, setQuestions] = useState([]);
    const [choices, setChoices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        Promise.all([getQuestions(quiz_id), getChoices(quiz_id)])
            .then(([questionsData, choicesData]) => {
                setQuestions(questionsData);
                setChoices(choicesData);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [quiz_id]);

    return { questions, choices, isLoading };
};
