import { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Container, Dialog, Grid, Typography } from "../ui";
import { CreateScrimmagePage } from "./CreateScrimmagePage";
import { ScrimmagePost } from "./ScrimmagePost";
import { useStyles } from "./styles";
import { ChevronRightIcon } from "../icons";

export const Scrimmages = ({ isLoading, scrimmages, updateScrimmages, isCoach }) => {
    const [openCreateScrimmage, setOpenCreateScrimmage] = useState(false);
    const classes = useStyles();

    const onCloseCreatescrimmage = () => {
        setOpenCreateScrimmage(false);
    };

    const onPostScrimmage = () => {
        setOpenCreateScrimmage(true);
    };

    const onSuccess = () => {
        updateScrimmages(true);
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
                                <Button variant='outlined' color='primary' className={classes.link}>
                                    View my scrimmage <ChevronRightIcon />
                                </Button>
                            </Link>
                        </Grid>
                        {isCoach && (
                            <Grid item xs={12}>
                                <Box className={classes.createPostSection}>
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        onClick={onPostScrimmage}>
                                        Post Scrimmage
                                    </Button>
                                </Box>
                            </Grid>
                        )}
                        {scrimmages.length > 0 ? (
                            scrimmages.map((scrimmage) => (
                                <Grid key={scrimmage._id} item xs={12}>
                                    <ScrimmagePost
                                        isCoach={isCoach}
                                        scrimmage={scrimmage}
                                        updateScrimmages={onSuccess}
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

            <Dialog open={openCreateScrimmage} onClose={onCloseCreatescrimmage}>
                <Box p={2}>
                    <Box my={1}>
                        <Typography variant='h5'>Make your scrimmage</Typography>
                    </Box>
                    <CreateScrimmagePage whenComplete={onCloseCreatescrimmage} />
                </Box>
            </Dialog>
        </Container>
    );
};
