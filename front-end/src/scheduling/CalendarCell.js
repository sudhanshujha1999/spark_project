import { Box, Typography } from "../ui";
import { makeStyles } from "@material-ui/core/styles";

export const CalendarCell = ({
    date,
    events = [],
    onClick,
    activeDate,
    onClickEvent = () => {},
}) => {
    const classes = useStyles();
    return date ? (
        <Box
            p={1}
            style={{
                backgroundColor: "#555",
                height: "100%",
                cursor: "pointer",
            }}
            onClick={() => onClick(date)}>
            <Typography variant='subtitle2' className={activeDate ? classes.active : ""}>
                {date.getDate()}
            </Typography>
            {events.map((event) => (
                <Box
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onClickEvent(event);
                    }}
                    p={1}
                    mb={1}
                    style={{
                        background: event.hasOwnProperty("backgroundColor")
                            ? `${event.backgroundColor.colorCode.background}`
                            : "#7289da",
                        borderRadius: 4,
                        overflow: "hidden",
                    }}>
                    {event.name}
                </Box>
            ))}
        </Box>
    ) : (
        <Box
            p={1}
            style={{
                backgroundColor: "#363636",
                height: "100%",
            }}
        />
    );
};

const useStyles = makeStyles((theme) => ({
    active: {
        fontSize: "1.2em",
        color: theme.palette.background.default,
        fontWeight: 600,
        borderRadius: "50%",
        width: "fit-content",
        padding: "5px 10px",
        backgroundColor: theme.palette.secondary.main,
    },
}));
