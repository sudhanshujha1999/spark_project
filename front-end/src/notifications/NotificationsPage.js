import { Box } from "../ui";
import { NotificationsList } from './NotificationsList';
import { useNotifications } from './useNotifications';

export const NotificationsPage = () => {
	const notifications = useNotifications();

	return (
		<Box>
			<NotificationsList notifications={notifications} />
		</Box>
	)
}