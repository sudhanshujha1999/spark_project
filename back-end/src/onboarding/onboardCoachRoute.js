import { v4 as uuid } from "uuid";
import { createGroup } from "../groups";
import { createInvitation, sendInvitationEmail } from "../invitations";
import { isLoggedInProtector, isVerifiedProtector } from "../route-protectors";
import { createRoster } from "../rosters";
import { createSchool } from "../schools";
import { createTeam } from "../teams";
import {
    createUserInDB,
    getUserByEmail,
    getUserByAuthId,
    setUserToOnboarded,
    updateUser,
} from "../users";

export const onboardCoachRoute = {
    method: "post",
    path: "/users/:userId/onboarding/coach",
    protectors: [isLoggedInProtector, isVerifiedProtector],
    handler: async (req, res) => {
        const { userId: authId } = req.params;
        const { userInfo = {}, schoolInfo = {}, teams = [] } = req.body;
        const { fullName, bio } = userInfo;
        const { name: schoolName = "" } = schoolInfo;
        const baseUrl = req.app.get("baseFrontEndUrl");
        const authUser = req.user;

        if (authId !== authUser.user_id) {
            return res.status(403).json({ message: "Users can only update their own data" });
        }

        const userInDB = await getUserByAuthId(authId);
        const userId = userInDB.id;

        const updatedUser = await updateUser(userId, { fullName, bio });
        console.log(updatedUser);

        const user = {
            ...authUser,
            ...updatedUser,
        };

        const schoolId = await createSchool({ name: schoolName, coachId: userId });

        for (let team of teams) {
            const { name: teamName, game, rosters, url } = team;
            const teamId = await createTeam({
                name: teamName,
                game,
                schoolId,
                coachId: userId,
                url,
            });

            for (let roster of rosters) {
                const { name: rosterName = "", playerEmails = [] } = roster;
                const rosterId = await createRoster({
                    name: rosterName,
                    teamId,
                    coachId: userId,
                });

                for (let email of playerEmails) {
                    const user = await getUserByEmail(email);

                    const playerId = user
                        ? user.id
                        : await createUserInDB({ email, membershipTypeId: "player" });

                    const confirmationCode = uuid();

                    await sendInvitationEmail({
                        email,
                        groupName: teamName,
                        schoolName,
                        confirmationCode,
                        baseUrl,
                    });

                    const membershipId = await createInvitation({
                        email,
                        groupId: rosterId,
                        userId: playerId,
                        membershipTypeId: "player",
                        invitedById: userId,
                        confirmationCode,
                    });
                }
            }
        }

        await setUserToOnboarded(userId);

        res.status(200).json({});
    },
};
