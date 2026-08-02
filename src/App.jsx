import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingContact from './components/FloatingContact';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ContactPage from './pages/ContactPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import PolicyPages from './pages/PolicyPages';
import { INITIAL_PRODUCTS } from './data/initialProducts';

// ─── Check if admin is authenticated ──────────────────────────────────────────
function isAdminAuthenticated() {
  return sessionStorage.getItem('admin_authenticated') === 'true';
}

export default function App() {
  // Products State with LocalStorage persistence
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('mobile_hub_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // Navigation & Filter States
  const [activeTab, setActiveTab] = useState('home');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activePolicy, setActivePolicy] = useState(null);

  // Sync products to LocalStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('mobile_hub_products', JSON.stringify(products));
    } catch (e) {
      console.error('Products sync error', e);
    }
  }, [products]);

  // ─── Hash-based hidden admin routing ────────────────────────────────────────
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#admin-login') {
        setActiveTab('admin-login');
      } else if (hash === '#admin') {
        if (isAdminAuthenticated()) {
          setActiveTab('admin');
        } else {
          window.location.hash = '#admin-login';
        }
      } else {
        setActiveTab(prev => (prev === 'admin-login' || prev === 'admin') ? 'home' : prev);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // ─── Admin Product CRUD Handlers ─────────────────────────────────────────────
  const handleAddProduct = (newProduct) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const handleDeleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // ─── Admin Auth Handlers ─────────────────────────────────────────────────────
  const handleAdminLoginSuccess = () => {
    setActiveTab('admin');
    window.location.hash = '#admin';
  };

  const handleAdminLogout = () => {
    sessionStorage.removeItem('admin_authenticated');
    sessionStorage.removeItem('admin_user');
    setActiveTab('home');
    window.location.hash = '';
  };

  // ─── Product Navigation ───────────────────────────────────────────────────────
  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setActiveTab('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ─── Admin-only views (no public header/footer) ──────────────────────────────
  if (activeTab === 'admin-login') {
    return <AdminLogin onLoginSuccess={handleAdminLoginSuccess} />;
  }

  if (activeTab === 'admin') {
    if (!isAdminAuthenticated()) {
      setTimeout(() => { window.location.hash = '#admin-login'; }, 0);
      return null;
    }
    return (
      <AdminDashboard
        products={products}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        onLogout={handleAdminLogout}
      />
    );
  }

  // ─── Public Website ──────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#111827] font-sans selection:bg-[#16A34A] selection:text-white">
      
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedBrand={selectedBrand}
        onSelectBrand={setSelectedBrand}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        products={products}
      />

      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            products={products}
            onViewDetails={handleViewProduct}
            selectedBrand={selectedBrand}
            onSelectBrand={setSelectedBrand}
            activeTab={activeTab}
            onNavigate={(tab) => { setActiveTab(tab); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}

        {activeTab === 'shop' && (
          <ShopPage
            products={products}
            onViewDetails={handleViewProduct}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
          />
        )}

        {activeTab === 'product-detail' && (
          <ProductDetailPage
            product={selectedProduct}
            allProducts={products}
            onBack={() => setActiveTab('shop')}
            onViewDetails={handleViewProduct}
          />
        )}

        {activeTab === 'contact' && (
          <ContactPage />
        )}
      </main>

      {/* Floating Action Controls */}
      <FloatingContact />

      {/* Policy Modal Overlay */}
      {activePolicy && (
        <PolicyPages
          policyType={activePolicy}
          onClose={() => setActivePolicy(null)}
        />
      )}

      <Footer
        onOpenPolicy={(policyName) => setActivePolicy(policyName)}
        onSelectBrand={(brand) => {
          setSelectedBrand(brand);
          setActiveTab('shop');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

    </div>
  );
}
