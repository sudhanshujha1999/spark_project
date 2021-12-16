import { useEffect, useState, useCallback, useMemo } from "react";
import { get } from "../network";
import { useCurrentUserInfo } from "../users/useCurrentUserInfo";

export const useAllEvents = (groupId) => {
    const [tournaments, setTournaments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { userInfo } = useCurrentUserInfo();

    const fetchData = useCallback(async (groupId) => {
        try {
            console.log("Fetching group details...");
            const { data } = await get(`/api/${groupId}/tournament`);
            setTournaments(data.tournaments);
            setIsLoading(false);
        } catch (error) {
            console.log(error.message);
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (groupId) {
            if (!tournaments.length) {
                fetchData(groupId);
            }
        } else {
            setIsLoading(false);
        }
        // eslint-disable-next-line
    }, [groupId, fetchData]);

    const updateDetails = useCallback(async () => {
        await fetchData(groupId);
    }, [groupId, fetchData]);

    const published = useMemo(() => {
        return tournaments.filter((tournament) => tournament.publishable);
    }, [tournaments]);

    const userTournament = useMemo(() => {
        if (!userInfo) {
            return [];
        } else {
            return tournaments.filter((tournament) => tournament.created_by_user === userInfo._id);
        }
    }, [tournaments, userInfo]);

    return { published, userTournament, isLoading, updateDetails };
};
