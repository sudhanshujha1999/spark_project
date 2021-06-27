import { Events } from "../models";

export const createEvent = async ({
    name,
    time,
    date,
    description,
    background_color,
    invitees,
    event_type,
    created_by,
}) => {
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
        event_type: event_type,
        created_by,
    });
    await newEvent.save();
    return newEvent._id;
};
