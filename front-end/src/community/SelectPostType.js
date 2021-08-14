import { SCRIMMAGE } from "./usePosts";
import { ScrimmagePost } from "./ScrimmagePost";
import { Box } from "../ui";

export const SelectPostType = ({ post, updateScrimmages, isCoach }) => {
    switch (post.type) {
        case SCRIMMAGE:
            return (
                <ScrimmagePost
                    isCoach={isCoach}
                    scrimmage={post}
                    updateScrimmages={updateScrimmages}
                />
            );
        default:
            return <Box>Coming Soon</Box>;
    }
};
