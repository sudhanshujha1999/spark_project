import { useTeams } from "./useTeams";
import { useState, useEffect } from "react";

export const useGetOneTeam = (id) => {
    const [teams] = useTeams();
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
