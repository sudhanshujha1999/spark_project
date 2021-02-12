import { useHistory } from "react-router-dom";
import { ClearIcon, EditIcon, CheckIcon } from "../icons";
import { Card, Grid, IconButton, CardActions, EditableTextField } from "../ui";
import { useState } from "react";
import { useStyles } from "./Styles";

export const TeamsListItem = ({ team, onClickDelete, onClickEdit }) => {
   const classes = useStyles();
   const history = useHistory();
   const [name, setName] = useState(team.name);
   const [edit, setEdit] = useState(false);

   const handleClick = (e) => {
      if (edit) {
         console.log("saveFirst");
      } else {
         history.push(`/teams/${team.id}`);
      }
   };

   const handleEdit = (e) => {
      if (!edit) {
         setEdit(!edit);
         return;
      }
      // IF NAME IS EMPTY
      if (name === "") {
         console.log("set name First");
         return;
      }
      // if the name is not changed return
      if (name === team.name) {
         setEdit(!edit);
         return;
      }
      setEdit(!edit);
      onClickEdit({ name, id: team.id });
      e.preventDefault();
   };

   return (
      <Grid
         item
         xs={12}
         sm={6}
         md={4}
         lg={3}
         key={team.id}
         onClick={handleClick}
      >
         <Card raised className={classes.cardStyles}>
            <EditableTextField
               value={name}
               setValue={setName}
               onPressEnter={handleEdit}
               editable={edit}
            />
            <CardActions className={classes.cardActions}>
               <IconButton
                  className={classes.btn}
                  onClick={(e) => {
                     e.stopPropagation();
                     handleEdit(e);
                  }}
               >
                  {edit ? <CheckIcon /> : <EditIcon />}
               </IconButton>
               <IconButton
                  className={classes.btn}
                  onClick={(e) => {
                     e.preventDefault();
                     e.stopPropagation();
                     onClickDelete(team.id);
                  }}
               >
                  <ClearIcon />
               </IconButton>
            </CardActions>
         </Card>
      </Grid>
   );
};
