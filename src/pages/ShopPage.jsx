import React, { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import SidebarCategories from '../components/SidebarCategories';
import { BRANDS_LIST } from '../data/initialProducts';
import { Search, RotateCcw, Smartphone, Layers } from 'lucide-react';

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
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 bg-white text-black">
      
      {/* Top Header Title */}
      <div className="card-realme-solid p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 border border-gray-300 bg-white shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-[#16A34A] text-xs font-black uppercase tracking-wider mb-1">
            <Layers className="w-4 h-4 text-black" />
            <span>Official Store Catalog</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-black">
            {selectedBrand && selectedBrand !== 'All' ? `${selectedBrand} Collection` : 'All Smartphone Inventory'}
          </h1>
          <p className="text-xs text-black font-extrabold mt-1">
            Showing <strong className="text-[#16A34A] font-black">{filteredProducts.length}</strong> verified mobile devices
          </p>
        </div>

        <button
          onClick={handleResetFilters}
          className="text-xs font-black text-black hover:text-[#16A34A] flex items-center gap-1.5 bg-[#F3F4F6] px-4 py-2.5 rounded-xl border border-gray-400 transition"
        >
          <RotateCcw className="w-3.5 h-3.5 text-black" />
          <span>Reset All Filters</span>
        </button>
      </div>

      {/* Top Filter Bar */}
      <div className="card-realme-solid p-4 rounded-2xl bg-white border border-gray-300 flex flex-wrap items-center justify-between gap-4">
        
        {/* Brand Selector Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-black uppercase">Brand:</span>
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="bg-[#F8F9FA] text-black text-xs font-black rounded-xl px-3 py-2 border border-gray-400 focus:outline-none focus:border-black"
          >
            {BRANDS_LIST.map(b => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        {/* Availability Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-black uppercase">Status:</span>
          <select
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
            className="bg-[#F8F9FA] text-black text-xs font-black rounded-xl px-3 py-2 border border-gray-400 focus:outline-none focus:border-black"
          >
            <option value="All">All Items</option>
            <option value="Available">Available (Green)</option>
            <option value="OutOfStock">Out of Stock (Red)</option>
          </select>
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-black uppercase">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#F8F9FA] text-black text-xs font-black rounded-xl px-3 py-2 border border-gray-400 focus:outline-none focus:border-black"
          >
            <option value="newest">Newest Arrivals</option>
            <option value="alphabetical">Alphabetical (A-Z)</option>
          </select>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Sidebar Category Brand Tree */}
        <aside className="lg:col-span-3">
          <SidebarCategories
            selectedBrand={selectedBrand}
            onSelectBrand={(b) => setSelectedBrand(b)}
          />
        </aside>

        {/* Right Main Product Grid */}
        <main className="lg:col-span-9">
          {filteredProducts.length === 0 ? (
            <div className="card-realme-solid p-12 text-center rounded-2xl space-y-4 bg-white border border-gray-300">
              <div className="w-16 h-16 bg-[#F3F4F6] text-black rounded-full flex items-center justify-center mx-auto border border-gray-400">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-black text-black">No Mobile Devices Found</h3>
              <p className="text-xs text-black font-extrabold max-w-sm mx-auto">
                No mobile phone models match your active search or brand filter selection.
              </p>
              <button
                onClick={handleResetFilters}
                className="bg-black hover:bg-gray-800 text-white font-black px-6 py-2.5 rounded-xl text-xs transition"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={onViewDetails}
                />
              ))}
            </div>
          )}
        </main>

      </div>
    </div>
  );
}
