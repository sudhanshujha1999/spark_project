import {
    Box,
    Button,
    Container,
    CustomSnackbar,
    IconButton,
    Loading,
    Tooltip,
    Typography,
} from "../ui";
import { useParams } from "react-router-dom";
import { useGroupDetails } from "./useGroupDetails";
import { useStyles } from "./styles";
import { FileCopyIcon } from "../icons";
import { useState } from "react";

export const GroupDetailPage = () => {
    const { groupId } = useParams();
    const { groupDetails, isLoading } = useGroupDetails(groupId);
    const [info, setInfo] = useState("");
    const classes = useStyles();

    const copyGroupCode = () => {
        console.log(groupDetails);
        navigator.clipboard.writeText(groupDetails.group_code);
        setInfo("Group code copied");
    };

    return (
        <Container maxWidth='xl'>
            {isLoading ? (
                <Loading />
            ) : groupDetails._id ? (
                <Box>
                    <Typography className={classes.medHeading} gutterBottom>
                        {groupDetails.name}
                    </Typography>
                    <Box mb={5} display='flex' alignItems='center'>
                        <Tooltip title='Group code'>
                            <Box className={classes.groupCode} onClick={copyGroupCode}>
                                <Typography variant='h6'>{groupDetails.group_code}</Typography>
                            </Box>
                        </Tooltip>
                        <Box ml={1}>
                            <IconButton color='secondary' onClick={copyGroupCode}>
                                <FileCopyIcon />
                            </IconButton>
                        </Box>
                    </Box>
                    <Button color='secondary' variant='contained'>
                        share
                    </Button>
                </Box>
            ) : (
                <Typography variant='h6'>No Group Found!!!</Typography>
            )}
            <CustomSnackbar type='info' message={info} setMessage={setInfo} />
        </Container>
    );
};
