import React, { useState } from 'react';
import { CATEGORIES_TREE } from '../data/initialProducts';
import { 
  Smartphone, 
  ChevronDown, 
  ChevronUp, 
  Layers, 
  Tag, 
  HardDrive, 
  Cpu, 
  ShieldCheck, 
  Eye, 
  Wifi, 
  Trash2 
} from 'lucide-react';

// Brand icons map matching standard smartphone logos
const BRAND_ICONS = {
  Apple: '🍎',
  Samsung: '📱',
  OnePlus: '🔴',
  Xiaomi: '🟧',
  Realme: '🟨',
  Oppo: '🟩',
  Vivo: '🟦',
  Google: '⚪',
  Motorola: '🔵',
  Tecno: '⚡',
  Infinix: '🔥'
};

export default function SidebarCategories({ selectedBrand, onSelectBrand, onClearFilters }) {
  const [expandedMobile, setExpandedMobile] = useState(true);
  const [openSection, setOpenSection] = useState(null);

  const totalStockCount = CATEGORIES_TREE.reduce((sum, item) => sum + item.count, 0);

  const toggleSection = (sec) => {
    setOpenSection(openSection === sec ? null : sec);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 space-y-4 shadow-xs">
      
      {/* Category Tree Header */}
      <div className="flex items-center gap-2 pb-1 border-b border-gray-100">
        <Layers className="w-4 h-4 text-emerald-600" />
        <h3 className="font-bold text-xs text-gray-800 uppercase tracking-wider">
          Categories & Brands
        </h3>
      </div>

      {/* Main Collapsible Category Node - Mobile Phones */}
      <div className="space-y-2">
        <button
          onClick={() => setExpandedMobile(!expandedMobile)}
          className="w-full flex items-center justify-between text-xs font-semibold text-emerald-700 p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100 transition"
        >
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-emerald-600" />
            <span className="font-bold">Mobile Phones</span>
          </div>
          {expandedMobile ? <ChevronUp className="w-4 h-4 text-emerald-600" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
        </button>

        {/* Brand Tree List */}
        {expandedMobile && (
          <div className="pl-2 space-y-1 pt-1">
            
            {/* All Brands Option */}
            <button
              onClick={() => onSelectBrand('All')}
              className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-xl transition flex items-center justify-between ${
                selectedBrand === 'All' || selectedBrand === 'All Brands'
                  ? 'bg-emerald-50 text-emerald-700 font-bold border border-emerald-200'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>All Brands</span>
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white">
                {totalStockCount}
              </span>
            </button>

            {/* Individual Brand Items */}
            {CATEGORIES_TREE.map((brandObj) => {
              const isSelected = selectedBrand.toLowerCase() === brandObj.name.toLowerCase();
              const icon = BRAND_ICONS[brandObj.name] || '📱';
              return (
                <button
                  key={brandObj.name}
                  onClick={() => onSelectBrand(brandObj.name)}
                  className={`w-full text-left px-3 py-1.5 text-xs font-medium rounded-lg transition flex items-center justify-between ${
                    isSelected
                      ? 'bg-emerald-50 text-emerald-700 font-bold border border-emerald-200'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-sm">{icon}</span>
                    <span>{brandObj.name}</span>
                  </span>
                  <span className="text-[11px] font-semibold text-gray-400">{brandObj.count}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Accordion Filter Items */}
      <div className="space-y-1.5 pt-2 border-t border-gray-100 text-xs font-medium">
        
        {/* Price Range */}
        <div className="border border-gray-100 rounded-xl overflow-hidden">
          <button
            onClick={() => toggleSection('price')}
            className="w-full flex items-center justify-between p-2.5 text-gray-700 hover:bg-gray-50 transition"
          >
            <div className="flex items-center gap-2">
              <Tag className="w-3.5 h-3.5 text-gray-400" />
              <span>Price Range</span>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${openSection === 'price' ? 'rotate-180' : ''}`} />
          </button>
          {openSection === 'price' && (
            <div className="p-3 bg-gray-50/50 space-y-2 border-t border-gray-100">
              <div className="flex gap-2">
                <input type="number" placeholder="Min ₹" className="w-1/2 p-1.5 bg-white border border-gray-200 rounded-lg text-xs" />
                <input type="number" placeholder="Max ₹" className="w-1/2 p-1.5 bg-white border border-gray-200 rounded-lg text-xs" />
              </div>
            </div>
          )}
        </div>

        {/* Storage */}
        <div className="border border-gray-100 rounded-xl overflow-hidden">
          <button
            onClick={() => toggleSection('storage')}
            className="w-full flex items-center justify-between p-2.5 text-gray-700 hover:bg-gray-50 transition"
          >
            <div className="flex items-center gap-2">
              <HardDrive className="w-3.5 h-3.5 text-gray-400" />
              <span>Storage</span>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${openSection === 'storage' ? 'rotate-180' : ''}`} />
          </button>
          {openSection === 'storage' && (
            <div className="p-2.5 bg-gray-50/50 space-y-1 border-t border-gray-100">
              {['64GB', '128GB', '256GB', '512GB', '1TB'].map(s => (
                <label key={s} className="flex items-center gap-2 text-gray-600 cursor-pointer py-1">
                  <input type="checkbox" className="rounded text-emerald-600" />
                  <span>{s}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* RAM */}
        <div className="border border-gray-100 rounded-xl overflow-hidden">
          <button
            onClick={() => toggleSection('ram')}
            className="w-full flex items-center justify-between p-2.5 text-gray-700 hover:bg-gray-50 transition"
          >
            <div className="flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-gray-400" />
              <span>RAM</span>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${openSection === 'ram' ? 'rotate-180' : ''}`} />
          </button>
          {openSection === 'ram' && (
            <div className="p-2.5 bg-gray-50/50 space-y-1 border-t border-gray-100">
              {['4GB', '6GB', '8GB', '12GB', '16GB'].map(r => (
                <label key={r} className="flex items-center gap-2 text-gray-600 cursor-pointer py-1">
                  <input type="checkbox" className="rounded text-emerald-600" />
                  <span>{r}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Condition */}
        <div className="border border-gray-100 rounded-xl overflow-hidden">
          <button
            onClick={() => toggleSection('condition')}
            className="w-full flex items-center justify-between p-2.5 text-gray-700 hover:bg-gray-50 transition"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-gray-400" />
              <span>Condition</span>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${openSection === 'condition' ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Availability */}
        <div className="border border-gray-100 rounded-xl overflow-hidden">
          <button
            onClick={() => toggleSection('avail')}
            className="w-full flex items-center justify-between p-2.5 text-gray-700 hover:bg-gray-50 transition"
          >
            <div className="flex items-center gap-2">
              <Eye className="w-3.5 h-3.5 text-gray-400" />
              <span>Availability</span>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${openSection === 'avail' ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Network Type */}
        <div className="border border-gray-100 rounded-xl overflow-hidden">
          <button
            onClick={() => toggleSection('network')}
            className="w-full flex items-center justify-between p-2.5 text-gray-700 hover:bg-gray-50 transition"
          >
            <div className="flex items-center gap-2">
              <Wifi className="w-3.5 h-3.5 text-gray-400" />
              <span>Network Type</span>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${openSection === 'network' ? 'rotate-180' : ''}`} />
          </button>
        </div>

      </div>

      {/* Clear All Filters Button */}
      <div className="pt-2">
        <button
          onClick={onClearFilters}
          className="w-full py-2.5 px-3 border border-emerald-600 text-emerald-700 hover:bg-emerald-50 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear All Filters</span>
        </button>
      </div>

    </div>
  );
}

