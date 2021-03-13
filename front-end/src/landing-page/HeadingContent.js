import { Box, Typography, Button } from "../ui";
import { useStyles } from "./styles";

export const HeadingContent = ({ nextStep }) => {
    const classes = useStyles();
    return (
        <Box className={classes.headingContainer}>
            <Typography component="h1" className={classes.bannerHeading}>
                Esports Team Management
            </Typography>
            <Typography className={classes.body} variant="body2" gutterBottom>
                Bring your esports organization to the next level with{" "}
                <strong className={classes.nameOrg}>Spark Sport.</strong>
            </Typography>
            <Button
                disableElevation
                className={classes.btn}
                variant="contained"
                onClick={() => nextStep()}>
                Request Invite
            </Button>
        </Box>
    );
};