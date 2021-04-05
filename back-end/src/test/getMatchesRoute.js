import { connectToDb } from "../util";

export const getMatchesRoute = {
    path: "/test-match",
    method: "get",
    handler: async (req, res) => {
        try {
            const db = connectToDb("lol-stats");
            const results = await db.collection("users").find({}).toArray();
            // const results = await db.collection("matches").find({}).toArray();
            const matches = await db
                .collection("matches")
                .find({
                    gameId: {
                        $in: results[0].matchIds,
                    },
                })
                .toArray();
            return res.status(200).json({
                msg: "users Found",
                results,
                noOfMatches: matches.length,
                match: matches,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: "SERVER ERROR" });
        }
    },
};
