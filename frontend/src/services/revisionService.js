import api from './api';

export const fetchData = async (id) => {
    try {
        const response = await api.get("revision");
        const revisions = response.data;
        const findRevisionById = revisions.find(item => item.id === parseInt(id));
        return findRevisionById;
    } catch (error) {
        console.error(error);
    }
};