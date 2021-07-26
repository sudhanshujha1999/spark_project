import { Box, Button, Typography, Grid, CircularProgress } from "../ui";
import { sendEvent } from '../analytics';
import Zoom from "@material-ui/core/Zoom";
import { Banner } from "./Banner";
import { useStyles } from "./styles";
import { useState } from "react";
import { HeadingContent } from "./HeadingContent";
import { HeadingForm } from "./HeadingForm";
import { EmailSentSuccess } from "./EmailSentSuccess";
import { feature } from "./FeaturesData";
import img1 from "../img/border-1.svg";
import img2 from "../img/border.svg";
// import SparkLogo from "../img/logo.svg";
import { useCurrentUserInfo } from "../users";
import { HeadingForLoggedInUser } from "./HeadingForLoggedInUser";
import { Container, Hidden } from "@material-ui/core";

export const LandingPage = () => {
	sendEvent('Landing Page Visited');

    const classes = useStyles();
    const [visible, setVisible] = useState(true);
    const [step, setStep] = useState(0);
    const { isLoading, userInfo } = useCurrentUserInfo();
    const border = [img1, img2];
    const borderLg = [img1, img2, img2, img1, img2, img1];
    const nextStep = () => {
        setVisible(false);
        setTimeout(() => {
            setStep(step + 1);
            setVisible(true);
        }, 500);
    };

    const steps = [
        <HeadingContent nextStep={nextStep} />,
        <HeadingForm nextStep={nextStep} />,
        <EmailSentSuccess />,
    ];

    return isLoading ? (
        <Box className={classes.pageLoad}>
            <CircularProgress />
        </Box>
    ) : (
        <Box>
            <Banner />
            <Zoom in={visible}>
                {userInfo ? (
                    <Box>
                        <HeadingForLoggedInUser user={userInfo} />
                    </Box>
                ) : (
                    <Box>{steps[step]}</Box>
                )}
            </Zoom>
            <Container maxWidth='xl'>
                <Box mt={5} mb={18}>
                    <Typography align='center' variant='h3' color='secondary'>
                        Bring your esports program to the next level
                    </Typography>
                </Box>
                <Grid className={classes.featuresContainer} container spacing={10}>
                    {feature.map((item, index) => (
                        <Grid item xs={12} xl={6}>
                            <Box className={classes.cardContainer}>
                                <img
                                    src={item.image}
                                    alt='testImag'
                                    className={
                                        index % 2 !== 0
                                            ? `${classes.cardBg} ${classes.cardBgRight}`
                                            : `${classes.cardBg} ${classes.cardBgLeft}`
                                    }
                                />
                                <Hidden xlUp>
                                    <img
                                        src={border[index % 2 === 0 ? 0 : 1]}
                                        alt='testImag'
                                        className={
                                            index % 2 === 0
                                                ? `${classes.cardBorder} ${classes.cardBorderLeft}`
                                                : `${classes.cardBorder} ${classes.cardBorderRight}`
                                        }
                                    />
                                </Hidden>
                                <Hidden xlDown>
                                    <img
                                        src={borderLg[[0, 3, 4].includes(index) ? 0 : 1]}
                                        alt='testImag'
                                        className={
                                            [0, 3, 4].includes(index)
                                                ? `${classes.cardBorder} ${classes.cardBorderLeft}`
                                                : `${classes.cardBorder} ${classes.cardBorderRight}`
                                        }
                                    />
                                </Hidden>
                                <Box
                                    className={
                                        index % 2 !== 0
                                            ? classes.infoContainerRight
                                            : classes.infoContainerLeft
                                    }>
                                    <Typography className={classes.cardHeading}>
                                        {item.heading}
                                    </Typography>
                                    <Typography>
                                        <Typography component='span' color='secondary'>
                                            {item.strongDesc}{" "}
                                        </Typography>
                                        {item.details}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                    <Grid item xs={12}>
                        <Box width='fit-content' mx={"auto"}>
                            <Button variant='contained' color='primary' disabled={true}>
                                Start for free
                            </Button>
                        </Box>
                    </Grid>
                    {/* Log at the back of the bg */}
                    {/* <img className={classes.bgBehind} src={SparkLogo} alt='Company-Logo' /> */}
                </Grid>
            </Container>
        </Box>
    );
};
