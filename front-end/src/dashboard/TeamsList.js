import { Link } from "react-router-dom";
import { Card, Grid } from "../ui";
import { TeamsListItem } from "./TeamsListItem";
import { useStyles } from "./Styles";

export const TeamsList = ({
   school,
   teams,
   isCoach,
   onDeleteTeam,
   onEditTeam,
}) => {
   const classes = useStyles();
   return school && teams && teams.length > 0 ? (
      <Grid container spacing={2}>
         {teams.map((team) => (
            <TeamsListItem
               team={team}
               onClickDelete={onDeleteTeam}
               onClickEdit={onEditTeam}
               isCoach={isCoach}
            />
         ))}
         {isCoach && (
            <Grid item xs={12} sm={6} md={4} lg={3}>
               <Link to={`/schools/${school.id}/new-team`}>
                  <Card raised className={classes.cardStyles}>
                     <h3>+ Add a new team</h3>
                  </Card>
               </Link>
            </Grid>
         )}
      </Grid>
   ) : (
      <>
         <p>
            Looks like you haven't {!isCoach && "been"} added {!isCoach && "to"}{" "}
            any teams yet.
         </p>
         <Grid container>
            {isCoach && (
               <Grid item xs={3}>
                  <Link to={`/schools/${school.id}/new-team`}>
                     <Card raised className={classes.cardStyles}>
                        <h3>+ Add a new team</h3>
                     </Card>
                  </Link>
               </Grid>
            )}
         </Grid>
      </>
   );
};
