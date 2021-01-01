import { useState, useEffect } from 'react';
import { useCurrentUser } from '../auth';
import { get } from '../network';

export const useTeams = () => {
    const { user = {} } = useCurrentUser();
    const authId = user.uid;
    const [isLoading, setIsLoading] = useState(true);
    const [teams, setTeams] = useState([]);
    const [error, setError] = useState([]);

    useEffect(() => {
        const loadPlayers = async () => {
            setIsLoading(true);
            try {
                const response = await get(`/api/users/${authId}/teams`);
                setTeams(response.data);
            } catch (e) {
                console.log("Error!");
            }
            setIsLoading(false);
        }

        if (authId) {
            loadPlayers();
        }
    }, [authId]);

    return [teams, isLoading, error];
}