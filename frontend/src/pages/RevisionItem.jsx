import { useParams, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { fetchData } from '../services/revisionService';

import TextBox from '../components/TextBox';

function RevisionItem() {
    const { id } = useParams();
    const [foundRevision, setFoundRevision] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const getData = async () => {
            const findRevisionById = await fetchData(id);
            if (!findRevisionById) {
                setIsLoading(false);
            }
            setFoundRevision(findRevisionById);
            setIsLoading(false);
        };

        getData();
    }, [id]);


    if (!isLoading) {
        if (!foundRevision) {
            return <Navigate to="/not-found" />;
        }
    }


    return (
        <div>
            {isLoading ? () => L :

                <TextBox />

            }

        </div>
    )
}
export default RevisionItem;