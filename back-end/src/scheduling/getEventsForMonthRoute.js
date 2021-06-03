import { getUserByAuthId } from "../users";
import { getEventsForMonth } from "./getEventsForMonth";

export const getEventsForMonthRoute = {
    path: "/events/:year/:month",
    method: "get",
    handler: async (req, res) => {
        const { year, month } = req.params;
        const { user_id: authId } = req.user;
        try {
            const user = await getUserByAuthId(authId);
            const events = await getEventsForMonth({
                userEmail: user.email,
                year,
                month,
            });

            return res.status(200).json(events);
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    },
};
