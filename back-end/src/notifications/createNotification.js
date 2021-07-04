import { Notifications } from "../models";

export const createNotification = async ({
	userId,
	message,
	createdAt,
}) => {
    const newEvent = new Notifications({
		userId,
		message,
		createdAt,
    });
    await newEvent.save();
    return newEvent._id;
}