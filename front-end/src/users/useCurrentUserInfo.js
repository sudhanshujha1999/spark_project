import { useState, useEffect } from "react";
import { useCurrentUser } from "../auth";
import { get } from "../network";

export const useCurrentUserInfo = () => {
    const { user, isLoading: isLoadingUser } = useCurrentUser();
    const [isLoadingInfo, setIsLoadingInfo] = useState(true);
    const [info, setInfo] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadInfo = async () => {
            try {
                const response = await get(`/api/users/${user.uid}`);
                setInfo(response.data);
                setIsLoadingInfo(false);
            } catch (e) {
                setError(e.message);
                setIsLoadingInfo(false);
            }
        };

        if (!isLoadingUser && user) {
            loadInfo();
        }
    }, [isLoadingUser, user]);

    useEffect(() => {
        if (!isLoadingUser && !user) {
            setInfo(null);
            setIsLoadingInfo(false);
        }
    }, [isLoadingUser, user]);

    return {
        isLoading: isLoadingUser || isLoadingInfo,
        userInfo: user && info ? { ...user, ...info } : null,
        error,
    };
};
