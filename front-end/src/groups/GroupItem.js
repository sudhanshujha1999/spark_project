import { Link } from "react-router-dom";
import { Avatar, Box, Typography } from "../ui";
import { useStyles } from "./styles";

export const GroupItem = ({ groupId, groupName, activity }) => {
    const classes = useStyles();
    return (
        <Link to={`/${groupId}/groups/`}>
            <Box className={classes.groupCardContainer} display='flex'>
                <Box>
                    <Avatar className={classes.avatar}>
                        {`${groupName.charAt(0).toUpperCase()}${groupName.charAt(1)}`}
                    </Avatar>
                </Box>
                <Box className={classes.contentGroupBoxContainer}>
                    <Box className={classes.groupCard}>
                        <Typography variant='h6' className={classes.groupName}>
                            {groupName}
                        </Typography>
                    </Box>
                    {activity.length > 0 && (
                        <Box className={classes.lastActivityContainer}>
                            <Typography
                                className={classes.lastActivity}
                                component='p'
                                variant='subtitle2'>
                                {activity[0].value}
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Box>
        </Link>
    );
};
