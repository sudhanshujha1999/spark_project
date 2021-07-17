import { getAllScrimmage } from "../scrimmage";
import { SCRIMMAGE } from "./postCatagories";

export const getAllPostsRoute = {
    path: "/community-posts/",
    method: "get",
    handler: async (req, res) => {
        try {
            const scrimmages = await getAllScrimmage();
            return res.status(200).json({
                success: true,
                posts: [...scrimmages],
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
