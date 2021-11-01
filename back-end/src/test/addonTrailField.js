import { getGroupsWithOrganizationId } from "../community-groups/getGroupsWithOrganizationId";

export const addonTrailField = {
    path: "/test-trial",
    method: "post",
    handler: async (req, res) => {
        try {
            const organizationId = "61740a7d7649f7a9baa4d959";
            const data = await getGroupsWithOrganizationId(organizationId);
            return res.status(200).json({
                msg: "trail for groups added",
                data,
            });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ msg: "SERVER ERROR" });
        }
    },
};
