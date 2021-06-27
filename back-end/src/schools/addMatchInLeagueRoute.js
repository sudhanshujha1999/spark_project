import { getUserByAuthId } from "../users";
import { addMatchToLeague } from "./addMatchToLeague";

export const addMatchInLeagueRoute = {
    path: "/:leagueId/league/match",
    method: "post",
    handler: async (req, res) => {
        const authUser = req.user;
        const { leagueId } = req.params;
        const { opponent, note, date, win, lose } = req.body;
        try {
            // user creating the league
            const user = await getUserByAuthId(authUser.user_id);
            if (!user) {
                return res.status(404).json({
                    message: "no-user-found",
                });
            }
            await addMatchToLeague({
                leagueId,
                opponent,
                note,
                date,
                win,
                lose,
            });
            return res.status(200).json({
                success: true,
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
