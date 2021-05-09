import { useState, useEffect } from "react";
import { useCurrentUser } from "../auth";
import { get } from "../network";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { getTeamState, setTeamState } from "./recoil";

export const useTeams = () => {
    const { user = {} } = useCurrentUser();
    const authId = user.uid;
    const [isLoading, setIsLoading] = useState(true);
    const teams = useRecoilValue(getTeamState);
    const setTeams = useSetRecoilState(setTeamState);
    const [error, setError] = useState([]);

    useEffect(() => {
        const loadPlayers = async () => {
            if (teams.length === 0) {
                setIsLoading(true);
                try {
                    const response = await get(`/api/users/${authId}/teams`);
                    setTeams(response.data);
                } catch (e) {
                    console.log("Error!");
                }
            }
            setIsLoading(false);
            console.log(teams);
        };

        if (authId) {
            loadPlayers();
        }
    }, [authId, setTeams, teams]);

    return [teams, isLoading, error, setTeams];
};
