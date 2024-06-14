import React, { useState, useEffect } from 'react';
import { CircleArrowRight, CircleArrowLeft, LoaderIcon } from 'lucide-react';
import { getQuestions, getChoices, verifyCorrectAnswers } from '../services/quizService';
import { useParams } from 'react-router-dom';

function QuizBox() {
    const { revision_id, quiz_id } = useParams();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [choices, setChoices] = useState([]);
    const [answers, setAnswers] = useState({});
    const [correctAnswersCount, setCorrectAnswersCount] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
        }
    };

    const handleAnswer = (choice) => {
        setAnswers({
            ...answers,
            [questions[currentQuestion].id]: choice,
        });
        console.log(answers)
    };

    const handleSubmit = () => {
        if (questions.length !== Object.keys(answers).length) {
            alert('Você deve responder todas as perguntas antes de enviar.');
        }
        else {
            const score = verifyCorrectAnswers(answers);
            setCorrectAnswersCount(score.numberOfCorrectAnswers);
            setIsModalOpen(true);
        }
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

    console.log(questions, answers);

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
                                    <div
                                        key={index}
                                        className={`flex flex-col justify-center rounded-md border ${answers[questions[currentQuestion]?.id] === choice ? 'bg-amber-400' : 'border-slate-800'} h-[12%] w-full hover:bg-amber-300 `}
                                    >
                                        <button onClick={() => handleAnswer(choice)} className='text-xs h-full w-full'>{choice.text}</button>
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
                                className={`rounded-full w-4 h-4 bg-gray-800 transition-opacity duration-300 ${index === currentQuestion ? 'bg-gray-700' : 'bg-white'}`}
                            ></div>
                        ))}
                </div>
                <div className='flex w-full justify-end'>
                    <button
                        className={`
                                w-[100px] h-[30px] text-xs rounded-md ${questions.length !== Object.keys(answers).length ? 'border-2 border-amber-400 cursor-default'
                                : 'bg-amber-400 hover:bg-amber-500 transition-opacity duration-400'}`}
                        onClick={handleSubmit}
                    >
                        Ver resultado
                    </button>
                </div>
                {isModalOpen && (
                    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-4 rounded-lg shadow-lg">
                            <h2 className="text-xl font-bold">Resultados</h2>
                            <p>Você acertou {correctAnswersCount} de {questions.length} perguntas!</p>
                            <button onClick={closeModal} className="mt-4 bg-amber-400 hover:bg-amber-500 text-white py-1 px-4 rounded">Fechar</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default QuizBox;
