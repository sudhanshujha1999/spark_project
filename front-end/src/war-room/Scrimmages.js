import { Box, Grid, Slide, Typography } from "../ui";
import { useStyles } from "./styles";
import { useScrimmages } from "../community/useScrimmages";
import { ScrimmageItem } from "./ScrimmageItem";
import { useMemo, useState } from "react";
import { SelectedScrimmage } from "./SelectedScrimmage";
import { useTheme } from "@material-ui/core/styles";
import { useOrganizations } from "../teams";
import { useIsCoach } from "../users/useIsCoach";

export const Scrimmages = () => {
    const classes = useStyles();
    const theme = useTheme();
    const { organizations } = useOrganizations();
    const { isCoach } = useIsCoach(organizations._id);
    const [selectedScrimmageId, setSelectedScrimmageId] = useState(null);
    const { isLoading, myScrimmages } = useScrimmages();

    const setSelectedScrimmage = (scrimmage) => {
        setSelectedScrimmageId(scrimmage._id);
    };

    const deselect = () => {
        setSelectedScrimmageId(null);
    };

    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };

    // when we update the global image the currecnt passed one won't update so i have used memo that will change
    const memoIzedSelectedScrimmage = useMemo(() => {
        if (selectedScrimmageId) {
            return myScrimmages.filter((scrimmage) => scrimmage._id === selectedScrimmageId)[0];
        } else {
            return {};
        }
    }, [myScrimmages, selectedScrimmageId]);

    return (
        <Grid container>
            <Grid item xs={12}>
                <Box my={1}>
                    <Typography className={classes.headingMedium}>My scrimmages</Typography>
                </Box>
            </Grid>
            <Grid item xs={12} md={6}>
                {isLoading ? (
                    <Box>loading...</Box>
                ) : myScrimmages.length > 0 ? (
                    <Box my={2}>
                        {myScrimmages.map((scrimmage) => (
                            <ScrimmageItem
                                key={scrimmage._id}
                                scrimmage={scrimmage}
                                setSelectedScrimmage={setSelectedScrimmage}
                                deselect={deselect}
                            />
                        ))}
                    </Box>
                ) : (
                    <Box>No scrimmage</Box>
                )}
            </Grid>
            <Grid item xs={12} md={6}>
                <Slide
                    in={memoIzedSelectedScrimmage._id === selectedScrimmageId}
                    direction='left'
                    style={{
                        transitionDelay: `${
                            memoIzedSelectedScrimmage._id === selectedScrimmageId
                                ? transitionDuration.exit
                                : 0
                        }ms`,
                    }}>
                    <Box>
                        {memoIzedSelectedScrimmage._id && (
                            <SelectedScrimmage
                                scrimmage={memoIzedSelectedScrimmage}
                                isCoach={isCoach}
                            />
                        )}
                    </Box>
                </Slide>
            </Grid>
        </Grid>
    );
};
