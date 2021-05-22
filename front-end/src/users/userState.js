import { atom, selector } from "recoil";

export const userState = atom({
    key: "userState",
    default: null,
});

export const addOrganizationToUser = selector({
    key: "addOrganizationToUser",
    set: ({ get, set }, organizationId) => {
        let userOrganizations = [...get(userState).organizations];
        userOrganizations.push(organizationId);
        set(userState, { ...get(userState), organizations: userOrganizations });
    },
});
