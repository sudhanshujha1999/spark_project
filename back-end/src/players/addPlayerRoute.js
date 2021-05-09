import { v4 as uuid } from "uuid";
import { isCoachForTeam } from "../coaches";
import { createGroup } from "../groups";
import { createInvitation, sendInvitationEmail } from "../invitations";
import { createMembership } from "../memberships";
import { ADMIN, hasPermission } from '../permissions';
import { getRosterById } from "../rosters";
import {
   isLoggedInProtector,
   isVerifiedProtector,
   isOnboardedProtector,
} from "../route-protectors";
import { getSchoolForGroup } from "../schools";
import { getTeamForGroup } from "../teams";
import { createUserInDB, getUserByEmail, getUserByAuthId } from "../users";

export const addPlayerRoute = {
    path: "/rosters/:rosterId/players",
    method: "post",
    protectors: [
        isLoggedInProtector,
        isVerifiedProtector,
    ],
   handler: async (req, res) => {
    const { rosterId: groupId } = req.params;
    const requesterAuthId = req.user.uid;
    const requesterUser = await getUserByAuthId(requesterAuthId);
    const requesterId = requesterUser.id;

    const isAllowed = await hasPermission({
        userId: requesterId, 
        groupId,
        permissionType: ADMIN,
    });
    
    if (!isAllowed) return res.sendStatus(403);

      try {
         const coachAuthId = req.user.uid;
         const { rosterId } = req.params;
         const { email } = req.body;
         const baseUrl = req.app.get("baseFrontEndUrl");

         const roster = await getRosterById(rosterId);
         const team = await getTeamForGroup(roster);
         const coachUser = await getUserByAuthId(coachAuthId);
         const coachId = coachUser.id;

         const isCoach = await isCoachForTeam(coachId, team.id);
         if (!isCoach)
            return res
               .status(403)
               .json({ message: "Only coaches can add players to teams" });

         const school = await getSchoolForGroup(team);
         const user = await getUserByEmail(email);

         const playerId = user
            ? user.id
            : await createUserInDB({ email, membershipTypeId: "player" });

         const confirmationCode = uuid();

         await sendInvitationEmail({
            email,
            groupName: team.name,
            schoolName: school.name,
            confirmationCode,
            baseUrl,
         });
         const membershipId = await createInvitation({
            email,
            groupId: rosterId,
            userId: playerId,
            membershipTypeId: "player",
            invitedById: coachId,
            confirmationCode,
         });

         res.sendStatus(200);
      } catch (error) {
         console.log(error);
         return res.status(500).send({
            success: false,
            error: error,
         });
      }
   },
};
