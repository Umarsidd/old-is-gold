import React, { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import { CATEGORIES, BRANDS, CONDITIONS } from '../data/initialProducts';
import { Filter, SlidersHorizontal, Search, RotateCcw, Smartphone } from 'lucide-react';

export default function ShopPage({ 
  products, 
  onAddToCart, 
  onViewDetails, 
  wishlist, 
  onToggleWishlist,
  searchQuery,
  setSearchQuery,
  initialConditionFilter = 'All'
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedCondition, setSelectedCondition] = useState(initialConditionFilter);
  const [maxPrice, setMaxPrice] = useState(200000);
  const [sortBy, setSortBy] = useState('featured');
  const [inStockOnly, setInStockOnly] = useState(false);

  // Compute filtered & sorted products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (p.isHidden) return false;
      
      // Search term match
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(query);
        const matchBrand = p.brand.toLowerCase().includes(query);
        const matchCategory = p.category.toLowerCase().includes(query);
        if (!matchName && !matchBrand && !matchCategory) return false;
      }

      // Category match
      if (selectedCategory !== 'All' && p.category !== selectedCategory) {
        return false;
      }

      // Brand match
      if (selectedBrand !== 'All' && p.brand.toLowerCase() !== selectedBrand.toLowerCase()) {
        return false;
      }

      // Condition match
      if (selectedCondition !== 'All' && p.condition.toLowerCase() !== selectedCondition.toLowerCase()) {
        return false;
      }

      // Max price match
      if (p.price > maxPrice) {
        return false;
      }

      // In stock match
      if (inStockOnly && (p.isSold || p.stock <= 0)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'discount') return b.discountPercentage - a.discountPercentage;
      return 0; // featured default order
    });
  }, [products, searchQuery, selectedCategory, selectedBrand, selectedCondition, maxPrice, sortBy, inStockOnly]);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedBrand('All');
    setSelectedCondition('All');
    setMaxPrice(200000);
    setSearchQuery('');
    setInStockOnly(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Smartphone className="w-4 h-4" />
            <span>Mobile Catalog • OLD IS GOLD Balrampur</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-black text-white">
            All Mobile Phones & Accessories
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Showing <strong className="text-amber-400">{filteredProducts.length}</strong> available devices
          </p>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-slate-400 uppercase whitespace-nowrap">Sort By:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-900 text-white text-xs font-bold rounded-xl px-3 py-2 border border-slate-700 focus:outline-none focus:border-amber-500"
          >
            <option value="featured">Featured / Featured First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="discount">Biggest Discount</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Sidebar Filter Controls */}
        <aside className="space-y-6 lg:col-span-1">
          <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 font-bold text-white text-sm uppercase tracking-wider">
                <Filter className="w-4 h-4 text-amber-400" />
                <span>Filter Handsets</span>
              </div>
              <button
                onClick={handleResetFilters}
                className="text-[11px] font-bold text-slate-400 hover:text-amber-400 flex items-center gap-1 transition"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Search filter input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase">Search Keywords</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. iPhone, S24, 256GB..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900 text-white placeholder-slate-500 text-xs rounded-xl pl-8 pr-3 py-2 border border-slate-700 focus:outline-none focus:border-amber-500"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
            </div>

            {/* Condition Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase">Handset Condition</label>
              <div className="flex flex-wrap gap-1.5">
                {CONDITIONS.map((cond) => (
                  <button
                    key={cond}
                    onClick={() => setSelectedCondition(cond)}
                    className={`text-xs font-semibold px-2.5 py-1 rounded-lg border transition ${
                      selectedCondition.toLowerCase() === cond.toLowerCase()
                        ? 'bg-amber-500 text-slate-950 font-bold border-amber-500'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    {cond}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase">Mobile Brand</label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full bg-slate-900 text-white text-xs font-semibold rounded-xl p-2 border border-slate-700 focus:outline-none focus:border-amber-500"
              >
                {BRANDS.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase">Category</label>
              <div className="space-y-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left text-xs font-medium px-3 py-1.5 rounded-lg transition flex items-center justify-between ${
                      selectedCategory === cat
                        ? 'bg-slate-800 text-amber-400 font-bold border-l-2 border-amber-500'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span>{cat}</span>
                    {selectedCategory === cat && <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter Slider */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="flex justify-between items-center text-xs text-slate-300">
                <span className="font-bold uppercase">Max Price</span>
                <span className="font-mono font-bold text-amber-400">₹{maxPrice.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="200000"
                step="5000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>

            {/* In Stock Checkbox */}
            <div className="pt-2 border-t border-slate-800 flex items-center gap-2">
              <input
                type="checkbox"
                id="instock-check"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded text-amber-500 focus:ring-amber-500 bg-slate-900 border-slate-700"
              />
              <label htmlFor="instock-check" className="text-xs font-semibold text-slate-300 cursor-pointer">
                Hide Sold Out Items Only
              </label>
            </div>
          </div>
        </aside>

        {/* Right Main Grid */}
        <main className="lg:col-span-3 space-y-6">
          {filteredProducts.length === 0 ? (
            <div className="glass-card p-12 text-center rounded-3xl space-y-4">
              <div className="w-16 h-16 bg-slate-900 text-slate-600 rounded-full flex items-center justify-center mx-auto border border-slate-800">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white">No Phones Found Matching Criteria</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Try resetting filters or searching for different keywords like iPhone, Samsung, or Nokia.
              </p>
              <button
                onClick={handleResetFilters}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-xs transition"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  onViewDetails={onViewDetails}
                  isWishlisted={wishlist.some(item => item.id === product.id)}
                  onToggleWishlist={onToggleWishlist}
                />
              ))}
            </div>
          )}
        </main>

      </div>
    </div>
  );
}
