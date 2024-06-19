import api from "../services/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

function GetQuizButton({ data, revision }) {

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await toast.promise(
                api.post("/create-save-quiz", { 
                    data: data, 
                    revision: revision 
                }),
                {
                    loading: 'Gerando e salvando o quiz...',
                    success: 'Quiz gerado e salvo com sucesso!',
                    error: 'Ocorreu um erro ao gerar e salvar o quiz. Por favor, tente novamente.'
                }
            );
            navigate("/quiz/");
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            className='flex justify-end mt-3 bg-amber-400 hover:bg-amber-500 py-1 px-4 rounded'
            onClick={handleSubmit}
            disabled={isLoading}>

            Gerar Quiz
        </button>
    );
}

export default GetQuizButton;