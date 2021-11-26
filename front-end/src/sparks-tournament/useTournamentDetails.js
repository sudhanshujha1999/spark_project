import { useEffect, useCallback, useState } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { tournamentEditState, tournamentState } from "./recoil";
import { get, put } from "../network";

export const useTournamentDetails = (id) => {
    const [tournament, setTournament] = useRecoilState(tournamentState);
    const [isLoading, setIsLoading] = useState(false);
    const [updating, setUpdating] = useState(false);
    const editValues = useRecoilValue(tournamentEditState);
    const resetEditState = useResetRecoilState(tournamentEditState);

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
        if (id && tournament?._id !== id) {
            fetchData();
        }
    }, [id, fetchData, tournament]);

    const saveNewDetails = useCallback(async () => {
        if (!updating && Object.keys(editValues).length) {
            setUpdating(true);
            try {
                const {
                    data: { updated },
                } = await put(`/api/${id}/tournament/update/`, editValues);
                if (updated === id) {
                    console.log("updated ->" + updated);
                    resetEditState();
                    console.log("reset");
                }
            } catch (error) {
                console.log("Error " + error.message);
            }
            setUpdating(false);
        } else {
            console.log("Still updating...");
        }
    }, [editValues, updating, id, resetEditState]);

    return { tournament, isLoading, saveNewDetails };
};
