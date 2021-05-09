import { useState, useEffect } from 'react';
import { get } from '../network';

export const useSchools = (userId) => {
    const [isLoading, setIsLoading] = useState(true);
    const [schools, setSchools] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadInfo = async () => {
            try {
                const response = await get(`/api/users/${userId}/schools`);
                console.log(response.data);
                setSchools(response.data);
                setIsLoading(false);
            } catch (e) {
                setError(e.message);
                setIsLoading(false);
            }
        }

        if (userId) {
            loadInfo();
        }
    }, [userId]);

    return {
        isLoading,
        schools,
        error,
    };
}