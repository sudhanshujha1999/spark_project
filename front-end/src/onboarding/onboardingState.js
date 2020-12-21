import { atom } from 'recoil';

export const onboardingState = atom({
    persistence_UNSTABLE: {
        type: 'onboardingState'
    },
    key: 'onboardingState',
    default: {
        userInfo: {},
        schoolInfo: {},
        teams: [],
        newTeamInfo: {},
    },
});
