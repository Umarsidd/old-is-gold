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
      const saved = localStorage.getItem('old_is_gold_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // Cart State with LocalStorage persistence
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('old_is_gold_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist State with LocalStorage persistence
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('old_is_gold_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Navigation & View States
  const [activeTab, setActiveTab] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [lastOrderData, setLastOrderData] = useState(null);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const [activePolicy, setActivePolicy] = useState(null);

  // Sync products to LocalStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('old_is_gold_products', JSON.stringify(products));
    } catch (e) {
      console.error("Products sync error", e);
    }
  }, [products]);

  // Sync cart to LocalStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('old_is_gold_cart', JSON.stringify(cart));
    } catch (e) {
      console.error("Cart sync error", e);
    }
  }, [cart]);

  // Sync wishlist to LocalStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('old_is_gold_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error("Wishlist sync error", e);
    }
  }, [wishlist]);

  // Handlers for Cart
  const handleAddToCart = (productToAdd) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === productToAdd.id);
      const qtyToAdd = productToAdd.quantity || 1;
      if (existing) {
        return prevCart.map((item) =>
          item.id === productToAdd.id
            ? { ...item, quantity: item.quantity + qtyToAdd }
            : item
        );
      }
      return [...prevCart, { ...productToAdd, quantity: qtyToAdd }];
    });
    setCartOpen(true);
  };

  const handleUpdateCartQty = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveCartItem(id);
      return;
    }
    setCart((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item)));
  };

  const handleRemoveCartItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Handlers for Wishlist
  const handleToggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) return prev.filter((item) => item.id !== product.id);
      return [...prev, product];
    });
  };

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

  // Handlers for Product Detail View
  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setActiveTab('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handlers for Checkout & WhatsApp Order Complete
  const handleOrderComplete = (orderData) => {
    setLastOrderData(orderData);
    setCart([]); // Clear cart after order
    setActiveTab('order-success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-black">
      
      {/* Header Navigation */}
      <Header
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => { setActiveTab('shop'); setSearchQuery(''); }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        onOpenAuth={() => setActiveTab('auth')}
      />

      {/* Main View Renderer */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            products={products}
            onAddToCart={handleAddToCart}
            onViewDetails={handleViewProduct}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onNavigate={(tab) => { setActiveTab(tab); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          />
        )}

        {activeTab === 'shop' && (
          <ShopPage
            products={products}
            onAddToCart={handleAddToCart}
            onViewDetails={handleViewProduct}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            initialConditionFilter="All"
          />
        )}

        {activeTab === 'refurbished' && (
          <ShopPage
            products={products}
            onAddToCart={handleAddToCart}
            onViewDetails={handleViewProduct}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            initialConditionFilter="Like New"
          />
        )}

        {activeTab === 'product-detail' && (
          <ProductDetailPage
            product={selectedProduct}
            onBack={() => setActiveTab('shop')}
            onAddToCart={handleAddToCart}
            isWishlisted={wishlist.some(item => item.id === selectedProduct?.id)}
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {activeTab === 'checkout' && (
          <CheckoutPage
            cartItems={cart}
            onBack={() => setCartOpen(true)}
            onCompleteOrder={handleOrderComplete}
          />
        )}

        {activeTab === 'order-success' && (
          <OrderSuccessPage
            orderData={lastOrderData}
            onBackToShop={() => setActiveTab('shop')}
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

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cart}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onProceedCheckout={() => {
          setCartOpen(false);
          setActiveTab('checkout');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Floating & Sticky WhatsApp/Call Buttons */}
      <FloatingContact />

      {/* Policy Modal Overlay */}
      {activePolicy && (
        <PolicyPages
          policyType={activePolicy}
          onClose={() => setActivePolicy(null)}
        />
      )}

      {/* Footer */}
      <Footer onOpenPolicy={(policyName) => setActivePolicy(policyName)} />

    </div>
  );
}
