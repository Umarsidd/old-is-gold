import React, { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import SidebarCategories from '../components/SidebarCategories';
import { BRANDS_LIST } from '../data/initialProducts';
import { 
  Search, 
  RotateCcw, 
  ShieldCheck, 
  Zap, 
  Lock, 
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export default function ShopPage({ 
  products, 
  onViewDetails, 
  searchQuery, 
  setSearchQuery,
  selectedBrand,
  setSelectedBrand
}) {
  const [availabilityFilter, setAvailabilityFilter] = useState('All'); // All, Available, OutOfStock
  const [sortBy, setSortBy] = useState('newest'); // newest, alphabetical
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (p.isHidden) return false;

      // Live Search (Brand, Model, Storage)
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchModel = (p.model || p.name).toLowerCase().includes(query);
        const matchBrand = p.brand.toLowerCase().includes(query);
        const matchStorage = (p.storage || '').toLowerCase().includes(query);
        if (!matchModel && !matchBrand && !matchStorage) return false;
      }

      // Brand filter
      if (selectedBrand && selectedBrand !== 'All' && selectedBrand !== 'All Brands') {
        if (p.brand.toLowerCase() !== selectedBrand.toLowerCase()) {
          return false;
        }
      }

      // Availability filter
      const isAvailable = p.stock > 0 && p.isAvailable !== false && !p.isSold;
      if (availabilityFilter === 'Available' && !isAvailable) return false;
      if (availabilityFilter === 'OutOfStock' && isAvailable) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'alphabetical') {
        return (a.model || a.name).localeCompare(b.model || b.name);
      }
      return 0; // newest default order
    });
  }, [products, searchQuery, selectedBrand, availabilityFilter, sortBy]);

  const handleResetFilters = () => {
    setSelectedBrand('All');
    setSearchQuery('');
    setAvailabilityFilter('All');
    setSortBy('newest');
    setCurrentPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 bg-[#FAFAFA] text-gray-900 min-h-screen">
      
      {/* Top Header Banner ("OFFICIAL STORE CATALOG") */}
      <div className="bg-gradient-to-r from-emerald-50/90 via-teal-50/50 to-emerald-50/20 border border-emerald-100 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>OFFICIAL STORE CATALOG</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-1">
            {selectedBrand && selectedBrand !== 'All' ? `${selectedBrand} Collection` : 'All Smartphone Inventory'}
          </h1>
          <p className="text-xs text-gray-500 font-medium mt-1">
            Showing <strong className="text-emerald-700 font-bold">{filteredProducts.length}</strong> verified mobile devices
          </p>
        </div>

        <button
          onClick={handleResetFilters}
          className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5 text-gray-500" />
          <span>Reset All Filters</span>
        </button>
      </div>

      {/* Main Grid Layout: Sidebar + Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Sidebar Filter Panel */}
        <aside className="lg:col-span-3">
          <SidebarCategories
            selectedBrand={selectedBrand}
            onSelectBrand={(b) => setSelectedBrand(b)}
            onClearFilters={handleResetFilters}
          />
        </aside>

        {/* Right Content Column */}
        <main className="lg:col-span-9 space-y-4">
          
          {/* Top Filter Bar (BRAND / STATUS / SORT) */}
          <div className="bg-white border border-gray-200 rounded-2xl p-3 flex flex-wrap items-center justify-between gap-3 shadow-sm">
            
            {/* BRAND Selector */}
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">BRAND:</span>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="bg-gray-50 text-gray-800 text-xs font-semibold rounded-xl px-3 py-1.5 border border-gray-200 focus:outline-none focus:border-emerald-500 transition"
              >
                {BRANDS_LIST.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* STATUS Selector */}
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">STATUS:</span>
              <select
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value)}
                className="bg-gray-50 text-gray-800 text-xs font-semibold rounded-xl px-3 py-1.5 border border-gray-200 focus:outline-none focus:border-emerald-500 transition"
              >
                <option value="All">All Items</option>
                <option value="Available">Available</option>
                <option value="OutOfStock">Out of Stock</option>
              </select>
            </div>

            {/* SORT Selector */}
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                <SlidersHorizontal className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">SORT:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-50 text-gray-800 text-xs font-semibold rounded-xl px-3 py-1.5 border border-gray-200 focus:outline-none focus:border-emerald-500 transition"
              >
                <option value="newest">Newest Arrivals</option>
                <option value="alphabetical">Alphabetical (A-Z)</option>
              </select>
            </div>

          </div>

          {/* Trust Badges Strip (4 horizontal items) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-white border border-gray-200 rounded-2xl p-3.5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">100% Original</p>
                <p className="text-[11px] text-gray-400">Genuine Products</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">Verified Devices</p>
                <p className="text-[11px] text-gray-400">Quality Checked</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">Fast Response</p>
                <p className="text-[11px] text-gray-400">On WhatsApp</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">Secure Shopping</p>
                <p className="text-[11px] text-gray-400">Your Data Safe</p>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white border border-gray-200 p-12 text-center rounded-2xl space-y-4 shadow-sm">
              <div className="w-14 h-14 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mx-auto border border-gray-200">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-gray-800">No Mobile Devices Found</h3>
              <p className="text-xs text-gray-500 max-w-xs mx-auto">
                No mobile phone models match your active search or brand filter selection.
              </p>
              <button
                onClick={handleResetFilters}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2 rounded-xl text-xs transition"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={onViewDetails}
                />
              ))}
            </div>
          )}

          {/* Pagination Bar at Bottom */}
          {filteredProducts.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-2xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
              
              {/* Pagination Page Numbers */}
              <div className="flex items-center gap-1.5 text-xs">
                <button className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition">
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                  1
                </button>
                <button className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition">
                  2
                </button>
                <button className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition">
                  3
                </button>
                <button className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition">
                  4
                </button>
                <span className="text-gray-400 px-1">...</span>
                <button className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition">
                  13
                </button>
                <button className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition">
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Total results info */}
              <p className="text-xs text-gray-500 font-medium">
                Showing 1 to {Math.min(12, filteredProducts.length)} of {filteredProducts.length} results
              </p>

            </div>
          )}

        </main>

      </div>
    </div>
  );
}

