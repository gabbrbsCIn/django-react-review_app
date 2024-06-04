import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import api from "../services/api";


function ButtonCard({ type, id, onRemove, route }) {
    const [text, setText] = useState('');
    const [buttonClass, setButtonClass] = useState('bg-yellow-200 px-4 py-1 rounded-xl hover:bg-yellow-400 transition duration-300 mr-2');

    const handleDelete = () => {
        const fetchData = async () => {
            try {
                const response = await api.delete(`${route}/${id}`);
                console.log(response);
                alert('Fichamento excluído com sucesso!')
                onRemove(id);

            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    };

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
        type === "abrir" ? <Link to={`/fichamentos/${id}`} className={buttonClass}>{text}</Link> : <button className={buttonClass} onClick={handleDelete}>{text}</button>
    );
}

export default ButtonCard;