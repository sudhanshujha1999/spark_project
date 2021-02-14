import {
   Box,
   Button,
   CircularProgress,
   Dialog,
   TextField,
   Typography,
} from "../ui";
import { useStyles } from "./styles";
import { useState } from "react";

export const AddRosterDialog = ({
   open,
   setOpen,
   progress,
   createRoster = () => {},
}) => {
   const classes = useStyles();
   const [name, setName] = useState("");

   const handleSubmit = async () => {
      if (name !== "") {
         console.log(1);
         await createRoster(name);
         setName("");
      }
   };

   return (
      <Dialog open={open} onClose={() => setOpen(false)}>
         <Box className={classes.addRosterContainer}>
            <Typography className={classes.heading}>
               Enter a cool name for your roster
            </Typography>
            <TextField
               className={classes.inputConatiner}
               label="Name"
               value={name}
               variant="outlined"
               onChange={(e) => setName(e.target.value)}
               onKeyDown={(e) => {
                  if (e.key === "Enter") {
                     handleSubmit();
                     console.log(e.code);
                  }
               }}
            />
            <Button
               disabled={progress}
               variant="contained"
               className={classes.submitBtn}
               onClick={(e) => handleSubmit()}
            >
               {progress ? (
                  <CircularProgress size="1.7em" color="primary" />
               ) : (
                  "Submit"
               )}
            </Button>
         </Box>
      </Dialog>
   );
};
