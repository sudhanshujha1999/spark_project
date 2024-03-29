import { Link, useHistory } from "react-router-dom";
import {
    Box,
    Drawer,
    Divider,
    Icon,
    ListSubheader,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@material-ui/core";
import SparkLogo from "../img/logo.svg";
import { makeStyles } from "@material-ui/styles";
import { SignOutButton } from "../auth";
import {
    AccountCircleIcon,
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
                link: "/scheduling",
            },
            {
                name: "Goal Setting",
                icon: TrendingUpIcon,
                link: "/goals",
            },
            {
                name: "War Room",
                icon: AssignmentIcon,
                link: "/war-room",
            },
            {
                name: "Community",
                icon: SupervisedUserCircleIcon,
                link: "/community",
            },
        ],
    },
    {
        name: "Account",
        items: [
            {
                name: "My Profile",
                icon: AccountCircleIcon,
                link: "/profile",
                newTab: false,
            },
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

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Drawer
            className={open ? classes.drawer : classes.drawerClose}
            variant='permanent'
            open={true}
            onClose={handleClose}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            classes={{
                paper: open ? classes.drawerPaper : classes.drawerPaperClose,
            }}>
            <div className={classes.drawerContainer}>
                <Link to='/'>
                    <Box className={classes.logo}>
                        <Icon fontSize='large'>
                            <img
                                style={{
                                    width: "100%",
                                    height: "100%",
                                }}
                                alt='Spark Logo'
                                src={SparkLogo}
                            />
                        </Icon>
                        {/* <WhatshotIcon fontSize='large' color='primary' /> */}
                        <Typography className={open ? classes.logoName : classes.close}>
                            SPARK ESPORTS
                        </Typography>
                    </Box>
                </Link>
                <List>
                    <Divider />
                    <Box my={2} />
                    {navSections.map((section) => (
                        <>
                            <ListSubheader
                                className={!open ? classes.close : classes.sectionNameOpen}>
                                {section.name}
                            </ListSubheader>
                            {section.items.map((item, index) =>
                                item.newTab ? (
                                    <a
                                        href={item.link}
                                        target='_blank'
                                        rel='noreferrer'
                                        style={{ color: "inherit", textDecoration: "none" }}>
                                        <ListItem button key={item.name}>
                                            <ListItemIcon>
                                                {item.icon && (
                                                    <item.icon
                                                        sx={{
                                                            fill:
                                                                history.location.pathname ===
                                                                item.link
                                                                    ? "url(#activeColor)"
                                                                    : "url(#colorInactive)",
                                                        }}
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
                                                        sx={{
                                                            fill:
                                                                history.location.pathname ===
                                                                item.link
                                                                    ? "url(#activeColor)"
                                                                    : "url(#colorInactive)",
                                                        }}
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
                        <SignOutButton fullWidth size='large' />
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
        marginLeft: "15px",
        letterSpacing: 2,
        fontSize: "1.15em",
        fontWeight: 700,
        fontFamily: "'Josefin Sans'",
        color: "#fafafa",
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
        zIndex: theme.zIndex.drawer + 1,
    },
    active: {
        backgroundColor: theme.palette.background.default,
        borderRadius: "30px 0 0 30px",
    },
    sectionNameOpen: {
        fontSize: "1.2em",
        margin: "5px 0",
        backgroundColor: "transparent",
    },
    close: {
        opacity: 0,
    },
    drawerClose: {
        overflowX: "hidden",
    },
    drawerPaper: {
        zIndex: theme.zIndex.drawer + 1,
        width: drawerWidth,
        transition: "all 0.2s ease-in",
        overflowX: "hidden",
        borderRight: "none",
        backgroundImage: "linear-gradient(183deg, rgba(57,62,70,1) 0%, rgba(26,28,32,1) 100%)",
        // boxShadow:
        //   'rgba(240, 46, 170, 0.4) 5px 5px, rgba(240, 46, 170, 0.3) 10px 10px, rgba(240, 46, 170, 0.2) 15px 15px, rgba(240, 46, 170, 0.1) 20px 20px, rgba(240, 46, 170, 0.05) 25px 25px',
    },
    drawerPaperClose: {
        backgroundImage: "linear-gradient(183deg, rgba(57,62,70,1) 0%, rgba(26,28,32,1) 100%)",
        // boxShadow: "rgba(240, 46, 170, 0.3) 5px 5px, rgba(240, 46, 170, 0.1) 10px 10px",
        borderRight: "none",
        width: drawerWidth - 175,
        overflowX: "hidden !important",
        transition: "all 0.2s ease-in",
        zIndex: theme.zIndex.drawer + 1,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    drawerContainer: {
        display: "flex",
        flexFlow: "column",
        alignItems: "flex-start",
        zIndex: theme.zIndex.drawer + 1,
    },
}));
