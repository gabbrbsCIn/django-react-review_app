import { useState, useEffect } from "react";

function ButtonCard({ type }) {
    const [text, setText] = useState('');
    const [buttonClass, setButtonClass] = useState('bg-yellow-200 px-4 py-1 rounded-xl hover:bg-yellow-400 transition duration-300 mr-2');

    useEffect(() => {
        if (type === "excluir") {
            setText('Excluir');
            setButtonClass('bg-red-300 px-4 py-1 rounded-xl hover:bg-red-400 transition duration-300 mr-2');
        } else if (type === "abrir") {
            setText('Abrir');
            setButtonClass('bg-yellow-200 px-4 py-1 rounded-xl hover:bg-yellow-400 transition duration-300 mr-2');
        }
    }, [type]);

    return (
        <button className={buttonClass}>{text}</button>
    )
}

export default ButtonCard;