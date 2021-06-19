import { atom, selector } from "recoil";

// all war-room sessions
export const sessionState = atom({
    key: "sessionState",
    default: null,
});

// this contains all the previous states
export const pathsState = atom({
    key: "pathsState",
    default: [],
});

// contaniers the name of the current state
export const nameState = atom({
    key: "nameState",
    default: "",
});

// description of current state
export const stageDescriptionState = atom({
    key: "stageDescriptionState",
    default: "",
});

// flag helps in resetting things in other conponents
export const newStageState = atom({
    key: "newStageState",
    default: false,
});

// paths of current state
export const pathState = atom({
    key: "pathState",
    default: [],
});

// download flag state
export const downloadState = atom({
    key: "downloadState",
    default: false,
});

export const variableDataState = atom({
    key: "variableDataState",
    default: {
        strategy: "",
        opponent_strategy: "",
    },
});

export const addNewPathToState = selector({
    key: "addNewPathToState",
    set: ({ get, set }) => {
        const name = get(nameState);
        const path = get(pathState);
        const description = get(stageDescriptionState);
        const newStage = {
            name,
            path,
            description,
        };
        const stage = [...get(pathsState), newStage];
        set(pathsState, stage);
        set(nameState, "");
        set(pathState, []);
        set(stageDescriptionState, "");
    },
});

export const editStageState = selector({
    key: "editStageState",
    set: ({ get, set }, index) => {
        const name = get(nameState);
        const path = get(pathState);
        const description = get(stageDescriptionState);
        const newStage = {
            name,
            path,
            description,
        };
        const paths = get(pathsState);
        const stage = paths.map((item, i) => {
            if (i === index) {
                return newStage;
            } else {
                return item;
            }
        });
        set(pathsState, stage);
        set(nameState, "");
        set(pathState, []);
        set(stageDescriptionState, "");
    },
});

export const deleteStageStage = selector({
    key: "deleteStageStage",
    set: ({ get, set }, index) => {
        const paths = get(pathsState);
        const stage = paths.filter((item, i) => i !== index);
        set(pathsState, stage);
        set(nameState, "");
        set(pathState, []);
        set(stageDescriptionState, "");
    },
});

export const setDownload = selector({
    key: "setDownload",
    set: ({ set }) => {
        set(downloadState, true);
    },
});
// later add invitees
export const saveDataFromInfo = selector({
    key: "saveDataFromInfo",
    set: ({ set }, { strategy, opponentStrategy }) => {
        set(variableDataState, { strategy: strategy, opponent_strategy: opponentStrategy });
    },
});
