import { Box, Button, CustomSnackbar, Typography } from "../ui";
import { useStyles } from "./styles";
import { post } from "../network";
import { useSetRecoilState } from "recoil";
import { useState } from "react";
import { invitationAcceptedSelector, invitationDeclinedSelector } from "../community/recoil";

export const SelectedScrimmage = ({ scrimmage, isCoach }) => {
    const classes = useStyles();
    const [message, setMessgae] = useState("");
    const acceptRequest = useSetRecoilState(invitationAcceptedSelector);
    const declineRequest = useSetRecoilState(invitationDeclinedSelector);

    const handleDecline = async (request) => {
        if (isCoach) {
            try {
                await post(`/api/scrimmage/${request._id}/decline/`);
                declineRequest({ requestId: request._id, scrimmageId: scrimmage._id });
            } catch (error) {
                console.error(error);
            }
        } else {
            setMessgae(`Your dont have the required permission to take action on this post`);
        }
    };

    const handleAccept = async (request) => {
        if (isCoach) {
            try {
                await post(`/api/scrimmage/${request._id}/accept/`);
                acceptRequest({ requestId: request._id, scrimmageId: scrimmage._id });
            } catch (error) {
                console.error(error);
            }
        } else {
            setMessgae(`Your dont have the required permission to take action on this post`);
        }
    };

    return (
        <Box ml={3}>
            <Box my={2} display='flex' alignItems='center' justifyContent='space-between'>
                <Typography className={classes.headingSmall}>{scrimmage.game}</Typography>
            </Box>
            <Box my={1}>
                <Typography> Open from: {new Date(scrimmage.date).toLocaleDateString()}</Typography>
            </Box>
            <Box my={1}>
                <Typography> Requests :</Typography>
            </Box>
            <Box ml={1}>
                {scrimmage.requests?.length ? (
                    <Box className={classes.requestBox}>
                        {scrimmage.requests.map((request) => (
                            <>
                                <Box display='flex' flexDirection='column'>
                                    <Typography variant='h6'>
                                        {request.organization_name}
                                    </Typography>
                                    <Typography component='p' gutterBottom variant='subtitle1'>
                                        Coach: {request.coach_name}
                                    </Typography>
                                    <Typography
                                        style={{
                                            width: "fit-content",
                                            padding: "5px 10px",
                                            borderBottom: "1px solid rgb(213 105 255 / 60%)",
                                        }}
                                        component='p'
                                        variant='subtitle1'>
                                        Contact: {request.coach_contact}
                                    </Typography>
                                </Box>
                                <Box display='flex' flexDirection='column'>
                                    <Box my={1}>
                                        <Button
                                            disabled={request.accepted}
                                            onClick={() => handleAccept(request)}
                                            variant='contained'
                                            color='primary'>
                                            Accept
                                        </Button>
                                    </Box>
                                    <Box my={1}>
                                        <Button
                                            disabled={request.declined}
                                            onClick={() => handleDecline(request)}
                                            className={classes.deleteBtn}
                                            variant='contained'>
                                            Decline
                                        </Button>
                                    </Box>
                                </Box>
                            </>
                        ))}
                    </Box>
                ) : (
                    <Typography variant='subtitle2'>No requests till now..</Typography>
                )}
            </Box>
            <CustomSnackbar message={message} setMessage={setMessgae} type='info' />
        </Box>
    );
};
