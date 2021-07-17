import { useRecoilValue } from 'recoil';
import { Box } from "../ui";
import { NotificationsList } from './NotificationsList';
import { notificationsState } from './notificationsState';

export const NotificationsPage = () => {
	const notifications = useRecoilValue(notificationsState);

	return (
		<Box style={{ margin: 'auto', maxWidth: '400px' }}>
			<NotificationsList notifications={notifications} />
		</Box>
	)
}