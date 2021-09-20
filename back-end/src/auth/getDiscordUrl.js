export const getDiscordUrl = {
    path: "/discord/url/",
    method: "get",
    handler: async (req, res) => {
        const baseUrl = req.app.get("baseBackEndUrl");
        const loginUrl = `${baseUrl}/discord/login`;
        const linkingUrl = `${baseUrl}/discord/link/`;
        console.log("discord link found");
        res.status(200).json({
            loginUrl,
            linkingUrl,
        });
    },
};
