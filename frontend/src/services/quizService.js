import api from "./api";

export const getQuestions = async (quiz_id) => {
    try {
        const response = await api.get(`questions/${quiz_id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getChoices = async (quiz_id) => {
    try { 
        const response = await api.get(`choices/${quiz_id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    };


}

export const verifyCorrectAnswers = (answers) => {
    let correctAnswers = 0;
    let score = {};

    for (let key in answers) {
        if (answers[key].is_correct === true) {
            correctAnswers++;
        }
    }
    const performance = (correctAnswers / Object.keys(answers).length) * 100;
    return score = {correctAnswersPercentage: performance.toFixed(2), numberOfCorrectAnswers: correctAnswers};
}