import { atom, selector } from "recoil";

const teamsState = atom({
    key: "teamsState",
    default: null,
});

const teamsInfoState = atom({
    key: "teamsInfoState",
    default: [],
});

// GET TEAM
export const getTeamState = selector({
    key: "getTeamState",
    get: ({ get }) => {
        const state = get(teamsState);
        return state;
    },
});

// SET TEAM
export const setTeamState = selector({
    key: "setTeamState",
    set: ({ set }, newTeamValue) => {
        set(teamsState, newTeamValue);
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
