import React, { useState } from 'react';
import { STORE_INFO } from '../data/storeInfo';
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
  DollarSign, 
  Tag, 
  CheckCircle,
  Clock,
  Layers,
  Sparkles,
  ShoppingBag,
  List
} from 'lucide-react';

export default function AdminDashboard({ 
  products, 
  onAddProduct, 
  onUpdateProduct, 
  onDeleteProduct 
}) {
  const [activeTab, setActiveTab] = useState('inventory'); // inventory, add, orders
  const [editingProduct, setEditingProduct] = useState(null);

  // New product form state
  const [formData, setFormData] = useState({
    name: '',
    brand: 'Apple',
    category: 'Smartphones',
    condition: 'Like New',
    price: '',
    originalPrice: '',
    stock: 1,
    isSold: false,
    isHidden: false,
    isFeatured: true,
    image: '',
    description: '',
    specs: {
      ram: '',
      storage: '',
      camera: '',
      battery: '',
      display: ''
    }
  });

  // Local storage orders state
  const savedOrders = JSON.parse(localStorage.getItem('old_is_gold_orders') || '[]');

  // Base64 file reader helper
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

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;

    const productPayload = {
      ...formData,
      id: editingProduct ? editingProduct.id : 'prod-' + Date.now(),
      price: Number(formData.price),
      originalPrice: Number(formData.originalPrice || formData.price),
      stock: Number(formData.stock),
      discountPercentage: formData.originalPrice > formData.price 
        ? Math.round(((formData.originalPrice - formData.price) / formData.originalPrice) * 100)
        : 0,
      image: formData.image || "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80"
    };

    if (editingProduct) {
      onUpdateProduct(productPayload);
    } else {
      onAddProduct(productPayload);
    }

    // Reset form
    setEditingProduct(null);
    setFormData({
      name: '',
      brand: 'Apple',
      category: 'Smartphones',
      condition: 'Like New',
      price: '',
      originalPrice: '',
      stock: 1,
      isSold: false,
      isHidden: false,
      isFeatured: true,
      image: '',
      description: '',
      specs: { ram: '', storage: '', camera: '', battery: '', display: '' }
    });
    setActiveTab('inventory');
  };

  const handleStartEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      ...product,
      specs: product.specs || { ram: '', storage: '', camera: '', battery: '', display: '' }
    });
    setActiveTab('add');
  };

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Admin Panel Header Banner */}
      <div className="glass-card border border-amber-500/40 p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img 
            src={STORE_INFO.logo} 
            alt={STORE_INFO.name} 
            className="w-14 h-14 rounded-full object-cover border-2 border-amber-500 shadow-md"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=200&q=80";
            }}
          />
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Owner Access Dashboard</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white">
              {STORE_INFO.name} Store Control Panel
            </h1>
            <p className="text-xs text-slate-300">
              Welcome <strong className="text-amber-400 font-bold">{STORE_INFO.owner}</strong> • All changes sync to LocalStorage
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 text-xs font-bold">
          <button
            onClick={() => { setActiveTab('inventory'); setEditingProduct(null); }}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${activeTab === 'inventory' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
          >
            <Package className="w-4 h-4" />
            <span>Manage Inventory ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('add')}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${activeTab === 'add' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
          >
            <Plus className="w-4 h-4" />
            <span>{editingProduct ? 'Edit Phone' : 'Add New Phone'}</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${activeTab === 'orders' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Customer WhatsApp Orders ({savedOrders.length})</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Inventory Table & Quick Actions */}
      {activeTab === 'inventory' && (
        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-4">
            <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <List className="w-5 h-5 text-amber-400" />
              <span>Current Handset Inventory & Controls</span>
            </h2>
            <button
              onClick={() => { setEditingProduct(null); setActiveTab('add'); }}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Handset</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                  <th className="py-3 px-3 font-bold">Image & Device</th>
                  <th className="py-3 px-3 font-bold">Brand / Category</th>
                  <th className="py-3 px-3 font-bold">Condition</th>
                  <th className="py-3 px-3 font-bold text-right">Price</th>
                  <th className="py-3 px-3 font-bold text-center">Stock</th>
                  <th className="py-3 px-3 font-bold text-center">Toggles</th>
                  <th className="py-3 px-3 font-bold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {products.map((p) => (
                  <tr key={p.id} className={`hover:bg-slate-800/40 ${p.isHidden ? 'opacity-50' : ''}`}>
                    <td className="py-3 px-3 flex items-center gap-3">
                      <img 
                        src={p.image} 
                        alt={p.name}
                        className="w-12 h-12 object-cover rounded-lg bg-slate-900 shrink-0"
                        onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=200&q=80"; }}
                      />
                      <div>
                        <p className="font-bold text-white leading-tight">{p.name}</p>
                        <p className="text-[10px] text-slate-400 font-mono">ID: {p.id}</p>
                      </div>
                    </td>

                    <td className="py-3 px-3 text-slate-300">
                      <p className="font-bold text-amber-400">{p.brand}</p>
                      <p className="text-[10px] text-slate-400">{p.category}</p>
                    </td>

                    <td className="py-3 px-3">
                      <span className="bg-slate-800 text-amber-300 px-2 py-0.5 rounded font-bold uppercase text-[10px] border border-slate-700">
                        {p.condition}
                      </span>
                    </td>

                    <td className="py-3 px-3 text-right font-mono font-bold text-amber-400">
                      {formatPrice(p.price)}
                    </td>

                    <td className="py-3 px-3 text-center">
                      <div className="inline-flex items-center gap-1">
                        <input
                          type="number"
                          min="0"
                          value={p.stock}
                          onChange={(e) => onUpdateProduct({ ...p, stock: Number(e.target.value) })}
                          className="w-14 bg-slate-900 border border-slate-700 text-center font-bold font-mono text-xs rounded px-1 py-0.5 text-white"
                        />
                      </div>
                    </td>

                    {/* Quick Control Badges (Featured, Hide, Sold) */}
                    <td className="py-3 px-3 text-center space-x-1.5">
                      <button
                        onClick={() => onUpdateProduct({ ...p, isFeatured: !p.isFeatured })}
                        className={`p-1.5 rounded-lg border transition ${p.isFeatured ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' : 'bg-slate-900 text-slate-500 border-slate-800'}`}
                        title="Toggle Featured"
                      >
                        <Star className="w-3.5 h-3.5 fill-current" />
                      </button>

                      <button
                        onClick={() => onUpdateProduct({ ...p, isHidden: !p.isHidden })}
                        className={`p-1.5 rounded-lg border transition ${p.isHidden ? 'bg-red-950 text-red-400 border-red-800' : 'bg-slate-900 text-slate-400 border-slate-800'}`}
                        title="Toggle Hide"
                      >
                        {p.isHidden ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        onClick={() => onUpdateProduct({ ...p, isSold: !p.isSold })}
                        className={`p-1.5 rounded-lg border text-[10px] font-extrabold transition ${p.isSold ? 'bg-red-600 text-white border-red-500' : 'bg-emerald-950 text-emerald-400 border-emerald-800'}`}
                        title="Toggle Sold Out Status"
                      >
                        {p.isSold ? 'SOLD' : 'AVAILABLE'}
                      </button>
                    </td>

                    <td className="py-3 px-3 text-center space-x-2">
                      <button
                        onClick={() => handleStartEdit(p)}
                        className="p-1.5 text-slate-300 hover:text-amber-400 bg-slate-900 hover:bg-slate-800 rounded-lg transition"
                        title="Edit Product"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onDeleteProduct(p.id)}
                        className="p-1.5 text-slate-400 hover:text-red-400 bg-slate-900 hover:bg-slate-800 rounded-lg transition"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Add or Edit Product Form */}
      {activeTab === 'add' && (
        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-6 max-w-3xl mx-auto">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Plus className="w-5 h-5 text-amber-400" />
              <span>{editingProduct ? `Edit Phone: ${editingProduct.name}` : 'Add New Mobile Handset'}</span>
            </h2>
            {editingProduct && (
              <button
                onClick={() => { setEditingProduct(null); setActiveTab('inventory'); }}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            )}
          </div>

          <form onSubmit={handleSubmitForm} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Phone Name / Model Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. iPhone 15 Pro Max 256GB - Titanium"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-900 text-white placeholder-slate-500 text-xs rounded-xl px-4 py-3 border border-slate-700 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Brand *</label>
                <select
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  className="w-full bg-slate-900 text-white text-xs rounded-xl px-3 py-3 border border-slate-700 focus:outline-none focus:border-amber-500"
                >
                  {['Apple', 'Samsung', 'OnePlus', 'Nokia', 'Vivo', 'Xiaomi', 'Realme', 'Other'].map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-slate-900 text-white text-xs rounded-xl px-3 py-3 border border-slate-700 focus:outline-none focus:border-amber-500"
                >
                  {['Smartphones', 'Feature Phones', 'Refurbished Premium', 'Budget Keypad', 'Accessories'].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Condition *</label>
                <select
                  value={formData.condition}
                  onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                  className="w-full bg-slate-900 text-white text-xs rounded-xl px-3 py-3 border border-slate-700 focus:outline-none focus:border-amber-500"
                >
                  {['Like New', 'Brand New', 'Refurbished', 'Good'].map(cond => (
                    <option key={cond} value={cond}>{cond}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Selling Price (₹) *</label>
                <input
                  type="number"
                  required
                  placeholder="79999"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full bg-slate-900 text-white font-mono font-bold text-xs rounded-xl px-4 py-3 border border-slate-700 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Original Price (₹)</label>
                <input
                  type="number"
                  placeholder="159900"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                  className="w-full bg-slate-900 text-white font-mono text-xs rounded-xl px-4 py-3 border border-slate-700 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Initial Stock Qty</label>
                <input
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="w-full bg-slate-900 text-white font-mono font-bold text-xs rounded-xl px-4 py-3 border border-slate-700 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Product Image Input (Base64 file upload or URL) */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-300 uppercase">Product Image (File Upload or Image URL)</label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                <label className="flex items-center justify-center gap-2 bg-slate-900 border border-dashed border-slate-700 hover:border-amber-500 p-3 rounded-xl cursor-pointer text-xs text-slate-300 transition">
                  <Upload className="w-4 h-4 text-amber-400" />
                  <span>Upload Local File (Base64)</span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>

                <input
                  type="url"
                  placeholder="Or paste direct image URL https://..."
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full bg-slate-900 text-white placeholder-slate-500 text-xs rounded-xl px-4 py-3 border border-slate-700 focus:outline-none focus:border-amber-500"
                />
              </div>

              {formData.image && (
                <div className="mt-2 flex items-center gap-3">
                  <img src={formData.image} alt="Preview" className="w-16 h-16 object-cover rounded-xl border border-slate-700" />
                  <span className="text-[11px] text-emerald-400 font-bold">Image loaded successfully</span>
                </div>
              )}
            </div>

            {/* Specifications Fields */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <label className="block text-xs font-bold text-white uppercase">Device Technical Specs</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="RAM (e.g. 8GB)"
                  value={formData.specs.ram}
                  onChange={(e) => setFormData({ ...formData, specs: { ...formData.specs, ram: e.target.value } })}
                  className="bg-slate-900 text-white text-xs rounded-xl px-3 py-2 border border-slate-700"
                />
                <input
                  type="text"
                  placeholder="Storage (e.g. 256GB)"
                  value={formData.specs.storage}
                  onChange={(e) => setFormData({ ...formData, specs: { ...formData.specs, storage: e.target.value } })}
                  className="bg-slate-900 text-white text-xs rounded-xl px-3 py-2 border border-slate-700"
                />
                <input
                  type="text"
                  placeholder="Camera (e.g. 48MP Triple)"
                  value={formData.specs.camera}
                  onChange={(e) => setFormData({ ...formData, specs: { ...formData.specs, camera: e.target.value } })}
                  className="bg-slate-900 text-white text-xs rounded-xl px-3 py-2 border border-slate-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Description & Inspection Notes</label>
              <textarea
                rows="3"
                placeholder="Details about battery health, store warranty, box accessories..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-slate-900 text-white placeholder-slate-500 text-xs rounded-xl px-4 py-3 border border-slate-700 focus:outline-none focus:border-amber-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm py-3.5 rounded-2xl shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 transition"
            >
              <Save className="w-4 h-4" />
              <span>{editingProduct ? 'Update Handset Details' : 'Save & Publish Handset'}</span>
            </button>
          </form>
        </div>
      )}

      {/* Tab 3: Customer WhatsApp Orders History */}
      {activeTab === 'orders' && (
        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
          <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <span>WhatsApp Customer Orders Log ({savedOrders.length})</span>
          </h2>

          {savedOrders.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              No WhatsApp orders saved in LocalStorage yet.
            </div>
          ) : (
            <div className="space-y-4">
              {savedOrders.map((order, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between items-center border-b border-slate-800/80 pb-2">
                    <span className="font-mono font-bold text-amber-400">Order ID: {order.orderId}</span>
                    <span className="text-slate-400">{order.date}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-300">
                    <div>
                      <p className="font-bold text-white">Customer: {order.customer?.name}</p>
                      <p>Phone: {order.customer?.phone}</p>
                      <p>Address: {order.customer?.address}, PIN: {order.customer?.pin}</p>
                    </div>

                    <div className="text-right">
                      <p className="font-black text-amber-400 text-sm font-mono">{formatPrice(order.grandTotal)}</p>
                      <a
                        href={order.whatsappRedirectUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-400 underline font-bold"
                      >
                        Re-open WhatsApp Chat
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
