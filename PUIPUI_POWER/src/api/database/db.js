import { MongoClient } from "mongodb";

// Make sure to URL encode your password if it contains special characters
const MONGODB_URI = "mongodb+srv://AdiminPog:zAWDsDBulHYT7ISN@puipuipower.lfwkn.mongodb.net/puipuiDB?retryWrites=true&w=majority&appName=puipuiPower";
const DB_NAME = "puipuiDB";

const client = new MongoClient(MONGODB_URI);

try {
    await client.connect();
    await client.db("puipuiDB").command({ ping: 1 });
    console.log("Connected to MongoDB");
} catch (error) {
    console.error("Error connecting to MongoDB: ", error);
}

const db = client.db(DB_NAME);
const puipuiDB = db.collection("product_detail");

export { db, puipuiDB };
