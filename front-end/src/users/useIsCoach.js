import { useRecoilValue } from "recoil";
import { userState } from "./userState";
import { useEffect, useState } from "react";
import { organizationsState } from "../teams/recoil";

export const useIsCoach = (groupId) => {
    const user = useRecoilValue(userState);
    const organizations = useRecoilValue(organizationsState);
    const [groups, setGroups] = useState([]);
    const [isCoachArray, setIsCoachArray] = useState({});
    const [isCoach, setIsCoach] = useState(false);

    useEffect(() => {
        if (organizations) {
            let makingGroupsArray = [...organizations];
            organizations.forEach((organization) => makingGroupsArray.push(...organization.teams));
            setGroups(makingGroupsArray);
        }
    }, [organizations]);

    useEffect(() => {
        if (groups.length > 0 && user) {
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
    }, [groups, user, setIsCoachArray]);

    useEffect(() => {
        if (isCoachArray) {
            setIsCoach(isCoachArray[groupId]);
        }
    }, [isCoachArray, groupId]);

    return isCoach;
};
