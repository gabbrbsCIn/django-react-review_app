import MainLayout from "../components/MainLayout"

function QuizBox() {
    return (
        <div className='flex justify-center h-screen w-full py-20 px-36'>
            <div className='flex flex-col items-center w-full bg-gray-200 p-4 rounded-lg font-poppins'>
                <h1 className='mb-2'>QUIZ_BOX</h1>
                <textarea
                    className='bg-gray-100 w-full p-2 border border-gray-300 rounded-lg focus:outline-none h-full max-h-full'
                    placeholder="Digite aqui..."
                />
            </div>
        </div>
    );
}

export default QuizBox;