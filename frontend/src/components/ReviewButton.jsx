import api from "../services/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ReviewButton({ route, data, revision }) {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await api.post(route, { data: data });
            console.log(response.data);
            const saving_quiz = await api.post("/save-quiz", { data: response.data, revision: revision});
            console.log(saving_quiz.data);

            navigate("/quiz/")
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button className='flex justify-end mt-3 w-full' onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Loading..." : "Revisar"}
        </button>
    );
}

export default ReviewButton;