import React, { useState } from 'react';
import { STORE_INFO } from '../data/storeInfo';
import ProductCard from '../components/ProductCard';
import { 
  Smartphone, 
  ShieldCheck, 
  MessageSquare, 
  Search, 
  ChevronRight, 
  Sparkles, 
  Star, 
  Award,
  CheckCircle2,
  MapPin,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Layers
} from 'lucide-react';

export default function HomePage({ 
  products, 
  onViewDetails, 
  selectedBrand, 
  onSelectBrand, 
  onNavigate 
}) {
  const [faqOpen, setFaqOpen] = useState(null);
  const [heroSearch, setHeroSearch] = useState('');

  const featuredMobiles = products.filter(p => p.isFeatured && !p.isHidden);
  const latestMobiles = products.filter(p => !p.isHidden).slice(0, 8);

  const directWhatsappUrl = `https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(
    `Hello Mobile Hub, I would like to inquire about available phone stock.`
  )}`;

  const faqs = [
    {
      q: "How do I inquire about phone prices?",
      a: "Simply click 'Ask Price on WhatsApp' on any mobile phone model. It opens WhatsApp with the exact brand, model, storage, and color pre-filled so store owner Umar Khan can share today's best price."
    },
    {
      q: "Is online payment or credit card required?",
      a: "No! Mobile Hub is an exclusive inventory catalog. There is no online cart or payment gateway required. All inquiries are handled directly on WhatsApp."
    },
    {
      q: "Are all phones physically tested?",
      a: "Yes! Every phone listed undergoes a thorough 25-point physical and hardware quality inspection at our Girls College Road store in Balrampur."
    },
    {
      q: "Can I exchange my old phone?",
      a: "Yes! Bring your existing mobile phone to our store in Balrampur for instant evaluation and best exchange valuation."
    }
  ];

  const brandIconsList = [
    'Apple', 'Samsung', 'OPPO', 'Vivo', 'Realme', 'Narzo', 
    'OnePlus', 'Redmi', 'POCO', 'Motorola', 'Google Pixel', 
    'Tecno', 'Infinix', 'Lava', 'Itel'
  ];

  return (
    <div className="space-y-16 pb-20 bg-white text-black">
      
      {/* 100% Solid Opaque Hero Banner */}
      <section className="bg-[#F8F9FA] py-12 md:py-20 border-b border-gray-300">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-black text-white px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-[#FFC915]" />
              <span>Official Mobile Showroom</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-black tracking-tight leading-none">
              Find Your Next <br />
              <span className="text-[#16A34A]">Smartphone</span>
            </h1>

            <p className="text-black text-sm md:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed font-extrabold">
              100% Genuine Verified Mobile Stock across Apple, Samsung, OPPO, Vivo, Realme, OnePlus & more. Direct WhatsApp price inquiries with Umar Khan.
            </p>

            {/* Solid White Search Box with High-Contrast Text */}
            <div className="bg-white p-2 rounded-2xl border border-gray-400 flex flex-col sm:flex-row items-center gap-2 max-w-lg mx-auto lg:mx-0 shadow-md">
              <div className="relative flex-1 w-full">
                <input
                  type="text"
                  placeholder="Search by Brand or Model (e.g. S21 FE, iPhone 16...)"
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  className="w-full bg-white text-black placeholder-gray-600 text-xs font-black pl-10 pr-4 py-3 focus:outline-none"
                />
                <Search className="w-4 h-4 text-black absolute left-3.5 top-3.5" />
              </div>
              <button
                onClick={() => onNavigate('shop')}
                className="w-full sm:w-auto bg-[#16A34A] hover:bg-emerald-700 text-white font-black text-xs px-6 py-3 rounded-xl flex items-center justify-center gap-2 shadow transition"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => onNavigate('shop')}
                className="bg-black text-white hover:bg-gray-800 font-black text-xs px-6 py-3.5 rounded-xl flex items-center gap-2 shadow transition"
              >
                <span>Shop Store Catalog</span>
                <ChevronRight className="w-4 h-4 text-[#FFC915]" />
              </button>

              <button
                onClick={() => onNavigate('shop')}
                className="bg-white text-black hover:bg-gray-100 font-black text-xs px-6 py-3.5 rounded-xl border border-gray-400 flex items-center gap-2 transition"
              >
                <Layers className="w-4 h-4 text-[#16A34A]" />
                <span>Browse Categories</span>
              </button>
            </div>
          </div>

          {/* Right Side: Solid Showroom Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="card-realme-solid p-8 rounded-2xl bg-white border border-gray-300 text-center space-y-6 max-w-sm w-full shadow-lg">
              <img 
                src={STORE_INFO.logo} 
                alt={STORE_INFO.name} 
                className="w-24 h-24 mx-auto rounded-xl object-cover border-2 border-black shadow-md"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80";
                }}
              />

              <div>
                <h3 className="text-2xl font-black text-black">{STORE_INFO.name}</h3>
                <p className="text-xs font-black text-[#16A34A] uppercase tracking-widest mt-1">Official Mobile Showroom</p>
              </div>

              <div className="bg-[#F8F9FA] p-4 rounded-xl text-left space-y-2 text-xs text-black border border-gray-300 font-bold">
                <p>Owner: <strong className="text-black font-black">{STORE_INFO.owner}</strong></p>
                <p>Location: <strong className="text-black">Girls College Road, Balrampur</strong></p>
                <p>Helpline: <strong className="text-[#16A34A] font-black">{STORE_INFO.phone}</strong></p>
              </div>

              <div className="flex items-center justify-center gap-1 text-amber-500 text-xs font-black">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
                <span className="ml-1 text-black font-black">4.9 / 5 Store Rating</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Showroom Statistics */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="card-realme-solid p-6 rounded-2xl text-center space-y-1 bg-white border border-gray-300">
            <p className="text-3xl md:text-4xl font-black text-black font-mono">50+</p>
            <p className="text-xs font-black text-gray-700 uppercase tracking-wider">Available Models</p>
          </div>
          <div className="card-realme-solid p-6 rounded-2xl text-center space-y-1 bg-white border border-gray-300">
            <p className="text-3xl md:text-4xl font-black text-[#16A34A] font-mono">15+</p>
            <p className="text-xs font-black text-gray-700 uppercase tracking-wider">Major Brands</p>
          </div>
          <div className="card-realme-solid p-6 rounded-2xl text-center space-y-1 bg-white border border-gray-300">
            <p className="text-3xl md:text-4xl font-black text-black font-mono">100%</p>
            <p className="text-xs font-black text-gray-700 uppercase tracking-wider">Quality Tested</p>
          </div>
          <div className="card-realme-solid p-6 rounded-2xl text-center space-y-1 bg-white border border-gray-300">
            <p className="text-3xl md:text-4xl font-black text-[#16A34A] font-mono">FAST</p>
            <p className="text-xs font-black text-gray-700 uppercase tracking-wider">WhatsApp Inquiries</p>
          </div>
        </div>
      </section>

      {/* Brands Grid */}
      <section className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="flex items-center justify-between border-b border-gray-300 pb-3">
          <h2 className="text-xl font-black text-black uppercase tracking-wider flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-[#16A34A]" />
            <span>Official Mobile Brands</span>
          </h2>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 gap-4">
          {brandIconsList.map((brand) => (
            <button
              key={brand}
              onClick={() => {
                onSelectBrand(brand);
                onNavigate('shop');
              }}
              className="card-realme-solid p-4 rounded-2xl text-center space-y-2 hover:scale-105 hover:border-black transition duration-200 bg-white border border-gray-300 group"
            >
              <Smartphone className="w-6 h-6 mx-auto text-black group-hover:text-[#16A34A] transition" />
              <p className="font-black text-xs text-black group-hover:text-[#16A34A] truncate">{brand}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-[#F8F9FA] py-12 border-y border-gray-300">
        <div className="max-w-7xl mx-auto px-4 space-y-8">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-[10px] font-black text-[#16A34A] uppercase tracking-widest">Our Store Standards</span>
            <h2 className="text-2xl md:text-3xl font-black text-black">Why Choose Mobile Hub?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="card-realme-solid p-6 rounded-2xl bg-white border border-gray-300 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-[#FFC915]" />
              </div>
              <h4 className="font-black text-sm text-black">100% Genuine Devices</h4>
              <p className="text-xs text-black leading-relaxed font-bold">Authentic smartphones with verified IMEIs.</p>
            </div>

            <div className="card-realme-solid p-6 rounded-2xl bg-white border border-gray-300 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-[#16A34A]" />
              </div>
              <h4 className="font-black text-sm text-black">25-Point Quality Checked</h4>
              <p className="text-xs text-black leading-relaxed font-bold">Hardware and battery tested by Umar Khan.</p>
            </div>

            <div className="card-realme-solid p-6 rounded-2xl bg-white border border-gray-300 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-[#FFC915]" />
              </div>
              <h4 className="font-black text-sm text-black">WhatsApp Support</h4>
              <p className="text-xs text-black leading-relaxed font-bold">Direct WhatsApp price & stock inquiry response.</p>
            </div>

            <div className="card-realme-solid p-6 rounded-2xl bg-white border border-gray-300 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center">
                <Award className="w-6 h-6 text-[#16A34A]" />
              </div>
              <h4 className="font-black text-sm text-black">Best Local Deals</h4>
              <p className="text-xs text-black leading-relaxed font-bold">Unbeatable showroom pricing in Balrampur.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Mobiles Grid */}
      <section className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="flex items-center justify-between border-b border-gray-300 pb-3">
          <div>
            <span className="text-[10px] font-black text-[#16A34A] uppercase tracking-widest">Handpicked Models</span>
            <h2 className="text-xl md:text-2xl font-black text-black">Featured Mobiles</h2>
          </div>

          <button
            onClick={() => onNavigate('shop')}
            className="text-xs font-black text-[#16A34A] hover:text-emerald-800 flex items-center gap-1"
          >
            <span>View All Store Stock ({products.length})</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredMobiles.slice(0, 8).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      </section>

      {/* Latest Arrivals Grid */}
      <section className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="flex items-center justify-between border-b border-gray-300 pb-3">
          <div>
            <span className="text-[10px] font-black text-[#16A34A] uppercase tracking-widest">Fresh Inventory</span>
            <h2 className="text-xl md:text-2xl font-black text-black">Latest Arrivals</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestMobiles.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-[10px] font-black text-[#16A34A] uppercase tracking-widest">Help Center</span>
          <h2 className="text-2xl font-black text-black">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="card-realme-solid p-4 rounded-2xl bg-white border border-gray-300">
              <button
                onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                className="w-full text-left font-black text-sm text-black flex justify-between items-center gap-2"
              >
                <span>{faq.q}</span>
                {faqOpen === idx ? <ChevronUp className="w-4 h-4 text-[#16A34A]" /> : <ChevronDown className="w-4 h-4 text-black" />}
              </button>
              {faqOpen === idx && (
                <p className="text-xs text-black font-extrabold mt-2 leading-relaxed pt-2 border-t border-gray-200">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Store Location Map */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="card-realme-solid p-6 rounded-2xl bg-white border border-gray-300 space-y-4">
          <div className="flex items-center gap-2 border-b border-gray-300 pb-3">
            <MapPin className="w-5 h-5 text-[#16A34A]" />
            <h2 className="text-base font-black text-black uppercase tracking-wider">
              Store Location (Balrampur)
            </h2>
          </div>

          <div className="w-full h-72 rounded-xl overflow-hidden border border-gray-300">
            <iframe
              title="Mobile Hub Store Location Google Map"
              src={STORE_INFO.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

    </div>
  );
}
