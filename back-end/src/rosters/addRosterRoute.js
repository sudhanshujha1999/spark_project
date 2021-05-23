import { createRoster } from "./createRoster";
import { getUserById } from "../users/getUserById";
import { Groups } from "../models";

export const addRosterRoute = {
    path: "/rosters/add",
    method: "post",
    handler: async (req, res) => {
        const { name, teamId, coachId } = req.body;
        try {
            const coach = await Groups.findById(coachId);
            const newRosterId = await createRoster({ name, teamId, coach });
            res.status(200).send({ id: newRosterId });
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    },
};
