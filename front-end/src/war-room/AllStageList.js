import { Button, Divider, Grid, TextField, Typography, CustomSnackbar, Box } from "../ui";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import {
    pathsState,
    nameState,
    pathState,
    addNewPathToState,
    newStageState,
    editStageState,
    deleteStageStage,
    stageDescriptionState,
    setDownload,
} from "./recoilState";
import { useStyles } from "./styles";
import { useState } from "react";

export const AllStageList = ({ isCoach, setHasChanged }) => {
    const allStages = useRecoilValue(pathsState);
    const setDownloadTrue = useSetRecoilState(setDownload);
    const classes = useStyles();
    const [path, setPath] = useRecoilState(pathState);
    const [stageName, setStageName] = useRecoilState(nameState);
    const [newStage, setNewStage] = useRecoilState(newStageState);
    const [description, setDescription] = useRecoilState(stageDescriptionState);
    const addPath = useSetRecoilState(addNewPathToState);
    const editPath = useSetRecoilState(editStageState);
    const deleteStage = useSetRecoilState(deleteStageStage);
    const [active, setActive] = useState(null);
    const [message, setMessage] = useState("");

    const handleClick = () => {
        if (stageName !== "") {
            addPath();
            setHasChanged(true);
            setNewStage(true);
        } else {
            setMessage("Please Enter a Name");
        }
    };

    const setStage = (stage, index) => {
        setMessage("");
        if (active === null || !isCoach) {
            setPath(stage.path);
            setStageName(stage.name);
            setDescription(stage.description);
            setActive(index);
            setNewStage(true);
        } else {
            setMessage("Please save first");
        }
    };

    const handleSave = () => {
        editPath(active);
        setNewStage(true);
        setActive(null);
    };

    const handleDelete = () => {
        deleteStage(active);
        setNewStage(true);
        setActive(null);
    };

    const handleDownload = () => {
        setDownloadTrue();
    };

    return (
        <Grid container className={classes.stagesContainer}>
            <Grid item xs={12}>
                {allStages.map((item, index) => {
                    if (index === active) {
                        return (
                            <>
                                <TextField
                                    key={index}
                                    label='Title'
                                    className={classes.listItem}
                                    value={stageName}
                                    fullWidth
                                    disabled={!isCoach}
                                    onChange={(e) => setStageName(e.target.value)}
                                    variant='outlined'
                                />
                                <TextField
                                    label='Notes'
                                    className={classes.listItem}
                                    value={description}
                                    fullWidth
                                    multiline
                                    onChange={(e) => setDescription(e.target.value)}
                                    variant='outlined'
                                    disabled={!isCoach}
                                />
                            </>
                        );
                    } else {
                        return (
                            <Box key={index} className={classes.stageNameContainer}>
                                <Typography className={classes.indexNumber}>{index + 1}</Typography>
                                <Typography
                                    className={`${classes.stageTitle} ${classes.listItem}`}
                                    onClick={() => setStage(item, index)}>
                                    {item.name}
                                </Typography>
                            </Box>
                        );
                    }
                })}
            </Grid>
            {allStages.length > 0 && (
                <Grid item xs={12}>
                    <Divider />
                    <Box my={2} />
                </Grid>
            )}
            {active === null && isCoach && (
                <>
                    <Grid item xs={12}>
                        <TextField
                            label='Title'
                            className={classes.listItem}
                            value={stageName}
                            fullWidth
                            onChange={(e) => setStageName(e.target.value)}
                            variant='outlined'
                        />
                        <TextField
                            label='Notes'
                            className={classes.listItem}
                            value={description}
                            fullWidth
                            multiline
                            onChange={(e) => setDescription(e.target.value)}
                            variant='outlined'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button color='primary' onClick={handleClick} variant='contained'>
                            Add
                        </Button>
                    </Grid>
                </>
            )}
            {active !== null && isCoach && (
                <Grid item xs={12} className={classes.row}>
                    <Box mr={2}>
                        <Button variant='contained' color='primary' onClick={handleSave}>
                            Save
                        </Button>
                    </Box>
                    <Box mr={2}>
                        <Button variant='outlined' color='primary' onClick={handleDownload}>
                            Download
                        </Button>
                    </Box>
                    <Box mr={2}>
                        <Button
                            className={classes.deleteBtn}
                            variant='contained'
                            color='primary'
                            onClick={handleDelete}>
                            Delete
                        </Button>
                    </Box>
                </Grid>
            )}
            <CustomSnackbar message={message} setMessage={setMessage} type='error' />
        </Grid>
    );
};
