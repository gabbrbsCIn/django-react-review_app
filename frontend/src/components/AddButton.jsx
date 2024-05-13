import React from 'react';
import { CirclePlus } from 'lucide-react';

function AddButton() {
    const handleAdd = () => {
    };

    return (
        <button className='bg-yellow-400 px-4 py-1 rounded-md hover:bg-yellow-500 transition duration-300 ' onClick={handleAdd}><CirclePlus/></button>
    );
}

export default AddButton;