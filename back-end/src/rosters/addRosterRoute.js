import { createRoster } from "./createRoster";

export const addRosterRoute = {
   path: "/rosters/add",
   method: "post",
   handler: async (req, res) => {
      const { name, teamId, coachId } = req.body;
      try {
         console.log(name, teamId, coachId);
         const newRosterId = "123";
         // const newRosterId = createRoster({name, teamId, coachId});
         res.status(200).send({ id: newRosterId });
      } catch (e) {
         console.log(e);
         res.sendStatus(500);
      }
   },
};
