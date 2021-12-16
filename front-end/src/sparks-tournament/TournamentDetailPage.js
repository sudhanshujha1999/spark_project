import { Box, Button, Grid, Tabs, Tab, Typography } from "../ui";
import { SettingsIcon } from "../icons";
import { useTournamentDetails } from "./useTournamentDetails";
import { useHistory, useParams } from "react-router-dom";
import { BracketContainer } from "./BracketContainer";
import { useStyles } from "./styles";
import { useMemo, useState } from "react";
import { TournamentOverviewPage } from "./TournamentOverviewPage";
import { TournamentSchedulingPage } from "./TournamentSchedulingPage";

const tabLabel = ["Overview", "Scheduling"];

export const TournamentDetailPage = () => {
    const { tournamentId } = useParams();
    const { tournament } = useTournamentDetails(tournamentId);
    const history = useHistory();
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const componentsToRender = useMemo(() => {
        switch (value + 1) {
            case 1:
                return (
                    <TournamentOverviewPage
                        description={tournament.description}
                        minTeams={tournament.min_teams}
                        maxTeams={tournament.max_teams}
                        game={tournament.game}
                    />
                );
            case 2:
                return (
                    <TournamentSchedulingPage
                        reportingTime={tournament.reporting_time}
                        startDate={tournament.start_date}
                    />
                );
            default:
                <Box></Box>;
        }
    }, [tournament, value]);

    const handleClick = () => {
        history.push(`/${tournamentId}/tournament/settings/`);
    };

    return (
        <Box className={classes.nullifyBasicPadding}>
            <Box
                className={classes.tournamentGameImage}
                style={{
                    backgroundImage: `url(${tournament.image_url})`,
                    backgroundColor: "#333",
                }}
            />

            <Box className={classes.defaultPadding}>
                <Typography variant='h3'>{tournament.name}</Typography>
                <Box display={"flex"} justifyContent={"space-between"} my={2}>
                    <Tabs
                        textColor='secondary'
                        indicatorColor='secondary'
                        value={value}
                        onChange={handleChange}>
                        {tabLabel.map((item) => (
                            <Tab label={item} key={item} />
                        ))}
                    </Tabs>
                    <Box>
                        <Button
                            onClick={handleClick}
                            color='primary'
                            variant='contained'
                            endIcon={<SettingsIcon />}>
                            Setting
                        </Button>
                    </Box>
                </Box>
                <Box my={2}>{componentsToRender}</Box>
                {/* <Box display='flex' alignItems='center'>
                    <BracketContainer matches={allMatchesOnDay} />
                    <BracketContainer matches={allMatchesDayTwo} />
                </Box> */}
            </Box>
        </Box>
    );
};

const allMatchesOnDay = [
    {
        teams: [
            {
                name: "team1",
                won: false,
            },
            {
                name: "team2",
                won: true,
            },
        ],
    },
    {
        teams: [
            {
                name: "ram bharose",
                won: true,
            },
            {
                name: "xttt",
                won: false,
            },
        ],
    },
    {
        teams: [
            {
                name: "team1",
                won: false,
            },
            {
                name: "team2",
                won: true,
            },
        ],
    },
    {
        teams: [
            {
                name: "ram bharose",
                won: true,
            },
            {
                name: "xttt",
                won: false,
            },
        ],
    },
];

const allMatchesDayTwo = [
    {
        teams: [
            {
                name: "team1",
                won: false,
            },
            {
                name: "team2",
                won: true,
            },
        ],
    },
    {
        teams: [
            {
                name: "team1",
                won: false,
            },
            {
                name: "team2",
                won: true,
            },
        ],
    },
];
