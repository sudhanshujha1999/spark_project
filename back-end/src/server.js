import "regenerator-runtime/runtime.js";
import express from "express";
import path from "path";
import bodyParser from "body-parser";
import * as firebaseAdmin from "firebase-admin";
import { addUserToRoute, protectRoute } from "./middleware";
import { routes } from "./routes";
import { initializeDbConnection } from "./util";

const PORT = process.env.PORT || 8080;
const FIREBASE_CREDENTIALS =
    (process.env.FIREBASE_CREDENTIALS && JSON.parse(process.env.FIREBASE_CREDENTIALS)) ||
    require("../../credentials.json");

const BASE_FRONT_END_URL = process.env.IS_PRODUCTION
    ? "https://sparkesports.gg"
    : process.env.IS_QA
    ? "https://dev.sparkesports.gg"
    : "http://localhost:3000";
const BASE_BACK_END_URL = process.env.IS_PRODUCTION
    ? "https://sparkesports.gg/api"
    : process.env.IS_QA
    ? "https://dev.sparkesports.gg/api"
    : "http://localhost:8080/api";

if (!FIREBASE_CREDENTIALS) {
    console.log("ERROR: No firebase credentials found");
} else {
    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(FIREBASE_CREDENTIALS),
    });
    const store = firebaseAdmin.firestore();
    store.settings({ ignoreUndefinedProperties: true });
}

const app = express();

app.set("baseFrontEndUrl", BASE_FRONT_END_URL);
app.set("baseBackEndUrl", BASE_BACK_END_URL);

app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));

const apiRouter = express.Router();
routes.forEach((route) => {
    apiRouter[route.method](
        route.path,
        addUserToRoute,
        protectRoute(route.protectors),
        route.handler
    );
});
app.use("/api", apiRouter);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

const start = async () => {
    await initializeDbConnection();

    app.listen(PORT, () => {
        console.log("Server is listening on port " + PORT);
    });
};

start();

process.on("SIGINT", () => {
    console.log("Stopping server...");
    process.exit();
});
