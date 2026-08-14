import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '../netlify/functions/db.js';
import { INITIAL_PRODUCTS, CATEGORIES_TREE } from '../src/data/initialProducts.js';
import { STORE_INFO } from '../src/data/storeInfo.js';

dotenv.config();

async function seedDatabase() {
  console.log('🌱 Connecting to MongoDB Atlas for Seeding...');
  const { db, client } = await connectToDatabase();

  try {
    // 1. Seed Admin
    console.log('🔑 Checking Admin Account...');
    const adminCollection = db.collection('admins');
    const existingAdmin = await adminCollection.findOne({ username: 'Umarkhan24' });

    if (!existingAdmin) {
      const passwordHash = await bcrypt.hash('Gold@24carrot', 10);
      await adminCollection.insertOne({
        username: 'Umarkhan24',
        passwordHash,
        role: 'superadmin',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log('✅ Created Admin Account: Umarkhan24');
    } else {
      console.log('ℹ️ Admin Umarkhan24 already exists');
    }

    // 2. Seed Products
    console.log('📦 Checking Products Collection...');
    const productCollection = db.collection('products');
    const productsCount = await productCollection.countDocuments();

    if (productsCount === 0 && INITIAL_PRODUCTS && INITIAL_PRODUCTS.length > 0) {
      const productsToInsert = INITIAL_PRODUCTS.map(p => ({
        id: p.id || 'prod-' + Date.now(),
        name: p.name || p.model || 'Mobile Device',
        model: p.model || p.name || '',
        brand: p.brand || 'Other',
        category: p.category || p.brand || 'Mobile',
        price: p.price || '',
        salePrice: p.salePrice || '',
        stock: Number(p.stock ?? 1),
        isSold: Boolean(p.isSold),
        isHidden: Boolean(p.isHidden),
        isFeatured: Boolean(p.isFeatured ?? true),
        isAvailable: Number(p.stock ?? 1) > 0 && !p.isSold,
        image: p.image || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
        images: Array.isArray(p.images) && p.images.length > 0 ? p.images : [p.image || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80'],
        description: p.description || '',
        specs: p.specs || '',
        storage: p.storage || '',
        color: p.color || '',
        condition: p.condition || 'Verified Physical Stock',
        createdAt: new Date(),
        updatedAt: new Date()
      }));

      await productCollection.insertMany(productsToInsert);
      console.log(`✅ Seeded ${productsToInsert.length} initial products to MongoDB Atlas`);
    } else {
      console.log(`ℹ️ Products collection already contains ${productsCount} documents`);
    }

    // 3. Seed Categories
    console.log('🏷️ Checking Categories Collection...');
    const categoryCollection = db.collection('categories');
    const categoriesCount = await categoryCollection.countDocuments();

    if (categoriesCount === 0 && CATEGORIES_TREE && CATEGORIES_TREE.length > 0) {
      const categoriesToInsert = CATEGORIES_TREE.map(c => ({
        name: c.name,
        slug: c.name.toLowerCase().replace(/\s+/g, '-'),
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }));

      await categoryCollection.insertMany(categoriesToInsert);
      console.log(`✅ Seeded ${categoriesToInsert.length} categories to MongoDB Atlas`);
    } else {
      console.log(`ℹ️ Categories collection already contains ${categoriesCount} documents`);
    }

    // 4. Seed Settings
    console.log('⚙️ Checking Settings Collection...');
    const settingsCollection = db.collection('settings');
    const existingSettings = await settingsCollection.findOne({ key: 'store_info' });

    if (!existingSettings) {
      await settingsCollection.insertOne({
        key: 'store_info',
        ...STORE_INFO,
        updatedAt: new Date()
      });
      console.log('✅ Seeded store settings to MongoDB Atlas');
    } else {
      console.log('ℹ️ Store settings already exist in MongoDB Atlas');
    }

    console.log('🎉 Seeding completed successfully!');
  } catch (error) {
    console.error('❌ Seeding Error:', error);
  } finally {
    await client.close();
    process.exit(0);
  }
}

seedDatabase();
