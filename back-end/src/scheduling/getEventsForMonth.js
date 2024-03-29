// import * as admin from 'firebase-admin';

// export const getEventsForMonth = async ({ userEmail, month, year }) => {
//     const queryResult = await admin.firestore().collection('events')
//         .where('invitees', 'array-contains', userEmail)
//         .where('month', '==', month)
//         .where('year', '==', year)
//         .get();

//     return queryResult.docs.map(doc => ({
//         ...doc.data(),
//         date: doc.data().date.toDate(),
//         id: doc.id,
//     }));
// }

import { Events } from "../models";
export const getEventsForMonth = async ({ userEmail, month, year }) => {
    const events = await Events.find({
        invitees: { $elemMatch: { email: userEmail } },
        month: month,
        year: year,
    });
    return events;
};
