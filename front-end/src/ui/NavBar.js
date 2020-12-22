import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import { makeStyles } from '@material-ui/core/styles';
import { useCurrentUser, signOut } from '../auth';

export const NavBar = () => {
    const classes = useStyles();
    const { isLoading, user: currentUser } = useCurrentUser();

    return (
        <AppBar backgroundColor="#304964" swid="nav-bar" position="fixed" className={classes.appBar} p={2}>
            <Toolbar>
                <Box style={{ flex: 10 }}>
                    <Box pr={2} style={{ display: 'inline-block' }}>
                        <WhatshotIcon />
                    </Box>
                    <Box pr={2} style={{ display: 'inline-block' }}>
                        <h1 style={{ margin: 0 }}>Spark Esports</h1>
                    </Box>
                </Box>
                <Box>
                    {!isLoading && <p>Logged in as {currentUser.email}</p>}
                </Box>
            </Toolbar>
        </AppBar>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));
  