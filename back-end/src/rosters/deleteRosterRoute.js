import { getUserByAuthId } from "../users";
import { deleteRoster } from "./deleteRoster";

export const deleteRosterRoute = {
    path: "/rosters/:id",
    method: "delete",
    handler: async (req, res) => {
        const userAuthId = req.user.uid;
        const { id: rosterId } = req.params;
        try {
            const user = await getUserByAuthId(userAuthId);
            await deleteRoster(rosterId, user._id);
            res.sendStatus(200);
        } catch (e) {
            console.log(e.message);
            res.sendStatus(500);
        }
    },
};
