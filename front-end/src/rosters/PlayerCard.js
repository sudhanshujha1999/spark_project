import { Avatar, Box, Tooltip, Typography } from "../ui";
import { useStyles } from "./styles";
import { IconButton, Zoom } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { EditIcon, CheckIcon } from "../icons";

export const PlayerCard = ({
    index = 1,
    teamId,
    clickable,
    rosterId,
    playerId,
    bio,
    email,
    playerName,
    gamerName,
    show = true,
}) => {
    const history = useHistory();
    const [showEdit, setShowEdit] = useState(false);
    const handleClick = () => {
        if (clickable) {
            history.push(`/teams/${teamId}/rosters/${rosterId}/members/${playerId}`);
        }
    };
    const classes = useStyles();

    const onClickPermission = () => {
        setShowEdit((prevState) => !prevState);
    };

    return (
        <Zoom
            in={show}
            style={{
                transitionDelay: show ? `${(index + 2) * 50}ms` : "0ms",
            }}>
            <Box className={classes.playerCardConatiner}>
                <Box className={classes.playerCard} onClick={handleClick}>
                    <Box className={classes.gradient}>
                        <Avatar className={classes.avatar} variant='square'>
                            {`${playerName.charAt(0).toUpperCase()}${playerName.charAt(1)}`}
                        </Avatar>
                    </Box>
                    <Box className={classes.playerDetails}>
                        <Typography variant='h6'>{playerName}</Typography>
                        <Typography className={classes.subHeading} variant='subtitle2'>
                            {email}
                        </Typography>
                    </Box>
                </Box>
                <Box className={classes.playerExtraInfo}>
                    <Typography variant='h6' textColor='secondary'>
                        {gamerName}
                    </Typography>
                </Box>
                <Box className={classes.permission}>
                    <Box className={classes.permissionContainer}>
                        <Tooltip title='Edit'>
                            <Typography
                                className={`${classes.currentPermission} ${
                                    showEdit ? classes.exitUp : classes.entryUp
                                }`}>
                                Player
                            </Typography>
                        </Tooltip>
                        <Typography
                            className={`${classes.newPermission} ${
                                showEdit ? classes.entryDown : classes.exitDown
                            }`}>
                            new Permission box
                        </Typography>
                    </Box>
                    <Box ml={2}>
                        <IconButton onClick={onClickPermission} color='secondary'>
                            {showEdit ? <CheckIcon
                             /> : <EditIcon />}
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        </Zoom>
    );
};
