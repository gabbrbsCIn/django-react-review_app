import React, { useState } from 'react';
import { CirclePlus } from 'lucide-react';
import api from '../services/api';

function AddButton({ onAdd }) {
    const [revisionTitle, setRevisionTitle] = useState('');

    const handleChange = (e) => {
        e.preventDefault()
        setRevisionTitle(e.target.value);
    }

    const handleAdd = async () => {
        try {
            const data = {
                title: revisionTitle,
            };

            const response = await api.post('revision', data);
            alert('Fichamento adicionado com sucesso!');
            onAdd(response.data);
        } catch (error) {
            console.log('Error:', error);
            alert('Error');
        }
    };

    return (
        <div className='flex'>
            <input type="text" className='mr-5 h-8 w-64 text-sm rounded-md border-2' placeholder='Título do fichamento...' onChange={handleChange} />
            <button className='bg-yellow-400 px-4 py-1 rounded-md hover:bg-yellow-500 transition duration-300 ' onClick={handleAdd}><CirclePlus size={20} /></button>
        </div>
    );
}

export default AddButton;
