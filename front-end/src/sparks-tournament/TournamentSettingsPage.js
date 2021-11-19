import { useParams } from "react-router";
import { Box } from "../ui";
import { useTournamentDetails } from "./useTournamentDetails";
import { SideControl } from "./SideControl";
import { useStyles } from "./styles";

export const TournamentSettingsPage = () => {
    const { tournamentId } = useParams();
    const classes = useStyles();
    const data = useTournamentDetails(tournamentId);
    console.log(data);
    return (
        <Box className={classes.nullifyBasicPadding}>
            <Box className={classes.grid}>
                <Box className={`${classes.backgroundSideControl} ${classes.defaultPadding}`}>
                    <SideControl tabs={tabs} />
                </Box>
                <Box className={classes.defaultPadding}>
                    <Box> absdb</Box>
                </Box>
            </Box>
        </Box>
    );
};

const tabs = [
    { name: "General" },
    { name: "Game" },
    { name: "Scheduling" },
    { name: "Brackets" },
    { name: "Prize" },
];
