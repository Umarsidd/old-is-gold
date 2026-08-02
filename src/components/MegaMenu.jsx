import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ChevronRight,
  ChevronDown,
  Smartphone, 
  Box, 
  CheckCircle2, 
  XCircle,
  ArrowRight
} from 'lucide-react';

// Dynamic Grouping Utility
const processInventory = (products) => {
  const inventory = {};
  
  products.forEach(product => {
    if (product.isHidden) return;
    
    const brand = product.brand || 'Other';
    if (!inventory[brand]) inventory[brand] = {};
    
    let series = 'Other Series';
    const modelLower = (product.model || product.name || '').toLowerCase();
    const modelNoBrand = modelLower.replace(brand.toLowerCase(), '').trim();
    
    if (brand === 'Apple') {
      if (modelLower.includes('ipad')) series = 'iPad Series';
      else if (modelLower.includes('watch')) series = 'Watch Series';
      else series = 'iPhone Series';
    } else if (brand === 'Samsung') {
      if (modelNoBrand.startsWith('s')) series = 'S Series';
      else if (modelNoBrand.startsWith('a')) series = 'A Series';
      else if (modelLower.includes('flip') || modelLower.includes('fold')) series = 'Z Series';
      else if (modelLower.includes('note')) series = 'Note Series';
      else series = 'Galaxy Series';
    } else if (brand === 'OPPO') {
      if (modelLower.includes('reno')) series = 'Reno Series';
      else if (modelNoBrand.startsWith('f')) series = 'F Series';
      else if (modelNoBrand.startsWith('a')) series = 'A Series';
      else series = 'OPPO Series';
    } else if (brand === 'Realme') {
      if (modelLower.includes('gt')) series = 'GT Series';
      else if (modelNoBrand.startsWith('p')) series = 'P Series';
      else if (modelNoBrand.startsWith('c')) series = 'C Series';
      else if (modelNoBrand.startsWith('v')) series = 'V Series';
      else if (modelLower.includes('narzo')) series = 'Narzo Series';
      else series = 'Number Series';
    } else if (brand === 'Vivo') {
      if (modelNoBrand.startsWith('y')) series = 'Y Series';
      else if (modelNoBrand.startsWith('v')) series = 'V Series';
      else if (modelNoBrand.startsWith('t')) series = 'T Series';
      else if (modelNoBrand.startsWith('x')) series = 'X Series';
      else series = 'Vivo Series';
    } else if (brand === 'OnePlus') {
      if (modelLower.includes('ce')) series = 'CE Series';
      else if (modelLower.includes('nord')) series = 'Nord Series';
      else series = 'Number Series';
    } else if (brand === 'Narzo') {
       series = 'Narzo Series';
    } else {
       const parts = modelNoBrand.split(' ');
       if (parts.length > 0 && parts[0] && /[a-zA-Z]/.test(parts[0])) {
           series = parts[0].charAt(0).toUpperCase() + parts[0].slice(1) + ' Series';
       } else {
           series = brand + ' Series';
       }
    }
    
    if (!inventory[brand][series]) inventory[brand][series] = [];
    inventory[brand][series].push(product);
  });
  
  return inventory;
};

