import { useState, useMemo } from "react";
import { Box, Grid, NavigationTab, Typography } from "../ui";
import { JoinWithCode } from "./JoinWithCode";

const tabLabel = [
    "With a code",
    // "With a link"
];

export const JoinGroup = ({ onClose }) => {
    const [value, setValue] = useState(0);

    const tabComponent = useMemo(() => {
        switch (value) {
            case 0: {
                return <JoinWithCode onClose={onClose} />;
            }
            case 1: {
                return <>In progrees</>;
            }
            default: {
                return <>Please select a valid method </>;
            }
        }
    }, [value, onClose]);

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h4'>Join a group</Typography>
                </Grid>
                <Grid item xs={12}>
                    <NavigationTab tabLabel={tabLabel} value={value} setValue={setValue} />
                </Grid>
                <Grid item xs={12}>
                    {tabComponent}
                </Grid>
            </Grid>
        </Box>
    );
};
