import {
    Box,
    Button,
    Card,
    Container,
    CustomSnackbar,
    Grid,
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
        navigator.clipboard.writeText(groupDetails.group_code);
        setInfo("Group code copied");
    };

    return (
        <Container maxWidth='xl'>
            {isLoading ? (
                <Loading />
            ) : groupDetails._id ? (
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Box display='flex'>
                            <Typography className={classes.medHeading}>
                                {groupDetails.name}
                            </Typography>
                            <Box ml={5} mt='auto' display='flex' alignItems='center'>
                                <Tooltip title='Group code'>
                                    <Box className={classes.groupCode} onClick={copyGroupCode}>
                                        <Typography variant='subtitle2'>
                                            {groupDetails.group_code}
                                        </Typography>
                                    </Box>
                                </Tooltip>
                                <Box ml={1}>
                                    <IconButton color='secondary' onClick={copyGroupCode}>
                                        <FileCopyIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={5}>
                        <Card elevation={5} className={classes.membersBox}>
                            <Typography className={classes.smallHeading}>Members</Typography>
                            <Box mt={2}>
                                {groupDetails.memberOrganizations.length > 0 ? (
                                    groupDetails.memberOrganizations.map((member) => (
                                        <Typography variant='subtitle2' gutterBottom>
                                            {member.name}
                                        </Typography>
                                    ))
                                ) : (
                                    <Typography variant='subtitle2'>
                                        No members right now! Invite using your group code.
                                    </Typography>
                                )}
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
            ) : (
                <Typography variant='h6'>No Group Found!!!</Typography>
            )}
            <CustomSnackbar type='info' message={info} setMessage={setInfo} />
        </Container>
    );
};
