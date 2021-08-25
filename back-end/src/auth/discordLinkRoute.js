import passport from "passport";
import { addDestination } from "../middleware";

export const discordLinkRoute = {
    path: "/discord/link/",
    method: "get",
    middleware: [addDestination, passport.authenticate("discord")],
    handler: async (req, res) => {
        console.log("Link Complete");
    },
};
