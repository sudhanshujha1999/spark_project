import { Box } from "../ui";
import { useStyles } from "./bracketStyles";

export const FinalItem = ({ teamName = "" }) => {
    const classes = useStyles();
    return <Box className={`${classes.singleItem}`}>{teamName}</Box>;
};
