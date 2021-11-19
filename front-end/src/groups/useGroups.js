import { useCallback, useState, useEffect } from "react";
import { get } from "../network";
import { useOrganizations } from "../teams";

export const useGroups = () => {
    const [groups, setGroups] = useState(null);
    // const [update, setUpdate] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { organizations } = useOrganizations();

    const updateData = useCallback(async () => {
        try {
            console.log("Fetching Groups...");
            const { data } = await get(`/api/${organizations._id}/community-group/`);
            setGroups(data.groups);
        } catch (error) {
            console.log(error.message);
            console.log("Error in Fetching Groups...");
        }
    }, [organizations]);

    useEffect(() => {
        if (!groups) {
            if (organizations._id) {
                updateData();
                setIsLoading(false);
            }
        } else {
            setIsLoading(false);
        }
        // eslint-disable-next-line
    }, [organizations, groups]);

    return { groups, isLoading };
};
