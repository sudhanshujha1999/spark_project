import { updateTeamName } from "./updateTeamName";

export const editTeamRoute = {
   path: "/team/:id/update",
   method: "put",
   handler: async (req, res) => {
      const { id: teamId } = req.params;
      const { name } = req.body;
      try {
         await updateTeamName(teamId, name);
         res.status(200).send({
            success: true,
            message: "Values Changed",
         });
      } catch (e) {
         console.log(e);
         res.status(500).send({
            success: false,
            error: e,
         });
      }
   },
};
