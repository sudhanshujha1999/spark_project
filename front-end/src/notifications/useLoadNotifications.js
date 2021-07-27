import { useEffect } from 'react';
import { useRecoilState } from "recoil";
import { get } from '../network';
import { useCurrentUser } from "../auth";
import { notificationsState } from "./notificationsState";

/*
	Since we're using recoil, we only need to load the notifications once.
	To access the loaded notifications, just use "useRecoilValue(notificationsState)"
	inside the component that needs it
*/
export const useLoadNotifications = () => {
	const [, setNotifications] = useRecoilState(notificationsState);
	const { isLoading: isLoadingCurrentUser, user } = useCurrentUser();
	const { uid: userId } = user || {};

	useEffect(() => {
		const loadNotifications = async () => {
			console.log('Loading notifications');
			const notifications = await get(`/api/users/${userId}/notifications`);
			setNotifications(notifications.data);
		}

		if (!isLoadingCurrentUser && user) {
			loadNotifications();
		}
	}, [isLoadingCurrentUser, user, userId, setNotifications]);
}