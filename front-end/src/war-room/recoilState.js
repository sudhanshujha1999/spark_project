import { atom, selector } from "recoil";

export const pathsState = atom({
    key: "pathsState",
    default: [],
});

export const nameState = atom({
    key: "nameState",
    default: "",
});

export const newStageState = atom({
    key: "newStageState",
    default: false,
});

export const stageDescriptionState = atom({
    key: "stageDescriptionState",
    default: "",
});

export const pathState = atom({
    key: "pathState",
    default: [],
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
