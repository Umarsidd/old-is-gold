import React, { useState, useEffect, useRef } from 'react';
import { STORE_INFO } from '../data/storeInfo';
import { BRANDS_LIST } from '../data/initialProducts';
import { 
  Phone, 
  MessageSquare, 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  Smartphone,
  Layers,
  User,
  ShieldCheck,
  Truck,
  RotateCcw
} from 'lucide-react';
import MegaMenu from './MegaMenu';
import { AnimatePresence } from 'framer-motion';

export default function Header({ 
  searchQuery, 
  setSearchQuery, 
  selectedBrand, 
  onSelectBrand, 
  activeTab, 
  setActiveTab,
  products = []
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      // close mega menu on scroll
      if (categoryDropdownOpen) setCategoryDropdownOpen(false);
    };
    const handleKey = (e) => {
      if (e.key === 'Escape') { setCategoryDropdownOpen(false); setMobileMenuOpen(false); }
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKey);
    };
  }, [categoryDropdownOpen]);

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    setCategoryDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const directWhatsappUrl = `https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(
    `Hello OLD IS GOLD, I want to inquire about available smartphone stock.`
  )}`;

  return (
    <header ref={headerRef} className="sticky top-0 z-50 flex flex-col w-full" style={{ position: 'sticky', top: 0 }}>
      
      {/* Top Ribbon - 36px Height, Solid Background */}
      <div 
        style={{ 
          height: '36px', 
          backgroundColor: '#090D16',
          color: '#FFFFFF',
          fontWeight: '500',
          fontSize: '13px'
        }}
        className="w-full flex items-center justify-between px-4 z-50 relative border-b border-gray-800"
      >
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center h-full text-xs">
          {/* Left items */}
          <div className="flex items-center gap-6 text-gray-300">
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Original Products</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>1 Year Brand Warranty</span>
            </span>
            <span className="hidden lg:flex items-center gap-1.5 font-medium">
              <Truck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Fast & Secure Delivery</span>
            </span>
            <span className="hidden xl:flex items-center gap-1.5 font-medium">
              <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
              <span>7 Days Easy Returns</span>
            </span>
          </div>

          {/* Right item */}
          <div className="flex items-center gap-3">
            <span className="text-gray-400 hidden sm:inline">Need Help?</span>
            <a href={`tel:${STORE_INFO.phone}`} className="flex items-center gap-1.5 font-semibold text-white hover:text-emerald-400 transition">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>{STORE_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar - 80px Height, Glass effect, bottom border */}
      <div className={`w-full bg-white border-b border-[#E5E7EB] transition-all duration-300 relative z-40`} style={{ height: '80px', overflow: 'visible' }}>
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between gap-4">
          
          {/* Logo Container */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer shrink-0"
          >
            <img 
              src={STORE_INFO.logo} 
              alt={STORE_INFO.name} 
              className="h-[48px] w-[48px] rounded-full object-cover shadow-sm border border-gray-200"
              style={{ height: '48px', width: '48px' }}
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=200&q=80";
              }}
            />
            <div className="flex flex-col justify-center">
              <h1 className="text-[#111827] leading-none m-0 p-0 font-bold text-xl flex items-center gap-1">
                {STORE_INFO.name}
              </h1>
              <p className="text-[#6B7280] leading-none m-0 p-0 mt-1 text-[11px] font-bold tracking-wider uppercase">
                OFFICIAL STORE
              </p>
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 h-full">
            <button 
              onClick={() => handleNavClick('home')}
              className={`h-full flex items-center transition-colors px-1`}
              style={{ 
                color: activeTab === 'home' ? '#16A34A' : '#374151', 
                fontWeight: activeTab === 'home' ? 700 : 500, 
                fontSize: '14px',
                borderBottom: activeTab === 'home' ? '2.5px solid #16A34A' : '2.5px solid transparent',
              }}
            >
              Store
            </button>

            <button 
              onClick={() => handleNavClick('shop')}
              className={`h-full flex items-center transition-colors px-1`}
              style={{ 
                color: activeTab === 'shop' ? '#16A34A' : '#374151', 
                fontWeight: activeTab === 'shop' ? 700 : 500, 
                fontSize: '14px',
                borderBottom: activeTab === 'shop' ? '2.5px solid #16A34A' : '2.5px solid transparent',
              }}
            >
              Catalog
            </button>

            {/* Mega Menu Dropdown */}
            <div className="relative h-full flex items-center">
              <button
                onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                className="flex items-center gap-1.5 transition-colors h-full px-1"
                style={{ 
                  color: '#374151', 
                  fontWeight: 500, 
                  fontSize: '14px',
                  borderBottom: categoryDropdownOpen ? '2.5px solid #16A34A' : '2.5px solid transparent'
                }}
              >
                <Layers className="w-4 h-4 text-emerald-600" />
                <span>Mega Menu</span>
                <ChevronDown className={`w-3.5 h-3.5 text-gray-500 transition-transform ${categoryDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>

            <button 
              onClick={() => handleNavClick('contact')}
              className={`h-full flex items-center transition-colors px-1`}
              style={{ 
                color: activeTab === 'contact' ? '#16A34A' : '#374151', 
                fontWeight: activeTab === 'contact' ? 700 : 500, 
                fontSize: '14px',
                borderBottom: activeTab === 'contact' ? '2.5px solid #16A34A' : '2.5px solid transparent',
              }}
            >
              Contact
            </button>
          </nav>

          {/* Right Controls: Search, WhatsApp, Profile, Cart */}
          <div className="flex items-center gap-3 shrink-0">
            
            {/* Search Bar - Rounded full */}
            <div className="relative hidden xl:block w-52">
              <input
                type="text"
                placeholder="Search Brand or Model..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeTab !== 'shop') setActiveTab('shop');
                }}
                className="w-full bg-gray-50/80 border focus:bg-white focus:outline-none focus:border-emerald-500 transition-all pl-9 pr-3 py-2 text-xs font-medium rounded-full border-gray-200 text-gray-800 placeholder-gray-400"
              />
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-400" />
            </div>

            {/* WhatsApp Button - Solid Green Background & White Text */}
            <a
              href={directWhatsappUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                backgroundColor: '#16A34A',
                color: '#FFFFFF',
                borderRadius: '9999px',
                height: '42px',
                padding: '0 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '13px',
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 2px 8px rgba(22, 163, 74, 0.3)',
                flexShrink: 0
              }}
            >
              <MessageSquare className="w-4 h-4 fill-current shrink-0" />
              <span className="hidden sm:inline">Ask Price on WhatsApp</span>
            </a>



            {/* Secret Admin Access — looks like a regular user icon to visitors */}
            <button 
              onClick={() => { window.location.hash = '#admin-login'; }}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-500 transition shrink-0"
              title=""
              aria-label="Account"
            >
              <User className="w-4 h-4 shrink-0" />
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-full bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100 transition"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 p-4 space-y-4 shadow-xl relative z-50 overflow-y-auto max-h-[85vh]">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Brand or Model..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeTab !== 'shop') setActiveTab('shop');
              }}
              className="w-full bg-white pl-10 pr-4"
              style={{ 
                height: '48px', 
                borderRadius: '12px', 
                fontSize: '15px',
                borderColor: '#E5E7EB',
                borderWidth: '1px',
                color: '#111827'
              }}
            />
            <Search className="w-4 h-4 absolute left-4" style={{ top: '16px', color: '#6B7280' }} />
          </div>

          <div className="space-y-1" style={{ fontSize: '15px', fontWeight: 600, color: '#111827' }}>
            <button onClick={() => handleNavClick('home')} className="w-full text-left p-3 rounded-xl hover:bg-gray-100">Store</button>
            
            <button 
              onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)} 
              className="w-full text-left p-3 rounded-xl hover:bg-gray-100 flex items-center justify-between"
            >
              <span>Catalog & Brands</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${categoryDropdownOpen ? 'rotate-180 text-green-600' : ''}`} />
            </button>
            
            {categoryDropdownOpen && (
              <div className="mt-2 mb-4 bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                <MegaMenu 
                  isOpen={true} 
                  onClose={() => setMobileMenuOpen(false)} 
                  products={products}
                  onSelectBrand={(brand) => { onSelectBrand(brand); handleNavClick('shop'); }}
                  onSelectModel={(model) => { onSelectBrand(model.brand); handleNavClick('shop'); }}
                  isMobile={true}
                />
              </div>
            )}

            <button onClick={() => handleNavClick('contact')} className="w-full text-left p-3 rounded-xl hover:bg-gray-100">Contact & Location</button>

          </div>
        </div>
      )}

      {/* Desktop Mega Menu — fixed position, always within viewport */}
      <AnimatePresence>
        {categoryDropdownOpen && !mobileMenuOpen && (
          <MegaMenu 
            isOpen={true} 
            onClose={() => setCategoryDropdownOpen(false)}
            products={products}
            onSelectBrand={(brand) => { onSelectBrand(brand); handleNavClick('shop'); }}
            onSelectModel={(model) => { onSelectBrand(model.brand); handleNavClick('shop'); }}
            topOffset={headerRef.current ? headerRef.current.getBoundingClientRect().bottom : 116}
          />
        )}
      </AnimatePresence>
    </header>
  );
}
