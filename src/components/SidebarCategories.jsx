import React, { useState } from 'react';
import { CATEGORIES_TREE } from '../data/initialProducts';
import { Smartphone, ChevronDown, ChevronRight, Layers } from 'lucide-react';

export default function SidebarCategories({ selectedBrand, onSelectBrand }) {
  const [expandedCategory, setExpandedCategory] = useState(true);

  const totalStockCount = CATEGORIES_TREE.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="card-realme-solid p-5 rounded-2xl bg-white border border-gray-300 space-y-4 relative z-10">
      
      {/* Category Tree Header */}
      <div className="flex items-center justify-between border-b border-gray-300 pb-3">
        <h3 className="font-black text-sm text-black flex items-center gap-2 uppercase tracking-wider">
          <Layers className="w-4 h-4 text-[#16A34A]" />
          <span>Categories & Brands</span>
        </h3>
        <span className="text-[10px] font-mono font-black bg-black text-white px-2 py-0.5 rounded-full">
          {totalStockCount} Models
        </span>
      </div>

      {/* Main Collapsible Category Node */}
      <div className="space-y-2">
        <button
          onClick={() => setExpandedCategory(!expandedCategory)}
          className="w-full flex items-center justify-between text-xs font-black text-black p-2.5 rounded-xl bg-[#F3F4F6] border border-gray-300 transition"
        >
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-[#16A34A]" />
            <span>📱 Mobile Phones</span>
          </div>
          {expandedCategory ? <ChevronDown className="w-4 h-4 text-black" /> : <ChevronRight className="w-4 h-4 text-black" />}
        </button>

        {/* Collapsible Sub-Brand Tree List */}
        {expandedCategory && (
          <div className="pl-3 space-y-1.5 border-l-2 border-gray-300 ml-3 pt-1">
            
            {/* All Brands Option */}
            <button
              onClick={() => onSelectBrand('All')}
              className={`w-full text-left px-3 py-2 text-xs font-black rounded-xl transition flex items-center justify-between ${
                selectedBrand === 'All' || selectedBrand === 'All Brands'
                  ? 'bg-black text-white font-black shadow-md'
                  : 'text-black bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <span>All Brands</span>
              <span className="text-[10px] font-mono opacity-90">({totalStockCount})</span>
            </button>

            {/* Individual Brand Items */}
            {CATEGORIES_TREE.map((brandObj) => {
              const isSelected = selectedBrand.toLowerCase() === brandObj.name.toLowerCase();
              return (
                <button
                  key={brandObj.name}
                  onClick={() => onSelectBrand(brandObj.name)}
                  className={`w-full text-left px-3 py-2 text-xs font-extrabold rounded-xl transition flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#FFC915] text-black font-black border border-black shadow-sm'
                      : 'text-black bg-gray-50 hover:bg-gray-200'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-black"></span>
                    <span>{brandObj.name}</span>
                  </span>
                  <span className="text-[10px] font-mono text-black font-bold">({brandObj.count})</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
