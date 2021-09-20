import { useEffect, useState } from "react";
import axios from "axios";

export const useDiscordUri = () => {
    const [discordLoginUrl, setDiscordLoginUrl] = useState("");
    const [discordLinkUrl, setDiscordLinkUrl] = useState("");

    useEffect(() => {
        const getUrl = async () => {
            try {
                const { data } = await axios.get("/api/discord/url");
                setDiscordLoginUrl(data.loginUrl);
                setDiscordLinkUrl(data.linkingUrl);
            } catch (error) {
                console.log(error.message);
                console.log("no-link-found");
            }
        };
        getUrl();
    }, []);

    return { discordLoginUrl, discordLinkUrl };
};
