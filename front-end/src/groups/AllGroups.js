import { Box, Button, Dialog, Grid, Typography } from "../ui";
import { useStyles } from "./styles";
import { useState } from "react";
import { JoinGroup } from "./JoinGroup";
import { GroupItem } from "./GroupItem";

export const AllGroups = ({ groups }) => {
    const classes = useStyles();
    const [openJoin, setOpenJoin] = useState(false);

    const onCloseJoin = () => {
        setOpenJoin(false);
    };

    return (
        <Box>
            <Typography className={classes.medHeading}>GROUPS</Typography>
            <Box my={2}>
                <Grid container>
                    {groups.map((group) => (
                        <Grid item xs={12}>
                            <GroupItem
                                groupId={group._id}
                                groupName={group.name}
                                activity={group.activities}
                            />
                        </Grid>
                    ))}
                    <Grid item xs={12}>
                        <Box mt={2}>
                            <Button
                                onClick={() => {
                                    setOpenJoin(true);
                                }}
                                color='secondary'
                                variant='outlined'>
                                Join a group
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            {openJoin && (
                <Dialog disableScrollLock open={openJoin} onClose={onCloseJoin}>
                    <Box p={3}>
                        <JoinGroup onClose={onCloseJoin} />
                    </Box>
                </Dialog>
            )}
        </Box>
    );
};
