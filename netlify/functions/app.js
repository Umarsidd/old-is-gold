import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from './db.js';
import { INITIAL_PRODUCTS, CATEGORIES_TREE } from '../../src/data/initialProducts.js';
import { STORE_INFO } from '../../src/data/storeInfo.js';

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));

const ADMIN_USERNAME = process.env.INITIAL_ADMIN_USERNAME || 'Umarkhan24';
const API_PATH_ROOTS = ['/auth', '/products', '/categories', '/orders', '/settings', '/seed'];

app.use((req, res, next) => {
  const functionPrefix = '/.netlify/functions/api';

  if (req.url.startsWith(functionPrefix)) {
    req.url = req.url.slice(functionPrefix.length) || '/';
  }

  if (!req.url.startsWith('/api') && API_PATH_ROOTS.some(root =>
    req.url === root || req.url.startsWith(`${root}/`) || req.url.startsWith(`${root}?`)
  )) {
    req.url = `/api${req.url}`;
  }

  next();
});

// Helper to normalize product format for existing React components
function normalizeProduct(p) {
  if (!p) return null;
  const { _id, ...rest } = p;
  return {
    ...rest,
    id: p.id || (_id ? _id.toString() : 'prod-' + Date.now()),
    _id: _id ? _id.toString() : undefined,
  };
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function getTokenSecretForAdmin(username) {
  if (process.env.JWT_SECRET) {
    return process.env.JWT_SECRET;
  }

  const { db } = await connectToDatabase();
  const admin = await db.collection('admins').findOne({ username });
  return admin?.passwordHash || null;
}

// ─── Authentication Middleware ────────────────────────────────────────────────
const authenticateAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const unverified = jwt.decode(token);
    const tokenSecret = await getTokenSecretForAdmin(unverified?.username);
    if (!tokenSecret) {
      return res.status(401).json({ error: 'Unauthorized: Invalid or expired token' });
    }

    const decoded = jwt.verify(token, tokenSecret);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized: Invalid or expired token' });
  }
};

