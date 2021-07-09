export const NotificationsList = ({ notifications }) => {
	return notifications.length > 0 ? (
		<>
		{notifications.map(notification => (
			<div>
				<h3>{notification.date}</h3>
				<p>{notification.message}</p>
			</div>
		))}
		</>
	) : (
		<div>You have no notifications at this time</div>
	)
}