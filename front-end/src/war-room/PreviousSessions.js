import { Box, Grid, Typography } from "../ui";
import { useStyles } from "./styles";

const data = [
    {
        team: "MyTeam",
        opponent: "Opponent Team",
        date: "24-Mar-2019",
    },
];

export const PreviousSessions = () => {
    const classes = useStyles();
    return (
        <Box>
            <Grid container>
                {data.map((item) => (
                    <Grid item xs={12}>
                        <Box className={classes.container}>
                            <Typography className={classes.date}>{item.date}</Typography>
                            <Box className={classes.teams}>
                                <Typography className={classes.vs}>{item.team}</Typography>
                                <Typography className={classes.vs}>{item.opponent}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