// ─── AUTH ENDPOINTS ──────────────────────────────────────────────────────────
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const cleanUsername = (username || '').trim();
    const cleanPassword = (password || '').trim();

    let authenticated = false;
    let adminUser = null;

    const { db } = await connectToDatabase();
    const admin = await db.collection('admins').findOne({
      $or: [
        { username: cleanUsername },
        { username: { $regex: new RegExp(`^${escapeRegExp(cleanUsername)}$`, 'i') } }
      ]
    });

    if (admin) {
      const passwordValid = await bcrypt.compare(cleanPassword, admin.passwordHash);
      if (passwordValid) {
        authenticated = true;
        adminUser = admin;
      }
    }

    if (!authenticated) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const tokenSecret = process.env.JWT_SECRET || adminUser.passwordHash;
    const token = jwt.sign(
      { username: adminUser.username, role: adminUser.role || 'admin' },
      tokenSecret,
      { expiresIn: '7d' }
    );

    return res.json({
      success: true,
      token,
      user: {
        username: adminUser.username,
        role: adminUser.role || 'admin'
      }
    });
  } catch (error) {
    console.error('Auth Login Error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

app.get('/api/auth/me', authenticateAdmin, (req, res) => {
  res.json({ success: true, user: req.admin });
});

// ─── PRODUCT ENDPOINTS ────────────────────────────────────────────────────────
app.get('/api/products', async (req, res) => {
  try {
    const { db } = await connectToDatabase();
    const { category, brand, search, featured } = req.query;

    const query = {};
    if (category && category !== 'All') query.category = category;
    if (brand && brand !== 'All Brands' && brand !== 'All') query.brand = brand;
    if (featured === 'true') query.isFeatured = true;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
        { model: { $regex: search, $options: 'i' } }
      ];
    }

    const products = await db.collection('products').find(query).sort({ createdAt: -1 }).toArray();
    res.json(products.map(normalizeProduct));
  } catch (error) {
    console.error('Get Products Error:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const { db } = await connectToDatabase();
    const productId = req.params.id;
    const product = await db.collection('products').findOne({
      $or: [{ id: productId }, { slug: productId }]
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(normalizeProduct(product));
  } catch (error) {
    console.error('Get Product Detail Error:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

app.post('/api/products', authenticateAdmin, async (req, res) => {
  try {
    const productData = req.body;
    if (!productData.name || !productData.brand) {
      return res.status(400).json({ error: 'Product name and brand are required' });
    }

    const { db } = await connectToDatabase();
    const newProduct = {
      id: productData.id || 'prod-' + Date.now(),
      name: productData.name,
      model: productData.model || productData.name,
      brand: productData.brand,
      category: productData.category || productData.brand,
      price: productData.price || '',
      salePrice: productData.salePrice || '',
      stock: Number(productData.stock ?? 1),
      isSold: Boolean(productData.isSold),
      isHidden: Boolean(productData.isHidden),
      isFeatured: Boolean(productData.isFeatured ?? true),
      isAvailable: Number(productData.stock ?? 1) > 0 && !productData.isSold,
      image: productData.image || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
      images: Array.isArray(productData.images) && productData.images.length > 0
        ? productData.images
        : [productData.image || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80'],
      description: productData.description || '',
      specs: productData.specs || '',
      storage: productData.storage || '',
      color: productData.color || '',
      condition: productData.condition || 'Verified Physical Stock',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await db.collection('products').insertOne(newProduct);
    res.status(201).json(normalizeProduct(newProduct));
  } catch (error) {
    console.error('Create Product Error:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

app.put('/api/products/:id', authenticateAdmin, async (req, res) => {
  try {
    const productId = req.params.id;
    const updateData = req.body;
    delete updateData._id;

    updateData.updatedAt = new Date();
    if (updateData.stock !== undefined || updateData.isSold !== undefined) {
      const stockNum = Number(updateData.stock ?? 0);
      const isSoldBool = Boolean(updateData.isSold);
      updateData.isAvailable = stockNum > 0 && !isSoldBool;
    }

    const { db } = await connectToDatabase();
    const result = await db.collection('products').findOneAndUpdate(
      { id: productId },
      { $set: updateData },
      { returnDocument: 'after' }
    );

    if (!result) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(normalizeProduct(result));
  } catch (error) {
    console.error('Update Product Error:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

app.delete('/api/products/:id', authenticateAdmin, async (req, res) => {
  try {
    const productId = req.params.id;
    const { db } = await connectToDatabase();
    const result = await db.collection('products').deleteOne({ id: productId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete Product Error:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// ─── CATEGORIES ENDPOINTS ────────────────────────────────────────────────────
app.get('/api/categories', async (req, res) => {
  try {
    const { db } = await connectToDatabase();
    const categories = await db.collection('categories').find({}).toArray();
    res.json(categories);
  } catch (error) {
    console.error('Get Categories Error:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

app.post('/api/categories', authenticateAdmin, async (req, res) => {
  try {
    const { name, image } = req.body;
    if (!name) return res.status(400).json({ error: 'Category name is required' });

    const { db } = await connectToDatabase();
    const categoryDoc = {
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      image: image || '',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await db.collection('categories').insertOne(categoryDoc);
    res.status(201).json(categoryDoc);
  } catch (error) {
    console.error('Create Category Error:', error);
    res.status(500).json({ error: 'Failed to create category' });
  }
});

// ─── ORDERS ENDPOINTS ────────────────────────────────────────────────────────
app.get('/api/orders', authenticateAdmin, async (req, res) => {
  try {
    const { db } = await connectToDatabase();
    const orders = await db.collection('orders').find({}).sort({ createdAt: -1 }).toArray();
    res.json(orders);
  } catch (error) {
    console.error('Get Orders Error:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const orderData = req.body;
    if (!orderData.items || !orderData.customer) {
      return res.status(400).json({ error: 'Order items and customer details are required' });
    }

    const { db } = await connectToDatabase();
    const newOrder = {
      ...orderData,
      status: orderData.status || 'Pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await db.collection('orders').insertOne(newOrder);
    res.status(201).json({ success: true, order: newOrder });
  } catch (error) {
    console.error('Create Order Error:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

app.put('/api/orders/:id/status', authenticateAdmin, async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;
    if (!status) return res.status(400).json({ error: 'Status is required' });

    const { db } = await connectToDatabase();
    const result = await db.collection('orders').findOneAndUpdate(
      { $or: [{ orderId: orderId }, { _id: orderId }] },
      { $set: { status, updatedAt: new Date() } },
      { returnDocument: 'after' }
    );

    res.json({ success: true, order: result });
  } catch (error) {
    console.error('Update Order Status Error:', error);
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

// ─── SETTINGS ENDPOINTS ──────────────────────────────────────────────────────
app.get('/api/settings', async (req, res) => {
  try {
    const { db } = await connectToDatabase();
    let settings = await db.collection('settings').findOne({ key: 'store_info' });
    if (!settings) {
      settings = { key: 'store_info', ...STORE_INFO };
    }
    res.json(settings);
  } catch (error) {
    console.error('Get Settings Error:', error);
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

app.put('/api/settings', authenticateAdmin, async (req, res) => {
  try {
    const updateData = req.body;
    delete updateData._id;
    updateData.updatedAt = new Date();

    const { db } = await connectToDatabase();
    const result = await db.collection('settings').findOneAndUpdate(
      { key: 'store_info' },
      { $set: updateData },
      { upsert: true, returnDocument: 'after' }
    );

    res.json(result);
  } catch (error) {
    console.error('Update Settings Error:', error);
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

// ─── DATABASE SEED ENDPOINT ──────────────────────────────────────────────────
app.post('/api/seed', async (req, res) => {
  try {
    const { db } = await connectToDatabase();

    // 1. Seed Admin
    const initialPassword = process.env.INITIAL_ADMIN_PASSWORD;
    if (initialPassword) {
      const passwordHash = await bcrypt.hash(initialPassword, 10);
      await db.collection('admins').updateOne(
        { username: ADMIN_USERNAME },
        {
          $set: {
            passwordHash,
            role: 'superadmin',
            active: true,
            updatedAt: new Date()
          },
          $setOnInsert: {
            username: ADMIN_USERNAME,
            createdAt: new Date()
          }
        },
        { upsert: true }
      );
    } else {
      console.warn('INITIAL_ADMIN_PASSWORD missing; admin seed skipped.');
    }

    // 2. Seed Products
    const productsCount = await db.collection('products').countDocuments();
    if (productsCount === 0 && INITIAL_PRODUCTS?.length > 0) {
      const productsToInsert = INITIAL_PRODUCTS.map(p => ({
        ...p,
        createdAt: new Date(),
        updatedAt: new Date()
      }));
      await db.collection('products').insertMany(productsToInsert);
    }

    // 3. Seed Categories
    const categoriesCount = await db.collection('categories').countDocuments();
    if (categoriesCount === 0 && CATEGORIES_TREE?.length > 0) {
      const categoriesToInsert = CATEGORIES_TREE.map(c => ({
        name: c.name,
        slug: c.name.toLowerCase().replace(/\s+/g, '-'),
        active: true,
        createdAt: new Date()
      }));
      await db.collection('categories').insertMany(categoriesToInsert);
    }

    // 4. Seed Settings
    const settingsCount = await db.collection('settings').countDocuments();
    if (settingsCount === 0) {
      await db.collection('settings').insertOne({
        key: 'store_info',
        ...STORE_INFO,
        updatedAt: new Date()
      });
    }

    res.json({ success: true, message: 'Database seeded successfully' });
  } catch (error) {
    console.error('Seed Database Error:', error);
    res.status(500).json({ error: 'Failed to seed database' });
  }
});

export default app;
