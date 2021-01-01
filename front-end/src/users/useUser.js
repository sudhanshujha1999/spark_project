import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCurrentUser } from '../auth';
import { get } from '../network';

export const useUser = userId => {
    const { user: currentUser, isLoading: isLoadingCurrentUser } = useCurrentUser();
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const response = await get(`/api/user-info/${userId}`);
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