function Card({ children, title }) {
    return (
        <div className="group flex flex-col items-center justify-between bg-white shadow-lg rounded-lg w-72 h-48 mr-16 my-5 relative transition-transform transform-gpu hover:translate-y-[-4px] hover:shadow-xl">
            <h1 className="text-lg py-8 flex items-center justify-center h-full">{title}</h1>
            <div className="absolute bottom-0 left-0 w-full h-10 flex items-center justify-end">
                {children}
            </div>
        </div>
    );
}

export default Card;
