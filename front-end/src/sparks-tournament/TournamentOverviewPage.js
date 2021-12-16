import { Box, Typography } from "../ui";
import { makeStyles } from "@material-ui/styles";

export const TournamentOverviewPage = ({
    description = "",
    game = "",
    maxTeams = "",
    minTeams = "",
}) => {
    const classes = useStyles();
    return (
        <Box display='flex' flexDirection={"column"}>
            {/* item 1 */}
            <Box className={classes.item} flexDirection={"column"}>
                <Typography variant='h6'>Description</Typography>
                <Box className={classes.fieldValue}>
                    <Typography variant='subtitle2'>{description}</Typography>
                </Box>
            </Box>
            {/* item 1 */}
            {/* item 2 */}
            <Box className={classes.item} flexDirection={"column"}>
                <Typography variant='h6'>Game</Typography>
                <Box className={classes.fieldValue}>
                    <Typography variant='subtitle2'>{game}</Typography>
                </Box>
            </Box>
            {/* item 2 */}
            {/* item 3 */}
            <Box className={classes.item}>
                <Box display={"flex"} alignItems={"center"}>
                    <Typography variant='h6'>Max number of teams : </Typography>
                    <Typography className={classes.fieldValue} variant='h6'>
                        {maxTeams}
                    </Typography>
                </Box>
                <Box ml={2} display={"flex"} alignItems={"center"}>
                    <Typography variant='h6'>Min number of teams : </Typography>
                    <Typography className={classes.fieldValue} variant='h6'>
                        {minTeams}
                    </Typography>
                </Box>
            </Box>
            {/* item 3 */}
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
