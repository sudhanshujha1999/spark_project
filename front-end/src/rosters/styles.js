import { makeStyles } from "@material-ui/styles";
import addRosterContainerBackground from "../img/tornadoBg.svg";
import purple from "@material-ui/core/colors/purple";
import teamPic from "../img/teamPic.jpg";

const bezierValue = "cubic-bezier(.41,-0.31,.64,1.43)";
const duration = "0.35s";
const cardHeight = 65;

export const useStyles = makeStyles((theme) => ({
    // orgName: {
    //     position: "relative",
    //     "&:before": {
    //         position: "absolute",
    //         content: '""',
    //         width: "47%",
    //         height: "90%",
    //         top: "-10%",
    //         left: "-30%",
    //         backgroundColor: theme.palette.secondary.main,
    //     },
    // },
    teamBanner: {
        height: "600px",
        marginTop: "-95px",
        marginLeft: "-32px",
        width: "95vw",
        marginBottom: "50px",
        backgroundSize: "cover",
        position: "absolute",
        zIndex: "-1000",
        "&::before": {
            position: "absolute",
            content: '""',
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            zIndex: "-998",
            background: "linear-gradient(0deg, rgb(28 30 35) 30%, rgba(255,255,255,0) 100%)",
        },
        [theme.breakpoints.down("sm")]: {
            width: "120%",
            backgroundPosition: "top",
            height: "400px",
        },
    },
    rosterName: {
        display: "flex",
        flexFlow: "row",
        alignItems: "center",
    },
    rosterNameItems: {
        marginRight: "10px",
    },
    fabDelete: {
        position: "absolute",
        left: "10px",
        bottom: "10px",
        color: "#eaeaea",
        backgroundImage: "linear-gradient(to right, #eb3941, #f15e64, #e14e53, #e2373f)",
        backgroundSize: "300% 300%",
        transition: "all 0.5s ease-out",
        "&:hover": {
            backgroundPosition: "right center",
        },
    },
    rosterEdit: {
        marginRight: 20,
    },
    rosterCancel: {
        backgroundImage: "linear-gradient(to right, #eb3941, #f15e64, #e14e53, #e2373f)",
        backgroundSize: "300% 300%",
        color: "#fafafa",
        transition: "all 0.5s ease-out",
        "&:hover": {
            backgroundPosition: "right center",
        },
    },
    accordianConatiner: {
        backgroundColor: "rgba(0,0,0,0)",
        boxShadow: "0px 0px 15px 2px rgb(255 255 255 / 10%)",
    },
    accordianDetails: {
        flexFlow: "column",
    },
    accordianSummary: {
        margin: 0,
    },
    addRosterContainer: {
        width: "min(600px, 90vw)",
        height: "50vh",
        display: "flex",
        padding: "0 20px",
        flexFlow: "column",
        backgroundImage: `url(${addRosterContainerBackground})`,
        // backgroundColor: "#7b7b7b",
        backgroundSize: "cover",
        backgroundPosition: "bottom",
        backgroundBlendMode: "multiply",
        border: "1px solid rgba(255,255,255,0.1)",
    },
    inputConatiner: {
        boxShadow: "0px 0px 10px 3px rgba(0,0,0,0.3)",
        backgroundColor: "rgba(0,0,0,0.1)",
        backdropFilter: "blur(10px)",
    },
    heading: {
        fontSize: "2.5em",
        fontWeight: 700,
        margin: "50px 0 20px",
    },
    submitBtn: {
        width: "100px",
        margin: "15px 0",
        fontWeight: "600",
        color: "#eaeaea",
        backgroundColor: purple[600],
        "&:hover": {
            backgroundColor: purple[800],
        },
    },
    // PLAYER CARD
    playerCardConatiner: {
        position: "relative",
        display: "flex",
        alignItems: "center",
        backgroundColor: "rgba(48,48,48,0.6)",
        backdropFilter: "blur(30px)",
        boxShadow: "0px 0px 10px 2px rgba(0,0,0,0.4)",
        width: "100%",
        margin: "10px auto",
        transition: "all .2s ease-in",
        "&:hover": {
            "& $playerCard": {
                boxShadow: "0px 5px 15px 2px rgba(255,255,255,0.2)",
            },
        },
    },

    playerCard: {
        display: "flex",
        position: "relative",
        zIndex: "3",
        alignItems: "center",
        height: "100%",
        cursor: "pointer",
    },
    avatar: {
        height: cardHeight,
        width: cardHeight,
        fontSize: "1.5em",
        color: "#fafafa",
        backgroundColor: "#000000",
        backgroundImage: "linear-gradient(315deg, #000000 0%, #2d3436 74%)",
    },
    playerDetails: {
        display: "flex",
        flexFlow: "column",
        paddingLeft: "25px",
        justifyContent: "center",
        width: "300px",
        height: cardHeight,
        backgroundColor: "#5f72be",
        backgroundImage: "linear-gradient(315deg, #5f72be 0%, #9921e8 74%)",
    },
    subHeading: {
        color: "#c5c5c5",
    },
    playerExtraInfo: {
        display: "flex",
        flexFlow: "column",
        padding: "0 25px",
        justifyContent: "center",
        height: cardHeight,
        filter: "drop-shadow(2px 4px 6px rgba(0,0,0,0.5))",
        position: "relative",
        "&:before, &:after": {
            position: "absolute",
            top: "50%",
            width: "5px",
            height: "100%",
            content: "''",
            backgroundColor: "#484848",
            transform: "translateY(-50%) ",
            left: 0,
        },
    },
    permission: {
        margin: "0 25px 0 auto",
        overflow: "hidden",
        height: cardHeight,
        display: "flex",
        alignItems: "center",
    },
    permissionContainer: {
        position: "relative",
    },
    currentPermission: {
        display: "block",
        fontWeight: 900,
        transform: "translateY(-100px)",
        position: "absolute",
    },
    newPermission: {
        transform: "translateY(100px)",
        display: "block",
        fontWeight: 900,
    },
    entryUp: {
        animationDelay: duration,
        animation: `$entryUp ${duration} forwards ${bezierValue}`,
    },
    entryDown: {
        animationDelay: duration,
        animation: `$entryDown ${duration} forwards ${bezierValue}`,
    },
    exitDown: {
        animation: `$exitDown ${duration} forwards ${bezierValue}`,
    },
    exitUp: {
        animation: `$exitUp ${duration} forwards ${bezierValue}`,
    },
    "@keyframes entryUp": {
        "0%": {
            transform: "translateY(-100px)",
        },
        "70%": {
            transform: "translateY(10px)",
        },
        "100%": {
            transform: "translateY(0px)",
        },
    },
    "@keyframes entryDown": {
        "0%": {
            transform: "translateY(100px)",
        },
        "70%": {
            transform: "translateY(-10px)",
        },
        "100%": {
            transform: "translateY(0px)",
        },
    },
    "@keyframes exitUp": {
        "0%": {
            transform: "translateY(0)",
        },
        "30%": {
            transform: "translateY(10px)",
        },
        "100%": {
            transform: "translateY(-100px)",
        },
    },
    "@keyframes exitDown": {
        "0%": {
            transform: "translateY(0)",
        },
        "30%": {
            transform: "translateY(-10px)",
        },
        "100%": {
            transform: "translateY(100px)",
        },
    },
    // gradient: {
    //     width: "100%",
    //     height: "100%",
    //     position: "absolute",
    //     content: '""',
    //     top: "50%",
    //     borderRadius: "5px",
    //     left: "50%",
    //     transform: "translate(-50%,-50%)",
    //     zIndex: "-100",
    //     backgroundImage:
    //         "linear-gradient(460deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82)",
    //     backgroundSize: "300%",
    //     backgroundPosition: "right",
    //     animation: "$animate 20s infinite alternate",
    // },
    // "@keyframes animate": {
    //     "0%": {
    //         backgroundPosition: "right",
    //     },
    //     "25%": {
    //         backgroundPosition: "bottom",
    //     },
    //     "50%": {
    //         backgroundPosition: "left",
    //     },
    //     "100%": {
    //         backgroundPosition: "top",
    //     },
    // },

    teamImage: {
        position: "absolute",
        top: "-30px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "50px",
        height: "50px",
        zIndex: "200",
        borderRadius: "50%",
        backgroundImage: `url(${teamPic})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        boxShadow: "0px 0px 10px 2px rgba(0,0,0,0.2)",
    },

    email: {
        position: "absolute",
        bottom: "10px",
        left: "10px",
        width: "100%",
        color: "#5d5d5d",
    },

    // LOADING
    load: {
        display: "grid",
        placeItems: "center",
        height: "60vh",
    },
}));
