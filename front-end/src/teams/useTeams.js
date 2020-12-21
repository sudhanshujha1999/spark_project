import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCurrentUser } from '../auth';

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
                const response = await axios.get(`/api/users/${authId}/teams`);
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