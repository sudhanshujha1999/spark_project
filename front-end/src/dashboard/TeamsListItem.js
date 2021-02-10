import { Link } from "react-router-dom";
import { ClearIcon, EditIcon } from "../icons";
import { Box, Card, Grid, IconButton, TextField } from "../ui";
import { useRef, useState } from "react";
import { useStyles } from "./Styles";

export const TeamsListItem = ({ team, onClickDelete, onClickEdit }) => {
  const classes = useStyles();
  const inputRef = useRef();
  const [name, setName] = useState(team.name);
  const [edit, setEdit] = useState(false);

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} key={team.id}>
      <Link to={`/teams/${team.id}`}>
        <Card raised className={classes.cardStyles}>
          {/* <TextField 
                        disabled={!edit} 
                        value={name} 
                        inputRef={inputRef}
                        onChange={(e) => setName(e.target.value)}
                        inputProps={{
                            className: classes.input,
                        }}
                        InputProps={{ disableUnderline: !edit }}
                    /> */}
          <h3 key={team.id}>{team.name}</h3>
          <Box className={classes.cardActions}>
            {/* <IconButton
                            onClick={e => {
                                if(!edit){
                                    inputRef.current.focus();
                                }
                                setEdit(!edit);
                                // onClickEdit(team.id);
                                e.preventDefault();
                            }}
                        >
                            <EditIcon />
                        </IconButton> */}
            <IconButton
              onClick={(e) => {
                onClickDelete(team.id);
                e.preventDefault();
              }}
            >
              <ClearIcon />
            </IconButton>
          </Box>
        </Card>
      </Link>
    </Grid>
  );
};
