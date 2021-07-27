import { isLoggedInProtector, isVerifiedProtector } from "../route-protectors";
import { getUserByAuthId } from "../users";

import { addRequest } from "./addRequest";

export const intresetedInScrimmageRoute = {
    path: "/scrimmage/:scrimmageId/:organizationId/interested/",
    method: "post",
    protectors: [isLoggedInProtector, isVerifiedProtector],
    handler: async (req, res) => {
        const authUser = req.user;
        try {
            const user = await getUserByAuthId(authUser.user_id);
            const requestedBy = user._id;
            const name = user.full_name;
            // ----
            // Check permission
            // ----
            const { scrimmageId, organizationId } = req.params;
            const { contact, note, skillLevel } = req.body;
            await addRequest({
                contact,
                note,
                scrimmageId,
                organizationId,
                skillLevel,
                requestedBy,
                name,
            });
            return res.status(200).json({
                success: true,
                scrimmage_added: true,
            });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },
};
