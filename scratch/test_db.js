import { MongoClient } from 'mongodb';
import dns from 'dns';
import dotenv from 'dotenv';

dotenv.config();

try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) {}

const uri = process.env.MONGODB_URI;

console.log('Testing URI:', uri.replace(/:([^@]+)@/, ':****@'));

async function test() {
  const client = new MongoClient(uri, {
    connectTimeoutMS: 5000,
    serverSelectionTimeoutMS: 5000,
  });

  try {
    await client.connect();
    console.log('SUCCESSFULLY CONNECTED TO MONGODB ATLAS!');
    const db = client.db('oldisgold');
    const cols = await db.listCollections().toArray();
    console.log('Collections:', cols.map(c => c.name));
  } catch (err) {
    console.error('Connection Failed:', err.message);
    if (err.message.includes('SSL alert number 80') || err.message.includes('tlsv1 alert')) {
      console.log('NOTE: SSL alert 80 indicates MongoDB Atlas Network Access IP Whitelist requires 0.0.0.0/0 (Allow Access from Anywhere).');
    }
  } finally {
    await client.close();
  }
}

test();
