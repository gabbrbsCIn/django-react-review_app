// components/QuizBox.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuizData } from '../hooks/useQuizData';

import { LoaderIcon } from 'lucide-react';
import toast from 'react-hot-toast';

import { verifyCorrectAnswers, saveQuizResult } from '../services/quizService';

import Question from './Question';
import NavigationButtons from './NavigationButtons';
import ResultModal from './ResultModal';
import { handleEmoji } from '../utils/quizUtils';

function QuizBox() {
    const { quiz_id } = useParams();
    const { questions, choices, isLoading } = useQuizData(quiz_id);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [correctAnswersCount, setCorrectAnswersCount] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [emoji, setEmoji] = useState(null);
    const [showRightChoice, setShowRightChoice] = useState(false);

    const handleNext = () => {
        setCurrentQuestion((prev) => (prev === questions.length - 1 ? 0 : prev + 1));
    };

    const handlePrev = () => {
        setCurrentQuestion((prev) => (prev === 0 ? questions.length - 1 : prev - 1));
    };

    const handleAnswers = (choice) => {
        setAnswers((prev) => ({
            ...prev,
            [questions[currentQuestion].id]: choice,
        }));
    };

    const submitAnswers = () => {
        if (questions.length !== Object.keys(answers).length) {
            toast('Você deve responder todas as perguntas antes de enviar.');
        } else {
            const score = verifyCorrectAnswers(answers);
            setCorrectAnswersCount(score.numberOfCorrectAnswers);
            setIsModalOpen(true);
            handleEmoji(score.correctAnswersPercentage, setEmoji);
            setShowRightChoice(true);

            saveQuizResult({
                quiz_id,
                score: score.numberOfCorrectAnswers,
            });
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const currentChoices = choices.filter(
        (choice) => choice.question_id === questions[currentQuestion]?.id
    );

    return (
        <div className="flex justify-center h-full py-20 px-72">
            <div className="flex flex-col items-center h-full w-full bg-gray-200 p-4 rounded-lg font-poppins">
                <div className="relative w-full h-full">
                    {isLoading ? (
                        <LoaderIcon />
                    ) : (
                        <Question
                            question={questions[currentQuestion]}
                            choices={currentChoices}
                            answers={answers}
                            showRightChoice={showRightChoice}
                            handleAnswers={handleAnswers}
                        />
                    )}
                </div>
                <NavigationButtons 
                    currentQuestion={currentQuestion}
                    questions={questions}
                    handlePrev={handlePrev}
                    handleNext={handleNext}
                    setCurrentQuestion={setCurrentQuestion}
                />
                <button
                    className={`w-[100px] h-[30px] text-xs rounded-md ${questions.length !== Object.keys(answers).length
                        ? 'border-2 border-amber-400 cursor-default'
                        : 'bg-amber-400 hover:bg-amber-500 transition-opacity duration-400'
                        }`}
                    onClick={submitAnswers}
                >
                    Ver resultado
                </button>
                {isModalOpen && (
                    <ResultModal
                        correctAnswersCount={correctAnswersCount}
                        totalQuestions={questions.length}
                        closeModal={closeModal}
                        emoji={emoji}
                    />
                )}
            </div>
        </div>
    );
}

export default QuizBox;
