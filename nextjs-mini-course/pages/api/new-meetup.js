import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb://localhost:27017/nextjs"
    );
    const db = client.db();

    const meetupsCollection = db.collection("meetups");
    meetupsCollection.insertOne(data);
  }
}

export default handler;
