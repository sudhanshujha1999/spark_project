import * as admin from 'firebase-admin';

export const createEvent = async event => {
    await admin.firestore().collection('events').add({
        ...event,
        date: admin.firestore.Timestamp.fromDate(new Date(event.date)),
        year: `${1900 + (new Date(event.date)).getYear()}`,
        month: `${(new Date(event.date)).getMonth()}`,
    });
}