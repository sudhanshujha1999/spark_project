import { v4 as uuid } from "uuid";
import { createGroup, getGroupById, getAllParents, addPlayerIdToGroup } from "../groups";
import { createInvitation, sendInvitationEmail } from "../invitations";
import { Invitation } from "../models";
import { ADMIN, hasPermission } from "../permissions";
import {
    isLoggedInProtector,
    isVerifiedProtector,
    isOnboardedProtector,
} from "../route-protectors";
import { createUserInDB, getUserByEmail, getUserByAuthId, addOrganizationToPlayer } from "../users";

export const addPlayerRoute = {
    path: "/rosters/:rosterId/players",
    method: "post",
    protectors: [isLoggedInProtector, isVerifiedProtector],
    handler: async (req, res) => {
        const { rosterId } = req.params;
        //   coach auth_id
        const requesterAuthId = req.user.uid;
        //   coach
        const requesterUser = await getUserByAuthId(requesterAuthId);
        //   coachID
        const requesterId = requesterUser._id;

        // currently nmo permissions are set right now
        //  const isAllowed = await hasPermission({
        //      userId: requesterId,
        //      groupId,
        //      permissionType: ADMIN,
        //  });

        //  if (!isAllowed) return res.sendStatus(403);

        try {
            const { email } = req.body;
            const baseUrl = req.app.get("baseFrontEndUrl");
            const roster = await getGroupById(rosterId);
            // the onject returned by a mongoose schema has .id(string type) and ._id(ObjectId type)
            const parentsForCurrentRoster = roster.parent_groups.filter(
                (parent) => parent !== roster.id
            );
            const { organization, team } = await getAllParents(parentsForCurrentRoster);
            const user = await getUserByEmail(email);

            // player object to save in the Groups DB
            const confirmationCode = uuid();
            // get the playerId,if player is not there create a player and with invitedTo and invitedBy vfields
            const playerId = user
                ? user._id
                : await createUserInDB({
                      email,
                  });

            const ifAlreadyAnInvitation = await Invitation.findOne({
                email,
                rosterId: roster._id,
            });

            if (ifAlreadyAnInvitation) {
                console.log("already a invitation");
                await sendInvitationEmail({
                    email,
                    groupName: team.name,
                    schoolName: organization.name,
                    confirmationCode: ifAlreadyAnInvitation.confirmationCode,
                    baseUrl,
                });
                return res.sendStatus(200);
            }
            // here we perform all the check on the user
            // like if he is in that team or in that roster or if the player has that organization
            // player.id means player._id thats why not used the id here right now
            // will find something later
            const inTeamAlready =
                team.players.filter((player) => player.email === email).length > 0 ? true : false;
            const inRosterAlready =
                roster.players.filter((player) => player.email === email).length > 0 ? true : false;
            const ifPlayerIsInTheOrganization =
                user && user.organizations.includes(organization.id) ? true : false;

            // if Already in that roster
            if (inRosterAlready) {
                console.log("player-already-exist");
                return res.status(409).json({
                    message: "player-already-exist",
                    success: false,
                });
            }

            // Now we create a invitaion
            await sendInvitationEmail({
                email,
                groupName: team.name,
                schoolName: organization.name,
                confirmationCode,
                baseUrl,
            });
            await createInvitation({
                email,
                coachId: requesterId,
                inRosterAlready,
                inTeamAlready,
                teamId: team._id,
                rosterId: roster._id,
                organizationId: organization.id,
                playerHasOrganization: ifPlayerIsInTheOrganization,
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
