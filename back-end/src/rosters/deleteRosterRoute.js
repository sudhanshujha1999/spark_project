import { deleteRoster } from './deleteRoster';

export const deleteRosterRoute = {
    path: '/rosters/:id',
    method: 'delete',
    handler: async (req, res) => {
        const { id: rosterId } = req.params;
        try {
            await deleteRoster(rosterId);
            res.sendStatus(200);
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    }
}