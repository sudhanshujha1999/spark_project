import { Box, Icon, Typography } from "../ui";
import { SettingsIcon } from "../icons";
import { GeneralSettingsInputs } from "./GeneralSettingsInputs";

export const GeneralSettings = ({ saveNewDetails }) => {
    const saveFunction = () => {
        saveNewDetails();
    };
    return (
        <Box>
            <Box my={2} display='flex' alignItems='center'>
                <Box mr={2}>
                    <Icon fontSize='large'>
                        <SettingsIcon fontSize='large' />
                    </Icon>
                </Box>

                <Box>
                    <Typography variant='h3'>General Settings</Typography>
                </Box>
            </Box>
            <Box mt={4}>
                <GeneralSettingsInputs saveFunction={saveFunction} />
            </Box>
        </Box>
    );
};
