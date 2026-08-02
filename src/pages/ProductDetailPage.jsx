import React, { useState } from 'react';
import { STORE_INFO } from '../data/storeInfo';
import { 
  ShoppingCart, 
  MessageSquare, 
  ShieldCheck, 
  ArrowLeft, 
  Truck, 
  Check, 
  Heart, 
  Phone, 
  MapPin, 
  Award,
  Cpu,
  HardDrive,
  Camera,
  Battery,
  Tv
} from 'lucide-react';

export default function ProductDetailPage({ 
  product, 
  onBack, 
  onAddToCart, 
  isWishlisted, 
  onToggleWishlist 
}) {
  const [qty, setQty] = useState(1);

  if (!product) return null;

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Umar Khan, I want to purchase *${product.name}* (Qty: ${qty}, Condition: ${product.condition}, Total: ₹${(product.price * qty).toLocaleString('en-IN')}) from OLD IS GOLD store.`
  );
  const whatsappUrl = `https://wa.me/${STORE_INFO.whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-amber-400 bg-slate-900 px-4 py-2 rounded-xl border border-slate-800 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Catalog</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Product Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="glass-card rounded-3xl overflow-hidden border border-slate-800 relative bg-slate-900 aspect-square flex items-center justify-center p-4">
            <img 
              src={product.image} 
              alt={product.name}
              className="max-h-full max-w-full object-contain rounded-2xl"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80";
              }}
            />

            {/* Condition Pill */}
            <span className="absolute top-4 left-4 bg-amber-500 text-slate-950 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
              {product.condition}
            </span>

            {/* Discount Badge */}
            {product.discountPercentage > 0 && (
              <span className="absolute top-4 right-4 bg-red-600 text-white font-black text-xs px-3 py-1 rounded-full border border-red-400">
                SAVE {product.discountPercentage}%
              </span>
            )}

            {/* Wishlist Button */}
            <button
              onClick={() => onToggleWishlist(product)}
              className={`absolute bottom-4 right-4 p-3 rounded-full backdrop-blur-md border transition ${
                isWishlisted 
                  ? 'bg-red-600 border-red-500 text-white' 
                  : 'bg-slate-900/80 border-slate-700 text-slate-300 hover:text-red-400'
              }`}
            >
              <Heart className="w-5 h-5 fill-current" />
            </button>
          </div>
        </div>

        {/* Right Column: Product Details & WhatsApp Direct Purchase */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">
              <span>{product.brand}</span>
              <span className="text-slate-600">•</span>
              <span>{product.category}</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-black text-white leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mt-3">
              <span className="text-3xl font-black text-amber-400 font-mono">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-base text-slate-500 line-through font-mono">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl space-y-2 text-xs text-slate-300 leading-relaxed">
            <h4 className="font-bold text-white uppercase text-[11px]">Item Details & Guarantee:</h4>
            <p>{product.description}</p>
          </div>

          {/* Key Specifications Grid */}
          {product.specs && (
            <div className="space-y-2">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider">Device Specifications:</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                {product.specs.ram && (
                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-amber-400 shrink-0" />
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase">RAM</p>
                      <p className="font-bold text-white">{product.specs.ram}</p>
                    </div>
                  </div>
                )}
                {product.specs.storage && (
                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex items-center gap-2">
                    <HardDrive className="w-4 h-4 text-amber-400 shrink-0" />
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase font-mono">Storage</p>
                      <p className="font-bold text-white font-mono">{product.specs.storage}</p>
                    </div>
                  </div>
                )}
                {product.specs.camera && (
                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex items-center gap-2">
                    <Camera className="w-4 h-4 text-amber-400 shrink-0" />
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase">Camera</p>
                      <p className="font-bold text-white truncate">{product.specs.camera}</p>
                    </div>
                  </div>
                )}
                {product.specs.battery && (
                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex items-center gap-2">
                    <Battery className="w-4 h-4 text-amber-400 shrink-0" />
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase">Battery</p>
                      <p className="font-bold text-white">{product.specs.battery}</p>
                    </div>
                  </div>
                )}
                {product.specs.display && (
                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex items-center gap-2 col-span-2 sm:col-span-1">
                    <Tv className="w-4 h-4 text-amber-400 shrink-0" />
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase">Display</p>
                      <p className="font-bold text-white truncate">{product.specs.display}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Qty Selector & Action Buttons */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <div className="flex items-center gap-4">
              <label className="text-xs font-bold text-slate-300 uppercase">Quantity:</label>
              <div className="flex items-center bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 gap-3">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="text-slate-300 hover:text-amber-400 font-bold"
                >
                  -
                </button>
                <span className="font-bold text-white font-mono text-sm">{qty}</span>
                <button
                  onClick={() => setQty(Math.min(product.stock || 10, qty + 1))}
                  className="text-slate-300 hover:text-amber-400 font-bold"
                >
                  +
                </button>
              </div>

              <span className={`text-xs font-bold ${product.stock > 0 && !product.isSold ? 'text-emerald-400' : 'text-red-400'}`}>
                {product.stock > 0 && !product.isSold ? `${product.stock} units left` : 'SOLD OUT'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => onAddToCart({ ...product, quantity: qty })}
                disabled={product.isSold || product.stock <= 0}
                className="w-full bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-sm py-3.5 px-4 rounded-2xl border border-amber-500/40 flex items-center justify-center gap-2 disabled:opacity-50 transition"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Shopping Cart</span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-sm py-3.5 px-4 rounded-2xl shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-2 transition"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Buy Now via WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Store Owner Contact Info Footer */}
          <div className="bg-slate-950 border border-amber-500/30 p-4 rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-black shrink-0">
              UK
            </div>
            <div className="text-xs space-y-0.5">
              <p className="font-bold text-white">Have questions before buying?</p>
              <p className="text-slate-400">Call Store Owner <strong className="text-amber-400">{STORE_INFO.owner}</strong> directly at <strong className="text-white">{STORE_INFO.phone}</strong></p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
