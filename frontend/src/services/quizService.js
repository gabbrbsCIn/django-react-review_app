import api from "./api";

export const getQuestions = async (quiz_id) => {
    try {
        const response = await api.get(`questions/${quiz_id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};