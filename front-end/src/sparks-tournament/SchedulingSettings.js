import { Box, Icon, Typography } from "../ui";
import { AccessTimeIcon } from "../icons";
import { SchedulingSettingsInput } from "./SchedulingSettingsInput";

export const SchedulingSettings = ({ saveNewDetails }) => {
    const saveFunction = () => {
        saveNewDetails();
    };
    return (
        <Box>
            <Box my={2} display='flex' alignItems='center'>
                <Box mr={2}>
                    <Icon fontSize='large'>
                        <AccessTimeIcon fontSize='large' />
                    </Icon>
                </Box>

                <Box>
                    <Typography variant='h3'>Scheduling settings</Typography>
                </Box>
            </Box>
            <Box mt={4}>
                <SchedulingSettingsInput saveFunction={saveFunction} />
            </Box>
        </Box>
    );
};
