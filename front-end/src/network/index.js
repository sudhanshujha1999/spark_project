import axios from 'axios';
import firebase from 'firebase';

const getAuthToken = async () => {
    const user = firebase.auth().currentUser;
    return user && await user.getIdToken();
}

export const get = async url => {
    const authtoken = await getAuthToken();
    return axios.get(url, { headers: { authtoken } });
}

export const post = async (url, payload) => {
    const authtoken = await getAuthToken();
    return axios.post(url, payload, { headers: { authtoken } });
}

export const del = async url => {
    const authtoken = await getAuthToken();
    return axios.delete(url, { headers: { authtoken } });
}