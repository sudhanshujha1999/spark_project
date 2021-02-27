import { Box, Typography, Grid } from "../ui";
import Zoom from "@material-ui/core/Zoom";
import { Banner } from "./Banner";
import { useStyles } from "./styles";
import { useState } from "react";
import { HeadingContent } from "./HeadingContent";
import { HeadingForm } from "./HeadingForm";
import { EmailSentSuccess } from "./EmailSentSuccess";
import { feature } from "./FeaturesData";
import char from "../img/char-2.png";
import img from "../img/border.png";

export const LandingPage = () => {
    const classes = useStyles();
    const [visible, setVisible] = useState(true);
    const [step, setStep] = useState(0);

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

    return (
        <Box>
            <Banner />
            <Zoom in={visible}>
                <Box>{steps[step]}</Box>
            </Zoom>
            <Box my={18} />
            <Grid container spacing={10}>
                {feature.map((item, index) => (
                    <Grid item xs={12} xl={6}>
                        <Box className={classes.cardContainer}>
                            <img
                                src={item.image}
                                alt="testImag"
                                className={
                                    index % 2 !== 0
                                        ? `${classes.cardBg} ${classes.cardBgRight}`
                                        : `${classes.cardBg} ${classes.cardBgLeft}`
                                }
                            />
                            {index % 2 === 0 && (
                                <img src={img} alt="testImag" className={classes.cardBorder} />
                            )}
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
            </Grid>
        </Box>
    );
};
