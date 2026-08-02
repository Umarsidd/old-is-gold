import React, { useState, useEffect } from 'react';
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
import MegaMenu from './MegaMenu';

export default function Header({ 
  searchQuery, 
  setSearchQuery, 
  selectedBrand, 
  onSelectBrand, 
  activeTab, 
  setActiveTab,
  user,
  onOpenAuth,
  products = []
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <header className="sticky top-0 z-50 flex flex-col w-full" style={{ position: 'sticky', top: 0 }}>
      
      {/* Top Ribbon - 36px Height, Solid Background */}
      <div 
        style={{ 
          height: '36px', 
          backgroundColor: 'rgba(0,0,0,0.92)',
          color: '#FFFFFF',
          fontWeight: '600',
          fontSize: '14px',
          letterSpacing: '0.3px'
        }}
        className="w-full flex items-center justify-between px-4 z-50 relative"
      >
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center h-full">
          <div className="flex items-center gap-2">
            <span className="uppercase">{STORE_INFO.name}</span>
            <span className="opacity-70">•</span>
            <span className="truncate hidden sm:inline">100% Genuine Verified Smartphone Showroom</span>
          </div>

          <div className="flex items-center gap-4">
            <a href={`tel:${STORE_INFO.phone}`} className="flex items-center gap-1.5 hover:text-gray-300 transition">
              <Phone className="w-3.5 h-3.5" />
              <span>{STORE_INFO.phone}</span>
            </a>
            <span className="opacity-40">|</span>
            <a 
              href={directWhatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:underline flex items-center gap-1"
            >
              WhatsApp Helpline
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar - 80px Height, Glass effect, bottom border */}
      <div className={`w-full border-b border-[#E5E7EB] transition-all duration-300 relative z-40 ${scrolled ? 'solid-nav' : 'glass-nav'}`} style={{ height: '80px', overflow: 'visible' }}>
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between gap-4">
          
          {/* Logo Container */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer shrink-0"
          >
            <img 
              src={STORE_INFO.logo} 
              alt={STORE_INFO.name} 
              className="h-[56px] w-[56px] rounded-xl object-cover shadow-sm border border-gray-200"
              style={{ height: '56px', width: '56px' }}
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=200&q=80";
              }}
            />
            <div className="flex flex-col justify-center">
              <h1 className="text-[#111827] leading-none m-0 p-0" style={{ fontWeight: 800, fontSize: '24px' }}>
                {STORE_INFO.name}
              </h1>
              <p className="text-[#6B7280] leading-none m-0 p-0 mt-1" style={{ fontSize: '16px', fontWeight: 600 }}>
                OFFICIAL STORE
              </p>
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 h-full">
            <button 
              onClick={() => handleNavClick('home')}
              className={`h-full flex items-center transition-colors`}
              style={{ 
                color: activeTab === 'home' ? '#16A34A' : '#111827', 
                fontWeight: activeTab === 'home' ? 700 : 600, 
                fontSize: '15px',
                borderBottom: activeTab === 'home' ? '2px solid #16A34A' : '2px solid transparent',
                paddingTop: '2px' // offset border
              }}
              onMouseEnter={(e) => { if(activeTab !== 'home') e.target.style.color = '#16A34A'; }}
              onMouseLeave={(e) => { if(activeTab !== 'home') e.target.style.color = '#111827'; }}
            >
              Store
            </button>

            <button 
              onClick={() => handleNavClick('shop')}
              className={`h-full flex items-center transition-colors`}
              style={{ 
                color: activeTab === 'shop' ? '#16A34A' : '#111827', 
                fontWeight: activeTab === 'shop' ? 700 : 600, 
                fontSize: '15px',
                borderBottom: activeTab === 'shop' ? '2px solid #16A34A' : '2px solid transparent',
                paddingTop: '2px'
              }}
              onMouseEnter={(e) => { if(activeTab !== 'shop') e.target.style.color = '#16A34A'; }}
              onMouseLeave={(e) => { if(activeTab !== 'shop') e.target.style.color = '#111827'; }}
            >
              Catalog
            </button>

            {/* Categories & Brands Dropdown */}
            <div className="relative h-full flex items-center">
              <button
                onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                className="flex items-center gap-1.5 transition-colors h-full"
                style={{ 
                  color: '#111827', 
                  fontWeight: 600, 
                  fontSize: '15px',
                  borderBottom: categoryDropdownOpen ? '2px solid #16A34A' : '2px solid transparent'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#16A34A'; }}
                onMouseLeave={(e) => { if(!categoryDropdownOpen) e.currentTarget.style.color = '#111827'; }}
              >
                <Layers className="w-4 h-4" />
                <span>Mega Menu</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${categoryDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>

            <button 
              onClick={() => handleNavClick('contact')}
              className={`h-full flex items-center transition-colors`}
              style={{ 
                color: activeTab === 'contact' ? '#16A34A' : '#111827', 
                fontWeight: activeTab === 'contact' ? 700 : 600, 
                fontSize: '15px',
                borderBottom: activeTab === 'contact' ? '2px solid #16A34A' : '2px solid transparent',
                paddingTop: '2px'
              }}
              onMouseEnter={(e) => { if(activeTab !== 'contact') e.target.style.color = '#16A34A'; }}
              onMouseLeave={(e) => { if(activeTab !== 'contact') e.target.style.color = '#111827'; }}
            >
              Contact
            </button>
          </nav>

          {/* Right Controls: Search, WhatsApp, Admin */}
          <div className="flex items-center gap-4 shrink-0">
            
            {/* Search Bar - 48px Height, Rounded full */}
            <div className="relative hidden md:block w-48 lg:w-60">
              <input
                type="text"
                placeholder="Search Brand or Model..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeTab !== 'shop') setActiveTab('shop');
                }}
                className="w-full bg-white border focus:outline-none transition-shadow pl-10 pr-4"
                style={{ 
                  height: '48px', 
                  borderRadius: '9999px', 
                  fontSize: '14px', 
                  fontWeight: 500,
                  borderColor: '#E5E7EB',
                  color: '#111827'
                }}
              />
              {/* Using inline style for exact positioning to avoid Tailwind JIT arbitrary values */}
              <Search className="w-4 h-4 absolute left-4" style={{ top: '16px', color: '#6B7280' }} />
            </div>

            {/* WhatsApp Button */}
            <a
              href={directWhatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-1.5 shadow-sm hover:opacity-90 transition shrink-0"
              style={{ 
                height: '48px', 
                padding: '0 20px', 
                borderRadius: '9999px', 
                fontSize: '14px', 
                fontWeight: 700,
                backgroundColor: '#16A34A',
                color: '#FFFFFF'
              }}
            >
              <MessageSquare className="w-4 h-4 fill-current shrink-0" />
              <span className="hidden sm:inline">Ask Price on WhatsApp</span>
            </a>

            {/* Admin Button */}
            <button 
              onClick={onOpenAuth}
              className="hidden sm:flex items-center justify-center gap-1.5 hover:bg-gray-200 transition shrink-0"
              style={{ 
                height: '48px', 
                width: '48px', 
                borderRadius: '9999px',
                backgroundColor: '#F3F4F6',
                color: '#111827',
                border: '1px solid #E5E7EB'
              }}
              title="Admin Panel"
            >
              <User className="w-4 h-4 shrink-0" />
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex items-center justify-center hover:bg-gray-200 transition"
              style={{ 
                height: '48px', 
                width: '48px', 
                borderRadius: '9999px',
                backgroundColor: '#F3F4F6',
                color: '#111827'
              }}
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
            <button onClick={() => { onOpenAuth(); setMobileMenuOpen(false); }} className="w-full text-left p-3 rounded-xl hover:bg-gray-100" style={{ color: '#16A34A' }}>Admin Panel</button>
          </div>
        </div>
      )}

      {/* Desktop Mega Menu Overlay */}
      <MegaMenu 
        isOpen={categoryDropdownOpen && !mobileMenuOpen} 
        onClose={() => setCategoryDropdownOpen(false)}
        products={products}
        onSelectBrand={(brand) => { onSelectBrand(brand); handleNavClick('shop'); }}
        onSelectModel={(model) => { onSelectBrand(model.brand); handleNavClick('shop'); }}
      />
    </header>
  );
}
