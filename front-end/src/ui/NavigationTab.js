import { Box, Tabs, Tab } from "../ui";

export const NavigationTab = ({ tabLabel, value, setValue }) => {
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box width='100%'>
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
    );
};
