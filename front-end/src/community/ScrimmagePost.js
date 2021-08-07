import { useMemo, useState } from "react";
import {
    Avatar,
    Box,
    Button,
    CustomSnackbar,
    Dialog,
    Paper,
    SkillsDisplayRow,
    Typography,
} from "../ui";
import { useStyles } from "./styles";
import { del } from "../network";
import { useOrganizations } from "../teams";
import { defaultLogo, GAMES } from "../teams/defaultGames";
import { IntrestedForScrimmage } from "./IntrestedForScrimmage";

export const ScrimmagePost = ({
    scrimmage,
    isCoach,
    updateScrimmages = () => console.log("update-scrimmage"),
}) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [message, setMessgae] = useState("");
    const { organizations } = useOrganizations();

    const onClose = () => {
        setOpen(false);
    };

    const deleteRequest = async (scrimmageId) => {
        await del(`/api/scrimmage/${scrimmageId}/${organizations._id}/interested/`);
        updateScrimmages(true);
    };

    const handleIntrested = async () => {
        if (isCoach) {
            if (!scrimmage.intrested) {
                setOpen(true);
            } else {
                await deleteRequest(scrimmage._id);
            }
        } else {
            setMessgae(`Your dont have the required permission to take action on this post`);
        }
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
        <>
            <Paper elevation={2} className={`${classes.scrimmagePost} ${classes.postBackground}`}>
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
                            {!GAMES.filter(
                                (game) => game.name.toLowerCase() === scrimmage.game.toLowerCase()
                            )[0]?.logo && (
                                <Typography variant='caption'>{`(${scrimmage.game})`}</Typography>
                            )}
                        </Box>
                    </Box>
                    <Box>
                        <SkillsDisplayRow skillLevel={scrimmage.skill_level} />
                    </Box>
                </Box>
                <Box>
                    <Button
                        className={!scrimmage.intrested ? "" : classes.cancelBtn}
                        color='secondary'
                        variant='contained'
                        onClick={handleIntrested}>
                        {!scrimmage.intrested ? "Interested" : "Cancel"}
                    </Button>
                </Box>
            </Paper>
            <CustomSnackbar message={message} setMessage={setMessgae} type='info' />
            <Dialog open={open} onClose={onClose}>
                <IntrestedForScrimmage
                    scrimmage={scrimmage}
                    onSuccess={updateScrimmages}
                    organizationId={organizations._id}
                    onClose={onClose}
                />
            </Dialog>
        </>
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
