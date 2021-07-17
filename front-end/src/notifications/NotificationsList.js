export const NotificationsList = ({ notifications = [] }) => {
	return notifications.length > 0 ? (
		<>
		{notifications.map(notification => (
			<>
			<div>
				<h3>{new Date(notification.createdAt).toLocaleDateString('en-US')}</h3>
				<p>{notification.message}</p>
			</div>
			<hr />
			</>
		))}
		</>
	) : (
		<div>You have no notifications at this time</div>
	)
}