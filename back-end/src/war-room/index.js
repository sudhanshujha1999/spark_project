import { createWarRoomSessionRoute } from "./createWarRoomSessionRoute";
import { getAllSessionRoute } from "./getAllSessionsRoute";
import { getSessionRoute } from "./getSessionRoute";
import { saveSessionStageRoute } from "./saveSessionStageRoute";

export const routes = [
    getAllSessionRoute,
    getSessionRoute,
    createWarRoomSessionRoute,
    saveSessionStageRoute,
];
