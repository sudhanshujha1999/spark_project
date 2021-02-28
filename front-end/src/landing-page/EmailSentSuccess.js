import { Box, Typography } from "../ui";
import { useStyles } from "./styles";

export const EmailSentSuccess = () => {
    const classes = useStyles();

    return (
        <Box>
            <Box className={classes.headingContainer}>
                <Box className={classes.success}>
                    <Typography component="h1" className={classes.bannerHeading}>
                        Request Sent
                    </Typography>
                    <Box className={classes.checkConatiner}>
                        <svg className={classes.checkSvg} viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="50" fill="#393e46"></circle>
                            <path
                                className={classes.checkmark}
                                d="M75 33L40 66 25 50"
                                fill="none"
                                stroke="#ffd369"
                                stroke-width="3"
                                stroke-linecap="round"></path>
                        </svg>
                    </Box>
                </Box>
                <Typography className={classes.body} variant="body2" gutterBottom>
                    Thank you for showing your intrest we will get back to you soon.
                </Typography>
            </Box>
        </Box>
    );
};
