import { atom, selector } from "recoil";

export const organizationsState = atom({
    key: "organizationsState",
    default: null,
});

const teamsInfoState = atom({
    key: "teamsInfoState",
    default: [],
});

export const leaguesState = atom({
    key: "leaguesState",
    default: {},
});

// GET TEAM
export const getOrganizationsState = selector({
    key: "getOrganizationsState",
    get: ({ get }) => {
        const state = get(organizationsState);
        return state;
    },
});

// SET TEAM
export const setOrganizationsState = selector({
    key: "setOrganizationsState",
    set: ({ set }, newTeamValue) => {
        set(organizationsState, newTeamValue);
    },
});

// TEAMS INFO
// Get Teams
export const getTeamInfoState = selector({
    key: "getTeamInfoState",
    get: ({ get }) => {
        const state = get(teamsInfoState);
        return state;
    },
});

// SET TEAM
export const setTeamInfoState = selector({
    key: "setTeamInfoState",
    set: ({ set }, newTeamValue) => {
        set(teamsInfoState, newTeamValue);
    },
});
