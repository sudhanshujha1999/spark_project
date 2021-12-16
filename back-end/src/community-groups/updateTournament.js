import { Tournament } from "../models";

export const updateTournament = async ({ params, tournamentId, userId }) => {
    if (!tournamentId) {
        throw new Error("no-tournamentId");
    }
    const ifTournament = await Tournament.findOne({ _id: tournamentId, created_by_user: userId });
    if (!ifTournament) {
        throw new Error("no-tournament-for-user-top-update");
    }
    let query = {};
    for (var key in params) {
        //could also be req.query and req.params
        params[key] !== "" ? (query[key] = params[key]) : null;
    }
    if (!Object.keys(query).length) {
        return tournamentId;
    }
    const tournament = await Tournament.findByIdAndUpdate(tournamentId, query, { new: true });
    console.log("Tournament-updated");
    return tournament._id;
};
