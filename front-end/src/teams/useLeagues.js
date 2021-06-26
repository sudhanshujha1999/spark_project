import { get } from "../network";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { leaguesState } from "./recoil";

export const useLeagues = (organizationId) => {
    const [leagues, setLeagues] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [allLeagues, setAllLeagues] = useRecoilState(leaguesState);

    const [update, setUpdate] = useState(false);

    useEffect(() => {
        const getLeague = async () => {
            const { data } = await get(`api/${organizationId}/league`);
            setLeagues(data.leagues);
            const newAllLeagues = { ...allLeagues, organizationId: data.leagues };
            setAllLeagues(newAllLeagues);
        };
        if (update) {
            console.log("update_call");
            getLeague();
            setUpdate(false);
        } else {
            if (organizationId) {
                setIsLoading(true);
                // if organizations found in the all leagues state
                if (allLeagues.organizationId) {
                    setLeagues(allLeagues.organizationId);
                } else {
                    console.log("api_call_league");
                    getLeague();
                }
                setIsLoading(false);
            }
            // eslint-disable-next-line
        }
    }, [organizationId, allLeagues, update, setAllLeagues]);

    return { leagues, isLoading, setUpdate };
};
