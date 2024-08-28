const { MongoClient } = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017/';

const dbName = 'mydatabase';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connect() {
    try {
        await client.connect();
        console.log('Connected to the MongoDB server');
    } catch (error) {
        console.error('Error connecting to the MongoDB server:', error);
    }
}

async function insertDocument(document) {
    try {
        const db = client.db(dbName);
        const collection = db.collection('mycollection');
        const result = await collection.insertOne(document);
        console.log('Document inserted:', result.insertedId);
    } catch (error) {
        console.error('Error inserting document:', error);
    }
}

async function main() {
    await connect();
    await insertDocument({ name: 'John', age: 30 });
    await client.close();
}

main().catch(console.error);
