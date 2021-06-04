// import * as admin from 'firebase-admin';

// export const createEvent = async event => {
//     await admin.firestore().collection('events').add({
//         ...event,
//         date: admin.firestore.Timestamp.fromDate(new Date(event.date)),
//         year: `${1900 + (new Date(event.date)).getYear()}`,
//         month: `${(new Date(event.date)).getMonth()}`,
//     });
// }
import { Events } from "../models";

export const createEvent = async ({
    name,
    time,
    date,
    description,
    background_color,
    invitees,
    created_by,
}) => {
    console.log(invitees);
    const dateObject = new Date(date);
    const newEvent = new Events({
        name: name,
        time: time,
        description,
        background_color,
        date: dateObject,
        year: dateObject.getFullYear(),
        month: dateObject.getMonth(),
        invitees,
        created_by,
    });
    await newEvent.save();
};
