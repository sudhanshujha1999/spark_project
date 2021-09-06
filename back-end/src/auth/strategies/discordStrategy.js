import passportDiscord from "passport-discord";
import passport from "passport";
import {
    createUserInAuth,
    createUserInDB,
    updateDiscordInfo,
    getUserById,
    getUserByEmail,
} from "../../users/";
import { v4 as uuidV4 } from "uuid";

const DiscordStrategy = passportDiscord.Strategy;

// middleware that runs when we use passport.authenticate
passport.serializeUser((id, done) => {
    done(null, id);
});

passport.deserializeUser((id, done) => {
    done(id, null);
});

export const discordStrategy = (app) => {
    const scopes = ["identify", "email", "guilds", "guilds.join"];

    const strategyOptions = {
        clientID: process.env.DISCORD_CLIENT_ID,
        clientSecret: process.env.DISCORD_CLIENT_SECRET,
        // redirect uri,
        // if it's our server then the verifyCallback function runs
        // but if it's a client side callback it dosent work, but the authentication is done in both cases
        callbackURL: process.env.DISCORD_CALLBACK_URL,
        scope: scopes,
        passReqToCallback: true,
    };

    const verifyCallback = async (req, accessToken, refreshToken, profile, done) => {
        // TODO
        try {
            const linkEmail = req.cookies["savedEmail"];
            console.log("Todo on profile");
            const { email, verified, id, username, discriminator } = profile;
            //  first check if user exist or not
            console.log("Finding user...");
            let userId;
            if (linkEmail !== undefined) {
                console.log("Linking email:" + linkEmail);
                const user = await getUserByEmail(linkEmail);
                userId = user?._id;
            } else {
                console.log("Email:" + email);
                const user = await getUserByEmail(email);
                userId = user?._id;
            }
            console.log(userId ? "User found!" : "User not found!");
            // if not then create a user
            if (!userId) {
                console.log("Create new user");
                // a. in firebase
                const password = uuidV4();
                const authId = await createUserInAuth(email, password);
                // b. in mongo
                const newUserObject = {
                    email: email,
                    confirmationCode: password,
                    isConfirmed: verified,
                    auth_id: authId,
                };
                const newUserId = await createUserInDB(newUserObject);
                userId = newUserId;
            }
            // c. update discord info
            const discordUpdateObject = {
                discordId: id,
                username,
                discriminator,
                userId,
            };
            updateDiscordInfo(discordUpdateObject);
            done(null, userId);
        } catch (error) {
            console.log(error.message);
            done(null, null);
        }
        // according to othere tuts they make the usee here in db and
        // serializeUser and the server endpoint is called where we get the serialized User and redirect
        // can we save user from in req.user here and make our own middleware hat checks authentication
    };
    passport.use(new DiscordStrategy(strategyOptions, verifyCallback));
    return app;
};
