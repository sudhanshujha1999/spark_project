import { useState, useEffect, useCallback } from "react";
import { useCurrentUserInfo } from "../users";
import { get } from "../network";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { getOrganizationsState, setOrganizationsState } from "./recoil";
import { useIsCoach } from "../users/useIsCoach";

export const useOrganizations = () => {
    const { userInfo = {} } = useCurrentUserInfo();
    const authId = userInfo.auth_id;
    const [isLoading, setIsLoading] = useState(true);
    const [update, setUpdate] = useState(false);
    const organizations = useRecoilValue(getOrganizationsState);
    const setOrganizations = useSetRecoilState(setOrganizationsState);
    const [selectedOrganization, setSelectedOrganization] = useState({});
    const { teamsForEvents, teamsForGoals } = useIsCoach();
    const [error, setError] = useState([]);

    const updateOrganizations = useCallback(() => {
        setUpdate(true);
    }, []);

    useEffect(() => {
        const loadOrganization = async () => {
            // if no organizations call it ie. if organization is null at the beggining
            if (!organizations) {
                console.log("first");
                setIsLoading(true);
                try {
                    const { data } = await get(`/api/users/${authId}/teams`);
                    setOrganizations(data.organizations);
                } catch (e) {
                    console.log("Error!");
                    setError(e.message);
                }
                setIsLoading(false);
            } else {
                setIsLoading(false);
            }
        };

        if (authId) {
            loadOrganization();
        }
        // eslint-disable-next-line
    }, [authId]);

    useEffect(() => {
        const loadOrganization = async () => {
            // if the organization is added to the userInfo object
            if (organizations && organizations.length !== userInfo.organizations.length) {
                setIsLoading(true);
                try {
                    console.log("updating_on_length");
                    const { data } = await get(`/api/users/${authId}/teams`);
                    setOrganizations(data.organizations);
                } catch (e) {
                    console.log("Error!");
                    setError(e.message);
                }
                setIsLoading(false);
            }
        };
        if (authId) {
            loadOrganization();
        }
        // eslint-disable-next-line
    }, [userInfo]);

    useEffect(() => {
        if (update) {
            console.log("update_modified");
            const updateOrganization = async () => {
                setIsLoading(true);
                try {
                    console.log("updating");
                    const { data } = await get(`/api/users/${authId}/teams`);
                    setOrganizations(data.organizations);
                } catch (e) {
                    console.log("Error!");
                    setError(e.message);
                }
                setIsLoading(false);
            };
            updateOrganization();
        }
        // eslint-disable-next-line
    }, [update]);

    useEffect(() => {
        // this will help us to return the selected org if more than one org are there
        if (organizations && organizations.length > 0) {
            // get the teams from selected organization
            const { teams, ...rest } = organizations[0];
            // add permissions to the objects
            const teamsInfoWithPermission = teams.map((team) => ({
                ...team,
                editEvents: teamsForEvents.includes(team._id),
                editGoals: teamsForGoals.includes(rest._id),
            }));
            const oragnizationWithPermission = {
                ...rest,
                editEvents: teamsForEvents.includes(rest._id),
                editGoals: teamsForGoals.includes(rest._id),
                teams: teamsInfoWithPermission,
            };
            setSelectedOrganization(oragnizationWithPermission);
        }
    }, [organizations, teamsForEvents, teamsForGoals]);

    return {
        organizations: selectedOrganization,
        allOrganizations: organizations || [],
        isLoading,
        error,
        setOrganizations,
        updateOrganizations,
    };
};
