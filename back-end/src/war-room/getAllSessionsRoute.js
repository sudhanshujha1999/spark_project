import { getUserByAuthId } from "../users";
import { getAllWarRoomEventsForUser } from "../scheduling";

export const getAllSessionRoute = {
    path: "/war-room",
    method: "get",
    handler: async (req, res) => {
        const authUser = req.user;
        try {
            // user creating the war room session
            const user = await getUserByAuthId(authUser.user_id);
            if (!user) {
                return res.status(404).json({
                    message: "no-user-found",
                });
            }
            const sessions = await getAllWarRoomEventsForUser(user._id);
            return res.status(200).json({
                success: true,
                sessions,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },
};
