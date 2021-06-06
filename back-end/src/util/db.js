import { MongoClient } from 'mongodb';

let client = new MongoClient(`mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.al0a8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

export const initializeDbConnection = async () => {
    console.log("connecting to db...");
    await client.connect();
}

export const connectToDb = dbName => {
    const db = client.db(dbName);
    return db;
}