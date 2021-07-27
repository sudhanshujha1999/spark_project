import { Avatar, Box, Button, Typography } from "../ui";
import { useStyles } from "./styles";
import { useMemo } from "react";
import { defaultLogo, GAMES } from "../teams/defaultGames";

export const ScrimmageItem = ({
    scrimmage,
    setSelectedScrimmage = () => {},
    deselect = () => {},
}) => {
    const classes = useStyles();

    const handleDelete = () => {
        console.log(scrimmage);
        deselect();
    };

    const handleView = () => {
        setSelectedScrimmage(scrimmage);
    };

    const gameImage = useMemo(() => {
        const game = GAMES.filter(
            (game) => game.name.toLowerCase() === scrimmage.game.toLowerCase()
        )[0];
        if (game) {
            if (game.logo) {
                return game.logo;
            } else {
                return defaultLogo;
            }
        } else {
            return defaultLogo;
        }
    }, [scrimmage]);

    return (
        <Box className={classes.scrimmagePost}>
            <Box className={classes.gameImageContainer} mr={2}>
                <img className={classes.image} src={gameImage} alt='game' />
            </Box>
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
                </Box>
                <Typography variant='caption'>Skill - {scrimmage.skill_level}/10</Typography>
                {/* make it later */}
                {/* <Box display='flex'>
                <Box mx={1}>
                    
                </Box>
            </Box> */}
            </Box>
            <Box>
                <Button color='secondary' variant='contained' onClick={handleView}>
                    view
                </Button>
            </Box>
            <Box mx={1}>
                <Button className={classes.deleteBtn} onClick={handleDelete}>
                    close
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
