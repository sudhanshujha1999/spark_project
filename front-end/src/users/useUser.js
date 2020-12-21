import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCurrentUser } from '../auth';

export const useUser = userId => {
    const { user: currentUser, isLoading: isLoadingCurrentUser } = useCurrentUser();
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const authtoken = await currentUser.getIdToken();
                const response = await axios.get(`/api/user-info/${userId}`, { headers: { authtoken } });
                const user = response.data;
                setUser(user);
                setIsLoading(false);
            } catch (e) {
                console.log(e);
            }
        }

        if (!isLoadingCurrentUser) {
            loadUser();
        }
    }, [isLoadingCurrentUser, currentUser, userId]);

    return { isLoading, user };
}