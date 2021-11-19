import { atom } from "recoil";
import { selector } from "recoil";

export const gameForTournamentState = atom({
    key: "gameForTournamentState",
    default: {},
});

export const basicTournamentInformationState = atom({
    key: "basicTournamentInformationState",
    default: {
        name: "",
    },
});

export const basicTournamentInformationSelector = selector({
    key: "basicTournamentInformationSelector",
    set: async ({ set, get }, values) => {
        const { fieldName, value } = values;
        let updated = { ...get(basicTournamentInformationState) };
        updated[fieldName] = value;
        set(basicTournamentInformationState, updated);
    },
});

export const getTournamentDetailSelector = selector({
    key: "getTournamentDetailSelector",
    get: ({ get }) => {
        const { name: gameName, img } = get(gameForTournamentState);
        const { name: tournamentName } = get(basicTournamentInformationState);
        return {
            gameName,
            img,
            tournamentName,
        };
    },
});
