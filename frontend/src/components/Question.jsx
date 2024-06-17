import React from 'react';

function Question({ question, choices, answers, showRightChoice, handleAnswers }) {
    return (
        <>
            <h1>{question?.text}</h1>
            <div className="flex flex-col h-full w-full justify-center space-y-5 px-20">
                {choices.map((choice, index) => (
                    <div
                        key={index}
                        className={`flex flex-col justify-center rounded-md border 
                            ${answers[question?.id] === choice ? 'bg-amber-400' : 'border-slate-800'} 
                            ${showRightChoice && choice.is_correct ? 'bg-green-400 border-none' : ''}
                            h-[12%] w-full hover:bg-amber-300`}
                    >
                        <button onClick={() => handleAnswers(choice)} className="text-xs h-full w-full">
                            {choice.text}
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Question;
