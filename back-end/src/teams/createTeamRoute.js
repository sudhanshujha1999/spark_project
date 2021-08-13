import { createRoster } from "../rosters";
import { isLoggedInProtector, isVerifiedProtector } from "../route-protectors";
import { createDefaultRoster } from "../rosters/createDefaultRoster";
import { isCoachForSchool } from "../schools";
import { createTeam } from "../teams";
import { getUserByAuthId } from "../users";

export const createTeamRoute = {
    path: "/teams",
    method: "post",
    protectors: [isLoggedInProtector, isVerifiedProtector],
    handler: async (req, res) => {
        const { game, name: nameRaw, organizationId, rosters, url } = req.body;

		// We're making the "name" field optional - if they don't enter it, the team name should be the game name
		const name = nameRaw || game; 

        const { user_id: coachAuthId } = req.user;

        try {
            const coachUser = await getUserByAuthId(coachAuthId);
            const coachId = coachUser._id;

            const isCoach = await isCoachForSchool(coachId, organizationId);
            if (!isCoach) {
                return res.status(403).json({ message: "Only coaches can add teams to schools" });
			}

            let teamId;
            try {
                teamId = await createTeam({
                    name,
                    game,
                    organizationId,
                    coach: coachUser,
                    url,
                });
            } catch (error) {
                console.log(error.message);
                return res.status(500).json({
                    error: error.message,
                    secretMessage: "Error in team creation",
                });
            }

            if (teamId) {
                for (let roster of rosters) {
                    const { name: rosterName = "" } = roster;
                    // create a roster for team and then a default roster
                    await createRoster({
                        name: rosterName,
                        teamId,
                        organizationId,
                        coach: coachUser,
                    });
                }

				await createDefaultRoster({
					organizationId: organizationId,
					teamId: teamId,
					coach: coachUser,
				});
            } else {
                return res.status(400).json({
                    error: error.message,
                    secretMessage: "not-able-to-create-team",
                });
            }

            res.status(200).json({ success: true, id: teamId });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ message: error.message });
        }
    },
};
