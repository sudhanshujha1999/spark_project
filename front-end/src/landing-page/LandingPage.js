import { Box, Typography, Grid, CircularProgress } from "../ui";
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
import { Hidden } from "@material-ui/core";

export const LandingPage = () => {
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
                            <Hidden lgDown>
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
                                <Typography>{item.details}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                ))}
                {/* Log at the back of the bg */}
                {/* <img className={classes.bgBehind} src={SparkLogo} alt='Company-Logo' /> */}
            </Grid>
        </Box>
    );
};
