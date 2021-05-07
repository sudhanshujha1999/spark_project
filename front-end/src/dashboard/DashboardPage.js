import { useTeams } from "../teams";
import { Box, Typography } from "../ui";
import { useCurrentUserInfo } from "../users";
import { useStyles } from "./Styles";
import { useEffect, useState } from "react";
import { OrganizationPage } from "./OrganizationPage";
import { OrganizationPicklistPage } from "./OrganizationPicklistPage";

export const DashboardPage = () => {
    const classes = useStyles();
    const { userInfo } = useCurrentUserInfo();
    const { membershipTypeId = "" } = userInfo || {};
    const isCoach = membershipTypeId === "coach";
    const [teams, isLoadingTeams] = useTeams();
    const { school: oraganiszation } = teams[0] || {};
    const [groupedOraganizations, setGroupedOrganizations] = useState([]);
    const [selectedOrganization, setSelectedOrganization] = useState(null);

    useEffect(() => {
        if (!isLoadingTeams) {
            if (teams.length > 0) {
                let organizationsGroup = [];
                //  To reduce some time, i think basic for takes less time than the func, but does time matters in JS?
                for (let i = 0; i < teams.length; i++) {
                    const { school: organizationForTeam } = teams[i];
                    // For each team we check them and group them
                    // This takes index
                    let arrayIfFoundIndex = null;
                    // This is flag if array found
                    let arrayFound = false;
                    // This finds the org if in the group
                    organizationsGroup.forEach((org, index) => {
                        if (org[0].school.id === organizationForTeam.id) {
                            arrayIfFoundIndex = index;
                            arrayFound = true;
                        }
                    });
                    // added a boolean value cause it takes 0 as false and if you add if >= 0 it take null as true
                    if (arrayFound) {
                        // push to that group
                        organizationsGroup[arrayIfFoundIndex].push(teams[i]);
                    } else {
                        // make a new group
                        organizationsGroup.push([teams[i]]);
                    }
                }
                // Add to groups
                setGroupedOrganizations(organizationsGroup);
                if (organizationsGroup.length === 1) {
                    setSelectedOrganization(organizationsGroup[0]);
                }
            }
        }
    }, [teams, isLoadingTeams]);

    return (
        <Box style={{ position: "relative", minHeight: "83vh" }}>
            {isLoadingTeams ? (
                <p>Loading...</p>
            ) : // Later change to ternary op
            groupedOraganizations.length > 0 ? (
                selectedOrganization ? (
                    <>
                        <OrganizationPage
                            teams={selectedOrganization}
                            isCoach={isCoach}
                            oraganiszation={selectedOrganization[0].school}
                        />
                    </>
                ) : (
                    <>
                        <OrganizationPicklistPage
                            organizations={groupedOraganizations}
                            setSelectedOrg={setSelectedOrganization}
                        />
                    </>
                )
            ) : (
                <Typography variant='h3'>You have no orgs create one</Typography>
            )}
        </Box>
    );
};
