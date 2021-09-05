import { useState, useEffect } from "react";
import { useCurrentUser } from "../auth";
import { get } from "../network";
import { useRecoilState } from "recoil";
import { userState } from "./userState";

export const useCurrentUserInfo = () => {
    const { user, isLoading: isLoadingUser } = useCurrentUser();
    const [isLoadingInfo, setIsLoadingInfo] = useState(true);
    const [userInfoFromDb, setUserInfoFromDb] = useRecoilState(userState);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadInfo = async () => {
            try {
                console.log("User api called");
                const { data } = await get(`/api/users/${user.uid}`);
                setUserInfoFromDb(data);
            } catch (e) {
                setError(e.message);
            }
            setIsLoadingInfo(false);
        };

        if (!isLoadingUser && user) {
            // Stop making extra call when called each time
            // if there is no data in the userInfoFromDb
            if (!userInfoFromDb) {
                loadInfo();
            } else {
                setIsLoadingInfo(false);
            }
        }
    }, [isLoadingUser, user, setUserInfoFromDb, userInfoFromDb]);

    useEffect(() => {
        if (!isLoadingUser && !user) {
            setUserInfoFromDb(null);
            setIsLoadingInfo(false);
        }
    }, [isLoadingUser, user, setUserInfoFromDb]);

    return {
        isLoading: isLoadingUser || isLoadingInfo,
        userInfo: user && userInfoFromDb ? { ...user, ...userInfoFromDb } : null,
        error,
    };
};
