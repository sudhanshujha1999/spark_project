import passport from "passport";
import { getUserById, createUserCustomToken } from "../users";

export const discordAuthRedirectRoute = {
    path: "/discord/auth/redirect/",
    method: "get",
    // when we apply this middleware on redirect it checks if there is a code provided by the auth provider
    // it exchanges the token with info and access token
    // then runs the callback fn in discord strategy
    middleware: passport.authenticate("discord"),
    handler: async (req, res) => {
        try {
            // the serialize and deserialize addes a userId or a userObject in req.user
            const userId = req.user;
            const user = await getUserById(userId);
            // create a custom token to log them in
            const token = await createUserCustomToken(user.auth_id);
            const baseUrl = req.app.get("baseFrontEndUrl");
            // send to a page where the token is recevied
            return res.redirect(`${baseUrl}/discord/auth/redirect?token=${token}`);
        } catch (error) {
            console.log(error.message);
            console.log(error);
            return res.status(500);
        }
    },
};
