import React, { useState } from 'react';
import { STORE_INFO } from '../data/storeInfo';
import { BRANDS_LIST } from '../data/initialProducts';
import { 
  Phone, 
  MessageSquare, 
  Search, 
  User, 
  Menu, 
  X, 
  ChevronDown, 
  Smartphone,
  Layers
} from 'lucide-react';

export default function Header({ 
  searchQuery, 
  setSearchQuery, 
  selectedBrand, 
  onSelectBrand, 
  activeTab, 
  setActiveTab,
  user,
  onOpenAuth
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    setCategoryDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const directWhatsappUrl = `https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(
    `Hello Mobile Hub, I want to inquire about available smartphone stock.`
  )}`;

  return (
    <header className="sticky top-0 z-50 bg-[#FFC915] text-black border-b-2 border-black shadow-lg">
      
      {/* Top Black Strip */}
      <div className="bg-black text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center font-bold">
          <div className="flex items-center gap-2">
            <span className="text-[#FFC915] font-black uppercase tracking-wider">Mobile Hub</span>
            <span>•</span>
            <span className="truncate">100% Genuine Verified Smartphone Showroom</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a href={`tel:${STORE_INFO.phone}`} className="flex items-center gap-1.5 text-white font-extrabold hover:text-[#FFC915] transition">
              <Phone className="w-3.5 h-3.5 text-[#FFC915]" />
              <span>{STORE_INFO.phone}</span>
            </a>
            <span className="text-gray-600">|</span>
            <a 
              href={directWhatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[#16A34A] font-extrabold hover:underline"
            >
              WhatsApp Helpline
            </a>
          </div>
        </div>
      </div>

      {/* Main Light Yellow Navigation Bar - 100% Solid Light Yellow (#FFC915) with BOLD BLACK TEXT */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4 bg-[#FFC915] relative z-50">
        
        {/* Logo Left */}
        <div 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 cursor-pointer shrink-0"
        >
          <img 
            src={STORE_INFO.logo} 
            alt={STORE_INFO.name} 
            className="w-10 h-10 rounded-lg object-cover border-2 border-black shadow"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=200&q=80";
            }}
          />

          <div>
            <h1 className="text-xl font-black tracking-tight text-black leading-none">
              {STORE_INFO.name}
            </h1>
            <p className="text-[10px] font-black text-black uppercase tracking-widest mt-0.5">
              OFFICIAL STORE
            </p>
          </div>
        </div>

        {/* Center Navigation Links - BOLD BLACK TEXT */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-black text-black">
          <button 
            onClick={() => handleNavClick('home')}
            className={`transition ${activeTab === 'home' ? 'text-black underline underline-offset-4 decoration-2 font-black' : 'hover:text-white'}`}
          >
            Store
          </button>

          <button 
            onClick={() => handleNavClick('shop')}
            className={`transition ${activeTab === 'shop' ? 'text-black underline underline-offset-4 decoration-2 font-black' : 'hover:text-white'}`}
          >
            Catalog
          </button>

          {/* Categories & Brands Dropdown */}
          <div className="relative">
            <button
              onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
              className="flex items-center gap-1.5 transition text-black font-black hover:text-white"
            >
              <Layers className="w-4 h-4 text-black" />
              <span>Categories & Brands</span>
              <ChevronDown className="w-4 h-4 text-black" />
            </button>

            {/* Light Yellow Dropdown Overlay (#FFF9C4) - 100% SOLID BOLD BLACK TEXT */}
            {categoryDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-[#FFF9C4] rounded-xl border-2 border-black shadow-2xl p-3 space-y-1 z-50">
                <div className="px-3 py-1.5 border-b-2 border-black mb-1">
                  <span className="text-[11px] font-black text-black uppercase tracking-widest">SELECT MOBILE BRAND</span>
                </div>

                <button
                  onClick={() => {
                    onSelectBrand('All');
                    setCategoryDropdownOpen(false);
                    if (activeTab !== 'shop') setActiveTab('shop');
                  }}
                  className={`w-full text-left px-3 py-2 text-xs font-black rounded-lg transition flex items-center gap-2 ${
                    selectedBrand === 'All' ? 'bg-black text-white font-black' : 'text-black bg-white hover:bg-black hover:text-white'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span>All Mobile Inventory</span>
                </button>

                <div className="max-h-60 overflow-y-auto space-y-1 pr-1">
                  {BRANDS_LIST.filter(b => b !== 'All Brands').map((brand) => (
                    <button
                      key={brand}
                      onClick={() => {
                        onSelectBrand(brand);
                        setCategoryDropdownOpen(false);
                        if (activeTab !== 'shop') setActiveTab('shop');
                      }}
                      className={`w-full text-left px-3 py-2 text-xs font-black rounded-lg transition flex items-center justify-between ${
                        selectedBrand === brand 
                          ? 'bg-black text-white font-black' 
                          : 'text-black bg-white hover:bg-black hover:text-white'
                      }`}
                    >
                      <span>{brand}</span>
                      <span className="text-[10px] font-mono font-black">Series</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button 
            onClick={() => handleNavClick('contact')}
            className={`transition ${activeTab === 'contact' ? 'text-black underline underline-offset-4 decoration-2 font-black' : 'hover:text-white'}`}
          >
            Contact
          </button>
        </nav>

        {/* Right Controls: White Search Box, Green WhatsApp Button, Black Admin Button */}
        <div className="flex items-center gap-3">
          
          {/* Solid White Search Bar with Black Border and Black Text */}
          <div className="relative hidden md:block w-48 lg:w-56">
            <input
              type="text"
              placeholder="Search Brand or Model..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeTab !== 'shop') setActiveTab('shop');
              }}
              className="w-full bg-white text-black placeholder-gray-600 text-xs font-black rounded-full pl-9 pr-3 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black transition"
            />
            <Search className="w-4 h-4 text-black absolute left-3 top-2.5" />
          </div>

          {/* Green WhatsApp Button */}
          <a
            href={directWhatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="bg-[#16A34A] hover:bg-emerald-800 text-white font-black text-xs px-4 py-2.5 rounded-full flex items-center gap-1.5 shadow border border-emerald-900 transition"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-current shrink-0" />
            <span className="hidden sm:inline">Ask Price on WhatsApp</span>
          </a>

          {/* Solid Black Admin Button */}
          <button 
            onClick={onOpenAuth}
            className="hidden sm:flex items-center gap-1.5 bg-black hover:bg-gray-800 text-white px-3.5 py-2.5 rounded-full text-xs font-black transition border border-black"
          >
            <User className="w-3.5 h-3.5 text-[#FFC915] shrink-0" />
            <span>{user ? user.name : 'Admin'}</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-black hover:bg-black hover:text-white rounded-lg transition"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu - Solid Light Yellow (#FFF9C4) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FFF9C4] border-b-2 border-black p-4 space-y-4 shadow-2xl relative z-50">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Brand or Model..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeTab !== 'shop') setActiveTab('shop');
              }}
              className="w-full bg-white text-black text-xs font-black rounded-xl pl-9 pr-4 py-2.5 border-2 border-black"
            />
            <Search className="w-4 h-4 text-black absolute left-3 top-2.5" />
          </div>

          <div className="space-y-1 text-xs font-black text-black">
            <button onClick={() => handleNavClick('home')} className="w-full text-left p-2.5 rounded-lg bg-white border border-black hover:bg-black hover:text-white">Store</button>
            <button onClick={() => handleNavClick('shop')} className="w-full text-left p-2.5 rounded-lg bg-white border border-black hover:bg-black hover:text-white">Catalog & Brands</button>
            <button onClick={() => handleNavClick('contact')} className="w-full text-left p-2.5 rounded-lg bg-white border border-black hover:bg-black hover:text-white">Contact & Location</button>
            <button onClick={() => handleNavClick('admin')} className="w-full text-left p-2.5 rounded-lg bg-black text-white hover:bg-gray-800">Admin Panel</button>
          </div>
        </div>
      )}

    </header>
  );
}
