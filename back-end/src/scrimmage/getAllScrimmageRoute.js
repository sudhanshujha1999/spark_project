import { getAllScrimmage } from "./";

export const getAllScrimmageRoute = {
    path: "/scrimmage/",
    method: "get",
    handler: async (req, res) => {
        try {
            const scrimmages = await getAllScrimmage();
            return res.status(200).json({
                success: true,
                scrimmages,
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
