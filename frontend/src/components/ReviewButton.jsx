import api from "../api";
import { useState } from "react";


function ReviewButton({ route, data }) {

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post(route, { data: data });
            console.log(response.data)
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <button className='flex justify-end mt-3 w-full' onClick={handleSubmit} >Revisar</button>
    );
}
export default ReviewButton;