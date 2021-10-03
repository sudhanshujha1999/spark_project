import { Switch, Route } from "react-router-dom";
import { OnboardingRoute, PrivateRoute } from "./routing";
import { Box, Grid, NavBar, SideNav } from "./ui";
import * as routeDefinitions from "./routeDefinitions";
import { useCurrentUserInfo } from "./users";
import { makeStyles } from "@material-ui/styles";
// import background from "./img/bg-2.svg";
// import background from "./img/bg1.png";
import { CopyrightFooter } from "./ui/CopyrightFooter";
import { useRef } from "react";

const routes = Object.values(routeDefinitions);

export const Routes = () => {
    const classes = useStyles();
    const footerRef = useRef(null);
    const { userInfo } = useCurrentUserInfo();
    return (
        <Switch>
            {routes.map((route, i) => {
                const RouteType = route.isPublic
                    ? Route
                    : route.isOnboarding
                    ? OnboardingRoute
                    : PrivateRoute;

                return (
                    <RouteType key={i} path={route.path} exact>
                        <NavBar />
                        {(!route.hideNav || (userInfo && userInfo.isOnboarded)) && <SideNav />}
                        <Box className={classes.background} />
                        <Grid className={classes.mainContainer}>
                            <Box
                                ml={route.hideNav ? 0 : "64px"}
                                // mt={'64px'}
                                p={route.hideNav ? 0 : 4}
                                style={{
                                    minHeight: `calc(100vh - ${
                                        128 + footerRef?.current?.clientHeight || 0
                                    }px)`,
                                }}>
                                <route.component />
                            </Box>
                            <CopyrightFooter footerRef={footerRef} />
                        </Grid>
                    </RouteType>
                );
            })}
        </Switch>
    );
};

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        position: "relative",
    },
    background: {
        width: "110vw",
        height: "110vh",
        position: "fixed",
        zIndex: "-100000",
        top: 0,
        opacity: "0.9",
        background: "radial-gradient(rgb(40 40 40) 0%, rgba(20,20,20,1) 100%)",
        // background: "linear-gradient(270deg, rgba(0,0,0,1) 0%, rgba(20,20,20,1) 100%)",
        // backgroundColor: "#222",
        // backgroundImage: `url(${background})`,
        // backgroundSize: "cover",
        // filter: "blur(2.5px)",
        // backgroundBlendMode: "darken",
    },
}));
