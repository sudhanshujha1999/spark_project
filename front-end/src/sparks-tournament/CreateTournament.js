import { Box } from "../ui";
import { GameSelection } from "./GameSelection";
import { useState } from "react";
import { useStyles } from "./styles";
import { useMemo } from "react";
import { useCallback } from "react";
import { TournamentInformation } from "./TournamentInformation";
import { getTournamentDetailSelector } from "./recoil";
import { useRecoilValue } from "recoil";
import { post } from "../network";

export const CreateTournament = ({ groupId }) => {
    const [step, setStep] = useState(0);
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const details = useRecoilValue(getTournamentDetailSelector);

    const onNext = useCallback(() => {
        setStep((prevState) => prevState + 1);
    }, []);

    const onPrev = useCallback(() => {
        setStep((prevState) => prevState - 1);
    }, []);

    const onFinish = useCallback(async () => {
        setLoading(true);
        try {
            const tournamentObject = { ...details, groupId };
            const {
                data: { tournamentId },
            } = await post("/api/tournament", tournamentObject);
            // push to that page
            console.log(tournamentId);
        } catch (error) {
            console.log(error.message);
            console.log(error);
        }
        console.log("call-back-end");
        setLoading(false);
    }, [details, groupId]);

    const formSteps = useMemo(() => {
        return [
            {
                stepNo: 0,
                component: <GameSelection nextFunction={onNext} prevFunction={onPrev} />,
            },
            {
                stepNo: 1,
                component: (
                    <TournamentInformation
                        nextFunction={onNext}
                        prevFunction={onPrev}
                        finishFunction={onFinish}
                        isLoading={loading}
                    />
                ),
            },
        ];
    }, [onNext, onPrev, onFinish, loading]);

    return (
        <Box className={classes.noContainerClasses}>
            {formSteps.map(({ stepNo, component }) => stepNo === step && <Box>{component}</Box>)}
        </Box>
    );
};
