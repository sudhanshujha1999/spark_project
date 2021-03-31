import { MongoClient } from 'mongodb';

let client = new MongoClient('mongodb://localhost:27017', {
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