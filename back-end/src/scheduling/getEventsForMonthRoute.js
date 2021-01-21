import { getUserByAuthId } from '../users';
import { getEventsForMonth } from './getEventsForMonth';

export const getEventsForMonthRoute = {
    path: '/events/:year/:month',
    method: 'get',
    handler: async (req, res) => {
        const { year, month } = req.params;
        const { user_id: authId } = req.user;
        const user = await getUserByAuthId(authId);

        console.log({ year, month, user });

        const events = await getEventsForMonth({
            userEmail: user.email,
            year,
            month,
        });

        res.status(200).json(events);
    },
};