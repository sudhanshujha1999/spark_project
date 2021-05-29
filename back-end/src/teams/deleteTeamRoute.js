import { deleteTeam } from "./deleteTeam";
import { getUserByAuthId } from "../users";

export const deleteTeamRoute = {
    path: "/teams/:id",
    method: "delete",
    handler: async (req, res) => {
        const { id: teamId } = req.params;
        const userAuthId = req.user.uid;
        try {
            const user = await getUserByAuthId(userAuthId);
            const team = await deleteTeam(teamId, user._id);
            return res.status(200).json({ team });
        } catch (e) {
            console.log(e);
            if (e.message === "not-authorized-to-delete") {
                return res.status(403).json({
                    success: false,
                    message: e.message,
                });
            }
            return res.status(500);
        }
    },
};
