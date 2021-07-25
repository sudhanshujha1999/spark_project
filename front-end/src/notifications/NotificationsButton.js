import { useRecoilValue } from 'recoil';
import { notificationsState } from './notificationsState';
import {
	NotificationsIcon,
} from '../icons';
import {
	Badge,
	Box,
} from '../ui';

export const NotificationsButton = () => {
	const notifications = useRecoilValue(notificationsState);

	return (
		<Box style={{ cursor: 'pointer' }}>
			{notifications.length > 0 && (
				<Badge
					overlap='circle'
					color="primary"
					anchorOrigin={{
						vertical: "bottom",
						horizontal: "right",
					}}
					badgeContent={<div>{notifications.length}</div>}
				/>
			)}
			<NotificationsIcon />
		</Box>
	);
}