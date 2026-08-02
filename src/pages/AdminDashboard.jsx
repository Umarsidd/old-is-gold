import React, { useState } from 'react';
import { STORE_INFO } from '../data/storeInfo';
import { BRANDS_LIST } from '../data/initialProducts';
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
  List
} from 'lucide-react';

export default function AdminDashboard({ 
  products, 
  onAddProduct, 
  onUpdateProduct, 
  onDeleteProduct 
}) {
  const [activeTab, setActiveTab] = useState('inventory');
  const [editingProduct, setEditingProduct] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    brand: 'Apple',
    model: '',
    category: 'Apple',
    stock: 1,
    isSold: false,
    isHidden: false,
    isFeatured: true,
    image: '',
    description: ''
  });

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
    if (!formData.name || !formData.brand) return;

    const productPayload = {
      ...formData,
      id: editingProduct ? editingProduct.id : 'prod-' + Date.now(),
      model: formData.model || formData.name,
      stock: Number(formData.stock),
      image: formData.image || "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80"
    };

    if (editingProduct) {
      onUpdateProduct(productPayload);
    } else {
      onAddProduct(productPayload);
    }

    setEditingProduct(null);
    setFormData({
      name: '',
      brand: 'Apple',
      model: '',
      category: 'Apple',
      stock: 1,
      isSold: false,
      isHidden: false,
      isFeatured: true,
      image: '',
      description: ''
    });
    setActiveTab('inventory');
  };

  const handleStartEdit = (product) => {
    setEditingProduct(product);
    setFormData({ ...product });
    setActiveTab('add');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Admin Header */}
      <div className="card-white p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <img 
            src={STORE_INFO.logo} 
            alt={STORE_INFO.name} 
            className="w-12 h-12 rounded-xl object-cover border border-slate-200"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=200&q=80";
            }}
          />
          <div>
            <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Inventory Controller</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900">
              {STORE_INFO.name} Stock Manager
            </h1>
            <p className="text-xs text-slate-500">
              Logged in as <strong className="text-slate-800 font-bold">{STORE_INFO.owner}</strong> • Live LocalStorage JSON Persistence
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl text-xs font-bold">
          <button
            onClick={() => { setActiveTab('inventory'); setEditingProduct(null); }}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${activeTab === 'inventory' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'}`}
          >
            <Package className="w-4 h-4" />
            <span>Manage Stock ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('add')}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${activeTab === 'add' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'}`}
          >
            <Plus className="w-4 h-4" />
            <span>{editingProduct ? 'Edit Model' : 'Add New Model'}</span>
          </button>
        </div>
      </div>

      {/* Inventory Table */}
      {activeTab === 'inventory' && (
        <div className="card-white p-6 rounded-3xl border border-slate-200 space-y-4 shadow-sm">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <List className="w-5 h-5 text-emerald-600" />
              <span>Real PDF Stock List & Easy Stock Updater</span>
            </h2>
            <button
              onClick={() => { setEditingProduct(null); setActiveTab('add'); }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add Handset</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px]">
                  <th className="py-3 px-3 font-bold">Image & Model Name</th>
                  <th className="py-3 px-3 font-bold">Brand</th>
                  <th className="py-3 px-3 font-bold text-center">Stock Qty</th>
                  <th className="py-3 px-3 font-bold text-center">Status</th>
                  <th className="py-3 px-3 font-bold text-center">Toggles</th>
                  <th className="py-3 px-3 font-bold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map((p) => {
                  const isAvailable = p.stock > 0 && !p.isSold;
                  return (
                    <tr key={p.id} className={`hover:bg-slate-50 ${p.isHidden ? 'opacity-50' : ''}`}>
                      <td className="py-3 px-3 flex items-center gap-3">
                        <img 
                          src={p.image} 
                          alt={p.name}
                          className="w-10 h-10 object-contain rounded-lg bg-slate-100 shrink-0"
                          onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=200&q=80"; }}
                        />
                        <div>
                          <p className="font-bold text-slate-900 leading-tight">{p.model || p.name}</p>
                        </div>
                      </td>

                      <td className="py-3 px-3 font-bold text-emerald-600">
                        {p.brand}
                      </td>

                      {/* Stock Quantity Quick Input */}
                      <td className="py-3 px-3 text-center">
                        <input
                          type="number"
                          min="0"
                          value={p.stock}
                          onChange={(e) => onUpdateProduct({ ...p, stock: Number(e.target.value) })}
                          className="w-16 bg-slate-100 border border-slate-300 text-center font-bold font-mono text-xs rounded-lg px-1 py-1 text-slate-900"
                        />
                      </td>

                      <td className="py-3 px-3 text-center">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${isAvailable ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                          {isAvailable ? 'Available' : 'Out of Stock'}
                        </span>
                      </td>

                      <td className="py-3 px-3 text-center space-x-1.5">
                        <button
                          onClick={() => onUpdateProduct({ ...p, isFeatured: !p.isFeatured })}
                          className={`p-1.5 rounded-lg border transition ${p.isFeatured ? 'bg-amber-100 text-amber-800 border-amber-300' : 'bg-slate-100 text-slate-400 border-slate-200'}`}
                          title="Toggle Featured"
                        >
                          <Star className="w-3.5 h-3.5 fill-current" />
                        </button>

                        <button
                          onClick={() => onUpdateProduct({ ...p, isHidden: !p.isHidden })}
                          className={`p-1.5 rounded-lg border transition ${p.isHidden ? 'bg-red-100 text-red-800 border-red-300' : 'bg-slate-100 text-slate-600 border-slate-200'}`}
                          title="Toggle Hide"
                        >
                          {p.isHidden ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </td>

                      <td className="py-3 px-3 text-center space-x-2">
                        <button
                          onClick={() => handleStartEdit(p)}
                          className="p-1.5 text-slate-600 hover:text-emerald-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => onDeleteProduct(p.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Form */}
      {activeTab === 'add' && (
        <div className="card-white p-6 rounded-3xl border border-slate-200 space-y-6 max-w-2xl mx-auto shadow-sm">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Plus className="w-5 h-5 text-emerald-600" />
              <span>{editingProduct ? `Edit Model: ${editingProduct.name}` : 'Add New Handset to Stock'}</span>
            </h2>
            {editingProduct && (
              <button onClick={() => { setEditingProduct(null); setActiveTab('inventory'); }} className="text-xs text-slate-500 hover:text-slate-900">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <form onSubmit={handleSubmitForm} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Model Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Samsung S21 FE"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value, model: e.target.value })}
                className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl px-4 py-3 border border-slate-200 focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Brand *</label>
                <select
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value, category: e.target.value })}
                  className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl px-3 py-3 border border-slate-200"
                >
                  {BRANDS_LIST.filter(b => b !== 'All Brands').map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Initial Stock Qty *</label>
                <input
                  type="number"
                  min="0"
                  required
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="w-full bg-slate-50 text-slate-900 font-mono font-bold text-xs rounded-xl px-4 py-3 border border-slate-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Product Image (File Upload or Image URL)</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                <label className="flex items-center justify-center gap-2 bg-slate-50 border border-dashed border-slate-300 hover:border-emerald-500 p-3 rounded-xl cursor-pointer text-xs text-slate-600 transition">
                  <Upload className="w-4 h-4 text-emerald-600" />
                  <span>Upload Local File</span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>

                <input
                  type="url"
                  placeholder="Or paste HD image URL..."
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full bg-slate-50 text-slate-900 text-xs rounded-xl px-4 py-3 border border-slate-200"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3.5 rounded-2xl shadow-md flex items-center justify-center gap-2 transition"
            >
              <Save className="w-4 h-4" />
              <span>{editingProduct ? 'Update Stock Model' : 'Save New Model'}</span>
            </button>
          </form>
        </div>
      )}

    </div>
  );
}
