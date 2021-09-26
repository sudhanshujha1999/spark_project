import { Link, useHistory } from "react-router-dom";
import { Box, Button, Card, Grid, Fab, Typography, IconButton } from "../ui";
import { AddIcon } from "../icons";
import { TeamItemCard } from "./TeamItemCard";
import { useStyles } from "./Styles";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export const TeamsList = ({ school, teams, isCoach, editTeam }) => {
    const classes = useStyles();
    const history = useHistory();

    const addTeam = () => {
        history.push(`/new-team/${school._id}?n1x=${teams.length > 0 ? "" : "xj67bdsne12sxmlse"}`);
    };

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 2, // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2, // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1, // optional, default to 1.
        },
    };

    return school && teams && teams.length > 0 ? (
        <Grid container spacing={2} style={{ display: "flex", flexDirection: "column" }}>
            <Grid item xs={12}>
                <Typography className={classes.headingMedium} variant='h5'>
                    Your teams
                </Typography>
            </Grid>
            <Grid
                container
                style={{
                    width: "95vw",
                    alignSelf: "center",
                    padding: "16px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}>
                {isCoach && (
                    <Box
                        style={{
                            width: "10%",
                            textAlign: "center",
                        }}>
                        <Button variant='contained' onClick={addTeam} color='primary'>
                            <AddIcon fontSize='medium' />
                        </Button>
                    </Box>
                )}
                <Box style={{ width: "90%" }}>
                    <Carousel
                        swipeable={{ desktop: true }}
                        draggable={true}
                        showDots={true}
                        centerMode={true}
                        responsive={responsive}
                        ssr={true} // means to render carousel on server-side.
                        infinite={false}
                        autoPlay={false}
                        autoPlaySpeed={0}
                        keyBoardControl={true}
                        customTransition='all 1s'
                        transitionDuration={500}
                        containerClass='carousel-container'
                        removeArrowOnDeviceType={["mobile", "tablet"]}
                        deviceType={"desktop"}
                        dotListClass='custom-dot-list-style'
                        itemClass='carousel-item-padding-20-px'>
                        {teams.map((team, index) => {
                            return (
                                <TeamItemCard
                                    key={index}
                                    team={team}
                                    editTeam={editTeam}
                                    isCoach={isCoach}
                                    index={index + 1}
                                />
                            );
                        })}
                    </Carousel>
                </Box>
            </Grid>
            {/* {isCoach && (
        <Link
          to={`/new-team/${school._id}?n1x=${
            teams.length > 0 ? '' : 'xj67bdsne12sxmlse'
          }`}
        >
          <Fab variant='extended' color='primary' className={classes.fab}>
            <AddIcon />
            Add Team
          </Fab>
        </Link>
      )} */}
        </Grid>
    ) : (
        <>
            <Grid container>
                {isCoach && (
                    <Grid item xs={3}>
                        {school && (
                            // {`/new-team/${school._id}`}
                            <Card raised className={classes.cardStyles}>
                                <p>
                                    Looks like you haven't {!isCoach && "been"} added{" "}
                                    {!isCoach && "to"} any teams yet.
                                </p>
                                <Button
                                    variant='contained'
                                    onClick={addTeam}
                                    className={classes.addTeamBtn}>
                                    <AddIcon />
                                </Button>
                            </Card>
                        )}
                    </Grid>
                )}
            </Grid>
        </>
    );
};
