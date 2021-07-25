import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { notificationsState } from './notificationsState';
import {
	NotificationsIcon,
} from '../icons';
import {
	Badge,
	Box,
	Menu,
	MenuItem,
} from '../ui';

export const NotificationsButton = () => {
	const [anchorEl, setAnchorEl] = useState(null);
  
	const handleOpen = (event) => {
	  setAnchorEl(event.currentTarget);
	};
  
	const handleClose = () => {
	  setAnchorEl(null);
	};
  
	const notifications = useRecoilValue(notificationsState);
	const unreadNotifications = notifications.filter(n => !n.isRead);

	return (
		<>
		<Box mx={3} style={{ cursor: 'pointer' }} onClick={handleOpen}>
			{unreadNotifications.length > 0 ? (
				<Badge
					color="primary"
					anchorOrigin={{
						vertical: "top",
						horizontal: "right",
					}}
					badgeContent={unreadNotifications.length}
				>
					<NotificationsIcon />
				</Badge>
			) : <NotificationsIcon />}
		</Box>
		<Menu
			anchorEl={anchorEl}
			keepMounted
			open={Boolean(anchorEl)}
			onClose={handleClose}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'right',
			}}
			disableScrollLock
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
		>
			{notifications.map(notification => (
				<MenuItem style={{ minWidth: 300, borderBottom: '1px solid #777' }}>
					<Box>
						<h3>{new Date(notification.createdAt).toLocaleDateString()}</h3>
						<p>{notification.message}</p>
					</Box>
				</MenuItem>
			))}
		</Menu>
		</>
	);
}