import React, { useState, useEffect } from 'react';
import { STORE_INFO } from '../data/storeInfo';
import { BRANDS_LIST } from '../data/initialProducts';
import { api } from '../services/api';
import {
  ShieldCheck,
  Plus,
  Trash2,
  Edit3,
  Eye,
  EyeOff,
  Star,
  Upload,
  Save,
  X,
  Package,
  LayoutDashboard,
  LogOut,
  ChevronRight,
  Search,
  BarChart3,
  TrendingUp,
  ShoppingBag,
  Settings as SettingsIcon,
  RefreshCw,
  CheckCircle
} from 'lucide-react';

export default function AdminDashboard({
  products: initialProducts,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onLogout
}) {
  const [products, setProducts] = useState(initialProducts || []);
  const [orders, setOrders] = useState([]);
  const [settings, setSettings] = useState(STORE_INFO);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const [formData, setFormData] = useState({
    name: '',
    brand: 'Apple',
    model: '',
    price: '',
    category: 'Apple',
    stock: 1,
    isSold: false,
    isHidden: false,
    isFeatured: true,
    image: '',
    description: '',
    specs: ''
  });

  const showNotification = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 4000);
  };

  const refreshData = async () => {
    setLoading(true);
    try {
      const [fetchedProducts, fetchedOrders, fetchedSettings] = await Promise.all([
        api.getProducts(),
        api.getOrders().catch(() => []),
        api.getSettings().catch(() => STORE_INFO)
      ]);
      setProducts(fetchedProducts || []);
      setOrders(fetchedOrders || []);
      if (fetchedSettings) setSettings(fetchedSettings);
    } catch (err) {
      console.error('Failed to refresh data from server:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.brand) return;

    setLoading(true);
    try {
      const productPayload = {
        ...formData,
        model: formData.model || formData.name,
        stock: Number(formData.stock),
        image: formData.image || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80'
      };

      if (editingProduct) {
        const updated = await api.updateProduct(editingProduct.id, productPayload);
        onUpdateProduct(updated);
        showNotification('Product updated successfully in MongoDB Atlas');
      } else {
        const created = await api.createProduct(productPayload);
        onAddProduct(created);
        showNotification('New product saved to MongoDB Atlas');
      }

      await refreshData();
      setEditingProduct(null);
      setFormData({
        name: '', brand: 'Apple', model: '', price: '', category: 'Apple',
        stock: 1, isSold: false, isHidden: false, isFeatured: true,
        image: '', description: '', specs: ''
      });
      setActiveTab('products');
    } catch (err) {
      showNotification(err.message || 'Failed to save product to MongoDB', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleStartEdit = (product) => {
    setEditingProduct(product);
    setFormData({ ...product, specs: product.specs || '', price: product.price || '' });
    setActiveTab('add');
  };

  const handleDeleteConfirm = async (id) => {
    if (window.confirm('Are you sure you want to delete this product from MongoDB Atlas?')) {
      setLoading(true);
      try {
        await api.deleteProduct(id);
        onDeleteProduct(id);
        await refreshData();
        showNotification('Product deleted from MongoDB Atlas');
      } catch (err) {
        showNotification(err.message || 'Failed to delete product', 'error');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleToggleProduct = async (product, key, value) => {
    try {
      const updatedPayload = { ...product, [key]: value };
      const updated = await api.updateProduct(product.id, updatedPayload);
      onUpdateProduct(updated);
      setProducts(prev => prev.map(p => p.id === product.id ? updated : p));
      showNotification(`Product updated in MongoDB`);
    } catch (err) {
      showNotification(err.message || 'Failed to update toggle', 'error');
    }
  };

  const handleOrderStatusChange = async (orderId, newStatus) => {
    try {
      await api.updateOrderStatus(orderId, newStatus);
      setOrders(prev => prev.map(o => (o.orderId === orderId || o._id === orderId) ? { ...o, status: newStatus } : o));
      showNotification(`Order status updated to ${newStatus}`);
    } catch (err) {
      showNotification(err.message || 'Failed to update order status', 'error');
    }
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updated = await api.updateSettings(settings);
      setSettings(updated);
      showNotification('Store settings updated in MongoDB Atlas');
    } catch (err) {
      showNotification(err.message || 'Failed to update settings', 'error');
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(p =>
    p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.model?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalStock = products.reduce((sum, p) => sum + (Number(p.stock) || 0), 0);
  const availableCount = products.filter(p => Number(p.stock) > 0 && !p.isSold).length;
  const featuredCount = products.filter(p => p.isFeatured).length;

  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'products', icon: Package, label: 'All Products' },
    { id: 'add', icon: Plus, label: editingProduct ? 'Edit Product' : 'Add Product' },
    { id: 'orders', icon: ShoppingBag, label: `Orders (${orders.length})` },
    { id: 'settings', icon: SettingsIcon, label: 'Store Settings' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0F172A', fontFamily: 'Inter, -apple-system, sans-serif' }}>
      
      {/* ── Sidebar ─────────────────────────────────────────────────────────── */}
      <aside style={{
        width: '240px', flexShrink: 0,
        background: '#1E293B',
        borderRight: '1px solid #334155',
        display: 'flex', flexDirection: 'column',
        position: 'sticky', top: 0, height: '100vh'
      }}>
        {/* Logo */}
        <div style={{ padding: '24px 20px', borderBottom: '1px solid #334155' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: 'linear-gradient(135deg, #16A34A, #15803d)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <ShieldCheck style={{ width: '18px', height: '18px', color: '#fff' }} />
            </div>
            <div>
              <div style={{ color: '#F1F5F9', fontSize: '13px', fontWeight: 700, lineHeight: 1.2 }}>Admin Panel</div>
              <div style={{ color: '#64748B', fontSize: '11px' }}>{settings.name || STORE_INFO.name}</div>
            </div>
          </div>
        </div>

        {/* Nav Items */}
        <nav style={{ padding: '12px 10px', flex: 1 }}>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); if (item.id !== 'add') setEditingProduct(null); }}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: '10px',
                padding: '10px 12px', borderRadius: '10px', border: 'none',
                cursor: 'pointer', marginBottom: '4px', textAlign: 'left',
                background: activeTab === item.id ? 'rgba(22,163,74,0.15)' : 'transparent',
                color: activeTab === item.id ? '#4ADE80' : '#94A3B8',
                fontWeight: activeTab === item.id ? 600 : 400, fontSize: '13px',
                transition: 'all 0.15s'
              }}
            >
              <item.icon style={{ width: '16px', height: '16px' }} />
              <span style={{ flex: 1 }}>{item.label}</span>
              {activeTab === item.id && <ChevronRight style={{ width: '14px', height: '14px' }} />}
            </button>
          ))}
        </nav>

        {/* Sync Status / Refresh */}
        <div style={{ padding: '12px 10px', borderTop: '1px solid #334155' }}>
          <button
            onClick={refreshData}
            disabled={loading}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              padding: '8px', borderRadius: '8px', border: '1px solid #334155',
              background: '#0F172A', color: '#94A3B8', fontSize: '12px', cursor: 'pointer', marginBottom: '8px'
            }}
          >
            <RefreshCw style={{ width: '14px', height: '14px', animation: loading ? 'spin 1s linear infinite' : 'none' }} />
            <span>{loading ? 'Syncing...' : 'Sync MongoDB'}</span>
          </button>

          <button
            onClick={onLogout}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: '10px',
              padding: '10px 12px', borderRadius: '10px', border: 'none',
              cursor: 'pointer', background: 'rgba(239,68,68,0.1)',
              color: '#F87171', fontWeight: 600, fontSize: '13px',
              transition: 'all 0.15s'
            }}
          >
            <LogOut style={{ width: '16px', height: '16px' }} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ── Main Content ─────────────────────────────────────────────────────── */}
      <main style={{ flex: 1, padding: '32px', overflowY: 'auto', background: '#0F172A' }}>

        {/* Toast Notification */}
        {message.text && (
          <div style={{
            position: 'fixed', top: '20px', right: '20px', zIndex: 1000,
            background: message.type === 'error' ? '#EF4444' : '#16A34A',
            color: '#FFFFFF', padding: '12px 20px', borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', gap: '10px',
            fontSize: '14px', fontWeight: 600
          }}>
            <CheckCircle style={{ width: '18px', height: '18px' }} />
            <span>{message.text}</span>
          </div>
        )}

        {/* ── Dashboard Tab ─────────────────────────────── */}
        {activeTab === 'dashboard' && (
          <div>
            <h1 style={{ color: '#F1F5F9', fontSize: '22px', fontWeight: 700, marginBottom: '8px' }}>
              Welcome back, Umarkhan 👋
            </h1>
            <p style={{ color: '#64748B', fontSize: '14px', marginBottom: '28px' }}>
              Here's your store overview for {settings.name || STORE_INFO.name} (MongoDB Source of Truth)
            </p>

            {/* Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '32px' }}>
              {[
                { label: 'Total Products', value: products.length, icon: Package, color: '#3B82F6' },
                { label: 'Total Stock Units', value: totalStock, icon: BarChart3, color: '#16A34A' },
                { label: 'Available Now', value: availableCount, icon: TrendingUp, color: '#F59E0B' },
                { label: 'Customer Orders', value: orders.length, icon: ShoppingBag, color: '#8B5CF6' },
              ].map(stat => (
                <div key={stat.label} style={{
                  background: '#1E293B', border: '1px solid #334155',
                  borderRadius: '16px', padding: '20px'
                }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '10px',
                    background: stat.color + '20', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', marginBottom: '12px'
                  }}>
                    <stat.icon style={{ width: '18px', height: '18px', color: stat.color }} />
                  </div>
                  <div style={{ color: '#F1F5F9', fontSize: '28px', fontWeight: 800, lineHeight: 1 }}>{stat.value}</div>
                  <div style={{ color: '#64748B', fontSize: '12px', marginTop: '4px' }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Recent Products */}
            <div style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: '16px', overflow: 'hidden' }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ color: '#F1F5F9', fontSize: '14px', fontWeight: 700, margin: 0 }}>Recent Inventory in MongoDB Atlas</h2>
                <button onClick={() => setActiveTab('products')} style={{ color: '#4ADE80', fontSize: '12px', background: 'none', border: 'none', cursor: 'pointer' }}>
                  View All →
                </button>
              </div>
              <div style={{ padding: '8px' }}>
                {products.slice(0, 5).map(p => (
                  <div key={p.id || p._id} style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '10px 12px', borderRadius: '10px',
                    borderBottom: '1px solid #1a2540'
                  }}>
                    <img src={p.image} alt={p.name}
                      style={{ width: '40px', height: '40px', objectFit: 'contain', borderRadius: '8px', background: '#0F172A' }}
                      onError={e => { e.target.src = 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=200&q=80'; }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ color: '#F1F5F9', fontSize: '13px', fontWeight: 600 }}>{p.model || p.name}</div>
                      <div style={{ color: '#64748B', fontSize: '11px' }}>{p.brand}</div>
                    </div>
                    {p.price && <div style={{ color: '#4ADE80', fontSize: '13px', fontWeight: 700 }}>₹{p.price}</div>}
                    <span style={{
                      padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700,
                      background: (p.stock > 0 && !p.isSold) ? 'rgba(22,163,74,0.15)' : 'rgba(239,68,68,0.15)',
                      color: (p.stock > 0 && !p.isSold) ? '#4ADE80' : '#F87171'
                    }}>
                      {p.stock > 0 && !p.isSold ? 'Available' : 'Out of Stock'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Products Tab ─────────────────────────────── */}
        {activeTab === 'products' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h1 style={{ color: '#F1F5F9', fontSize: '22px', fontWeight: 700, margin: '0 0 4px' }}>All Products</h1>
                <p style={{ color: '#64748B', fontSize: '13px', margin: 0 }}>{products.length} products stored in MongoDB Atlas</p>
              </div>
              <button
                onClick={() => { setEditingProduct(null); setActiveTab('add'); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  background: 'linear-gradient(135deg, #16A34A, #15803d)',
                  color: '#fff', border: 'none', borderRadius: '10px',
                  padding: '10px 18px', fontSize: '13px', fontWeight: 700, cursor: 'pointer'
                }}
              >
                <Plus style={{ width: '15px', height: '15px' }} />
                Add Product
              </button>
            </div>

            {/* Search */}
            <div style={{ position: 'relative', marginBottom: '20px' }}>
              <Search style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', width: '15px', height: '15px', color: '#64748B' }} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{
                  width: '100%', boxSizing: 'border-box',
                  background: '#1E293B', border: '1px solid #334155',
                  borderRadius: '10px', padding: '10px 14px 10px 40px',
                  color: '#F1F5F9', fontSize: '13px', outline: 'none'
                }}
              />
            </div>

            {/* Table */}
            <div style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: '16px', overflow: 'hidden' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #334155' }}>
                      {['Product', 'Brand', 'Stock', 'Price', 'Status', 'Toggles', 'Actions'].map(h => (
                        <th key={h} style={{ padding: '12px 16px', color: '#64748B', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: h === 'Product' ? 'left' : 'center' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((p) => {
                      const isAvailable = Number(p.stock) > 0 && !p.isSold;
                      return (
                        <tr key={p.id || p._id} style={{ borderBottom: '1px solid #1a2540', opacity: p.isHidden ? 0.5 : 1 }}>
                          <td style={{ padding: '12px 16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <img src={p.image} alt={p.name}
                                style={{ width: '40px', height: '40px', objectFit: 'contain', borderRadius: '8px', background: '#0F172A' }}
                                onError={e => { e.target.src = 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=200&q=80'; }}
                              />
                              <div>
                                <div style={{ color: '#F1F5F9', fontWeight: 600 }}>{p.model || p.name}</div>
                                {p.price && <div style={{ color: '#64748B', fontSize: '11px' }}>₹{p.price}</div>}
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: '12px 16px', textAlign: 'center', color: '#4ADE80', fontWeight: 600 }}>{p.brand}</td>
                          <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                            <input
                              type="number" min="0" value={p.stock}
                              onChange={e => handleToggleProduct(p, 'stock', Number(e.target.value))}
                              style={{
                                width: '60px', background: '#0F172A', border: '1px solid #334155',
                                borderRadius: '6px', padding: '4px 8px', color: '#F1F5F9',
                                fontSize: '13px', fontWeight: 700, textAlign: 'center', outline: 'none'
                              }}
                            />
                          </td>
                          <td style={{ padding: '12px 16px', textAlign: 'center', color: '#94A3B8', fontSize: '12px' }}>
                            {p.price ? `₹${p.price}` : '—'}
                          </td>
                          <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                            <span style={{
                              padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700,
                              background: isAvailable ? 'rgba(22,163,74,0.15)' : 'rgba(239,68,68,0.15)',
                              color: isAvailable ? '#4ADE80' : '#F87171'
                            }}>
                              {isAvailable ? 'Available' : 'Out of Stock'}
                            </span>
                          </td>
                          <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                            <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                              <button
                                onClick={() => handleToggleProduct(p, 'isFeatured', !p.isFeatured)}
                                title="Toggle Featured"
                                style={{
                                  padding: '5px', borderRadius: '6px', border: 'none', cursor: 'pointer',
                                  background: p.isFeatured ? 'rgba(245,158,11,0.15)' : '#1E293B',
                                  color: p.isFeatured ? '#F59E0B' : '#64748B'
                                }}
                              >
                                <Star style={{ width: '13px', height: '13px' }} />
                              </button>
                              <button
                                onClick={() => handleToggleProduct(p, 'isHidden', !p.isHidden)}
                                title="Toggle Hide"
                                style={{
                                  padding: '5px', borderRadius: '6px', border: 'none', cursor: 'pointer',
                                  background: p.isHidden ? 'rgba(239,68,68,0.15)' : '#1E293B',
                                  color: p.isHidden ? '#F87171' : '#64748B'
                                }}
                              >
                                {p.isHidden ? <EyeOff style={{ width: '13px', height: '13px' }} /> : <Eye style={{ width: '13px', height: '13px' }} />}
                              </button>
                            </div>
                          </td>
                          <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                            <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                              <button
                                onClick={() => handleStartEdit(p)}
                                title="Edit"
                                style={{
                                  padding: '5px', borderRadius: '6px', border: 'none', cursor: 'pointer',
                                  background: 'rgba(59,130,246,0.15)', color: '#60A5FA'
                                }}
                              >
                                <Edit3 style={{ width: '13px', height: '13px' }} />
                              </button>
                              <button
                                onClick={() => handleDeleteConfirm(p.id)}
                                title="Delete"
                                style={{
                                  padding: '5px', borderRadius: '6px', border: 'none', cursor: 'pointer',
                                  background: 'rgba(239,68,68,0.1)', color: '#F87171'
                                }}
                              >
                                <Trash2 style={{ width: '13px', height: '13px' }} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── Add / Edit Form ──────────────────────────── */}
        {activeTab === 'add' && (
          <div style={{ maxWidth: '640px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <h1 style={{ color: '#F1F5F9', fontSize: '22px', fontWeight: 700, margin: '0 0 4px' }}>
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h1>
                <p style={{ color: '#64748B', fontSize: '13px', margin: 0 }}>
                  {editingProduct ? `Editing: ${editingProduct.name}` : 'Save directly to MongoDB Atlas'}
                </p>
              </div>
              {editingProduct && (
                <button
                  onClick={() => { setEditingProduct(null); setActiveTab('products'); }}
                  style={{ background: 'rgba(239,68,68,0.1)', color: '#F87171', border: 'none', borderRadius: '8px', padding: '6px 12px', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <X style={{ width: '14px', height: '14px' }} /> Cancel Edit
                </button>
              )}
            </div>

            <form onSubmit={handleSubmitForm}>
              <div style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>

                {/* Product Name */}
                <div>
                  <label style={labelStyle}>Product Name *</label>
                  <input
                    type="text" required placeholder="e.g. Samsung Galaxy S24 Ultra"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value, model: e.target.value })}
                    style={inputStyle}
                  />
                </div>

                {/* Brand + Model */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={labelStyle}>Brand *</label>
                    <select
                      value={formData.brand}
                      onChange={e => setFormData({ ...formData, brand: e.target.value, category: e.target.value })}
                      style={inputStyle}
                    >
                      {BRANDS_LIST.filter(b => b !== 'All Brands').map(b => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Model</label>
                    <input
                      type="text" placeholder="e.g. S24 Ultra"
                      value={formData.model}
                      onChange={e => setFormData({ ...formData, model: e.target.value })}
                      style={inputStyle}
                    />
                  </div>
                </div>

                {/* Price + Stock */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={labelStyle}>Price (₹) — Optional</label>
                    <input
                      type="text" placeholder="e.g. 89999"
                      value={formData.price}
                      onChange={e => setFormData({ ...formData, price: e.target.value })}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Stock Quantity *</label>
                    <input
                      type="number" min="0" required
                      value={formData.stock}
                      onChange={e => setFormData({ ...formData, stock: e.target.value })}
                      style={inputStyle}
                    />
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label style={labelStyle}>Product Image</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <label style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                      background: '#0F172A', border: '1px dashed #334155', borderRadius: '10px',
                      padding: '12px', cursor: 'pointer', color: '#64748B', fontSize: '12px'
                    }}>
                      <Upload style={{ width: '14px', height: '14px', color: '#4ADE80' }} />
                      Upload Image
                      <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                    </label>
                    <input
                      type="url" placeholder="Or paste image URL..."
                      value={formData.image}
                      onChange={e => setFormData({ ...formData, image: e.target.value })}
                      style={inputStyle}
                    />
                  </div>
                  {formData.image && (
                    <img src={formData.image} alt="Preview"
                      style={{ marginTop: '10px', height: '80px', objectFit: 'contain', borderRadius: '8px', background: '#0F172A', border: '1px solid #334155' }}
                      onError={e => { e.target.style.display = 'none'; }}
                    />
                  )}
                </div>

                {/* Full Specifications */}
                <div>
                  <label style={labelStyle}>Full Specifications</label>
                  <textarea
                    rows={4}
                    placeholder="Display: 6.8 inch AMOLED&#10;RAM: 12GB&#10;Storage: 256GB&#10;Camera: 200MP&#10;Battery: 5000mAh"
                    value={formData.specs}
                    onChange={e => setFormData({ ...formData, specs: e.target.value })}
                    style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.5 }}
                  />
                </div>

                {/* Description */}
                <div>
                  <label style={labelStyle}>Description</label>
                  <textarea
                    rows={3}
                    placeholder="Write a short product description..."
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    style={{ ...inputStyle, resize: 'vertical' }}
                  />
                </div>

                {/* Toggles */}
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                  {[
                    { key: 'isFeatured', label: '⭐ Featured' },
                    { key: 'isHidden', label: '🙈 Hidden' },
                    { key: 'isSold', label: '❌ Sold Out' },
                  ].map(toggle => (
                    <label key={toggle.key} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#94A3B8', fontSize: '13px' }}>
                      <input
                        type="checkbox"
                        checked={formData[toggle.key]}
                        onChange={e => setFormData({ ...formData, [toggle.key]: e.target.checked })}
                        style={{ width: '16px', height: '16px', accentColor: '#16A34A' }}
                      />
                      {toggle.label}
                    </label>
                  ))}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%', background: loading ? '#15803d' : 'linear-gradient(135deg, #16A34A, #15803d)',
                    color: '#fff', border: 'none', borderRadius: '10px',
                    padding: '14px', fontSize: '14px', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    boxShadow: '0 4px 14px rgba(22, 163, 74, 0.3)'
                  }}
                >
                  <Save style={{ width: '16px', height: '16px' }} />
                  {loading ? 'Saving to MongoDB Atlas...' : (editingProduct ? 'Update Product' : 'Save New Product')}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ── Orders Tab ──────────────────────────── */}
        {activeTab === 'orders' && (
          <div>
            <h1 style={{ color: '#F1F5F9', fontSize: '22px', fontWeight: 700, marginBottom: '8px' }}>Customer Orders</h1>
            <p style={{ color: '#64748B', fontSize: '13px', marginBottom: '24px' }}>All orders placed via WhatsApp stored in MongoDB</p>

            {orders.length === 0 ? (
              <div style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: '16px', padding: '40px', textAlign: 'center', color: '#94A3B8' }}>
                No customer orders received yet.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {orders.map(o => (
                  <div key={o._id || o.orderId} style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: '16px', padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #334155', pb: '12px', marginBottom: '12px' }}>
                      <div>
                        <span style={{ color: '#4ADE80', fontWeight: 700, fontSize: '14px' }}>{o.orderId}</span>
                        <span style={{ color: '#64748B', fontSize: '12px', marginLeft: '10px' }}>{o.date || new Date(o.createdAt).toLocaleDateString()}</span>
                      </div>
                      <select
                        value={o.status || 'Pending'}
                        onChange={e => handleOrderStatusChange(o.orderId || o._id, e.target.value)}
                        style={{ background: '#0F172A', color: '#F1F5F9', border: '1px solid #334155', borderRadius: '8px', padding: '6px 12px', fontSize: '12px', outline: 'none' }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', color: '#CBD5E1', fontSize: '13px' }}>
                      <div>
                        <strong>Customer:</strong> {o.customer?.name || o.customerName} ({o.customer?.phone || o.phone})<br />
                        <strong>Address:</strong> {o.customer?.address || o.address}, {o.customer?.pin}
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <strong>Total:</strong> <span style={{ color: '#4ADE80', fontWeight: 700 }}>₹{o.grandTotal?.toLocaleString('en-IN') || o.total}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Settings Tab ──────────────────────────── */}
        {activeTab === 'settings' && (
          <div style={{ maxWidth: '640px' }}>
            <h1 style={{ color: '#F1F5F9', fontSize: '22px', fontWeight: 700, marginBottom: '8px' }}>Store Settings</h1>
            <p style={{ color: '#64748B', fontSize: '13px', marginBottom: '24px' }}>Update WhatsApp number and store info in MongoDB</p>

            <form onSubmit={handleSaveSettings}>
              <div style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={labelStyle}>Store Name</label>
                  <input
                    type="text" value={settings.name || ''}
                    onChange={e => setSettings({ ...settings, name: e.target.value })}
                    style={inputStyle}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={labelStyle}>WhatsApp Number (Clean: e.g. 918573929638)</label>
                    <input
                      type="text" value={settings.whatsappNumber || ''}
                      onChange={e => setSettings({ ...settings, whatsappNumber: e.target.value })}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Phone Number (Formatted)</label>
                    <input
                      type="text" value={settings.phone || ''}
                      onChange={e => setSettings({ ...settings, phone: e.target.value })}
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Physical Address</label>
                  <textarea
                    rows={2} value={settings.address || ''}
                    onChange={e => setSettings({ ...settings, address: e.target.value })}
                    style={{ ...inputStyle, resize: 'vertical' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%', background: 'linear-gradient(135deg, #16A34A, #15803d)',
                    color: '#fff', border: 'none', borderRadius: '10px',
                    padding: '14px', fontSize: '14px', fontWeight: 700, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                  }}
                >
                  <Save style={{ width: '16px', height: '16px' }} /> Save Store Settings to MongoDB
                </button>
              </div>
            </form>
          </div>
        )}

      </main>
    </div>
  );
}

// ─── Shared Styles ────────────────────────────────────────────────────────────
const labelStyle = {
  display: 'block', color: '#94A3B8', fontSize: '11px', fontWeight: 600,
  marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px'
};

const inputStyle = {
  width: '100%', boxSizing: 'border-box',
  background: '#0F172A', border: '1px solid #334155',
  borderRadius: '10px', padding: '10px 14px',
  color: '#F1F5F9', fontSize: '13px', outline: 'none',
  fontFamily: 'inherit'
};
