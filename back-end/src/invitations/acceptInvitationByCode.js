// import * as admin from 'firebase-admin';
// import { getAllAncestorGroups } from '../groups';
// import { createMembership } from '../memberships';
// import { addPermission, PLAYER } from "../permissions";
import { getUserByEmail } from "../users";
import { Invitation } from "../models";
import { addPlayerIdToGroup } from "../groups";
import { addOrganizationToPlayer } from "../users";

export const acceptInvitationByCode = async (confirmationCode) => {
    // 1. Get all the invitation with the corresponding confirmationCode
    const invitation = await Invitation.findOne({ confirmationCode: confirmationCode });

    // 2. The invitation might not exist. If it doesn't, throw an error
    // if (results.length === 0) throw new Error('Not found');
    if (!invitation) throw new Error("Not found");

    // 3. If the invitation hasn't been accepted yet...
    if (!invitation.isConfirmed) {
        const {
            email,
            inTeamAlready,
            teamId,
            inRosterAlready,
            rosterId,
            playerHasOrganization,
            organizationId,
        } = invitation;

        const user = await getUserByEmail(email);
        const playerId = user._id;

        // 4. Create a membership with data from the invitation
        // this will work for plaer who are already a user but invited to a diffrent org
        if (!playerHasOrganization) {
            addOrganizationToPlayer(playerId, organizationId);
            console.log("organization_added_to_player");
        }
        // if Already in that roster
        if (inRosterAlready) {
            console.log("player-already-exist");
            return res.status(409).json({
                message: "player-already-exist",
                success: false,
            });
        }

        // add that player to that roster and team
        // if not in team already
        if (!inTeamAlready) {
            addPlayerIdToGroup({
                groupId: teamId,
                playerId,
                email,
                gamerName: user.gamer_name,
                bio: user.bio,
                profile_img: user.profile_img,
                name: user.full_name,
            });
        }
        addPlayerIdToGroup({
            groupId: rosterId,
            playerId,
            email,
            gamerName: user.gamer_name,
            bio: user.bio,
            profile_img: user.profile_img,
            name: user.full_name,
        });
        // No schema for them-------------------------------------------------------------------

        // 5. Add a permission to the user - this will allow them to view group
        //    info and stuff like that

        // await addPermission({ userId, groupId, permissionType: PLAYER });

        // 6. Additionally, we need to find all the groups that THIS group belongs
        //    to and mark the player as a player on those groups as well.

        // const ancestorGroups = await getAllAncestorGroups(groupId);
        // await Promise.all(
        //     ancestorGroups.map((ancestorGroup) =>
        //         addPermission({ userId, groupId: ancestorGroup.id, permissionType: PLAYER })
        //     )
        // );

        // 6. And mark the invitation as accepted
        await invitation.updateOne({ $set: { isConfirmed: true } });
    }

    // Return the email of the user who accepted the invitation so we can find them
    return invitation.email;
};
