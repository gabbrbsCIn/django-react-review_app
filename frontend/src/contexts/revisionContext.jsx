import { createContext, useState, useEffect } from 'react';
import api from '../services/api';

const RevisionContext = createContext();

export const RevisionProvider = ({ children }) => {
    const [revisions, setRevisions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRevisions = async () => {
            try {
                const response = await api.get('revision');
                setRevisions(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
            }
        };

        fetchRevisions();
    }, []);

    const addRevision = (newRevision) => {
        setRevisions([...revisions, newRevision]);
    };

    const removeRevision = (id) => {
        setRevisions(revisions.filter(revision => revision.id !== id));
    };

    return (
        <RevisionContext.Provider value={{ revisions, isLoading, addRevision, removeRevision }}>
            {children}
        </RevisionContext.Provider>
    );
};

export default RevisionContext;
