import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import dns from 'dns';

try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) {
  // Ignore if custom DNS resolution not supported
}

dotenv.config();

const DB_NAME = process.env.DB_NAME || 'oldisgold';

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  const mongodbUri = process.env.MONGODB_URI;
  if (!mongodbUri) {
    throw new Error('MONGODB_URI environment variable is missing.');
  }

  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  try {
    const client = new MongoClient(mongodbUri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
      tls: true,
    });
    
    await client.connect();
    const db = client.db(DB_NAME);

    cachedClient = client;
    cachedDb = db;

    // Ensure database indexes asynchronously
    ensureIndexes(db).catch(err => console.error('Error creating indexes:', err));

    return { client, db };
  } catch (error) {
    console.error('MongoDB Atlas connection error:', error);
    throw error;
  }
}

async function ensureIndexes(db) {
  try {
    const products = db.collection('products');
    await products.createIndex({ slug: 1 });
    await products.createIndex({ category: 1 });
    await products.createIndex({ brand: 1 });
    await products.createIndex({ isFeatured: 1 });
    await products.createIndex({ isHidden: 1 });
    await products.createIndex({ createdAt: -1 });

    const categories = db.collection('categories');
    await categories.createIndex({ slug: 1 });

    const orders = db.collection('orders');
    await orders.createIndex({ orderId: 1 });
    await orders.createIndex({ createdAt: -1 });

    const admins = db.collection('admins');
    await admins.createIndex({ username: 1 }, { unique: true });
  } catch (err) {
    console.warn('Index creation notice:', err.message);
  }
}
