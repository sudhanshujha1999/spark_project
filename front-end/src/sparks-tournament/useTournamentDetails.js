import { useEffect, useCallback, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { tournamentEditState, tournamentState } from "./recoil";
import { get } from "../network";

export const useTournamentDetails = (id) => {
    const [tournament, setTournament] = useRecoilState(tournamentState);
    const [isLoading, setIsLoading] = useState(false);
    const editValues = useRecoilValue(tournamentEditState);

    const fetchData = useCallback(async () => {
        console.log("Fetching tournament...");
        setIsLoading(true);
        try {
            const { data } = await get(`/api/${id}/details/tournament`);
            console.log(data);
            setTournament(data.tournament);
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    }, [id, setTournament]);

    useEffect(() => {
        if (id && !tournament._id) {
            fetchData();
        }
    }, [id, fetchData, tournament]);

    const saveNewDetails = useCallback(async () => {
        console.log(editValues);
    }, [editValues]);

    return { tournament, isLoading, saveNewDetails };
};
