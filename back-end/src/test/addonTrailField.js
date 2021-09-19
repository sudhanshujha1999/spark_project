import { Groups, ORGANIZATION, TRIAL } from "../models";
import { addGroupTrialDate } from "../groups";

export const addonTrailField = {
    path: "/test-trial",
    method: "post",
    handler: async (req, res) => {
        try {
            const groups = await Groups.find({ group_type: ORGANIZATION });
            // const groupsTrialResponse = await Promise.allSettled(
            //     groups.map((group) => addGroupTrialDate(group._id))
            // );
            // const response = groupsTrialResponse.map((result, index) => {
            //     console.log(result);
            //     if (result.status === "fulfilled") {
            //         return {
            //             name: groups[index].name,
            //             ...result.value,
            //         };
            //     } else {
            //         return {
            //             name: groups[index].name,
            //             success: false,
            //             ...result.value,
            //         };
            //     }
            // });
            return res.status(200).json({
                msg: "trail for groups added",
                // response,
            });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ msg: "SERVER ERROR" });
        }
    },
};
