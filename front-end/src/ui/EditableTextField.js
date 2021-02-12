import { TextField } from "./";
import { makeStyles } from "@material-ui/core/styles";

export const EditableTextField = ({
   value,
   setValue,
   //    value that define the field is editable or not
   editable = true,
   onPressEnter = () => {},
}) => {
   const classes = useStyles();
   return (
      <TextField
         disabled={!editable}
         value={value}
         className={!editable ? classes.textfield : ""}
         onKeyDown={(e) => {
            if (e.key === "Enter") {
               onPressEnter(e);
               console.log(e.code);
            }
         }}
         onChange={(e) => setValue(e.target.value)}
         inputProps={{
            className: classes.input,
         }}
         InputProps={{ disableUnderline: !editable }}
      />
   );
};

const useStyles = makeStyles((theme) => ({
   textfield: {
      pointerEvents: "none",
   },
   // INPUT WHEN DISABLED
   input: {
      fontSize: "min(4vw,1.4em)",
      color: "white",
      textAlign: "center",
      fontWeight: "bold",
   },
}));
