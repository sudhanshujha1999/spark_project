import { useStyles } from "./styles";
import { Box, Button, Container, Dialog, Loading, Typography } from "../ui";
import { useState } from "react";
import { CreateGroup } from "./CreateGroup";
import { JoinGroup } from "./JoinGroup";
import { AllGroups } from "./AllGroups";
import { useGroups } from "./useGroups";

export const GroupsPage = () => {
    const classes = useStyles();
    const { groups, isLoading } = useGroups();
    const [openCreate, setOpenCreate] = useState(false);
    const [openJoin, setOpenJoin] = useState(false);

    const onCloseCreate = () => {
        setOpenCreate(false);
    };

    const onCloseJoin = () => {
        setOpenJoin(false);
    };

    return (
        <Container maxWidth='lg'>
            {isLoading || !groups ? (
                <Loading />
            ) : groups.length > 0 ? (
                <AllGroups groups={groups} />
            ) : (
                <Box className={classes.heading}>
                    <Typography className={classes.bigHeading}>GROUPS</Typography>
                    <Typography className={classes.subHeading} variant='h6'>
                        A group is a way to interact with other schools! Any head coach create a
                        group and invite up to 25 other schools. Here you'll be able to post updates
                        on a bulletin, share stream schedules, create group tournaments and much
                        more! To join a group you need to have access to the special group code
                        associated with that group that the admin of that group can send you.
                    </Typography>
                    <Box mt={5}>
                        <Button
                            onClick={() => {
                                setOpenCreate(true);
                            }}
                            className={classes.buttons}
                            color='secondary'
                            variant='contained'>
                            Create a group
                        </Button>
                    </Box>
                    <Box mt={2}>
                        <Button
                            onClick={() => {
                                setOpenJoin(true);
                            }}
                            className={classes.buttons}
                            color='secondary'
                            variant='outlined'>
                            Join a group
                        </Button>
                    </Box>
                    <Box className={classes.headingPicture} />
                </Box>
            )}
            {openCreate && (
                <Dialog disableScrollLock open={openCreate} onClose={onCloseCreate}>
                    <Box p={3}>
                        <CreateGroup onClose={onCloseCreate} />
                    </Box>
                </Dialog>
            )}
            {openJoin && (
                <Dialog disableScrollLock open={openJoin} onClose={onCloseJoin}>
                    <Box p={3}>
                        <JoinGroup onClose={onCloseJoin} />
                    </Box>
                </Dialog>
            )}
        </Container>
    );
};
