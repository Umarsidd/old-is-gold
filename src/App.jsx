import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingContact from './components/FloatingContact';
import CartDrawer from './components/CartDrawer';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import ContactPage from './pages/ContactPage';
import AdminDashboard from './pages/AdminDashboard';
import AuthPages from './pages/AuthPages';
import PolicyPages from './pages/PolicyPages';
import { INITIAL_PRODUCTS } from './data/initialProducts';

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
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activePolicy, setActivePolicy] = useState(null);
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('mobile_hub_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderData, setOrderData] = useState(null);

  // Sync products and cart to LocalStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('mobile_hub_products', JSON.stringify(products));
      localStorage.setItem('mobile_hub_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error("Products sync error", e);
    }
  }, [products, cartItems]);

  // Handlers for Admin Product CRUD
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

  const handleAddToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      const desiredQty = Math.min(quantity, product.stock || 1);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + desiredQty, product.stock || item.quantity + desiredQty) }
            : item
        );
      }
      return [...prev, { ...product, quantity: desiredQty }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartQty = (id, quantity) => {
    setCartItems((prev) => {
      if (quantity <= 0) {
        return prev.filter((item) => item.id !== id);
      }
      return prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.min(quantity, item.stock || quantity) }
          : item
      );
    });
  };

  const handleRemoveCartItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleOpenCart = () => setIsCartOpen(true);
  const handleCloseCart = () => setIsCartOpen(false);

  const handleProceedCheckout = () => {
    if (cartItems.length > 0) {
      setIsCartOpen(false);
      setActiveTab('checkout');
    }
  };

  const handleCompleteOrder = (order) => {
    setOrderData(order);
    setCartItems([]);
    setIsCartOpen(false);
    setActiveTab('order-success');
  };

  // Handlers for Product Detail View
  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setActiveTab('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#111827] font-sans selection:bg-[#16A34A] selection:text-white">
      
      {/* Header Navigation */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedBrand={selectedBrand}
        onSelectBrand={setSelectedBrand}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={handleOpenCart}
        onOpenAuth={() => setActiveTab('auth')}
        products={products}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            products={products}
            onViewDetails={handleViewProduct}
            onAddToCart={handleAddToCart}
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
            onAddToCart={handleAddToCart}
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
            onAddToCart={handleAddToCart}
          />
        )}

        {activeTab === 'contact' && (
          <ContactPage />
        )}

        {activeTab === 'admin' && (
          <AdminDashboard
            products={products}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        )}

        {activeTab === 'checkout' && (
          <CheckoutPage
            cartItems={cartItems}
            onBack={() => setActiveTab('shop')}
            onCompleteOrder={handleCompleteOrder}
          />
        )}

        {activeTab === 'order-success' && (
          <OrderSuccessPage
            orderData={orderData}
            onBackToShop={() => setActiveTab('shop')}
          />
        )}

        {activeTab === 'auth' && (
          <AuthPages
            onLoginSuccess={(userData) => {
              setUser(userData);
              setActiveTab(userData.isAdmin ? 'admin' : 'home');
            }}
            onBackToShop={() => setActiveTab('home')}
          />
        )}
      </main>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={handleCloseCart}
        cartItems={cartItems}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onProceedCheckout={handleProceedCheckout}
      />

      {/* Floating Action Controls */}
      <FloatingContact />

      {/* Policy Modal Overlay */}
      {activePolicy && (
        <PolicyPages
          policyType={activePolicy}
          onClose={() => setActivePolicy(null)}
        />
      )}

      {/* Footer */}
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
