import React, { useState } from 'react';
import { STORE_INFO } from '../data/storeInfo';
import ProductCard from '../components/ProductCard';
import { 
  MessageSquare, 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  Smartphone,
  HardDrive,
  Palette
} from 'lucide-react';

export default function ProductDetailPage({ product, allProducts, onBack, onViewDetails }) {
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);

  if (!product) return null;

  const isAvailable = product.stock > 0 && product.isAvailable !== false && !product.isSold;
  const imageGallery = product.images && product.images.length > 0 ? product.images : [product.image];

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

  // Related products of same brand
  const relatedProducts = allProducts.filter(p => p.brand === product.brand && p.id !== product.id && !p.isHidden).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12 bg-white text-black">
      
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-extrabold text-black hover:text-[#16A34A] bg-[#F8F9FA] px-4 py-2.5 rounded-xl border border-gray-300 shadow-sm transition"
      >
        <ArrowLeft className="w-4 h-4 text-black" />
        <span>Back to Store Catalog</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Official Launch Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="card-realme rounded-2xl overflow-hidden border border-gray-200 bg-[#F9F9F9] aspect-square flex items-center justify-center p-6 shadow-md relative">
            <img 
              src={imageGallery[selectedImgIndex] || product.image} 
              alt={product.name}
              className="max-h-full max-w-full object-contain rounded-2xl transition duration-300"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80";
              }}
            />

            {/* Availability Badge */}
            <span className={`absolute top-4 right-4 text-xs font-black px-3.5 py-1 rounded-full flex items-center gap-1 shadow-sm ${
              isAvailable 
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                : 'bg-red-100 text-red-800 border border-red-300'
            }`}>
              {isAvailable ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
                  <span>Available</span>
                </>
              ) : (
                <>
                  <XCircle className="w-3.5 h-3.5 text-red-600 shrink-0" />
                  <span>Out of Stock</span>
                </>
              )}
            </span>
          </div>

          {/* Front & Back Multi-angle Gallery Thumbnails */}
          {imageGallery.length > 1 && (
            <div className="flex items-center gap-3">
              {imageGallery.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImgIndex(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 p-1 bg-[#F9F9F9] transition ${
                    selectedImgIndex === idx ? 'border-black shadow-md' : 'border-gray-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt={`Angle ${idx + 1}`} className="w-full h-full object-contain" />
                </button>
              ))}
              <span className="text-[11px] font-extrabold text-black uppercase ml-2">
                {selectedImgIndex === 0 ? 'Front View Render' : 'Back View Render'}
              </span>
            </div>
          )}
        </div>

        {/* Right Column: Model Specs & WhatsApp Inquiry */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-black text-[#16A34A] uppercase tracking-widest">
              <Smartphone className="w-4 h-4 text-black" />
              <span>{product.brand}</span>
            </div>

            <h1 className="text-3xl font-black text-black leading-tight">
              {product.model || product.name}
            </h1>

            <div className="flex flex-wrap gap-4 text-xs text-gray-700 font-semibold pt-1">
              <span className="flex items-center gap-1 bg-[#F8F9FA] px-3 py-1 rounded-lg border border-gray-200">
                <HardDrive className="w-3.5 h-3.5 text-black" />
                <span>Storage: <strong className="text-black font-extrabold">{product.storage || '128GB'}</strong></span>
              </span>

              <span className="flex items-center gap-1 bg-[#F8F9FA] px-3 py-1 rounded-lg border border-gray-200">
                <Palette className="w-3.5 h-3.5 text-black" />
                <span>Color: <strong className="text-black font-extrabold">{product.color || 'Standard'}</strong></span>
              </span>
            </div>
          </div>

          {/* Stock Quantity Details */}
          <div className="card-realme p-4 rounded-2xl border border-gray-200 space-y-3 bg-[#F8F9FA]">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600 font-semibold">Availability Status:</span>
              <span className={`font-extrabold ${isAvailable ? 'text-[#16A34A]' : 'text-red-500'}`}>
                {isAvailable ? 'In Stock Available' : 'Out of Stock'}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs pt-2 border-t border-gray-200">
              <span className="text-gray-600 font-semibold">Quantity Available:</span>
              <span className="font-mono font-black text-black text-sm">
                {product.stock} {product.stock === 1 ? 'unit' : 'units'}
              </span>
            </div>
          </div>

          {/* Price Label (ALWAYS Price: Ask on WhatsApp) & Green WhatsApp Button */}
          <div className="card-realme p-6 rounded-2xl border border-emerald-200 bg-emerald-50/50 space-y-4">
            <div>
              <p className="text-xs font-extrabold text-gray-500 uppercase tracking-wider">Price</p>
              <h3 className="text-2xl font-black text-[#16A34A]">Ask on WhatsApp</h3>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full bg-[#16A34A] hover:bg-emerald-700 text-white font-black text-sm py-4 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition"
            >
              <MessageSquare className="w-5 h-5 fill-current shrink-0" />
              <span>Ask Price on WhatsApp</span>
            </a>
          </div>

          {/* Store Owner Contact Card */}
          <div className="card-realme p-4 rounded-2xl border border-gray-200 flex items-center gap-3 bg-white">
            <div className="w-10 h-10 rounded-full bg-black text-white font-black flex items-center justify-center text-xs shrink-0">
              UK
            </div>
            <div className="text-xs space-y-0.5">
              <p className="font-bold text-black">Direct Store Helpline</p>
              <p className="text-gray-600">Contact <strong className="text-[#16A34A]">{STORE_INFO.owner}</strong> at <strong className="text-black">{STORE_INFO.phone}</strong></p>
            </div>
          </div>

        </div>

      </div>

      {/* Related Products Grid */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6 pt-6 border-t border-gray-200">
          <h2 className="text-xl font-black text-black uppercase tracking-wider">
            Related {product.brand} Handsets
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard
                key={rel.id}
                product={rel}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
