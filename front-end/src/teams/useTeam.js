import { useState, useEffect } from "react";
import { get } from "../network";
import { getTeamInfoState, setTeamInfoState } from "./recoil";
import { useSetRecoilState, useRecoilValue } from "recoil";

export const useTeam = (teamId) => {
    const [isLoading, setIsLoading] = useState(true);
    const [team, setTeam] = useState({});
    const allTeamsInfo = useRecoilValue(getTeamInfoState);
    const setAllTeamsInfo = useSetRecoilState(setTeamInfoState);
    useEffect(() => {
        const loadTeam = async () => {
            try {
                if (teamId) {
                    console.log(teamId);
                    const currentTeamInfo = allTeamsInfo.filter((team) => team._id === teamId);
                    if (currentTeamInfo.length > 0) {
                        setTeam(currentTeamInfo[0]);
                        console.log("found");
                    } else {
                        const { data } = await get(`/api/teams/${teamId}`);
                        setTeam(data.team);
                        console.log("call");
                        // console.log(teamId);
                        setAllTeamsInfo([...allTeamsInfo, data.team]);
                    }
                } else {
                    setTeam({});
                }
            } catch (e) {
                console.log(e.message);
                console.log("Error!");
            }
            setIsLoading(false);
        };
        loadTeam();
        // eslint-disable-next-line
    }, [teamId]);

    return { isLoading, team };
};
