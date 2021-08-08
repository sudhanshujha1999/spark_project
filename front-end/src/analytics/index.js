import mixpanel from 'mixpanel-browser';

// This is a public key, so it's okay to add it to our front-end
const MIXPANEL_PUBLIC_KEY = '81c9c12f8cd5d6e22ae6a7b80f1327e5';

export const initializeAnalytics = () => {
	mixpanel.init(MIXPANEL_PUBLIC_KEY);
	mixpanel.track('Sign up');
}

export const sendEvent = (eventName, extraData = {}) => {
	mixpanel.track(eventName, extraData);
}