export default function MegaMenu({ 
  isOpen, 
  onClose, 
  products, 
  onSelectBrand, 
  onSelectModel,
  isMobile = false 
}) {
  const [activeBrand, setActiveBrand] = useState(null);
  const [activeSeries, setActiveSeries] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Process data on load
  const inventory = useMemo(() => processInventory(products), [products]);
  const brands = Object.keys(inventory).sort();

  // Initialize first active brand if none selected
  useEffect(() => {
    if (isOpen && !activeBrand && brands.length > 0) {
      setActiveBrand(brands[0]);
    }
  }, [isOpen, activeBrand, brands]);

  // Auto-select first series when brand changes
  useEffect(() => {
    if (activeBrand && inventory[activeBrand]) {
      const seriesList = Object.keys(inventory[activeBrand]).sort();
      if (seriesList.length > 0) {
        setActiveSeries(seriesList[0]);
      }
    }
  }, [activeBrand, inventory]);

  // Filter based on search
  const getFilteredBrands = () => {
    if (!searchQuery) return brands;
    const q = searchQuery.toLowerCase();
    return brands.filter(b => b.toLowerCase().includes(q) || 
      Object.keys(inventory[b]).some(s => s.toLowerCase().includes(q)) ||
      Object.values(inventory[b]).flat().some(p => (p.model || p.name || '').toLowerCase().includes(q))
    );
  };

  const filteredBrands = getFilteredBrands();

  if (!isOpen) return null;

  // Mobile Accordion View
  if (isMobile) {
    return (
      <div className="w-full bg-white space-y-2">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <input
              type="text"
              placeholder="Search brand, series, or model..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-100 text-gray-900 placeholder-gray-500 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <Search className="w-5 h-5 text-gray-500 absolute left-3 top-3.5" />
          </div>
        </div>

        <div className="max-h-[60vh] overflow-y-auto px-4 pb-4">
          {filteredBrands.map(brand => {
            const seriesObj = inventory[brand];
            const isBrandOpen = activeBrand === brand;

            return (
              <div key={brand} className="mb-2 border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setActiveBrand(isBrandOpen ? null : brand)}
                  className={`w-full flex items-center justify-between p-4 ${isBrandOpen ? 'bg-gray-50' : 'bg-white'}`}
                >
                  <span className="font-bold text-gray-900">{brand}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${isBrandOpen ? 'rotate-180 text-green-600' : 'text-gray-400'}`} />
                </button>

                <AnimatePresence>
                  {isBrandOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      className="overflow-hidden bg-gray-50"
                    >
                      {Object.keys(seriesObj).sort().map(seriesName => {
                        const isSeriesOpen = activeSeries === seriesName;
                        const models = seriesObj[seriesName];

                        return (
                          <div key={seriesName} className="border-t border-gray-200">
                            <button
                              onClick={() => setActiveSeries(isSeriesOpen ? null : seriesName)}
                              className="w-full flex items-center justify-between p-3 pl-8 text-sm bg-gray-100"
                            >
                              <span className="font-semibold text-gray-800">{seriesName}</span>
                              <ChevronDown className={`w-4 h-4 transition-transform ${isSeriesOpen ? 'rotate-180 text-green-600' : 'text-gray-400'}`} />
                            </button>

                            <AnimatePresence>
                              {isSeriesOpen && (
                                <motion.div
                                  initial={{ height: 0 }}
                                  animate={{ height: 'auto' }}
                                  exit={{ height: 0 }}
                                  className="overflow-hidden bg-white"
                                >
                                  <div className="flex flex-col">
                                    {models.map(model => {
                                      const isAvailable = model.stock > 0 && model.isAvailable !== false && !model.isSold;
                                      return (
                                        <button
                                          key={model.id}
                                          onClick={() => onSelectModel(model)}
                                          className="flex items-center gap-3 p-3 pl-10 border-b border-gray-100 last:border-0 hover:bg-green-50 text-left transition"
                                        >
                                          <img src={model.image} alt={model.model} className="w-8 h-8 object-contain rounded" />
                                          <div className="flex-1 min-w-0">
                                            <p className="text-sm font-bold text-gray-900 truncate">{model.model || model.name}</p>
                                            <div className="flex items-center gap-2 mt-0.5">
                                              <span className="text-[10px] font-mono bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">Qty: {model.stock}</span>
                                              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${isAvailable ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                                {isAvailable ? 'Available' : 'Out of Stock'}
                                              </span>
                                            </div>
                                          </div>
                                        </button>
                                      );
                                    })}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Desktop 3-Column Mega Menu
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.98 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute top-full mt-4 bg-white shadow-2xl rounded-[20px] border border-gray-200 overflow-hidden z-50 flex flex-col"
      style={{ height: '500px', left: '50%', transform: 'translateX(-50%)', width: 'calc(100vw - 2rem)', maxWidth: '1280px' }}
    >
      {/* Top Search Bar */}
      <div className="p-4 border-b border-gray-200 bg-gray-50/50">
        <div className="relative max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search brands, series, or specific models..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white text-gray-900 placeholder-gray-500 rounded-full pl-11 pr-4 py-3 border border-gray-300 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 shadow-sm text-sm font-medium transition"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3" />
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        
        {/* Column 1: Brands */}
        <div className="w-1/4 bg-gray-50/50 border-r border-gray-200 overflow-y-auto p-4 custom-scrollbar">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-3">Brands</h3>
          <div className="space-y-1">
            {filteredBrands.map((brand) => {
              const isActive = activeBrand === brand;
              const totalStock = Object.values(inventory[brand]).flat().reduce((sum, item) => sum + item.stock, 0);
              
              return (
                <button
                  key={brand}
                  onMouseEnter={() => setActiveBrand(brand)}
                  onClick={() => {
                    onSelectBrand(brand);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 text-left outline-none focus-visible:ring-2 focus-visible:ring-green-500 ${
                    isActive ? 'bg-white shadow-md border border-gray-200 translate-x-1' : 'hover:bg-gray-100 border border-transparent'
                  }`}
                  role="menuitem"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isActive ? 'bg-black text-white' : 'bg-gray-200 text-gray-600'}`}>
                      <Smartphone className="w-4 h-4" />
                    </div>
                    <span className={`font-bold ${isActive ? 'text-gray-900' : 'text-gray-700'}`}>{brand}</span>
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${isActive ? 'bg-blue-100 text-blue-800' : 'bg-gray-200 text-gray-600'}`}>
                    {totalStock}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Column 2: Series */}
        <div className="w-1/3 bg-white border-r border-gray-100 overflow-y-auto p-4 custom-scrollbar">
          {activeBrand && inventory[activeBrand] ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeBrand}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex flex-col h-full">
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-3">
                    {activeBrand} Series
                  </h3>
                  <div className="space-y-1">
                    {Object.keys(inventory[activeBrand]).sort().map(seriesName => {
                      const isActive = activeSeries === seriesName;
                      const modelsCount = inventory[activeBrand][seriesName].length;
                      
                      return (
                        <button
                          key={seriesName}
                          onMouseEnter={() => setActiveSeries(seriesName)}
                          className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 text-left outline-none ${
                            isActive ? 'bg-green-50 border border-green-100 translate-x-1' : 'hover:bg-gray-50 border border-transparent'
                          }`}
                        >
                          <div>
                            <p className={`font-bold ${isActive ? 'text-green-800' : 'text-gray-800'}`}>{seriesName}</p>
                            <p className="text-xs font-medium text-gray-500 mt-0.5">{modelsCount} {modelsCount === 1 ? 'Model' : 'Models'}</p>
                          </div>
                          <ChevronRight className={`w-4 h-4 ${isActive ? 'text-green-600' : 'text-gray-300'}`} />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400">
              <p className="text-sm font-medium">Select a brand</p>
            </div>
          )}
        </div>

        {/* Column 3: Models */}
        <div className="w-5/12 bg-gray-50/30 overflow-y-auto p-4 custom-scrollbar">
          {activeBrand && activeSeries && inventory[activeBrand][activeSeries] ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSeries}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between mb-4 px-2">
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    {activeSeries} Models
                  </h3>
                  <button 
                    onClick={() => {
                      onSelectBrand(activeBrand);
                      onClose();
                    }}
                    className="text-xs font-bold text-green-600 hover:text-green-700 flex items-center gap-1 transition"
                  >
                    View All {activeBrand} <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 gap-2">
                  {inventory[activeBrand][activeSeries].map(model => {
                    const isAvailable = model.stock > 0 && model.isAvailable !== false && !model.isSold;
                    
                    return (
                      <button
                        key={model.id}
                        onClick={() => {
                          onSelectModel(model);
                          onClose();
                        }}
                        className="group flex items-center gap-4 p-3 bg-white hover:bg-green-50 border border-gray-200 hover:border-green-200 rounded-xl transition-all duration-200 text-left shadow-sm hover:shadow-md"
                      >
                        <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center shrink-0 overflow-hidden border border-gray-100">
                          <img 
                            src={model.image} 
                            alt={model.model} 
                            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300"
                            onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=150&q=80"; }}
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-gray-900 truncate group-hover:text-green-700 transition-colors">
                            {model.model || model.name}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] font-mono font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded flex items-center gap-1">
                              <Box className="w-3 h-3" /> Qty {model.stock}
                            </span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 ${
                              isAvailable ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                            }`}>
                              {isAvailable ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                              {isAvailable ? 'Available' : 'Out of Stock'}
                            </span>
                          </div>
                        </div>

                        <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-green-500 transition-colors transform group-hover:translate-x-1" />
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400">
              <p className="text-sm font-medium">Select a series to view models</p>
            </div>
          )}
        </div>

      </div>
    </motion.div>
  );
}
