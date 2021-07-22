import { Box, Tabs, Tab } from "../ui";
import { usePosts } from "./usePosts";
import { useState } from "react";
import { Scrimmages } from "./Scrimmages";
import { AllPosts } from "./AllPosts";
import { useIsCoach } from "../users/useIsCoach";

const tabLabel = ["Home", "Scrimmages"];

export const CommunityPage = () => {
    const { posts, isLoading, otherScrimmages, updateScrimmages } = usePosts();
    const { isCoach } = useIsCoach();
    const onUpdateScrimmage = () => {
        updateScrimmages(true);
    };

    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const TABS = [
        <AllPosts
            isCoach={isCoach}
            posts={posts}
            isLoading={isLoading}
            updateScrimmages={onUpdateScrimmage}
        />,
        <Scrimmages
            isCoach={isCoach}
            isLoading={isLoading}
            scrimmages={otherScrimmages}
            updateScrimmages={updateScrimmages}
        />,
    ];
    return (
        <Box>
            <Box>
                <Tabs
                    textColor='secondary'
                    indicatorColor='secondary'
                    value={value}
                    onChange={handleChange}>
                    {tabLabel.map((item) => (
                        <Tab label={item} />
                    ))}
                </Tabs>
            </Box>
            {TABS[value]}
        </Box>
    );
};
