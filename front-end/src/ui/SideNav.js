import { Link } from "react-router-dom";
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
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { SignOutButton } from "../auth";
import {
    AssignmentIcon,
    CalendarTodayIcon,
    DashboardIcon,
    ReorderIcon,
    SupervisedUserCircleIcon,
    TrendingUpIcon,
} from "../icons";
import { useState } from "react";

const navSections = [
    {
        items: [
            {
                name: "Dashboard",
                icon: DashboardIcon,
                link: "/",
            },
            {
                name: "Scheduling",
                icon: CalendarTodayIcon,
                releaseDate: "Jan 2021",
                link: "/scheduling",
            },
            {
                name: "Goal Setting & Stats",
                icon: TrendingUpIcon,
                releaseDate: "Feb 2021",
                link: "/goals",
            },
            {
                name: "Strategy",
                icon: AssignmentIcon,
                releaseDate: "Mar 2021",
                // link: '/stats',
            },
            {
                name: "Community",
                icon: SupervisedUserCircleIcon,
                releaseDate: "Mar 2021",
                // link: '/community',
            },
        ],
    },
    {
        name: "Account",
        items: [
            //     {
            //     name: 'Profile',
            //     icon: AccountCircleIcon,
            // }, {
            //     name: 'Settings',
            //     icon: SettingsIcon,
            // },
            {
                name: "Terms & Privacy",
                icon: ReorderIcon,
                link: "/terms-and-privacy",
                newTab: true,
            },
        ],
    },
];

export const SideNav = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            open={true}
            onClose={handleClose}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            classes={{
                paper: open ? classes.drawerPaper : classes.drawerClose,
            }}>
            <Toolbar />
            <div className={classes.drawerContainer}>
                <List>
                    {navSections.map((section) => (
                        <>
                            <ListSubheader>{section.name}</ListSubheader>
                            {section.items.map((item, index) =>
                                item.newTab ? (
                                    <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        style={{ color: "inherit", textDecoration: "none" }}>
                                        <ListItem button key={item.name}>
                                            <ListItemIcon>
                                                {item.icon && <item.icon />}
                                            </ListItemIcon>
                                            <ListItemText
                                                className={open ? classes.open : classes.close}
                                                primary={item.name}
                                                secondary={
                                                    item.releaseDate && "Coming " + item.releaseDate
                                                }
                                            />
                                        </ListItem>
                                    </a>
                                ) : (
                                    <Link
                                        className={classes.link}
                                        swid={`sidenav-link-${item.name}`}
                                        to={item.link}
                                        style={{ color: "inherit", textDecoration: "none" }}>
                                        <ListItem button key={item.name}>
                                            <ListItemIcon>
                                                {item.icon && <item.icon />}
                                            </ListItemIcon>
                                            <ListItemText
                                                className={open ? classes.open : classes.close}
                                                primary={item.name}
                                                secondary={
                                                    item.releaseDate && "Coming " + item.releaseDate
                                                }
                                            />
                                        </ListItem>
                                    </Link>
                                )
                            )}
                            <Divider />
                        </>
                    ))}
                    <Box mt={2}>
                        <SignOutButton fullWidth size="large" />
                    </Box>
                </List>
            </div>
        </Drawer>
    );
};

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    link: {
        height: "70px",
        display: "flex",
        flexFlow: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    close: {
        opacity: 0,
        transition: "all 0.2s ease-in",
    },
    drawerPaper: {
        overflowX: "hidden",
        width: drawerWidth,
        transition: "all 0.2s ease-in",
    },
    drawerClose: {
        overflowX: "hidden",
        width: drawerWidth - 140,
        transition: "all 0.2s ease-in",
    },
    drawerContainer: {
        overflow: "auto",
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));
