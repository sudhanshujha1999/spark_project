import { useStyles } from "./styles";
import { Box, Tabs, Tab } from "../ui";
import { Drawer } from "@material-ui/core";

export const SideControl = ({ tabs, value, setValue }) => {
    const classes = useStyles();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box className={classes.controlDrawer}>
            <Drawer variant='permanent' open={true}>
                <Tabs
                    orientation='vertical'
                    variant='scrollable'
                    value={value}
                    onChange={handleChange}
                    sx={{ borderRight: 1, borderColor: "#333" }}>
                    {tabs.map(({ name, icon }) => (
                        <Tab
                            key={name}
                            sx={{
                                padding: "10px 0",
                            }}
                            label={name}
                        />
                    ))}
                </Tabs>
            </Drawer>
        </Box>
    );
};
