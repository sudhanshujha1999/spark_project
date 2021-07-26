import { atom, selector } from "recoil";

export const allScrimmagesState = atom({
    key: "allScrimmagesState",
    default: null,
});

export const invitationAcceptedSelector = selector({
    key: "invitationAcceptedSelector",
    set: ({ set, get }, { requestId, scrimmageId }) => {
        const scrimmages = [...get(allScrimmagesState)];
        const updatedScrimmages = [];
        for (let i = 0; i < scrimmages.length; i++) {
            if (scrimmages[i]._id === scrimmageId) {
                const { requests, ...rest } = scrimmages[i];
                const newRequests = requests.map((request) => {
                    if (request._id === requestId) {
                        return { ...request, accepted: true, declined: false };
                    } else {
                        return request;
                    }
                });
                updatedScrimmages.push({ ...rest, requests: newRequests });
            } else {
                updatedScrimmages.push(scrimmages[i]);
            }
        }
        set(allScrimmagesState, updatedScrimmages);
    },
});

export const invitationDeclinedSelector = selector({
    key: "invitationDeclinedSelector",
    set: ({ set, get }, { requestId, scrimmageId }) => {
        const scrimmages = [...get(allScrimmagesState)];
        const updatedScrimmages = [];
        for (let i = 0; i < scrimmages.length; i++) {
            if (scrimmages[i]._id === scrimmageId) {
                const { requests, ...rest } = scrimmages[i];
                const newRequests = requests.map((request) => {
                    if (request._id === requestId) {
                        return { ...request, accepted: false, declined: true };
                    } else {
                        return request;
                    }
                });
                updatedScrimmages.push({ ...rest, requests: newRequests });
            } else {
                updatedScrimmages.push(scrimmages[i]);
            }
        }
        set(allScrimmagesState, updatedScrimmages);
    },
});
