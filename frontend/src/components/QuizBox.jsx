import React, { useState } from 'react';
import { CircleArrowRight, CircleArrowLeft } from 'lucide-react';


function QuizBox() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const questions = [
        "question 1 Content",
        "question 2 Content",
        "question 3 Content",
    ];

    const handleNext = () => {
        setCurrentQuestion((prevQuestion) => (prevQuestion + 1) % questions.length);
    };

    const handlePrev = () => {
        setCurrentQuestion((prevQuestion) => (prevQuestion - 1 + questions.length) % questions.length);
    };

    return (
        <div className='flex justify-center h-screen w-full py-52 px-96'>
            <div className='flex flex-col items-center h-full w-full bg-gray-200 p-4 rounded-lg font-poppins'>
                <div className="relative w-full h-full">
                    {questions.map((question, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-300 ${index === currentQuestion ? 'opacity-100' : 'opacity-0'
                                }`}
                        >
                            <div className="flex items-center justify-center h-full">
                                {question}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between px-10 w-full mt-4">
                    <button onClick={handlePrev}>
                        <CircleArrowLeft size={32} />
                    </button>
                    <button onClick={handleNext}>
                        <CircleArrowRight size={32} />
                    </button>
                </div>
                <div className='flex py-4 flex justify-center gap-7 cursor-pointer'>
                    {questions.map((question, index) => {
                        return (
                            <div onClick={() => {
                                setCurrentQuestion(index)
                            }}
                                key={"circle" + index}
                                className={`rounded-full w-4 h-4 bg-gray-800 transition-opacity duration-300 ${index === currentQuestion ? 'bg-gray-700 ' : 'bg-white'}`}>

                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default QuizBox;
