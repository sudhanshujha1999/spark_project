import { updateRosterName } from "./updateRosterName";
export const editRosterNameRoute = {
   path: "/roster/:id/update",
   method: "put",
   handler: async (req, res) => {
      const { id: rosterId } = req.params;
      const { name } = req.body;
      try {
         await updateRosterName(rosterId, name);
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
