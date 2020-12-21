import { getUserByAuthId } from '../users';
import { getAllTeamsForUser } from './getAllTeamsForUser';
import { getTeamsForUserByPosition } from './getTeamsForUserByPosition';

export const getTeamsForUserRoute = {
    path: '/users/:userId/teams',
    method: 'get',
    handler: async (req, res) => {
        const { userId: authId } = req.params;
        const user = await getUserByAuthId(authId);
        const teams = await getAllTeamsForUser(user.id);

        res.status(200).json(teams);
    },
}