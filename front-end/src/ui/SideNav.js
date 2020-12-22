import { Link } from 'react-router-dom';
import {
    Box,
    Drawer,
    Divider,
    ListSubheader,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import { SignOutButton } from '../auth';

const navSections = [{
    items: [{
        name: 'Dashboard',
        icon: DashboardIcon,
        link: '/',
    }, {
        name: 'Scheduling',
        icon: CalendarTodayIcon,
        link: '/scheduling',
    }, {
        name: 'Goal Setting & Stats',
        icon: TrendingUpIcon,
        link: '/goals',
    }, {
        name: 'Strategy',
        icon: AssignmentIcon,
        link: '/stats',
    }, {
        name: 'Community',
        icon: SupervisedUserCircleIcon,
        link: '/community',
    }],
}, {
    name: 'Account',
    items: [{
        name: 'Profile',
        icon: AccountCircleIcon,
    }, {
        name: 'Settings',
        icon: SettingsIcon,
    }],
}];

export const SideNav = () => {
    const classes = useStyles();

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <Toolbar />
            <div className={classes.drawerContainer}>
                <List>
                    {navSections.map(section => (
                        <>
                        <ListSubheader>{section.name}</ListSubheader>
                        {section.items.map((item, index) => (
                            <Link swid={`sidenav-link-${item.name}`} to={item.link} style={{ color: 'inherit', textDecoration: 'none' }}>
                                <ListItem button key={item.name}>
                                    <ListItemIcon>{item.icon && <item.icon />}</ListItemIcon>
                                    <ListItemText
                                        primary={item.name}
                                        secondary={item.releaseDate && "Coming " + item.releaseDate} />
                                </ListItem>
                            </Link>
                        ))}
                        <Divider />
                        </>
                    ))}
                    <Box mt={2}>
                        <SignOutButton fullWidth size="large"/>
                    </Box>
                </List>
            </div>
        </Drawer>
    );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: 'auto',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
}));