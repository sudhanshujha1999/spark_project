import firebase from 'firebase/app';

export const signOut = () => {
    return firebase.auth().signOut();
}