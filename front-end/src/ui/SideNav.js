import { Link, useHistory } from "react-router-dom";
import {
    Box,
    Drawer,
    Divider,
    ListSubheader,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@material-ui/core";
import WhatshotIcon from "@material-ui/icons/Whatshot";
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
                link: "/dashboard",
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
    const history = useHistory();
    console.log(history);

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Drawer
            className={open ? classes.drawer : classes.drawerClose}
            variant="permanent"
            open={true}
            onClose={handleClose}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            classes={{
                paper: open ? classes.drawerPaper : classes.drawerPaperClose,
            }}>
            <div className={classes.drawerContainer}>
                <Link to="/">
                    <Box className={classes.logo}>
                        <WhatshotIcon fontSize="large" color="primary" />
                        <Typography className={classes.logoName}>Spark Esports</Typography>
                    </Box>
                </Link>
                <List>
                    <Divider />
                    <Box my={2} />
                    {navSections.map((section) => (
                        <>
                            <ListSubheader className={!open ? classes.close : ""}>
                                {section.name}
                            </ListSubheader>
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
                                        <ListItem
                                            button
                                            key={item.name}
                                            className={
                                                history.location.pathname === item.link
                                                    ? classes.active
                                                    : ""
                                            }>
                                            <ListItemIcon>
                                                {item.icon && (
                                                    <item.icon
                                                        color={
                                                            history.location.pathname === item.link
                                                                ? "secondary"
                                                                : ""
                                                        }
                                                    />
                                                )}
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
                    <Box mt={2} className={!open ? classes.close : ""}>
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
    logoName: {
        marginLeft: "22px",
        fontSize: "1.6em",
        fontWeight: 700,
        color: theme.palette.primary.main,
    },
    logo: {
        cursor: "pointer",
        margin: "16px 0 4px 12px",
        width: drawerWidth,
        display: "flex",
        flexFlow: "row nowrap",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    link: {
        width: drawerWidth,
        display: "flex",
        flexFlow: "row nowrap",
        justifyContent: "center",
        alignItems: "center",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        zIndex: "1000",
    },
    active: {
        backgroundColor: theme.palette.background.default,
        borderRadius: "30px 0 0 30px",
    },
    close: {
        opacity: 0,
    },
    drawerClose: {
        zIndex: "1000",
        overflowX: "hidden",
    },
    drawerPaper: {
        width: drawerWidth,
        transition: "all 0.2s ease-in",
        overflowX: "hidden",
        borderRight: "none",
    },
    drawerPaperClose: {
        borderRight: "none",
        width: drawerWidth - 170,
        overflowX: "hidden !important",
        transition: "all 0.2s ease-in",
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    drawerContainer: {
        display: "flex",
        flexFlow: "column",
        alignItems: "flex-start",
    },
}));
