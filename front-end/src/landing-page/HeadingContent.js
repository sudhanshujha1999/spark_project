import { Box, Typography, Button, Icon } from "../ui";
import SparkLogo from "../img/logo.svg";
import { useStyles } from "./styles";

export const HeadingContent = ({ nextStep }) => {
    const classes = useStyles();
    return (
        <Box className={classes.headingContainer}>
            <Box display='flex' alignItems='center' justifyContent='space-between'>
                <Box className={classes.logo} mr={2}>
                    <Icon fontSize='large'>
                        <img
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                            alt='Spark Logo'
                            src={SparkLogo}
                        />
                    </Icon>
                </Box>
                <Typography className={classes.orgName}>SPARK</Typography>
            </Box>
            <Typography className={classes.body} variant='body2' gutterBottom>
                Player developement and team management platform to help you{" "}
                <strong className={classes.nameOrg}> Win.</strong>
            </Typography>
            <Button
                disableElevation
                className={classes.btn}
                variant='contained'
                color='secondary'
                onClick={() => nextStep()}>
                Request Invite
            </Button>
        </Box>
    );
};
