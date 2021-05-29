import { createRoster } from "./createRoster";
import { getUserById } from "../users/getUserById";
import { Groups } from "../models";

export const addRosterRoute = {
    path: "/rosters/add",
    method: "post",
    handler: async (req, res) => {
        const { name, teamId, coachId } = req.body;
        try {
            const coach = await getUserById(coachId);
            const newRoster = await createRoster({ name, teamId, coach });
            return res.status(200).send({ roster: newRoster });
        } catch (e) {
            console.log(e);
            return res.sendStatus(500);
        }
    },
};
