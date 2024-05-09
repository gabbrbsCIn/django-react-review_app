function Card({ children, text }) {
    return (
        <div className="flex flex-col items-center justify-between bg-white shadow-lg rounded-lg w-80 h-56 mx-10 my-10 relative">
            <h1 className="text-lg py-8 flex items-center justify-center h-full">{text}</h1>
            {children}
            <div className="absolute bottom-0 left-0 w-full  h-10 flex items-center justify-end rounded-b-lg">
                <button className="bg-yellow-200 px-4 py-1 rounded-xl hover:bg-gray-800 transition duration-300 mr-2">Enviar</button>
                <button className="bg-yellow-200 px-4 py-1 rounded-xl hover:bg-gray-800 transition duration-300">Enviar</button>
            </div>
        </div>


    );
}

export default Card;
