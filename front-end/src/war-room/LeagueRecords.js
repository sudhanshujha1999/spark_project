import { Box, Button, Grid, Typography } from "../ui";
import { useStyles } from "./styles";
import { useState } from "react";
import { AddLeagueDialog } from "./AddLeagueDialog";
import { useLeagues } from "../teams";
import { useMemo, useCallback } from "react";
import { del } from "../network";
import { LeagueItem } from "./LeagueItem";

// leagure records
export const LeagueRecords = ({
    teams = [],
    organizationId,
    showActions = true,
    isCoach = false,
    height,
}) => {
    const classes = useStyles();
    // SET THESE LEAGUES ON THE VALUE OF A HOOK THAT CALL THE DATA
    const { leagues, setUpdate } = useLeagues(organizationId);
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    const scoreMemo = useMemo(() => {
        const scoreArray = [];
        leagues.forEach((league) => {
            let win = 0;
            let lose = 0;
            league.matches.forEach((match) => {
                if (match.win) {
                    win++;
                } else if (match.lose) {
                    lose++;
                }
            });
            scoreArray.push({ win, lose });
        });
        return scoreArray;
    }, [leagues]);

    const handleRemove = async (removeId) => {
        console.log(removeId);
        try {
            const {
                data: { success },
            } = await del(`/api/${removeId}/league`);
            console.log(success);
            if (success) {
                setUpdate(true);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const updateLeagues = useCallback(() => {
        setUpdate(true);
    }, [setUpdate]);

    return (
        <>
            <Grid container spcing={4}>
                <Grid item xs={12}>
                    <Typography className={classes.headingMedium} variant='h5' gutterBottom>
                        League Records
                    </Typography>
                    <Box mb={6} />
                    <Box
                        className={`${classes.leagueContainer} ${classes.customScrollY}`}
                        style={{
                            height: height ? height - 80 : "auto",
                        }}>
                        <Grid container>
                            {leagues.length > 0 ? (
                                leagues.map((league, index) => (
                                    <Grid
                                        style={{
                                            overflowX: "hidden",
                                            margin: "10px 0",
                                        }}
                                        key={league._id}
                                        item
                                        xs={11}>
                                        <LeagueItem
                                            league={league}
                                            score={scoreMemo[index]}
                                            updateLeagues={updateLeagues}
                                            handleRemove={handleRemove}
                                            showActions={showActions && isCoach}
                                        />
                                    </Grid>
                                ))
                            ) : (
                                <Grid item xs={12}>
                                    <Box className={`${classes.container} ${classes.newsBox}`}>
                                        <Typography variant='h5'>No league info</Typography>
                                    </Box>
                                </Grid>
                            )}
                        </Grid>
                    </Box>
                    {showActions && isCoach && (
                        <Box my={2}>
                            <Button color='secondary' onClick={handleClick} variant='contained'>
                                Add a league
                            </Button>
                        </Box>
                    )}
                </Grid>
            </Grid>
            <AddLeagueDialog
                open={open}
                onClose={onClose}
                setLeagues={setUpdate}
                teams={teams}
                organizationId={organizationId}
            />
        </>
    );
};
