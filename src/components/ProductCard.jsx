import React from 'react';
import { STORE_INFO } from '../data/storeInfo';
import { MessageSquare, CheckCircle2, XCircle } from 'lucide-react';

export default function ProductCard({ product, onViewDetails }) {
  const isAvailable = product.stock > 0 && product.isAvailable !== false && !product.isSold;

  const rawMessage = 
`Hello,

I want to know the price of

Brand: ${product.brand}
Model: ${product.model || product.name}
Storage: ${product.storage || '128GB'}
Color: ${product.color || 'Standard'}

Is it available?

Please share today's best price.`;

  const whatsappUrl = `https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(rawMessage)}`;

  return (
    <div className="card-realme-solid overflow-hidden flex flex-col justify-between relative group bg-white border border-gray-300 rounded-2xl">
      
      {/* Top Media Image Container */}
      <div 
        onClick={() => onViewDetails(product)}
        className="relative aspect-square bg-[#F8F9FA] overflow-hidden cursor-pointer flex items-center justify-center p-6 border-b border-gray-200"
      >
        <img 
          src={product.image} 
          alt={product.name}
          loading="lazy"
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-300"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80";
          }}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="bg-black text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
            NEW
          </span>
          <span className="bg-[#111111] text-[#FFC915] text-[10px] font-black px-2 py-0.5 rounded uppercase">
            {product.brand}
          </span>
        </div>

        {/* Stock Status Badge */}
        <span className={`absolute top-3 right-3 text-[11px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm ${
          isAvailable 
            ? 'bg-emerald-100 text-emerald-900 border border-emerald-400' 
            : 'bg-red-100 text-red-900 border border-red-400'
        }`}>
          {isAvailable ? (
            <>
              <CheckCircle2 className="w-3 h-3 text-[#16A34A] shrink-0" />
              <span>Available</span>
            </>
          ) : (
            <>
              <XCircle className="w-3 h-3 text-red-600 shrink-0" />
              <span>Out of Stock</span>
            </>
          )}
        </span>
      </div>

      {/* Product Content Details - 100% Solid Black Fonts */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-white">
        <div>
          <h3 
            onClick={() => onViewDetails(product)}
            className="font-black text-[#000000] text-base leading-tight line-clamp-1 hover:text-[#16A34A] cursor-pointer transition"
          >
            {product.model || product.name}
          </h3>

          <div className="flex items-center gap-2 mt-1.5 text-xs text-black font-extrabold">
            <span className="bg-gray-100 px-2 py-0.5 rounded border border-gray-300">{product.storage || '128GB'}</span>
            <span>•</span>
            <span className="truncate text-gray-900 font-bold">{product.color || 'Standard'}</span>
          </div>

          <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-200 text-xs">
            <span className="text-gray-900 font-bold">Available Stock:</span>
            <span className={`font-mono font-black ${isAvailable ? 'text-[#16A34A]' : 'text-red-600'}`}>
              {product.stock} {product.stock === 1 ? 'unit' : 'units'}
            </span>
          </div>
        </div>

        {/* Price Label (ALWAYS Price: Ask on WhatsApp) & Green WhatsApp CTA */}
        <div className="space-y-2.5 pt-2 border-t border-gray-200">
          <div>
            <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Price</p>
            <p className="text-sm font-black text-[#16A34A]">Ask on WhatsApp</p>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full bg-[#16A34A] hover:bg-emerald-700 text-white font-black text-xs py-3 px-3 rounded-xl shadow flex items-center justify-center gap-2 transition"
          >
            <MessageSquare className="w-4 h-4 fill-current shrink-0" />
            <span>Ask Price on WhatsApp</span>
          </a>
        </div>

      </div>
    </div>
  );
}
