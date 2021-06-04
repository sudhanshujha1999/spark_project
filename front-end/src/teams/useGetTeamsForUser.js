import { useState, useEffect } from "react";
import { get } from "../network";

export const useGetTeamsForUser = (user) => {
    const [teams, setTeams] = useState(null);

    useEffect(() => {
        if (user) {
            const getTeam = async () => {
                try {
                    const {
                        data: { organizations },
                    } = await get(`/api/users/${user.auth_id}/teams`);
                    let teams = [];
                    organizations.forEach((organization) => teams.push(...organization.teams));
                    setTeams(teams);
                } catch (e) {
                    console.log("Error!");
                }
            };
            getTeam();
        }
    }, [user]);

    return teams;
};
