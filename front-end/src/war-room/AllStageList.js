import { Button, Grid, TextField, Typography, CustomSnackbar } from "../ui";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import {
    pathsState,
    nameState,
    pathState,
    addNewPathToState,
    newStageState,
    editStageState,
    stageDescriptionState,
} from "./recoilState";
import { useStyles } from "./styles";
import { useState } from "react";

export const AllStageList = () => {
    const allStages = useRecoilValue(pathsState);
    const classes = useStyles();
    const [path, setPath] = useRecoilState(pathState);
    const [stageName, setStageName] = useRecoilState(nameState);
    const [newStage, setNewStage] = useRecoilState(newStageState);
    const [description, setDescription] = useRecoilState(stageDescriptionState);
    const addPath = useSetRecoilState(addNewPathToState);
    const editPath = useSetRecoilState(editStageState);
    const [active, setActive] = useState(null);
    const [message, setMessage] = useState("");

    const handleClick = () => {
        addPath();
        setNewStage(true);
    };

    const setStage = (stage, index) => {
        if (active === null) {
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
                            </>
                        );
                    } else {
                        return (
                            <Typography
                                key={index}
                                onClick={() => setStage(item, index)}
                                className={`${classes.stageTitle} ${classes.listItem}`}>
                                {item.name}
                            </Typography>
                        );
                    }
                })}
            </Grid>
            {active === null && (
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
            {active !== null && (
                <Grid item xs={12}>
                    <Button variant='contained' color='primary' onClick={handleSave}>
                        Save
                    </Button>
                </Grid>
            )}
            <CustomSnackbar message={message} setMessage={setMessage} type='error' />
        </Grid>
    );
};
