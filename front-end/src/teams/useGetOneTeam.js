import { useOrganizations } from "./useOrganizations";
import { useState, useEffect } from "react";
// Remove this
export const useGetOneTeam = (id) => {
    const [teams] = useOrganizations();
    const [team, setTeam] = useState();
    useEffect(() => {
        if (teams) {
            const userTeam = teams.filter((item) => item.id === id);
            if (userTeam.length !== 0) {
                setTeam(userTeam[0]);
            }
        }
    }, [teams, id]);
    return team;
};
