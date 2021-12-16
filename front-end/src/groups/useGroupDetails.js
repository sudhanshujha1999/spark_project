import { useEffect, useState, useCallback } from "react";
import { get } from "../network";
import { useOrganizations } from "../teams";

export const useGroupDetails = (groupId) => {
    const { organizations } = useOrganizations();
    const [groupDetails, setGroupDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = useCallback(async (groupId, organizationId) => {
        try {
            console.log("Fetching group details...");
            const { data } = await get(`/api/${groupId}/${organizationId}/details`);
            setGroupDetails(data.group);
            setIsLoading(false);
        } catch (error) {
            console.log(error.message);
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (groupId) {
            if (organizations._id && !groupDetails._id) {
                fetchData(groupId, organizations._id);
            }
        } else {
            setIsLoading(false);
        }
        // eslint-disable-next-line
    }, [groupId, organizations, fetchData]);

    const updateDetails = useCallback(async () => {
        await fetchData(groupId, organizations._id);
    }, [groupId, organizations, fetchData]);

    return { groupDetails, isLoading, updateDetails };
};
