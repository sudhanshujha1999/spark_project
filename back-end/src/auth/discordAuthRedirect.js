import axios from "axios";
import passport from "passport";

export const discordAuthRedirectRoute = {
    path: "/discord/auth/redirect/",
    method: "get",
    // if we don't use serializeUser then i don't use this middleware of authenticate
    // middleware: passport.authenticate("discord", {
    //     failureRedirect: "/",
    // }),
    handler: async (req, res) => {
        try {
            // to make a work around, i madethe redirect to the frontend ie. client
            // and got the response_code, by whiich we can get the users access token and by which we can access his data
            // some how the redirect url is not working tried to send them as data as option setting header as client_id and secret,
            const { code } = req.query;
            // const code = 'TQr8GBXKjFsKvGYVy5EfzjEHuWMzR9'
            const baseUrl = `https://discord.com/api/oauth2/token`;
            const clientId = process.env.DISCORD_CLIENT_ID;
            const clientSecret = process.env.DISCORD_CLIENT_SECRET;
            const grantType = "authorization_code";
            const body = {
                client_id: clientId,
                client_secret: clientSecret,
                code: code,
                grant_type: "authorization_code",
                redirect_uri: encodeURI("http://localhost:3000/discord/code/redirect/"),
                scope: "identify email connections",
            };
            const param = Object.keys(body)
                .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(body[key])}`)
                .join("&");

            console.log(param);
            const ans = await axios.post(
                `https://discord.com/api/v8/oauth2/token`,
                param,
                // {
                //     client_id: clientId,
                //     client_secret: clientSecret,
                //     grant_type: "authorization_code",
                //     code: code,
                //     redirect_uri: redirectURI,
                //     scope: "identify email connections",
                // },
                {
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            );

            return res.status(200).json({
                logIn: true,
                // ans,
            });
        } catch (error) {
            console.log(error.message);
            console.log(error);
            return res.status(500);
        }
    },
};
