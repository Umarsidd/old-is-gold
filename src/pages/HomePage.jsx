import React from 'react';
import { STORE_INFO } from '../data/storeInfo';
import ProductCard from '../components/ProductCard';
import { 
  Smartphone, 
  ShieldCheck, 
  Truck, 
  MessageSquare, 
  Phone, 
  Sparkles, 
  Award, 
  ChevronRight,
  RefreshCw,
  Star
} from 'lucide-react';

export default function HomePage({ 
  products, 
  onAddToCart, 
  onViewDetails, 
  wishlist, 
  onToggleWishlist, 
  onNavigate 
}) {
  const featuredProducts = products.filter(p => p.isFeatured && !p.isHidden);
  const likeNewProducts = products.filter(p => p.condition?.toLowerCase() === 'like new' && !p.isHidden);

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden pt-8 pb-16 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official Mobile Store • Balrampur</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none">
              BUY NEW & USED <br />
              <span className="gold-gradient-text uppercase">MOBILE PHONES</span>
            </h1>

            <p className="text-slate-300 text-sm md:text-base max-w-xl leading-relaxed mx-auto lg:mx-0">
              Welcome to <strong className="text-amber-400 font-bold">{STORE_INFO.name}</strong> – {STORE_INFO.tagline}. Operated by <strong className="text-white">{STORE_INFO.owner}</strong> in Balrampur. Get 100% verified iPhones, Samsung, OnePlus & classic feature phones at unbeatable prices.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => onNavigate('shop')}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black px-6 py-3.5 rounded-2xl shadow-xl shadow-amber-500/20 text-sm flex items-center gap-2 transition transform hover:-translate-y-0.5"
              >
                <span>Browse All Phones</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/${STORE_INFO.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-emerald-500/40 font-bold px-6 py-3.5 rounded-2xl text-sm flex items-center gap-2 transition"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Order ({STORE_INFO.phone})</span>
              </a>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 max-w-lg mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <p className="text-2xl font-black text-amber-400 font-mono">100%</p>
                <p className="text-[11px] text-slate-400 uppercase font-semibold">Tested Handsets</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-2xl font-black text-amber-400 font-mono">0%</p>
                <p className="text-[11px] text-slate-400 uppercase font-semibold">Gateway Fees</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-2xl font-black text-amber-400 font-mono">FAST</p>
                <p className="text-[11px] text-slate-400 uppercase font-semibold">Balrampur Pickup</p>
              </div>
            </div>
          </div>

          {/* Right Logo & Hero Image Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Outer Decorative Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-amber-700 rounded-3xl blur-xl opacity-30 animate-pulse"></div>

              <div className="relative glass-card border border-amber-500/40 rounded-3xl p-6 text-center space-y-4">
                <img 
                  src={STORE_INFO.logo} 
                  alt={STORE_INFO.name} 
                  className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-amber-500 shadow-2xl"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80";
                  }}
                />

                <div>
                  <h2 className="text-2xl font-black text-white">{STORE_INFO.name}</h2>
                  <p className="text-xs font-bold text-amber-400 uppercase tracking-widest">{STORE_INFO.tagline}</p>
                </div>

                <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-2xl text-left space-y-1 text-xs">
                  <p className="text-slate-400 font-medium">Store Owner: <strong className="text-white font-bold">{STORE_INFO.owner}</strong></p>
                  <p className="text-slate-400 font-medium truncate">Address: <strong className="text-slate-200">{STORE_INFO.address}</strong></p>
                  <p className="text-slate-400 font-medium">WhatsApp / Call: <strong className="text-emerald-400 font-bold">{STORE_INFO.phone}</strong></p>
                </div>

                <div className="flex items-center justify-center gap-1 text-amber-400 text-xs">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                  <span className="ml-1 font-bold text-white">4.9 / 5 Customer Rating</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="glass-card p-4 rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-white">Physical Inspection</h4>
              <p className="text-[11px] text-slate-400">Tested & verified by Umar Khan</p>
            </div>
          </div>

          <div className="glass-card p-4 rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-white">WhatsApp Orders</h4>
              <p className="text-[11px] text-slate-400">Direct order to +91 8573929638</p>
            </div>
          </div>

          <div className="glass-card p-4 rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-500/40 text-sky-400 flex items-center justify-center shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-white">Best Exchange Value</h4>
              <p className="text-[11px] text-slate-400">Trade old phone for new model</p>
            </div>
          </div>

          <div className="glass-card p-4 rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-400 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-white">Store Pickup / Delivery</h4>
              <p className="text-[11px] text-slate-400">Girls College Road, Balrampur</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Award className="w-4 h-4" />
              <span>Handpicked Deals</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white">
              Featured Mobile Models
            </h2>
          </div>

          <button
            onClick={() => onNavigate('shop')}
            className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 self-start md:self-auto"
          >
            <span>View All Handsets ({products.length})</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 8).map((product) => (
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
      </section>

      {/* Like New & Refurbished Section */}
      {likeNewProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 space-y-6">
          <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-amber-950/40 border border-amber-500/30 p-6 rounded-3xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="bg-amber-500 text-black text-[10px] font-black px-2.5 py-1 rounded-full uppercase">
                  Top Savings
                </span>
                <h2 className="text-2xl font-black text-white mt-2">
                  Pristine "Like New" Smartphones
                </h2>
                <p className="text-xs text-slate-300">
                  Fully original handsets with box & accessories, tested by Umar Khan.
                </p>
              </div>

              <button
                onClick={() => onNavigate('refurbished')}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl transition"
              >
                Explore Refurbished Section
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {likeNewProducts.slice(0, 4).map((product) => (
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
          </div>
        </section>
      )}

      {/* Direct Contact & Visit Banner */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="glass-card border-2 border-amber-500/40 rounded-3xl p-8 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-2xl font-black text-white">
              Want to sell or exchange your old phone?
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Visit <strong className="text-amber-400">{STORE_INFO.name}</strong> store opposite Mursalin Masjid, Girls College Road, Balrampur. We offer instant cash or maximum exchange value for your used mobile phones.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href={`tel:${STORE_INFO.phone}`}
              className="bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/50 font-bold px-5 py-3 rounded-xl text-xs flex items-center gap-2 transition"
            >
              <Phone className="w-4 h-4" />
              <span>Call ({STORE_INFO.phone})</span>
            </a>

            <button
              onClick={() => onNavigate('contact')}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-3 rounded-xl text-xs transition"
            >
              View Store Location Map
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
