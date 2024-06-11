import React, { useState, useEffect } from 'react';
import { CircleArrowRight, CircleArrowLeft, LoaderIcon } from 'lucide-react';
import { getQuestions } from '../services/quizService';
import { useParams } from 'react-router-dom';

function QuizBox() {
    const { revision_id, quiz_id } = useParams();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [questions, setQuestions] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getQuestions(quiz_id).then((data) => {
            console.log(data);
            setQuestions(data);
            setIsLoading(false);
        });
    }, [revision_id, quiz_id]);

    const handleNext = () => {
        setCurrentQuestion((prevQuestion) => (prevQuestion + 1) % questions.length);
    };

    const handlePrev = () => {
        setCurrentQuestion((prevQuestion) => (prevQuestion - 1 + questions.length) % questions.length);
    };

    return (
        <div className='flex justify-center h-full py-20 px-80'>
            <div className='flex flex-col items-center h-full w-full bg-gray-200 p-4 rounded-lg font-poppins'>
                <div className="relative w-full h-full">
                    {isLoading ? (
                        <LoaderIcon />
                    ) : (
                        <h1>{questions[currentQuestion].text}</h1>
                    )}
                </div>

                <div className="flex justify-between px-10 w-full mt-4">
                    <button onClick={handlePrev}>
                        <CircleArrowLeft size={32} />
                    </button>
                    <button onClick={handleNext}>
                        <CircleArrowRight size={32} />
                    </button>
                </div>

                <div className='flex py-4 justify-center gap-7 cursor-pointer'>
                    {isLoading ? null : (
                        questions.map((question, index) => (
                            <div
                                onClick={() => {
                                    setCurrentQuestion(index);
                                }}
                                key={"circle" + index}
                                className={`rounded-full w-4 h-4 bg-gray-800 transition-opacity duration-300 ${index === currentQuestion ? 'bg-gray-700 ' : 'bg-white'
                                    }`}
                            ></div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default QuizBox;
