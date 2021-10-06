import { Box, Typography } from "../ui";
import { SelectPostType } from "./SelectPostType";

export const AllPosts = ({ posts, isLoading, updateScrimmages, isCoach }) => {
    return (
        <Box my={2}>
            {/* {isLoading
                ? "loading..."
                : posts.map((post) => (
                      <SelectPostType
                          isCoach={isCoach}
                          post={post}
                          updateScrimmages={updateScrimmages}
                      />
                  ))} */}
            <Typography variant='h6'>Coming Soon!!</Typography>
        </Box>
    );
};
