import { atom, selector } from "recoil";

const teamsState = atom({
    key: "teamsState",
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
