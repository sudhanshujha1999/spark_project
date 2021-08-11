import passportDiscord from "passport-discord";
import passport from "passport";

const DiscordStrategy = passportDiscord.Strategy;
// middleware that runs when we use passport.authenticate
export const discordStrategy = (app) => {
    const scopes = ["identify", "email", "guilds", "guilds.join"];

    const strategyOptions = {
        clientID: process.env.DISCORD_CLIENT_ID,
        clientSecret: process.env.DISCORD_CLIENT_SECRET,
        // redirect uri,
        // if it's our server then the verifyCallback function runs
        // but if it's a client side callback it dosent work, but the authentication is done in both cases
        // callbackURL: "http://localhost:8080/api/discord/auth/redirect/",
        callbackURL: "http://localhost:3000/discord/auth/redirect/",
        scope: scopes,
    };

    const verifyCallback = async (accessToken, refreshToken, profile, done) => {
        // TODO
        console.log("Todo on profile");
        console.log(profile);
        console.log(accessToken);
        console.log(refreshToken);
        // according to othere tuts they make the usee here in db and
        // serializeUser and the server endpoint is called where we get the serialized User and redirect
    };
    passport.use(new DiscordStrategy(strategyOptions, verifyCallback));
    return app;
};
