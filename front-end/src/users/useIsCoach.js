import { useRecoilValue, useRecoilState } from "recoil";
import { userState, userPermissionsState } from "./userState";
import { useEffect, useState } from "react";
import { useOrganizations } from "../teams/useOrganizations";
import { get } from "../network";

export const useIsCoach = (groupId) => {
    const user = useRecoilValue(userState);
    const { allOrganizations: organizations } = useOrganizations(true);
    const [permissions, setPermissions] = useRecoilState(userPermissionsState);
    const [selectedGroup, setSelectedGroup] = useState({});
    // need to load permissions here
    // currently a small logic to fix that but will add the perrmissions route here

    useEffect(() => {
        if (user) {
            const loadPermissions = async () => {
                const {
                    data: { permissions },
                } = await get(`/api/${user._id}/permissions`);
                setPermissions(permissions);
            };
            loadPermissions();
        }
    }, [organizations, user]);

    useEffect(() => {
        if (permissions) {
            console.log("isCoachArray_change");
            if (permissions[groupId]) {
                setSelectedGroup(permissions[groupId]);
            }
        }
    }, [permissions, groupId]);
    // to add more just go for selectedGroup.CAN_VIEW_EVENTS
    return { isCoach: selectedGroup.ADMIN || false };
};
