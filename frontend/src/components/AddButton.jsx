import React from 'react';
import { CirclePlus } from 'lucide-react';
import { useState } from 'react';
import api from '../services/api';

function AddButton({ user_id }) {
    const [revisionTitle, setRevisionTitle] = useState('');

    const handleChange = (e) => {
        e.preventDefault()
        setRevisionTitle(e.target.value);
    }

    const handleAdd = async () => {

        try {
            const data = {
                title: revisionTitle,
                user_id: user_id
            };

            const response = await api.post('revision', data);
            console.log('Success:', response.data);
            alert('Fichamento adicionado com sucesso!');
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