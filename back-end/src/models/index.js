export { Users } from "./UsersSchema";
export { Groups } from "./GroupsSchema";
export { Invitation } from "./InvitationSchema";
export { Events } from "./EventsSchema";
export { Permissions } from "./PermissionsSchema";
export { Notes } from "./NotesSchema";
export { League } from "./LeagueSchema";
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
export { ORGANIZATION, TEAM, ROSTER } from "./validGroups";
export { VALID_PERMISSIONS } from "./validPermission";
