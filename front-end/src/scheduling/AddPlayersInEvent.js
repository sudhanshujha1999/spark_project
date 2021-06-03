import { Box, Typography } from "../ui";
import { useOrganizations } from "../teams";
import { useEffect, useState } from "react";
import { TeamPlayerSelect } from "./TeamPlayerSelect";

export const AddPlayersInEvent = ({ userId, setInvitees, invitees }) => {
    const [organizations] = useOrganizations();
    const [allTeams, setAllTeams] = useState([]);

    useEffect(() => {
        if (organizations && organizations.length > 0) {
            organizations.forEach(({ teams }) => setAllTeams([...teams]));
        }
    }, [organizations]);

    return (
        <Box>
            <Typography variant='h6' gutterBottom>
                Your Teams
            </Typography>
            {allTeams.map((team) => (
                <TeamPlayerSelect
                    userId={userId}
                    team={team}
                    invitees={invitees}
                    setInvitees={setInvitees}
                />
            ))}
        </Box>
    );
};
