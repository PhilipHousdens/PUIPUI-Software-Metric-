import { MongoClient } from "mongodb";

// Make sure to URL encode your password if it contains special characters
const MONGODB_URI = Deno.env.get("MONGODB_URI");
const DB_NAME = Deno.env.get("DB_NAME");

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
