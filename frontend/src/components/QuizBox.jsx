import React, { useState, useEffect } from 'react';
import { CircleArrowRight, CircleArrowLeft, LoaderIcon } from 'lucide-react';
import { getQuestions, getChoices } from '../services/quizService';
import { useParams } from 'react-router-dom';

function QuizBox() {
    const { revision_id, quiz_id } = useParams();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [choices, setChoices] = useState([]);

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
    }, [revision_id, quiz_id]);


    const currentChoices = choices.filter((choice) => choice.question_id === questions[currentQuestion]?.id);

    const handleNext = () => {
        if (currentQuestion === questions.length - 1) {
            setCurrentQuestion(0);
        } else {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handlePrev = () => {
        if (currentQuestion === 0) {
            setCurrentQuestion(questions.length - 1);
        } else {
            setCurrentQuestion(currentQuestion - 1);

        };
    }
    return (
        <div className='flex justify-center h-full py-20 px-72'>
            <div className='flex flex-col items-center h-full w-full bg-gray-200 p-4 rounded-lg font-poppins'>
                <div className="relative w-full h-full">
                    {isLoading ? (
                        <LoaderIcon />
                    ) : (
                        <>
                            <h1>{questions[currentQuestion]?.text}</h1>
                            <div className='flex flex-col h-full w-full justify-center space-y-5 px-20 '>
                                {currentChoices.map((choice, index) => (
                                    <div className='flex flex-col justify-center rounded-md border border-slate-800 h-[12%] w-full hover:bg-amber-300 transition duration-200'>
                                        <button key={index} className='text-xs h-full'>{choice.text}</button>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                <div className="flex justify-between px-10 w-full mt-4 relative z-10">
                    <button onClick={handlePrev}>
                        <CircleArrowLeft size={32} className="hover:scale-110" />
                    </button>
                    <button onClick={handleNext}>
                        <CircleArrowRight size={32} className="hover:scale-110" />
                    </button>
                </div>

                <div className='flex py-4 justify-center gap-7 cursor-pointer'>
                    {!isLoading &&
                        questions.map((question, index) => (
                            <div
                                onClick={() => {
                                    setCurrentQuestion(index);
                                    console.log(index);
                                }}
                                key={"circle" + index}
                                className={`rounded-full w-4 h-4 bg-gray-800 transition-opacity duration-300 ${index === currentQuestion ? 'bg-gray-700' : 'bg-white'
                                    }`}
                            ></div>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default QuizBox;
