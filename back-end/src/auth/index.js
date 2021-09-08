import { discordLoginRoute } from "./discordAuthRoute";
import { discordAuthRedirectRoute } from "./discordAuthRedirect";
import { discordLinkRoute } from "./discordLinkRoute";
import { getDiscordUrl } from "./getDiscordUrl";

export const routes = [
    discordLoginRoute,
    discordAuthRedirectRoute,
    discordLinkRoute,
    getDiscordUrl,
];
