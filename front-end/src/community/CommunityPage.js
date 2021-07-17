import { Box, Tabs, Tab } from "../ui";
import { usePosts } from "./usePosts";
import { useState } from "react";
import { Scrimmages } from "./Scrimmages";
import { ComingSoon } from "./ComingSoon";

const tabLabel = ["All", "Scrimmages"];

export const CommunityPage = () => {
    const { isLoading, otherScrimmages, updateScrimmages } = usePosts();

    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const TABS = [
        <ComingSoon />,
        <Scrimmages
            isLoading={isLoading}
            scrimmages={otherScrimmages}
            updateScrimmages={updateScrimmages}
        />,
    ];
    return (
        <Box>
            <Box>
                <Tabs value={value} onChange={handleChange}>
                    {tabLabel.map((item) => (
                        <Tab label={item} />
                    ))}
                </Tabs>
            </Box>
            {TABS[value]}
        </Box>
    );
};
