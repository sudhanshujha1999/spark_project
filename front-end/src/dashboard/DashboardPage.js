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
    const {
        allOrganizations,
        organizations,
        isLoading: isLoadingOrganizations,
    } = useOrganizations();

    const makeOrganization = () => {
        history.push("/dashboard/create-organization");
    };

    return (
        <Box style={{ position: "relative", minHeight: "83vh" }}>
            {isLoadingOrganizations ? (
                <p>Loading...</p>
            ) : // If the organization is null ie. in the start and check for the length
            allOrganizations && allOrganizations.length > 0 ? (
                organizations ? (
                    <>
                        <OrganizationPage
                            teams={organizations.teams}
                            user={userInfo}
                            organization={organizations}
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
						Before you can invite players, you need to create a profile for your school or organization.
                    </Typography>
                    <Button variant='contained' onClick={makeOrganization}>
                        Create Organization
                    </Button>
                </Box>
            )}
        </Box>
    );
};
