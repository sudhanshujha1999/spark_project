import { useState, useEffect } from "react";
import { get } from "../network";

export const useGetTeamsForUser = (user) => {
    const [teams, setTeams] = useState(null);

    useEffect(() => {
        if (user) {
            const getTeam = async () => {
                try {
                    const response = await get(`/api/users/${user.authId}/teams`);
                    setTeams(response.data);
                } catch (e) {
                    console.log("Error!");
                }
            };
            getTeam();
        }
    }, [user]);

    return teams;
};
