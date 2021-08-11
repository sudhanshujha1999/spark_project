import passport from "passport";

export const discordLoginRoute = {
    path: "/discord/login/",
    method: "get",
    middleware: passport.authenticate("discord"),
    handler: async (req, res) => {
        console.log("login Complete");
    },
};
