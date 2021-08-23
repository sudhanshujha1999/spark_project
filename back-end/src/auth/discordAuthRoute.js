import passport from "passport";
import { addDestination } from "../middleware";

export const discordLoginRoute = {
    path: "/discord/login/",
    method: "get",
    middleware: [passport.authenticate("discord")],
    handler: async (req, res) => {
        console.log("login Complete");
    },
};
