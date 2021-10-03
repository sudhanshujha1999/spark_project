import { Box, Typography } from "./";
import { makeStyles } from "@material-ui/styles";

export const CopyrightFooter = ({ footerRef }) => {
    const classes = useStyles();

    return (
        <Box ref={footerRef} className={classes.footerContainer}>
            <Typography>Copyright © 2021 Spark Esports Inc. All rights reserved.</Typography>
            <Typography>Contact - Taylor@sparkesports.gg</Typography>
        </Box>
    );
};

const useStyles = makeStyles((theme) => ({
    footerContainer: {
        marginTop: "40px",
        width: "100%",
        padding: "20px 200px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backdropFilter: "blur(6px)",
        backgroundColor: "rgb(40 47 64 / 29%)",
    },
}));
