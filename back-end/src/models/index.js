export { CommunityGroups } from "./CommunityGroupSchema";
export { Events } from "./EventsSchema";
export { Groups } from "./GroupsSchema";
export { Goal } from "./GoalSchema";
export {
    CommunityGroupsActivity,
    GROUP_CREATED,
    ORGANIZATION_JOINED,
    ORGANIZATION_LEFT,
} from "./GroupActivitySchema";
export { Invitation } from "./InvitationSchema";
export { League } from "./LeagueSchema";
export { Notifications } from "./NotificationsSchema";
export { Notes } from "./NotesSchema";
export { Permissions } from "./PermissionsSchema";
export { StatsEntry } from "./PlayerStatsEntrySchema";
export { StatsInformation, VALID_FIELD_TYPES } from "./StatsInformationSchema";
export { Scrimmage } from "./ScrimmageSchema";
export { Users } from "./UsersSchema";
export { WarRoom } from "./WarRoomSchema";

// <-----------War room sample object----------->
// {
//     session_name: 'War-rooom Session',
//     eventId: ObjectId("<----events schema ref--->"),
//     team: 'Team Name',
//     opponent_team: 'opponent team name',
//     game: 'game name',
//     map_name: 'map name',
//     description: 'session description also use as event description'
//     map_link: 'map link to storage'
//     <--------war room stages/canvas paths------>
//     const stages = [
//          {
//              name: "name of the stage",
//              description: "notes in the front end for each stage",
//              path: [
//                  {
//                      x: 2930,
//                      y: 1239,
//                      color: "color code",
//                  },
//              ],
//           },
//      ];
// }

export { VALID_EVENTS, WAR_ROOM, DISCUSSION } from "./validEventTypes";
export { ORGANIZATION, TEAM, ROSTER, TRIAL, PAID } from "./validGroups";
export { VALID_PERMISSIONS } from "./validPermission";
