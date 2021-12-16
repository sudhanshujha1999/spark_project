import { Box, Icon, Typography } from "../ui";
import { AccountTreeIcon } from "../icons";
import { BracketSettingsInput } from "./BracketSettingsInput";

export const BracketSettings = ({ saveNewDetails }) => {
    return (
        <Box>
            <Box my={2} display='flex' alignItems='center'>
                <Box mr={2}>
                    <Icon fontSize='large'>
                        <AccountTreeIcon fontSize='large' />
                    </Icon>
                </Box>

                <Box>
                    <Typography variant='h3'>Bracket Settings</Typography>
                </Box>
            </Box>
            <Box mt={4}>
                <BracketSettingsInput saveFunction={saveNewDetails} />
            </Box>
        </Box>
    );
};
