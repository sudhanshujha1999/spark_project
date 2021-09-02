import "regenerator-runtime/runtime.js";
import express from "express";
import path from "path";
import mongoose from "mongoose";
import * as firebaseAdmin from "firebase-admin";
import { addUserToRoute, protectRoute } from "./middleware";
import { routes } from "./routes";
import passport from "passport";
import { discordStrategy } from "./auth/strategies/discordStrategy";
// import { initializeDbConnection } from "./util";
import nocache from "nocache";
import cookieParser from "cookie-parser";

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
        projectId: "spark-esport",
        credential: firebaseAdmin.credential.cert(FIREBASE_CREDENTIALS),
    });
    const store = firebaseAdmin.firestore();
    store.settings({ ignoreUndefinedProperties: true });
}

const MONGO_URI =
    process.env.IS_PRODUCTION || process.env.IS_QA
        ? `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_CLUSTER}.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`
        : `mongodb://localhost:27017/spark`;

const connectDatabase = async () => {
    await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    });
};

connectDatabase()
    .then(() => console.log("MongoDb Connected..."))
    .catch((error) =>
        console.log(
            `Cannot connect mongo Db. Error: ${error.message}, connection string is : ${MONGO_URI}`
        )
    );

const app = express();

app.use(nocache());
app.set("baseFrontEndUrl", BASE_FRONT_END_URL);
app.set("baseBackEndUrl", BASE_BACK_END_URL);

app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));

// initialize discord startegy
app.use(cookieParser());
app.use(passport.initialize());
discordStrategy(app);

const apiRouter = express.Router();
routes.forEach((route) => {
    const middleware = route.middleware ? route.middleware : [];
    apiRouter[route.method](
        route.path,
        addUserToRoute,
        ...middleware,
        protectRoute(route.protectors),
        route.handler
    );
});
app.use("/api", apiRouter);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"), { lastModified: false, etag: false });
});

const start = async () => {
    app.listen(PORT, () => {
        console.log("Server is listening on port " + PORT);
    });
};

start();

process.on("SIGINT", () => {
    console.log("Stopping server...");
    process.exit();
});
