import { Box, Typography } from "../ui";
import { EachTeamMembers } from "./EachTeamMembers";
import { useStyles } from "./Styles";

export const Member = ({ teams }) => {
    const classes = useStyles();
    return (
        <Box mt={4} pr={3}>
            <Typography className={classes.headingSection} variant='h5'>
                Teams
            </Typography>
            <Box my={2}>
                {teams.map((team) => (
                    <EachTeamMembers team={team} />
                ))}
            </Box>
        </Box>
    );
};
