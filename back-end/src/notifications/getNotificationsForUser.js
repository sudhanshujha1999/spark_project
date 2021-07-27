import { Notifications } from "../models";

export const getNotificationsForUser = async userId => {
	const userNotifications = await Notifications
		.find({ userId })
		.sort({ createdAt: -1 });
	console.log(userNotifications);
	return userNotifications;
}