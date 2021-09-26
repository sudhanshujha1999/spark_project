import { makeStyles } from "@material-ui/styles";
// import purple from "@material-ui/core/colors/purple";
import blue from "@material-ui/core/colors/blue";
const bezierValue = "cubic-bezier(0.26, 1, 0.43, 0.93)";

export const useStyles = makeStyles((theme) => ({
    trailStatus: {
        opacity: "0.6",
        cursor: "default",
        "&:hover": {
            opacity: "1",
        },
    },
    organizationLogoContainer: {
        aspectRatio: "1",
        alignSelf: "center",
        padding: "10px",
        margin: "auto 40px auto 30px",
        width: "fit-content",
    },
    organizationContainer: {
        display: "flex",
        alignItems: "center",
        margin: "auto",
        transform: "translate(-1.875rem)",
    },
    orgName: {
        position: "relative",
        width: "fit-content",
        "&:before": {
            position: "absolute",
            content: '""',
            width: "110%",
            height: "110%",
            top: "-5%",
            left: "-5%",
            borderRadius: "1px",
            border: "2px solid",
            borderColor: theme.palette.secondary.main,
            clipPath:
                "polygon(20% 0%, 100% 0, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0 100%, 0% 20%)",
            animation: "$animateClipPath 5s linear infinite alternate",
        },
    },
    "@keyframes animateClipPath": {
        "0%": {
            borderRadius: "1px",
            filter: "hue-rotate(0deg)",
            clipPath:
                "polygon(100% 0%, 100% 0, 100% 0%, 100% 0%, 0% 100%, 0% 100%, 0 100%, 0% 100%)",
        },
        "100%": {
            filter: "hue-rotate(180deg)",
            borderRadius: "10px",
            clipPath:
                "polygon(20% 0%, 100% 0, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0 100%, 0% 20%)",
        },
    },
    //Org-Logo
    avatar: {
        height: 100,
        width: 100,
        boxShadow: "0px 7px 20px rgba(0,0,0, 0.7) ",
        backgroundColor: "#333",
    },
    icon: {
        fontSize: 100,
        padding: "10px",
        borderRadius: "50%",
    },
    savingImage: {
        height: 70,
        width: 70,
        display: "grid",
        placeItems: "center",
    },
    speedDial: {
        transform: "translate(45px, -30px)",
    },
    fab: {
        position: "absolute",
        bottom: "0",
        right: "0",
    },
    // CARD STYLES

    teamsContainer: {
        background: "rgb(0, 0, 0)",
        background: "rgba(0, 0, 0, .2)",
        minHeight: "500px",
        boxShadow: "0px 0px 20px rgb(0 0 0 / 50%)",
        border: "1px solid #2a2344",
        borderRadius: "10px",
        // fontSize: '12px',
        padding: "30px 30px 30px 50px",
        transition: "transform 500ms",
        "&:hover": {
            boxShadow: "0px 0px 10px #2a2344",
            transform: "scale(1.01)",
        },
    },

    cardStyles: {
        display: "flex",
        flexFlow: "column",
        alignItems: "center",
        justifyContent: "space-between",
        fontSize: "16px",
        height: "200px",
        position: "relative",
        padding: "30px 10px ",
    },
    cardActions: {
        position: "absolute",
        top: 10,
        right: 10,
        display: "flex",
        flexFlow: "row",
    },
    textfield: {
        pointerEvents: "none",
    },
    // INPUT WHEN DISABLED
    input: {
        fontSize: "min(4vw,1.5em)",
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
    },
    btn: {
        zIndex: 10,
    },
    fab: {
        position: "absolute",
        bottom: 20,
        right: 50,
    },
    addTeamBtn: {
        height: 30,
        padding: 5,
        fontSize: "1.5em",
    },

    // '@keyframes glitch': {
    //   '0%': {
    //     clipPath: 'var(--slice-1)',
    //     transform: 'translate(-5px, -2.5px)',
    //   },
    //   '10%': {
    //     lipPath: 'var(--slice-3)',
    //     transform: 'translate(2.5px, 2.5px)',
    //   },
    //   '20%': {
    //     clipPath: 'var(--slice-1)',
    //     transform: 'translate(-2.5px, 2.5px)',
    //   },
    //   '30%': {
    //     clipPath: 'var(--slice-3)',
    //     transform: 'translate(0px, 1.25px)',
    //   },
    //   '40%': {
    //     clipPath: 'var(--slice-2)',
    //     transform: 'translate(-1.25px, 0px)',
    //   },
    //   '50%': {
    //     clipPath: 'var(--slice-3)',
    //     transform: 'translate(1.25px, 0px)',
    //   },
    //   '60%': {
    //     clipPath: 'var(--slice-4)',
    //     transform: 'translate(1.25px, 2.5px)',
    //   },
    //   '70%': {
    //     clipPath: 'var(--slice-2)',
    //     transform: 'translate(-2.5px, 2.5px)',
    //   },
    //   '80%': {
    //     clipPath: 'var(--slice-5)',
    //     transform: 'translate(5px, -2.5px)',
    //   },
    //   '90%': {
    //     clipPath: 'var(--slice-1)',
    //     transform: 'translate(-2.5px, 0px)',
    //   },
    //   '100%': {
    //     clipPath: 'var(--slice-1)',
    //     transform: 'translate(0)',
    //   },
    // },

    // NEW TEAM CARD
    teamCard: {
        // margin: "0 auto",
        position: "relative",
        alignSelf: "center",
        zIndex: "10",
        width: "200px",
        height: "250px",
        cursor: "pointer",

        "&:hover": {
            zIndex: "0",
            "& $background": {
                // chnaged the border to and shadow
                background: "linear-gradient(0deg, rgba(255, 255, 255, 0) 40%, black 100%)",
                boxShadow: "0 1px 10px 1px rgba( 250, 250, 250, 0.17 )",
                backdropFilter: "blur( 7px )",
                "-webkit-backdrop-filter": "blur( 7px )",
                // border: "1px solid rgba( 255, 255, 255, 0.18 )",
                transition: `all 250ms ${bezierValue}`,
                transform: "scale(1)",
                opacity: 1,
            },
            "& $teamImg": {
                boxShadow: "0px 5px 10px rgba(0,0,0,0.3)",
                zIndex: "-10",
                opacity: "0.1",
            },
            "& $rank": {
                opacity: "0",
            },
            "& $front": {
                "& $teamName": {
                    // color: "red",
                    // animation: '$animateName 500ms linear forwards',
                    transform: "translate(10px, 0%)",
                },
            },
            "& $iconBtn": {
                opacity: 1,
                transition: `all 250ms ${bezierValue}`,
            },
            "& $back": {
                opacity: 1,
                transition: `all 250ms ${bezierValue}`,
            },
        },
    },
    rank: {
        position: "absolute",
        padding: "15px 10px",
        clipPath: " polygon(100% 0%, 100% 100%, 50% 81%, 0 100%, 0 0)",
        backgroundColor: "rgba(0,0,0,0.8)",
        color: "#fafafa",
        top: "-1px",
        right: "15%",
        zIndex: "5",
        fontSize: "1.1em",
        fontWeight: 600,
        transition: `all 250ms ${bezierValue}`,
    },
    front: {
        zIndex: "5",
        transition: `all 250ms ${bezierValue}`,
    },
    teamImg: {
        zIndex: "5",
        width: "100%",
        height: "250px",
        backgroundSize: "cover",
        backgroundPosition: "top",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px rgba(0,0,0,0)",
        transition: "opacity 250ms",
    },
    teamNameBox: {
        position: "absolute",
        bottom: "10px",
        width: "100%",
        height: "auto",
        padding: "3px 10px",
        margin: "10px 0",
        color: "#fff",
        zIndex: "20",
        backgroundColor: "rgba(15, 12, 12, 0.8)",
        backdropFilter: "blur(15px) saturate(36%)",
        WebkitBackdropFilter: "blur(15px) saturate(36%)",
        borderRadius: "1px",
        zIndex: "20",
    },
    teamName: {
        position: "relative",
        textAlign: "left",
        transition: "transform 500ms",
        fontSize: "1.3em",
        opacity: 1,
    },
    "@keyframes animateName": {
        "0%": {
            opacity: "0",
            textAlign: "left",
        },
        "40%": {
            opacity: "0",
            textAlign: "left",
        },
        "50%": {
            opacity: "0",
            textAlign: "center",
        },
        "100%": {
            marginTop: 20,
            opacity: "1",
            textAlign: "center",
            fontSize: "1.2em",
            color: blue[400],
            fontWeight: 600,
        },
    },
    iconBtn: {
        opacity: 0,
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        right: "-3px",
        backgroundColor: "transparent",
        "&:hover": {
            backgroundColor: "transparent",
            transform: "scale(1.1) translateY(-49%)",
            "& $btnIcon": {
                color: theme.palette.secondary.main,
                transform: "rotate(175deg)",
            },
        },
    },
    btnIcon: {
        transition: "all 500ms ease-in",
    },
    background: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "10px",
        // backgroundColor: theme.palette.background.paper,
        boxShadow: "0px 10px 10px rgba(0,0,0,0.4)",
        zIndex: "-1",
        opacity: "1",
    },
    back: {
        opacity: 0,
        position: "absolute",
        width: "98%",
        minHeight: "150px",
        top: "10%",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        flexFlow: "column",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "all ease",
        backgroundColor: "rgba(15, 12, 12, 0.4)",
        backdropFilter: "blur(15px) saturate(36%)",
        WebkitBackdropFilter: "blur(15px) saturate(36%)",
        borderRadius: "1px",
    },
    gameName: {
        fontSize: "1.4em",
        fontWeight: 700,
    },
    teamCardBtn: {
        position: "relative",
        border: "none",
        margin: "10px 0 20px 0",
        boxShadow: "none",
        width: "130px",
        height: "40px",
        lineHeight: "42px",
        WebkitPerspective: "230px",
        perspective: "230px",
        backgroundColor: "inherit",
        "& span": {
            cursor: "pointer",
            background: "#ffd369",
            // background: 'linear-gradient(0deg, #895cf2 0%, #ffd369 100%)',
            display: "block",
            position: "absolute",
            top: "0",
            left: "0",
            width: "130px",
            height: "40px",
            fontSize: "17px",
            color: "#fff",
            boxShadow: `inset 2px 2px 2px 0px rgba(255,255,255,.5),
       7px 7px 20px 0px rgba(0,0,0,.1),
       4px 4px 5px 0px rgba(0,0,0,.1)`,
            borderRadius: "5px",
            margin: "0",
            textAlign: "center",
            WebkitBoxSizing: "border-box",
            MozBoxSizing: "border-box",
            boxSizing: "border-box",
            WebkitTransition: "all .3s",
            transition: "all .3s",
        },
        "& span:nth-child(1)": {
            // boxShadow: `-7px -7px 20px 0px #fff9,
            // -4px -4px 5px 0px #fff9,
            // 7px 7px 20px 0px #0002,
            // 4px 4px 5px 0px #0001`,

            background:
                "linear-gradient(right, rgb(255 211 105 / 40%) 0%, rgb(255 211 105 / 80%) 100%)",
            WebkitTransform: "rotateX(90deg)",
            MozTransform: "rotateX(90deg)",
            transform: "rotateX(90deg)",
            WebkitTransformOrigin: "50% 50% -20px",
            MozTransformOrigin: "50% 50% -20px",
            transformOrigin: "50% 50% -20px",
        },
        "& span:nth-child(2)": {
            background:
                "linear-gradient(0deg, rgb(137 92 241 / 40%) 0%, rgb(137 92 242 / 80%) 100%)",
            WebkitTransform: "rotateX(0deg)",
            MozTransform: "rotateX(0deg)",
            transform: "rotateX(0deg)",
            WebkitTransformOrigin: "50% 50% -20px",
            MozTransformOrigin: "50% 50% -20px",
            transformOrigin: "50% 50% -20px",
        },
        "&:hover": {
            "& span:nth-child(1)": {
                boxShadow: `inset 2px 2px 2px 0px rgba(255,255,255,.5),
        7px 7px 20px 0px rgba(0,0,0,.1),
        4px 4px 5px 0px rgba(0,0,0,.1)`,
                WebkitTransform: "rotateX(0deg)",
                MozTransform: "rotateX(0deg)",
                transform: "rotateX(0deg)",
            },
            "& span:nth-child(2)": {
                boxShadow: `inset 2px 2px 2px 0px rgba(255,255,255,.5),
        7px 7px 20px 0px rgba(0,0,0,.1),
        4px 4px 5px 0px rgba(0,0,0,.1)`,
                color: "transparent",
                WebkitTransform: "rotateX(-90deg)",
                MozTransform: "rotateX(-90deg)",
                transform: "rotateX(-90deg)",
            },
            // boxShadow: '0px 5px 10px rgba(0,0,0,0.4)',
        },
    },

    // NEWS BOX
    newsContainer: {
        maxHeight: "250px",
        overflowY: "scroll",
        marginRight: "20px",
        position: "relative",
    },

    dialog: {
        display: "flex",
        flexFlow: "column",
        padding: "20px",
        alignItems: "flex-start",
    },

    selectField: {
        width: "300px",
        margin: "20px 0",
    },

    label: {
        padding: "0 5px",
        backgroundColor: theme.palette.background.paper,
    },
    // Custom Scrollbar

    customScroll: {
        "&::-webkit-scrollbar": {
            width: "8px",
            backgroundColor: "rgba(0,0,0,0.5)",
            borderRadius: 10,
        },
        "&::-webkit-scrollbar-thumb": {
            borderRadius: 10,
            opacity: "0.8",
            backgroundColor: theme.palette.secondary.main,
        },
    },

    // Overlay
    overlay: {
        height: 20,
        position: "relative",
        "&:before": {
            position: "absolute",
            content: '""',
            width: "100%",
            height: "300%",
            top: "-60px",
            left: 0,
            zIndex: "2",
            pointerEvents: "none",
            background: "linear-gradient(0deg, rgba(34,40,49,1) 0%, rgba(255,255,255,0) 100%)",
        },
    },

    newsBox: {
        width: "90%",
        minHeight: "100px",
        padding: "20px",
        backgroundColor: "rgba(0,0,0,0.4)",
        borderRadius: "5px",
        boxShadow: "0px 10px 15px 0px rgba(50,50,50,0.1)",
        margin: "20px 0",
        position: "relative",
        "&:hover": {
            "& $removeBtn": {
                transform: "scale(1) translate(0px, 0px)",
                opacity: 1,
            },
        },
    },
    removeBtn: {
        position: "absolute",
        right: "-15px",
        top: "-15px",
        color: "#ff3c3c",
        transform: "scale(0.7) translate(-15px, 5px)",
        opacity: 0,
        transition: `all 0.5s ${bezierValue}`,
    },
    leagueName: {
        display: "flex",
        flexFlow: "row",
        alignItems: "center",
    },
    leagueTitle: {
        fontSize: "1.5em",
        "&:nth-child(2)": {
            fontSize: "0.85em",
            color: "#888",
            marginLeft: "10px",
        },
    },

    // SECTION HEADING
    headingSection: {
        position: "relative",
        "&:before": {
            position: "absolute",
            content: '""',
            width: "100%",
            height: "3px",
            bottom: "-6px",
            left: 0,
            borderRadius: "0px 5px 5px 15px",
            zIndex: "2",
            background:
                "linear-gradient(90deg, rgba(213,105,255,1) 0%, rgba(68,161,240,1) 30%, rgba(250,250,250,0) 60%)",
        },
    },
    headingMedium: {
        fontSize: "2.2em",
        width: "fit-content",
        position: "relative",
        "&:before": {
            position: "absolute",
            content: '""',
            width: "150%",
            height: "3px",
            bottom: "-6px",
            left: 0,
            borderRadius: "0px 5px 5px 15px",
            zIndex: "2",
            background:
                "linear-gradient(90deg, rgba(213,105,255,1) 0%, rgba(68,161,240,1) 30%, rgba(250,250,250,0) 60%)",
        },
    },

    // ALL PLAYERS
    accordion: {
        margin: "10px 0",
        backgroundColor: "transparent",
        transition: "all 0.2s ease-out",
        "&:before": {
            display: "none",
        },
        "&:hover": {
            boxShadow: "0px 1px 5px 1px rgba(200,235,250,0.1)",
        },
    },
    expanded: {
        boxShadow: "0px 1px 5px 1px rgba(0,0,0,0.2)",
        backgroundColor: "rgba(0,0,0,0.2)",
    },
    headingAccordian: {
        fontSize: "1.3em",
    },
    flexColumn: {
        display: "flex",
        flexFlow: "column",
    },
    coaches: {
        padding: 10,
        margin: "0 0 10px 0",
        width: "100%",
        borderBottom: "1px solid rgba(255,250,250,0.2)",
    },
    rosterName: {
        fontSize: "0.8em",
        color: "#999",
    },
    loadScreenFull: {
        display: "grid",
        placeItems: "center",
        height: "75vh",
    },
    coachesChip: {
        margin: "5px 10px",
        width: "fit-content",
        padding: "5px",
        border: "1px solid rgb(69 192 190 / 40%)",
        color: "rgb(69 192 190 / 40%)",
    },
    playersChip: {
        margin: "5px 10px",
        width: "fit-content",
        padding: "5px",
        border: "1px solid rgb(31 47 104 / 70%)",
        color: "#b7c7f1",
    },
}));
