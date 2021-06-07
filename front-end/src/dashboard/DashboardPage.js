import { useOrganizations } from "../teams";
import { Box, Button, Typography } from "../ui";
import { useCurrentUserInfo } from "../users";
// import { useStyles } from "./Styles";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { OrganizationPage } from "./OrganizationPage";
// import { OrganizationPicklistPage } from "./OrganizationPicklistPage";

export const DashboardPage = () => {
    // const classes = useStyles();
    const history = useHistory();
    const { userInfo } = useCurrentUserInfo();
    const [organizations, isLoadingOrganizations] = useOrganizations();
    const [selectedOrganization, setSelectedOrganization] = useState(null);

    useEffect(() => {
        if (!isLoadingOrganizations) {
            if (organizations && organizations.length === 1) {
                setSelectedOrganization(organizations[0]);
            }
        }
    }, [organizations, isLoadingOrganizations]);

    const makeOrganization = () => {
        history.push("/dashboard/create-organization");
    };

    return (
        <Box style={{ position: "relative", minHeight: "83vh" }}>
            {isLoadingOrganizations ? (
                <p>Loading...</p>
            ) : // If the organization is null ie. in the start and check for the length
            organizations && organizations.length > 0 ? (
                selectedOrganization ? (
                    <>
                        <OrganizationPage
                            teams={selectedOrganization.teams}
                            user={userInfo}
                            organization={selectedOrganization}
                        />
                    </>
                ) : (
                    <>
                        Need picklist and make a default organization that is selected for the rest
                        of the operations
                        {/* <OrganizationPicklistPage
                            organization={organizations}
                            setSelectedOrg={setSelectedOrganization}
                        /> */}
                    </>
                )
            ) : (
                <Box>
                    <Typography
                        variant='h3'
                        style={{
                            marginBottom: 50,
                        }}>
                        Welcome to Spark
                    </Typography>
                    <Typography
                        variant='h6'
                        style={{
                            marginBottom: 20,
                            width: "max(300px, 60vw)",
                        }}>
                        Currently you don't have any organization, you can create one or ask your
                        coach to invite in an existing organization
                    </Typography>
                    <Button variant='contained' onClick={makeOrganization}>
                        Create Organization
                    </Button>
                </Box>
            )}
        </Box>
    );
};
