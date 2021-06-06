// // MONGODB MINGRATION
// import { Users, ORGANIZATION, Groups } from "../models";
// import { v4 as uuidv4 } from "uuid";

// export const createOrganization = async ({
//     name,
//     creatorId,
//     image_url,
//     location,
//     organization_level,
// }) => {
//     const userDetails = await Users.findById(creatorId);
//     const findIfGroupExist = await Groups.findOne({ name: name, group_type: ORGANIZATION });

//     if (!userDetails) {
//         throw new Error("no-user-found");
//     }

//     if (findIfGroupExist) {
//         throw new Error("organization-already-exist");
//     }

//     const organization_code = uuidv4().split("-")[0].toUpperCase();
//     const organization_type = ORGANIZATION;
//     const admin = [
//         {
//             id: creatorId,
//             name: userDetails.name,
//             email: userDetails.email,
//             profile_img: userDetails.profile_img,
//         },
//     ];
//     const newOrganization = new Groups({
//         name,
//         image_url,
//         created_by: creatorId,
//         location,
//         organization_level,
//         organization_code,
//         organization_type,
//         admins,
//     });
//     const parent_groups = [newOrganization._id];
//     await newOrganization.save();
//     newOrganization.updateOne({ $set: { parent_groups: parent_groups } });
//     await newOrganization.save();
//     return newOrganization._id;
// };
