import { Box, Typography } from "../ui";
import { useOrganizations } from "../teams";
import { useEffect, useState, useMemo } from "react";
import { TeamPlayerSelect } from "./TeamPlayerSelect";

export const AddPlayersInEvent = ({ userId, setInvitees, invitees, allowedTeams = [] }) => {
    const { allOrganizations: organizations } = useOrganizations();
    const [allTeams, setAllTeams] = useState([]);

    useEffect(() => {
        if (organizations && organizations.length > 0) {
            organizations.forEach(({ teams }) => setAllTeams([...teams]));
        }
    }, [organizations]);

    const teamForEvents = useMemo(() => {
        if (allTeams.length) {
            return allTeams.filter((team) => allowedTeams.includes(team._id));
        } else {
            return [];
        }
    }, [allTeams, allowedTeams]);
    return (
        <Box>
            <Box pl={2}>
                <Typography variant='body2' gutterBottom>
                    Your Teams
                </Typography>
            </Box>
            {teamForEvents.map((team) => (
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
