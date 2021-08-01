import { Avatar, Box, MenuItem, Tooltip, TextField, Typography, CustomSnackbar } from "../ui";
import { useStyles } from "./styles";
import { CircularProgress, IconButton, Zoom } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { EditIcon, CheckIcon, ClearIcon } from "../icons";
import { post } from "../network";

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
    isCoach,
    hasCaptian,
    playerRole,
    show = true,
}) => {
    const history = useHistory();
    const [showEdit, setShowEdit] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState(false);
    const [playerPermission, setPlayerPermission] = useState(playerRole ? playerRole : "PLAYER");

    const handleClick = () => {
        if (clickable) {
            history.push(`/teams/${teamId}/rosters/${rosterId}/members/${playerId}`);
        }
    };
    const classes = useStyles();

    const handleClose = () => {
        setPlayerPermission(playerRole);
        setShowEdit(false);
    };

    const onClickPermission = async () => {
        if (!showEdit) {
        } else {
            // make a check if captian already exist
            if (playerPermission === playerRole) {
                console.log("same");
            } else {
                if (hasCaptian) {
                    console.log("return");
                    handleClose();
                    setError("There can be only one captian");
                    return;
                }
                setUpdating(true);
                console.log("run change");
                try {
                    const { data } = await post("/api/permissions/captian", {
                        userId: playerId,
                        groupId: teamId,
                        permission: playerPermission,
                    });
                    if (data.success) {
                        console.log("update Orgs");
                    }
                } catch (error) {
                    setPlayerPermission(playerRole);
                    console.log(error.message);
                }
                setUpdating(false);
            }
        }
        setShowEdit((prevState) => !prevState);
    };

    const handleChange = (e) => {
        setPlayerPermission(e.target.value);
    };

    return (
        <>
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
                            <Typography
                                className={`${classes.currentPermission} ${
                                    showEdit ? classes.exitUp : classes.entryUp
                                }`}>
                                {playerPermission
                                    ? `${playerPermission.charAt(0)}${playerPermission
                                          .toLowerCase()
                                          .substr(1, playerPermission.length)}`
                                    : "Player"}
                            </Typography>
                            <Box
                                className={`${classes.newPermission} ${
                                    showEdit ? classes.entryDown : classes.exitDown
                                }`}>
                                <TextField
                                    fullWidth
                                    select
                                    size='small'
                                    color='secondary'
                                    label='Permissions'
                                    value={playerPermission}
                                    onChange={handleChange}
                                    variant='outlined'>
                                    {OPTIONS.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Box>
                        </Box>
                        {isCoach && (
                            <Box ml={1} display='flex'>
                                <Box ml={1}>
                                    <Tooltip title='Edit Permission'>
                                        <IconButton
                                            disabled={updating}
                                            onClick={onClickPermission}
                                            color='secondary'>
                                            {showEdit ? (
                                                updating ? (
                                                    <CircularProgress size='1em' />
                                                ) : (
                                                    <CheckIcon />
                                                )
                                            ) : (
                                                <EditIcon />
                                            )}
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                                {showEdit && (
                                    <Box ml={1}>
                                        <IconButton onClick={handleClose} color='secondary'>
                                            <ClearIcon />
                                        </IconButton>
                                    </Box>
                                )}
                            </Box>
                        )}
                    </Box>
                </Box>
            </Zoom>
            <CustomSnackbar message={error} setMessage={setError} type='error' />
        </>
    );
};

const OPTIONS = [
    {
        value: "PLAYER",
        label: "Player",
    },
    {
        value: "CAPTIAN",
        label: "Captian",
    },
];
