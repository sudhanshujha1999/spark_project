import axios from "axios";
import { useTeams } from "../teams";
import { Box, Divider, Typography } from "../ui";
import { TeamsList } from "./TeamsList";
import { useCurrentUserInfo } from "../users";

export const DashboardPage = () => {
   const { userInfo } = useCurrentUserInfo();
   const { membershipTypeId = "" } = userInfo || {};
   const isCoach = membershipTypeId === "coach";
   const [teams, isLoadingTeams, , setTeams] = useTeams();

   const { school } = teams[0] || {};

   const onDeleteTeam = async (teamId) => {
      // eslint-disable-next-line no-restricted-globals
      const userReallyWantsToDelete = confirm(
         "Are you sure you want to delete this team and all its corresponding data? (You cannot undo this)"
      );
      if (teams.length <= 1) {
         alert(
            "That's your last team! You must have at least one team. Please create another before deleting this one"
         );
         return;
      }

      if (userReallyWantsToDelete) {
         try {
            await axios.delete(`/api/teams/${teamId}`);
            setTeams(teams.filter((team) => team.id !== teamId));
         } catch (e) {
            console.log(e);
         }
      }
   };

   const onEditTeam = async ({ name, id }) => {
      try {
         await axios.put(`/api/team/${id}/update`, { name });
         setTeams(
            teams.map((team) => {
               if (team.id === id) {
                  return { ...team, name: name };
               }
               return team;
            })
         );
         console.log("saved");
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <Box>
         {isLoadingTeams ? (
            <p>Loading...</p>
         ) : (
            <>
               <Typography variant="h2">
                  {school && (school.name || "")}
               </Typography>
               <Box mb={2}>
                  <Divider />
               </Box>
               <TeamsList
                  school={school}
                  teams={teams}
                  isCoach={isCoach}
                  onDeleteTeam={onDeleteTeam}
                  onEditTeam={onEditTeam}
               />
            </>
         )}
      </Box>
   );
};
