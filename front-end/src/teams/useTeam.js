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
                    const currentTeamInfo = allTeamsInfo.filter((team) => team.id === teamId);
                    if (currentTeamInfo.length > 0) {
                        setTeam(currentTeamInfo[0]);
                        console.log("found");
                    } else {
                        const response = await get(`/api/teams/${teamId}`);
                        setTeam(response.data);
                        console.log("call");
                        console.log(teamId);
                        setAllTeamsInfo([...allTeamsInfo, response.data]);
                    }
                } else {
                    setTeam({});
                }
            } catch (e) {
                console.log("Error!");
            }
            setIsLoading(false);
        };
        loadTeam();
        // eslint-disable-next-line
    }, [teamId]);

    return { isLoading, team };
};
