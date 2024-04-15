import { useState } from 'react';

function TextBox() {

    const [text, setText] = useState("")
    const [quiz, setQuiz] = useState([])
    const handleChange = (event) => {
        setText(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('/generate-quiz', {
                text: text
            });

            setQuiz(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div className='flex justify-center h-screen py-20 font-poppins'>
                
                <div className='flex flex-col items-center w-2/3 bg-gray-200 p-4 rounded-lg '>
                    <h1 className='mb-2'>Fichamento 01</h1>
                    <textarea
                        onChange={handleChange}
                        value={text}
                        className='bg-gray-100 w-full p-2 border border-gray-300 rounded-lg focus:outline-none h-full max-h-full'
                        placeholder="Digite aqui..."
                    />
                    <button className='flex justify-end mt-3 w-full' onClick={handleSubmit} >Revisar</button>
                </div>
                
            </div>
        </>
    )
}

export default TextBox;