import React from 'react';
import { CircleArrowRight, CircleArrowLeft } from 'lucide-react';

const NavigationButtons = ({ currentQuestion, questions, handlePrev, handleNext, setCurrentQuestion }) => {
    return (
        <>
            <div className="flex justify-between px-10 w-full mt-4 relative z-10">
                <button onClick={handlePrev}>
                    <CircleArrowLeft size={32} className="hover:scale-110" />
                </button>
                <button onClick={handleNext}>
                    <CircleArrowRight size={32} className="hover:scale-110" />
                </button>
            </div>

            <div className='flex py-4 justify-center gap-7 cursor-pointer'>
                {questions.map((question, index) => (
                    <div
                        key={"circle" + index}
                        onClick={() => setCurrentQuestion(index)}
                        className={`rounded-full w-4 h-4 transition-opacity duration-300 ${
                            index === currentQuestion ? 'bg-gray-700' : 'bg-white'
                        }`}
                    ></div>
                ))}
            </div>
        </>
    );
};

export default NavigationButtons;
