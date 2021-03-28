import { useState, useEffect } from "react";
import { get } from "../network";

export const useTeam = (teamId) => {
    const [isLoading, setIsLoading] = useState(true);
    const [team, setTeam] = useState({});

    useEffect(() => {
        const loadTeam = async () => {
            try {
                if (teamId) {
                    const response = await get(`/api/teams/${teamId}`);
                    setTeam(response.data);
                } else {
                    setTeam({});
                }
            } catch (e) {
                console.log("Error!");
            }
            setIsLoading(false);
        };
        loadTeam();
    }, [teamId]);

    return { isLoading, team };
};
