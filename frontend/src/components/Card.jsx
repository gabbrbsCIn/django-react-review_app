function Card({ children, text }) {
    return (
        <div className="group flex flex-col items-center justify-between bg-white shadow-lg rounded-lg w-80 h-56 ml-36 my-2 relative transition-transform transform-gpu hover:translate-y-[-4px] hover:shadow-xl">
            <h1 className="text-lg py-8 flex items-center justify-center h-full">{text}</h1>

            <div className="absolute bottom-0 left-0 w-full h-10 flex items-center justify-end">
                {children}
            </div>
        </div>
    );
}

export default Card;
