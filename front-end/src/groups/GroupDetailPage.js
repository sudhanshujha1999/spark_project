import { Box, Button, Container, Loading, Typography } from "../ui";
import { useParams } from "react-router-dom";
import { useGroupDetails } from "./useGroupDetails";
import { useStyles } from "./styles";

export const GroupDetailPage = () => {
    const { groupId } = useParams();
    const { groupDetails, isLoading } = useGroupDetails(groupId);
    const classes = useStyles();

    return (
        <Container maxWidth='xl'>
            {isLoading ? (
                <Loading />
            ) : groupDetails._id ? (
                <Box>
                    <Typography className={classes.medHeading}>{groupDetails.name}</Typography>
                    <Button color='secondary' variant='contained'>
                        share
                    </Button>
                </Box>
            ) : (
                <Typography variant='h6'>No Group Found!!!</Typography>
            )}
        </Container>
    );
};
