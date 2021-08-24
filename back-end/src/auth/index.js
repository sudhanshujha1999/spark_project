import { discordLoginRoute } from "./discordAuthRoute";
import { discordAuthRedirectRoute } from "./discordAuthRedirect";
import { discordLinkRoute } from "./discordLinkRoute";

export const routes = [discordLoginRoute, discordAuthRedirectRoute, discordLinkRoute];
