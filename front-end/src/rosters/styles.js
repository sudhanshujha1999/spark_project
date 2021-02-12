import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
   rosterName: {
      display: "flex",
      flexFlow: "row",
      alignItems: "center",
   },
   rosterNameItems: {
      marginRight: "10px",
   },
}));
