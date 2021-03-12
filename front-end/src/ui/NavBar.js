import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useCurrentUser, SignOutButton } from "../auth";

export const NavBar = () => {
    const classes = useStyles();
    const { isLoading, user: currentUser } = useCurrentUser();

    return (
        <AppBar
            backgroundColor='#304964'
            swid='nav-bar'
            position='fixed'
            className={classes.appBar}
            p={2}>
            <Toolbar>
                <Box style={{ flex: 10 }}></Box>
                <Box>
                    {!isLoading && currentUser ? (
                        <Box
                            style={{
                                display: "flex",
                                flexFlow: "row",
                                alignItems: "center",
                            }}>
                            <p>Logged in as {currentUser.email}</p>
                            <Box ml={2}>
                                <SignOutButton variant='outlined' />
                            </Box>
                        </Box>
                    ) : (
                        <Link to='/sign-in'>
                            <Button variant='outlined'>Sign In</Button>
                        </Link>
                    )}{" "}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        zIndex: 500,
        opacity: 0.4,
        transition: "all 0.2s ease-out",
        backgroundColor: "rgba(34,40,49,0.5)",
        "&:hover": {
            opacity: 1,
            backgroundColor: "rgba(34,40,49,1)",
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));
