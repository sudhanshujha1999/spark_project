import { Box, Grid, Typography } from "../ui";
import { useStyles } from "./styles";
import { useScrimmages } from "../community/useScrimmages";
import { ScrimmageItem } from "./ScrimmageItem";
import { useMemo, useState } from "react";
import { SelectedScrimmage } from "./SelectedScrimmage";

export const Scrimmages = () => {
    const classes = useStyles();
    const [selectedScrimmageId, setSelectedScrimmageId] = useState(null);
    const { isLoading, myScrimmages } = useScrimmages();

    const setSelectedScrimmage = (scrimmage) => {
        setSelectedScrimmageId(scrimmage._id);
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
                            />
                        ))}
                    </Box>
                ) : (
                    <Box>No scrimmage</Box>
                )}
            </Grid>
            <Grid item xs={12} md={6}>
                {memoIzedSelectedScrimmage._id && (
                    <SelectedScrimmage scrimmage={memoIzedSelectedScrimmage} />
                )}
            </Grid>
        </Grid>
    );
};
