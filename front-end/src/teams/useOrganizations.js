import { useState, useEffect } from "react";
import { useCurrentUserInfo } from "../users";
import { get } from "../network";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { getOrganizationsState, setOrganizationsState } from "./recoil";

export const useOrganizations = (update = false) => {
    const { userInfo = {} } = useCurrentUserInfo();
    const authId = userInfo.auth_id;
    const [isLoading, setIsLoading] = useState(true);
    const organizations = useRecoilValue(getOrganizationsState);
    const setOrganizations = useSetRecoilState(setOrganizationsState);
    const [error, setError] = useState([]);

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
            }
        };

        if (authId) {
            loadOrganization();
        }
        // eslint-disable-next-line
    }, [authId, setOrganizations]);

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
            }
        };
        if (authId) {
            loadOrganization();
        }
        setIsLoading(false);
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
            };
            setIsLoading(false);
            updateOrganization();
        }
        // eslint-disable-next-line
    }, [update]);

    return [organizations, isLoading, error, setOrganizations];
};
