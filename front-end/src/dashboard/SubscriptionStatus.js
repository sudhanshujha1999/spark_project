import { useOrganizations } from "../teams";
import { useStyles } from "./Styles";
import { Box, Loading, Typography } from "../ui";

export const SubscriptionStatus = () => {
    const { organizations, isLoading } = useOrganizations();
    const classes = useStyles();
    return (
        <Box>
            {!isLoading && organizations.subscription_status === "TRIAL" ? (
                <Typography className={classes.trailStatus}>
                    Trial ends on{" "}
                    <Typography color='secondary' component='strong'>
                        {new Date(organizations.subscription_endDate).toLocaleDateString()}
                    </Typography>
                </Typography>
            ) : (
                ""
            )}
        </Box>
    );
};
