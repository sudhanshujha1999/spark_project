import { v4 as uuid } from "uuid";
import { createGroup } from "../groups";
import { createInvitation, sendInvitationEmail } from "../invitations";
import { addPermission, ADMIN } from "../permissions";
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

/*
    A request is sent to this route AFTER the coach completes the onboarding flow,
    i.e. all the information collected during onboarding is sent to this route at the same time.
*/
export const onboardCoachRoute = {
    method: "post",
    path: "/users/:userId/onboarding/coach",

    // Coaches must be both logged in and have verified their email
    protectors: [isLoggedInProtector, isVerifiedProtector],

    handler: async (req, res) => {
        // 1. Get all our data in order
        const { userId: authId } = req.params; // authId is the automatically assigned id from Firebase Auth
        const { userInfo = {}, schoolInfo = {}, teams = [] } = req.body;
        const { fullName, bio } = userInfo;
        const { name: schoolName = "", orgType: OrganizationType = "" } = schoolInfo;
        const baseUrl = req.app.get("baseFrontEndUrl"); // This changes depending on whether we're in prod/dev/local
        const authUser = req.user; // This is the firebase user info, added by the 'addUserToRoute' middleware in server.js

        // 2. Make sure whoever sent this request is actually that user
        if (authId !== authUser.user_id) {
            return res.status(403).json({ message: "Users can only update their own data" });
        }

        // 3. If they are, load the full user info from the database
        const userInDB = await getUserByAuthId(authId);
        const userId = userInDB.id; // This is the actual user id, different from the authId we saw earlier (a little confusing, perhaps)

        // 4. Update the user's info in the DB with the onboarding data
        const updatedUser = await updateUser(userId, { fullName, bio });

        const user = {
            ...authUser,
            ...updatedUser,
        };

        // 5. Create a school in the DB with the provided name from onboarding
        const schoolId = await createSchool({
            name: schoolName,
            coachId: userId,
            groupType: OrganizationType,
        });

        // 6. Give the coach ADMIN-level permission for the school
        await addPermission({ userId, groupId: schoolId, permissionType: ADMIN });

        // 7. Loop through all the teams and rosters provided in the onboarding flow,
        //    create them in the database, and give the coach (this user) ADMIN permissions.
        //    We also need to invite (and create, if they don't yet exist) the users from the emails
        //    provided for each roster.
        for (let team of teams) {
            // 7a. Get the team info provided in the onboarding flow
            const { name: teamName, game, rosters, url } = team;

            // 7b. Create a new team that belongs to the school
            //     (behind the scenes, this creates a new "group" and a "membership"
            //     that assigns that group as a member of the school)
            const teamId = await createTeam({
                name: teamName,
                game,
                schoolId,
                coachId: userId,
                url,
            });

            // 7c. Give the coach ADMIN-level permission for the new team
            await addPermission({ userId, groupId: teamId, permissionType: ADMIN });

            // 7d. Here's where we loop through all the rosters
            for (let roster of rosters) {
                // 7e. Get the roster info
                const { name: rosterName = "", playerEmails = [] } = roster;

                // 7f. Create the a new roster in the DB from that info
                const rosterId = await createRoster({
                    name: rosterName,
                    teamId,
                    coachId: userId,
                });

                // 7f. Give the coach ADMIN-level permission for the new roster
                await addPermission({ userId, groupId: rosterId, permissionType: ADMIN });

                // 7g. And here's where we loop through all the player emails that
                //     the coach entered and invite them.
                for (let email of playerEmails) {
                    // 7h. Load the user to see if they already have an account
                    const user = await getUserByEmail(email);

                    // 7i. If the user doesn't already exist, create one in the database
                    const playerId = user
                        ? user.id
                        : await createUserInDB({ email, membershipTypeId: "player" });

                    // 7j. Generate a confirmation code that we can send to the user's email.
                    //     This will be used in the 'acceptInvitationRoute'
                    const confirmationCode = uuid();

                    // 7k. Send this confirmation code in an invitation to the user's email
                    await sendInvitationEmail({
                        email,
                        groupName: teamName,
                        schoolName,
                        confirmationCode,
                        baseUrl,
                    });

                    // 7l. Create an invitation in the database (this will become a "membership" when the user accepts)
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

        // 8. Mark the user as "onboarded" - and then we're done!
        await setUserToOnboarded(userId);

        res.status(200).json({});
    },
};
