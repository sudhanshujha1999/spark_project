import { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Container, Dialog, Grid, Typography } from "../ui";
import { IntrestedForScrimmage } from "./IntrestedForScrimmage";
import { ScrimmagePost } from "./ScrimmagePost";
import { useOrganizations } from "../teams";
import { del } from "../network";
import { useStyles } from "./styles";
import { ChevronRightIcon } from "../icons";

export const Scrimmages = ({ isLoading, scrimmages, updateScrimmages }) => {
    const [intrestedScrimmage, setIntrestedScrimmage] = useState({});
    const [open, setOpen] = useState(false);
    const { organizations } = useOrganizations();
    const classes = useStyles();
    const onClose = () => {
        setIntrestedScrimmage({});
        setOpen(false);
    };

    const onSuccess = () => {
        updateScrimmages(true);
    };

    const deleteRequest = async (scrimmageId) => {
        await del(`/api/scrimmage/${scrimmageId}/${organizations._id}/interested/`);
        updateScrimmages(true);
    };

    const clickIntrested = async (scrimmage) => {
        if (!scrimmage.intrested) {
            setIntrestedScrimmage(scrimmage);
            setOpen(true);
        } else {
            await deleteRequest(scrimmage._id);
        }
    };

    return (
        <Container maxWidth='xl'>
            <Grid container>
                {isLoading ? (
                    <div>loading</div>
                ) : (
                    <>
                        <Grid item xs={12}>
                            <Link to='/scrimmages'>
                                <Typography className={classes.link}>
                                    View my scrimmage <ChevronRightIcon />
                                </Typography>
                            </Link>
                        </Grid>
                        {scrimmages.length > 0 ? (
                            scrimmages.map((scrimmage) => (
                                <Grid key={scrimmage._id} item xs={12} lg={10} xl={8}>
                                    <ScrimmagePost
                                        scrimmage={scrimmage}
                                        onClickIntrested={clickIntrested}
                                    />
                                </Grid>
                            ))
                        ) : (
                            <Grid item xs={12}>
                                <Box mb={2} />
                                <Typography variant='h5'>No scrimmages found</Typography>
                            </Grid>
                        )}
                    </>
                )}
            </Grid>
            <Dialog open={open} onClose={onClose}>
                <IntrestedForScrimmage
                    scrimmage={intrestedScrimmage}
                    onSuccess={onSuccess}
                    organizationId={organizations._id}
                    onClose={onClose}
                />
            </Dialog>
        </Container>
    );
};
