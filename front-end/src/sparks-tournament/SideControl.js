import { useStyles } from "./styles";
import { Box, Tabs, Tab } from "../ui";
import { useState } from "react";

export const SideControl = ({ tabs }) => {
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box pb={3}>
            <Tabs
                orientation='vertical'
                variant='scrollable'
                value={value}
                onChange={handleChange}
                sx={{ borderRight: 1, borderColor: "#333" }}>
                {tabs.map(({ name, icon }) => (
                    <Tab
                        sx={{
                            padding: "10px 0",
                        }}
                        label={name}
                    />
                ))}
            </Tabs>
        </Box>
    );
};
