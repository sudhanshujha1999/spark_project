import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import { makeStyles } from '@material-ui/core/styles';
import { signOut } from '../auth';

export const NavBar = () => {
    const classes = useStyles();

    return (
        <AppBar color="inherit" swid="nav-bar" position="fixed" className={classes.appBar} p={2}>
            <Toolbar>
                <Box style={{ flex: 10 }}>
                    <Box pr={2} style={{ display: 'inline-block' }}>
                        <HomeIcon />
                    </Box>
                    <Box pr={2} style={{ display: 'inline-block' }}>
                        <h1 style={{ margin: 0 }}>Spark eSports</h1>
                    </Box>
                </Box>
                <Button onClick={signOut}>Sign Out</Button>
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
  