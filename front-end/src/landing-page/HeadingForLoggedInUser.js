import { Box, Typography, Button } from "../ui";
import { useStyles } from "./styles";
import { useState } from "react";
import { FormDialog, ShareDialog } from "./FormDialog";

export const HeadingForLoggedInUser = ({ user }) => {
    const classes = useStyles();
    const [feedbackOpen, setFeedbackOpen] = useState(false);
    const [shareOpen, setShareOpen] = useState(false);

    const handleCloseFeedback = () => {
        setFeedbackOpen(false);
    };

    const handleCloseShare = () => {
        setShareOpen(false);
    };

    return (
        <Box className={classes.headingContainer}>
            <Typography className={classes.orgName}>SPARK</Typography>
            <Typography component='h1' className={classes.bannerHeading}>
                Esports Team Management
            </Typography>
            <Typography className={classes.body} variant='body2' gutterBottom>
                We hope you're enjoying <strong className={classes.nameOrg}>Spark.</strong>
                <br />
                Give us some feedback or refer another coach!
            </Typography>
            <Box my={3} className={classes.btnGrp}>
                <Button
                    variant='contained'
                    color='secondary'
                    onClick={() => setShareOpen(true)}
                    className={classes.normalBtn}>
                    Refer a friend
                </Button>
                <Button variant='outlined' onClick={() => setFeedbackOpen(true)} color='secondary'>
                    Feedback
                </Button>
            </Box>
            {feedbackOpen && (
                <FormDialog open={feedbackOpen} handleClose={handleCloseFeedback} user={user} />
            )}
            {shareOpen && (
                <ShareDialog open={shareOpen} handleClose={handleCloseShare} user={user} />
            )}
        </Box>
    );
};
