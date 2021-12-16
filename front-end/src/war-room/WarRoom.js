import { Box, BackButton, Container, CircularProgress, Dialog, Grid } from "../ui";
import { useOrganizations } from "../teams";
import { useIsCoach } from "../users/useIsCoach";
import { AllMatches } from "./AllMatches";
import { useStyles } from "./styles";
import { AddWarRoomMatch } from "./AddWarRoomMatch";
import { useRef, useState } from "react";
import { useGetAllMatches } from "./useGetAllMatches";
import { LeagueRecords } from "./LeagueRecords";
import { useHistory } from "react-router-dom";
import { WarRoomLandingPage } from "./WarRoomLandingPage";

export const WarRoom = () => {
    const history = useHistory();
    const { organizations, isLoading: isLoadingOrganizations } = useOrganizations();
    const { canEditEvents } = useIsCoach(organizations._id);
    const { matches, isLoading: isLoadingMatches } = useGetAllMatches();
    const [addMatch, setAddMatch] = useState(false);
    const heightRef = useRef(null);
    const classes = useStyles();

    const handleAdd = () => {
        setAddMatch(true);
    };
    const handleCancel = () => {
        setAddMatch(false);
    };
    return (
        <Container maxWidth='xl'>
            {isLoadingMatches || isLoadingOrganizations || !organizations ? (
                <Box className={classes.loading}>
                    <CircularProgress color='secondary' />
                </Box>
            ) : matches.length > 0 ? (
                <>
                    <BackButton goBack={history.goBack} />

                    <Grid container justifyContent='space-between'>
                        <Grid item xs={12} md={7} lg={7} mb={5}>
                            <AllMatches
                                height={heightRef}
                                matches={matches}
                                organizations={organizations}
                                isLoadingOrganizations={isLoadingOrganizations}
                                addMatch={addMatch}
                                handleAdd={handleAdd}
                                isCoach={canEditEvents}
                            />
                        </Grid>
                        <Grid item xs={12} md={5} lg={4}>
                            <LeagueRecords
                                height={heightRef.current?.clientHeight}
                                teams={organizations.teams}
                                organizationId={organizations._id}
                                hasPermission={canEditEvents}
                            />
                        </Grid>
                    </Grid>
                </>
            ) : (
                <WarRoomLandingPage openAddMatch={handleAdd} />
            )}
            {addMatch && (
                <Dialog open={addMatch} onClose={handleCancel} disableScrollLock>
                    <Box
                        style={{
                            boxShadow: "rgb(255 255 255 / 8%) 0px -2px 15px inset",
                        }}
                        p={2}>
                        <AddWarRoomMatch
                            handleCancel={handleCancel}
                            addMatch={addMatch}
                            teams={organizations.teams}
                        />
                    </Box>
                </Dialog>
            )}
        </Container>
    );
};
