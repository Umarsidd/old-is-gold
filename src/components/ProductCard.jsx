import React from 'react';
import { STORE_INFO } from '../data/storeInfo';
import { 
  ShoppingCart, 
  MessageSquare, 
  Heart, 
  ShieldCheck, 
  Eye,
  CheckCircle,
  Tag
} from 'lucide-react';

export default function ProductCard({ 
  product, 
  onAddToCart, 
  onViewDetails, 
  isWishlisted, 
  onToggleWishlist 
}) {
  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getConditionColor = (condition) => {
    switch (condition?.toLowerCase()) {
      case 'brand new':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'like new':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'refurbished':
        return 'bg-sky-500/20 text-sky-300 border-sky-500/40';
      default:
        return 'bg-slate-700/50 text-slate-300 border-slate-600';
    }
  };

  const directWhatsappText = encodeURIComponent(
    `Hello Umar Khan, I want to buy *${product.name}* (Condition: ${product.condition}, Price: ₹${product.price.toLocaleString('en-IN')}) from OLD IS GOLD store.`
  );
  const directWhatsappUrl = `https://wa.me/${STORE_INFO.whatsappNumber}?text=${directWhatsappText}`;

  return (
    <div className="glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col justify-between relative group">
      
      {/* Top Media & Badges Overlay */}
      <div className="relative aspect-square bg-slate-900 overflow-hidden cursor-pointer" onClick={() => onViewDetails(product)}>
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80";
          }}
        />

        {/* Condition Badge */}
        <span className={`absolute top-3 left-3 text-[10px] font-extrabold px-2.5 py-1 rounded-full border backdrop-blur-md uppercase tracking-wider ${getConditionColor(product.condition)}`}>
          {product.condition}
        </span>

        {/* Featured / Discount Tag */}
        {product.discountPercentage > 0 && (
          <span className="absolute top-3 right-3 bg-red-600/90 text-white text-[10px] font-black px-2 py-0.5 rounded-full border border-red-400">
            {product.discountPercentage}% OFF
          </span>
        )}

        {/* Sold Out Overlay */}
        {(product.isSold || product.stock <= 0) && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center">
            <span className="bg-red-600 text-white font-black text-xs px-4 py-1.5 rounded-full uppercase tracking-widest border border-red-400 shadow-xl">
              SOLD OUT
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute bottom-3 right-3 p-2 rounded-full backdrop-blur-md transition ${
            isWishlisted 
              ? 'bg-red-600 text-white' 
              : 'bg-slate-900/80 text-slate-300 hover:text-red-400'
          }`}
          title="Wishlist"
        >
          <Heart className="w-4 h-4 fill-current" />
        </button>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-semibold text-amber-400">{product.brand}</span>
            <span className="flex items-center gap-1 text-[11px] text-emerald-400">
              <ShieldCheck className="w-3 h-3" />
              Store Verified
            </span>
          </div>

          <h3 
            onClick={() => onViewDetails(product)}
            className="font-bold text-slate-100 text-sm md:text-base leading-snug line-clamp-2 hover:text-amber-400 cursor-pointer transition"
          >
            {product.name}
          </h3>

          {/* Quick Specs Pills */}
          {product.specs && (
            <div className="flex flex-wrap gap-1.5 mt-2 text-[10px] text-slate-300">
              {product.specs.ram && (
                <span className="bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700 font-mono">
                  {product.specs.ram}
                </span>
              )}
              {product.specs.storage && (
                <span className="bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700 font-mono">
                  {product.specs.storage}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Pricing & Stock Section */}
        <div className="pt-2 border-t border-slate-800/80 space-y-2">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-lg md:text-xl font-black text-amber-400 font-mono">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-slate-500 line-through ml-2 font-mono">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            <span className={`text-[11px] font-semibold ${product.stock > 0 && !product.isSold ? 'text-emerald-400' : 'text-red-400'}`}>
              {product.stock > 0 && !product.isSold ? `In Stock (${product.stock})` : 'Sold'}
            </span>
          </div>

          {/* Action Buttons Grid */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => onAddToCart(product)}
              disabled={product.isSold || product.stock <= 0}
              className="flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-bold py-2 px-2.5 rounded-xl border border-slate-700 disabled:opacity-50 transition"
            >
              <ShoppingCart className="w-3.5 h-3.5 text-amber-400" />
              <span>Add Cart</span>
            </button>

            <a
              href={directWhatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2 px-2.5 rounded-xl shadow-md transition"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Buy Now</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
