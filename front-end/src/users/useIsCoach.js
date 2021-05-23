import { useRecoilValue } from "recoil";
import { userState } from "./userState";
import { useEffect, useState } from "react";
import { useOrganizations } from "../teams/useOrganizations";

export const useIsCoach = (groupId) => {
    const user = useRecoilValue(userState);
    const [organizations] = useOrganizations(true);
    const [groups, setGroups] = useState([]);
    const [isCoachArray, setIsCoachArray] = useState({});
    const [isCoach, setIsCoach] = useState(false);

    // need to load permissions here
    // currently a small logic to fix that but will add the perrmissions route here

    useEffect(() => {
        if (organizations) {
            let makingGroupsArray = [...organizations];
            organizations.forEach((organization) => makingGroupsArray.push(...organization.teams));
            setGroups(makingGroupsArray);
        }
    }, [organizations]);

    useEffect(() => {
        if (groups.length > 0 && user) {
            if (Object.keys(isCoachArray).length !== groups.length) {
                console.log("groups_change");
                groups.forEach((group) => {
                    group.admins.forEach((admin) => {
                        if (admin.id === user._id) {
                            setIsCoachArray((prevState) => {
                                return { ...prevState, [`${group._id}`]: true };
                            });
                        } else {
                            setIsCoachArray((prevState) => {
                                return { ...prevState, [`${group._id}`]: true };
                            });
                        }
                    });
                });
            }
        }
        // eslint-disable-next-line
    }, [groups, user, setIsCoachArray]);

    useEffect(() => {
        if (isCoachArray) {
            console.log("isCoachArray_change");
            setIsCoach(isCoachArray[groupId]);
        }
    }, [isCoachArray, groupId]);

    return isCoach;
};
