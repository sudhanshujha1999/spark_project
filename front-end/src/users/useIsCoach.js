import { useRecoilValue, useRecoilState } from "recoil";
import { userState, userPermissionsState } from "./userState";
import { useEffect, useState } from "react";
import { get } from "../network";

export const useIsCoach = (groupId) => {
    const user = useRecoilValue(userState);
    const [permissions, setPermissions] = useRecoilState(userPermissionsState);
    const [selectedGroup, setSelectedGroup] = useState({});
    const [allowedGroupsForGoals, setAllowedGroupsForGoals] = useState([]);
    const [allowedGroupsForEvents, setAllowedGroupsForEvents] = useState([]);
    // need to load permissions here
    // currently a small logic to fix that but will add the perrmissions route here

    useEffect(() => {
        if (user) {
            const loadPermissions = async () => {
                const {
                    data: { permissions },
                } = await get(`/api/${user._id}/permissions`);
                setPermissions(permissions);
                // console.log(permissions);
            };
            loadPermissions();
        }
        // eslint-disable-next-line
    }, [user]);

    // when permissions are fetched check for the allowed teams for certain criteria
    useEffect(() => {
        if (permissions) {
            const editEventForGroups = [];
            const editGoalsForGroups = [];
            Object.values(permissions).forEach((groupPermission) => {
                if (
                    groupPermission.CAPTIAN ||
                    groupPermission.CAN_EDIT_GOALS ||
                    groupPermission.ADMIN
                ) {
                    editGoalsForGroups.push(groupPermission.id);
                }
                if (
                    groupPermission.CAPTIAN ||
                    groupPermission.CAN_EDIT_EVENTS ||
                    groupPermission.ADMIN
                ) {
                    editEventForGroups.push(groupPermission.id);
                }
            });
            setAllowedGroupsForEvents(editEventForGroups);
            setAllowedGroupsForGoals(editGoalsForGroups);
        }
    }, [user, permissions]);

    useEffect(() => {
        if (permissions) {
            if (groupId) {
                console.log("isCoachArray_change");
                if (permissions[groupId]) {
                    setSelectedGroup(permissions[groupId]);
                }
            }
        }
    }, [permissions, groupId]);
    // to add more just go for selectedGroup.CAN_VIEW_EVENTS

    return {
        isCoach: selectedGroup.ADMIN || false,
        canEditGoals:
            selectedGroup.CAPTIAN ||
            selectedGroup.CAN_EDIT_GOALS ||
            selectedGroup.ADMIN ||
            allowedGroupsForGoals.length > 0,
        canEditEvents:
            selectedGroup.CAPTIAN ||
            selectedGroup.CAN_EDIT_EVENTS ||
            selectedGroup.ADMIN ||
            allowedGroupsForEvents.length > 0,
        teamsForGoals: allowedGroupsForGoals,
        teamsForEvents: allowedGroupsForEvents,
    };
};
