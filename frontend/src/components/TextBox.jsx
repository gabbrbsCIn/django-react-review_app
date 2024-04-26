import { useState } from 'react';
import api from '../api';
import ReviewButton from './ReviewButton';

function TextBox() {

    const [text, setText] = useState("")
    const [quiz, setQuiz] = useState([])

    const handleChange = (event) => {
        setText(event.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('/generate-quiz', {
                text: text
            });

            setQuiz(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div className='flex justify-center h-screen w-screen py-20 '>
                <div className='flex flex-col items-center w-2/3 bg-gray-200 p-4 rounded-lg font-poppins '>
                    <h1 className='mb-2'>Fichamento</h1>
                    <textarea
                        onChange={handleChange}
                        value={text}
                        className='bg-gray-100 w-full p-2 border border-gray-300 rounded-lg focus:outline-none h-full max-h-full'
                        placeholder="Digite aqui..."
                    />
                    <ReviewButton route="/get-review" data={text} />
                </div>

            </div>
        </>
    )
}

export default TextBox;