import { Box, Typography } from "../ui";
import { makeStyles } from "@material-ui/styles";
import moment from "moment";

export const TournamentSchedulingPage = ({ reportingTime = "", startDate = "" }) => {
    const classes = useStyles();

    return (
        <Box display='flex' flexDirection={"column"}>
            {/* item 1 */}
            <Box className={classes.item} flexDirection={"column"}>
                <Typography variant='h6'>Start Date</Typography>
                <Box className={classes.fieldValue}>
                    <Typography variant='subtitle2'>
                        {moment(new Date(startDate)).format("LL")}
                    </Typography>
                </Box>
            </Box>
            {/* item 1 */}
            {/* item 2 */}
            <Box className={classes.item} flexDirection={"column"}>
                <Typography variant='h6'>Reporting Time</Typography>
                <Box className={classes.fieldValue}>
                    <Typography variant='subtitle2'>{reportingTime} minutes before</Typography>
                </Box>
            </Box>
            {/* item 2 */}
        </Box>
    );
};

const useStyles = makeStyles((theme) => ({
    item: {
        marginTop: 16,
        display: "flex",
    },
    fieldValue: {
        paddingLeft: "16px",
    },
}));
