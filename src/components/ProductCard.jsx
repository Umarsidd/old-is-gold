import React, { useState } from 'react';
import { STORE_INFO } from '../data/storeInfo';
import { MessageSquare, Heart } from 'lucide-react';

// ─── Auto Spec Generator by Brand / Model ────────────────────────────────────
function getSpecs(product) {
  const model = (product.model || product.name || '').toLowerCase();
  const brand = (product.brand || '').toLowerCase();
  
  if (brand === 'apple') {
    if (model.includes('iphone 13')) return { ram: '4GB RAM', chip: 'A15 Bionic Chip' };
    if (model.includes('iphone 14')) return { ram: '6GB RAM', chip: 'A15 Bionic Chip' };
    if (model.includes('iphone 15')) return { ram: '6GB RAM', chip: 'A16 Bionic Chip' };
    if (model.includes('iphone 16')) return { ram: '8GB RAM', chip: 'A18 Bionic Chip' };
    return { ram: '4GB RAM', chip: 'Apple Bionic Chip' };
  }
  if (brand === 'samsung') {
    if (model.includes('s23')) return { ram: '8GB RAM', chip: 'Snapdragon 8 Gen 2' };
    if (model.includes('s24')) return { ram: '8GB RAM', chip: 'Snapdragon 8 Gen 3' };
    return { ram: '8GB RAM', chip: 'Snapdragon Processor' };
  }
  if (brand === 'oneplus') {
    if (model.includes('11r')) return { ram: '16GB RAM', chip: 'Snapdragon 8+ Gen 1' };
    if (model.includes('12')) return { ram: '16GB RAM', chip: 'Snapdragon 8 Gen 3' };
    return { ram: '8GB RAM', chip: 'Snapdragon Processor' };
  }
  if (brand === 'xiaomi') {
    if (model.includes('13 pro')) return { ram: '12GB RAM', chip: 'Snapdragon 8 Gen 2' };
    return { ram: '8GB RAM', chip: 'Snapdragon Processor' };
  }
  return { ram: '8GB RAM', chip: 'Octa-Core Processor' };
}

export default function ProductCard({ product, onViewDetails }) {
  const [isLiked, setIsLiked] = useState(false);
  const specs = getSpecs(product);

  const whatsappMessage = encodeURIComponent(
    `Hello OLD IS GOLD! I am interested in inquiring about the price and availability of ${product.brand} ${product.model || product.name} (${product.storage || '128GB'}).`
  );
  const whatsappUrl = `https://wa.me/${STORE_INFO.whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative group">
      
      {/* Top Header Badge & Wishlist Heart */}
      <div className="flex items-center justify-between mb-2 z-10">
        <span className="bg-emerald-50 text-emerald-700 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-emerald-100">
          New Arrival
        </span>
        <button 
          onClick={() => setIsLiked(!isLiked)}
          className={`w-7 h-7 rounded-full border transition flex items-center justify-center ${
            isLiked ? 'bg-red-50 border-red-200 text-red-500' : 'bg-white border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Smartphone Image Container */}
      <div 
        onClick={() => onViewDetails(product)}
        className="w-full h-44 flex items-center justify-center my-2 cursor-pointer relative overflow-hidden"
      >
        <img
          src={product.image}
          alt={product.model || product.name}
          loading="lazy"
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80';
          }}
        />
      </div>

      {/* Product Information */}
      <div className="mt-2 space-y-1.5">
        
        {/* Title + Storage Badge */}
        <div className="flex items-baseline flex-wrap gap-1.5">
          <h3 
            onClick={() => onViewDetails(product)}
            className="font-bold text-sm text-gray-900 cursor-pointer hover:text-emerald-600 transition leading-snug"
          >
            {product.brand} {product.model || product.name}
          </h3>
          <span className="bg-emerald-50 text-emerald-700 text-[11px] font-semibold px-2 py-0.5 rounded-md border border-emerald-100 shrink-0">
            {product.storage || '128GB'}
          </span>
        </div>

        {/* Sub-specs single line */}
        <p className="text-xs text-gray-500 font-medium">
          {specs.ram} &nbsp;|&nbsp; {specs.chip}
        </p>

        {/* Price Label */}
        <div className="pt-2">
          <p className="font-bold text-sm text-gray-900">
            Contact for Price
          </p>
        </div>

        {/* Primary Action Button */}
        <div className="pt-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              width: '100%',
              padding: '10px 0',
              borderRadius: '12px',
              border: '1px solid #16A34A',
              color: '#16A34A',
              backgroundColor: '#FFFFFF',
              fontSize: '12px',
              fontWeight: 700,
              textDecoration: 'none',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#16A34A'; e.currentTarget.style.color = '#FFFFFF'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#FFFFFF'; e.currentTarget.style.color = '#16A34A'; }}
          >
            <MessageSquare className="w-3.5 h-3.5 fill-current" />
            <span>Ask Price on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
