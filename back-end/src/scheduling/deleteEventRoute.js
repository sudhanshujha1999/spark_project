import { isLoggedInProtector, isVerifiedProtector } from "../route-protectors";
import { getUserByAuthId } from "../users";
import { deleteEvent } from "./deleteEvent";

export const deleteEventRoute = {
    path: "/events/:eventId",
    method: "delete",
    protectors: [isLoggedInProtector, isVerifiedProtector],
    handler: async (req, res) => {
        const { eventId } = req.params;
        //   coach auth_id
        const requesterAuthId = req.user.uid;
        try {
            const requesterUser = await getUserByAuthId(requesterAuthId);
            if (!requesterUser) {
                return res.status(404).json({ success: false, message: "user-not-found" });
            }
            await deleteEvent({ eventId, userId: requesterUser.id });
            res.sendStatus(200);
        } catch (error) {
            console.log(error.message);
            return res.status(500).send({
                success: false,
                error: error.message,
            });
        }
    },
};
