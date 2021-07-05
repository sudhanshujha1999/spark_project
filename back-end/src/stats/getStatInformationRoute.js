import { getStatFormById } from "./getStatFormById";
import { createRecordsForPlayer } from "./createRecordsForPlayer";

export const getStatInformationRoute = {
    path: "/:id/stats-form/",
    method: "get",
    handler: async (req, res) => {
        try {
            // const { id: formId } = req.params;
            const formId = "60e2c6f5c9d39821842007d2";
            const statInfo = await getStatFormById(formId);
            const records = createRecordsForPlayer(statInfo.fields);
            return res.status(200).json({
                success: true,
                statInfo,
                records,
            });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },
};
