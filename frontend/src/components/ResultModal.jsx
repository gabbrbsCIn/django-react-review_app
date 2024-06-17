import React from 'react';

function ResultModal({ correctAnswersCount, totalQuestions, closeModal, emoji }) {
    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold">Resultados</h2>
                <p>
                    Você acertou {correctAnswersCount} de {totalQuestions} perguntas!
                </p>
                <button onClick={closeModal} className="mt-4 bg-amber-400 hover:bg-amber-500 text-white py-1 px-4 rounded">
                    Fechar
                </button>
                <div className="w-full flex justify-end">{emoji}</div>
            </div>
        </div>
    );
}

export default ResultModal;
