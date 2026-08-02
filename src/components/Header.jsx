import React, { useState } from 'react';
import { STORE_INFO } from '../data/storeInfo';
import { 
  Phone, 
  MessageSquare, 
  MapPin, 
  Mail, 
  Search, 
  ShoppingCart, 
  Heart, 
  User, 
  Menu, 
  X, 
  ShieldCheck, 
  Sparkles,
  Smartphone
} from 'lucide-react';

export default function Header({ 
  cartCount, 
  wishlistCount, 
  onOpenCart, 
  onOpenWishlist, 
  searchQuery, 
  setSearchQuery, 
  activeTab, 
  setActiveTab,
  user,
  onOpenAuth
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 shadow-2xl">
      {/* Top Banner - Store Details */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 text-amber-200 text-xs py-2 px-4 border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 font-medium text-amber-400">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{STORE_INFO.address}</span>
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <a href={`mailto:${STORE_INFO.email}`} className="hover:underline text-slate-300">
                {STORE_INFO.email}
              </a>
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <a 
              href={`tel:${STORE_INFO.phone}`} 
              className="flex items-center gap-1.5 hover:text-amber-400 transition"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-semibold text-white">{STORE_INFO.phone}</span>
            </a>
            <span className="text-slate-600">|</span>
            <a 
              href={`https://wa.me/${STORE_INFO.whatsappNumber}`} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-1 bg-emerald-600/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30 hover:bg-emerald-600 hover:text-white transition font-medium"
            >
              <MessageSquare className="w-3 h-3" />
              <span>WhatsApp Store</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Branding & Official Logo */}
        <div 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="relative">
            <img 
              src={STORE_INFO.logo} 
              alt={STORE_INFO.name} 
              className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-amber-500 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition transform"
              onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=200&q=80"; }}
            />
            <span className="absolute -bottom-1 -right-1 bg-amber-500 text-black text-[9px] font-extrabold px-1 rounded border border-black uppercase">
              Pro
            </span>
          </div>

          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-white flex items-center gap-1.5">
              <span className="gold-gradient-text">{STORE_INFO.name}</span>
            </h1>
            <p className="text-[10px] md:text-xs font-semibold tracking-wider uppercase text-amber-400/90 flex items-center gap-1">
              <Smartphone className="w-3 h-3 text-amber-400 inline" />
              {STORE_INFO.tagline} • Owner: <span className="text-white">{STORE_INFO.owner}</span>
            </p>
          </div>
        </div>

        {/* Desktop Search Bar */}
        <div className="hidden lg:flex flex-1 max-w-md mx-4 relative">
          <input
            type="text"
            placeholder="Search Apple, Samsung, OnePlus, Nokia..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (activeTab !== 'shop') setActiveTab('shop');
            }}
            className="w-full bg-slate-900/90 text-white placeholder-slate-400 text-sm rounded-full pl-10 pr-10 py-2.5 border border-slate-700 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-3 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Wishlist Button */}
          <button 
            onClick={onOpenWishlist}
            className="relative p-2.5 text-slate-300 hover:text-amber-400 hover:bg-slate-900 rounded-full transition"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-950 font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-950">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button 
            onClick={onOpenCart}
            className="relative flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold px-3.5 py-2 rounded-full hover:from-amber-400 hover:to-amber-500 transition shadow-lg shadow-amber-500/20 text-sm"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="bg-slate-950 text-amber-400 text-xs px-2 py-0.5 rounded-full font-black">
                {cartCount}
              </span>
            )}
          </button>

          {/* User / Admin Login Button */}
          <button 
            onClick={onOpenAuth}
            className="flex items-center gap-1.5 text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 px-3 py-2 rounded-full text-xs font-semibold transition"
          >
            <User className="w-4 h-4 text-amber-400" />
            <span className="hidden md:inline">{user ? user.name || 'Account' : 'Login / Admin'}</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white bg-slate-900 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Navigation Links Bar */}
      <nav className="bg-slate-900/60 border-t border-slate-800/80 hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-sm">
          <div className="flex items-center gap-8">
            <button 
              onClick={() => handleNavClick('home')}
              className={`py-3 font-semibold border-b-2 transition ${activeTab === 'home' ? 'border-amber-500 text-amber-400' : 'border-transparent text-slate-300 hover:text-white'}`}
            >
              Home
            </button>
            <button 
              onClick={() => handleNavClick('shop')}
              className={`py-3 font-semibold border-b-2 transition ${activeTab === 'shop' ? 'border-amber-500 text-amber-400' : 'border-transparent text-slate-300 hover:text-white'}`}
            >
              All Phones Catalog
            </button>
            <button 
              onClick={() => handleNavClick('refurbished')}
              className={`py-3 font-semibold border-b-2 transition ${activeTab === 'refurbished' ? 'border-amber-500 text-amber-400' : 'border-transparent text-slate-300 hover:text-white'}`}
            >
              Like New & Refurbished
            </button>
            <button 
              onClick={() => handleNavClick('contact')}
              className={`py-3 font-semibold border-b-2 transition ${activeTab === 'contact' ? 'border-amber-500 text-amber-400' : 'border-transparent text-slate-300 hover:text-white'}`}
            >
              Contact Us & Store Location
            </button>
            <button 
              onClick={() => handleNavClick('admin')}
              className={`py-3 font-semibold border-b-2 transition flex items-center gap-1.5 ${activeTab === 'admin' ? 'border-amber-500 text-amber-400' : 'border-transparent text-amber-400/80 hover:text-amber-400'}`}
            >
              <ShieldCheck className="w-4 h-4" />
              Admin Dashboard
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Genuine Tested Handsets</span>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 p-4 space-y-4 animate-fade-in">
          {/* Mobile Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search Apple, Samsung, OnePlus..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeTab !== 'shop') setActiveTab('shop');
              }}
              className="w-full bg-slate-900 text-white placeholder-slate-400 text-sm rounded-lg pl-10 pr-4 py-2.5 border border-slate-700 focus:outline-none focus:border-amber-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          </div>

          <div className="grid grid-cols-1 gap-2 pt-2 border-t border-slate-800 text-sm font-medium">
            <button 
              onClick={() => handleNavClick('home')}
              className={`text-left px-3 py-2 rounded.lg ${activeTab === 'home' ? 'bg-amber-500/10 text-amber-400 font-bold' : 'text-slate-300'}`}
            >
              Home
            </button>
            <button 
              onClick={() => handleNavClick('shop')}
              className={`text-left px-3 py-2 rounded-lg ${activeTab === 'shop' ? 'bg-amber-500/10 text-amber-400 font-bold' : 'text-slate-300'}`}
            >
              All Phones Catalog
            </button>
            <button 
              onClick={() => handleNavClick('refurbished')}
              className={`text-left px-3 py-2 rounded-lg ${activeTab === 'refurbished' ? 'bg-amber-500/10 text-amber-400 font-bold' : 'text-slate-300'}`}
            >
              Refurbished & Second Hand
            </button>
            <button 
              onClick={() => handleNavClick('contact')}
              className={`text-left px-3 py-2 rounded-lg ${activeTab === 'contact' ? 'bg-amber-500/10 text-amber-400 font-bold' : 'text-slate-300'}`}
            >
              Contact Us & Store Map
            </button>
            <button 
              onClick={() => handleNavClick('admin')}
              className={`text-left px-3 py-2 rounded-lg flex items-center justify-between ${activeTab === 'admin' ? 'bg-amber-500/10 text-amber-400 font-bold' : 'text-amber-400'}`}
            >
              <span>Admin Panel (Umar Khan)</span>
              <ShieldCheck className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
