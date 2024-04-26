import api from "../api";
import { useState } from "react";

function ReviewButton({ route, data }) {
    const [isLoading, setIsLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await api.post(route, { data: data });
            console.log(response.data);
            const saving_quiz = await api.post("/save-quiz", { data: response.data});
            console.log(saving_quiz.data);
            window.location.href = "/quiz";
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