import { Avatar, Box, Button, Typography } from "../ui";
import { useStyles } from "./styles";

export const ScrimmagePost = ({ scrimmage, onClickIntrested }) => {
    const classes = useStyles();

    const handleIntrested = () => {
        onClickIntrested(scrimmage);
    };

    return (
        <Box className={classes.scrimmagePost}>
            <Box>
                {scrimmage.organization_logo ? (
                    <Avatar src={scrimmage.organization_logo} alt='organization_logo' />
                ) : (
                    <Avatar className={classes.avatar}>
                        {getOrganizationInitial(scrimmage.organization_name)}
                    </Avatar>
                )}
            </Box>
            <Box mx={3} display='flex' flexDirection='column' flexGrow={1}>
                <Box display='flex' flexDirection='row' alignItems='center'>
                    <Box>
                        <Typography variant='h5'>{scrimmage.organization_name}</Typography>
                    </Box>
                    <Box mx={2}>
                        <Typography variant='body2'>{scrimmage.game}</Typography>
                    </Box>
                </Box>
                <Typography variant='caption'>Skill - {scrimmage.skill_level}/10</Typography>
                {/* make it later */}
                {/* <Box display='flex'>
                        <Box mx={1}>
                            
                        </Box>
                    </Box> */}
            </Box>
            <Box>
                <Button color='primary' variant='contained' onClick={handleIntrested}>
                    {!scrimmage.intrested ? "Interested" : "Cancel"}
                </Button>
            </Box>
        </Box>
    );
};
const getOrganizationInitial = (name) => {
    const splittedName = name.split(" ");
    const initail =
        splittedName.length > 1
            ? `${splittedName[0].charAt(0)}${splittedName[1].charAt(0)}`
            : `${splittedName[0].substr(0, 2)}`;
    return initail;
};
