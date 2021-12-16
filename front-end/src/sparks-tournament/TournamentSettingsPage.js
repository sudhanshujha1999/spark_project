import { useParams } from "react-router";
import { Box } from "../ui";
import { useTournamentDetails } from "./useTournamentDetails";
import { SideControl } from "./SideControl";
import { useStyles } from "./styles";
import { GeneralSettings } from "./GeneralSettings";
import { BracketSettings } from "./BracketSettings";
import { SchedulingSettings } from "./SchedulingSettings";
import { useMemo, useState } from "react";

export const TournamentSettingsPage = () => {
    const { tournamentId } = useParams();
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const { saveNewDetails } = useTournamentDetails(tournamentId);

    const componentsForTab = useMemo(() => {
        return [
            <GeneralSettings saveNewDetails={saveNewDetails} />,
            <SchedulingSettings saveNewDetails={saveNewDetails} />,
            <BracketSettings saveNewDetails={saveNewDetails} />,
        ];
    }, [saveNewDetails]);

    return (
        <Box className={classes.nullifyBasicPadding}>
            <Box className={classes.grid}>
                <Box className={`${classes.backgroundSideControl} ${classes.defaultPadding}`}>
                    <SideControl setValue={setValue} value={value} tabs={tabs} />
                </Box>
                <Box className={classes.defaultPadding}>
                    <Box>{componentsForTab[value]}</Box>
                </Box>
            </Box>
        </Box>
    );
};

const tabs = [
    { name: "General", id: 0 },
    { name: "Scheduling", id: 1 },
    { name: "Brackets", id: 2 },
];
