import React from 'react';
import { STORE_INFO } from '../data/storeInfo';
import { 
  MapPin, 
  Mail, 
  Phone, 
  MessageSquare, 
  Instagram, 
  Facebook, 
  ShieldCheck
} from 'lucide-react';

export default function Footer({ onOpenPolicy }) {
  return (
    <footer className="bg-black text-gray-300 border-t border-gray-800 pt-12 pb-16">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Column 1: Logo & About */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img 
              src={STORE_INFO.logo} 
              alt={STORE_INFO.name} 
              className="w-11 h-11 rounded-lg object-cover border border-[#333333]"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=200&q=80";
              }}
            />
            <div>
              <h2 className="text-xl font-black text-white tracking-tight">{STORE_INFO.name}</h2>
              <p className="text-xs font-bold text-[#FFC915] uppercase tracking-widest">Official Mobile Store</p>
            </div>
          </div>

          <p className="text-xs text-gray-400 leading-relaxed font-medium">
            Balrampur's premier mobile showroom for 100% genuine verified mobile stock. Direct WhatsApp price inquiries with Umar Khan.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <a 
              href={STORE_INFO.instagram} 
              target="_blank" 
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-[#222222] hover:bg-[#FFC915] text-gray-300 hover:text-black flex items-center justify-center transition border border-[#333333]"
              title="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>

            <a 
              href={STORE_INFO.facebook} 
              target="_blank" 
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-[#222222] hover:bg-[#FFC915] text-gray-300 hover:text-black flex items-center justify-center transition border border-[#333333]"
              title="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>

            <a 
              href={`https://wa.me/${STORE_INFO.whatsappNumber}`} 
              target="_blank" 
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-[#222222] hover:bg-[#16A34A] text-gray-300 hover:text-white flex items-center justify-center transition border border-[#333333]"
              title="WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Column 2: Brands List */}
        <div className="space-y-4">
          <h3 className="text-xs font-black text-white uppercase tracking-widest border-b border-[#333333] pb-2 inline-block">
            Featured Brands
          </h3>

          <div className="grid grid-cols-2 gap-1.5 text-xs text-gray-400 font-medium">
            {['Apple', 'Samsung', 'OPPO', 'Vivo', 'Realme', 'OnePlus', 'Redmi', 'Google Pixel'].map((brand) => (
              <a
                key={brand}
                href="#shop"
                className="hover:text-[#FFC915] cursor-pointer transition text-left bg-transparent border-none p-0 inline-block"
              >
                {brand}
              </a>
            ))}
          </div>
        </div>

        {/* Column 3: Contact Info & Address */}
        <div className="space-y-4">
          <h3 className="text-xs font-black text-white uppercase tracking-widest border-b border-[#333333] pb-2 inline-block">
            Contact Details
          </h3>

          <ul className="space-y-3 text-xs">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#FFC915] shrink-0 mt-0.5" />
              <span className="text-gray-300 font-medium">{STORE_INFO.address}</span>
            </li>

            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#FFC915] shrink-0" />
              <a href={`tel:${STORE_INFO.phone}`} className="text-white font-bold hover:text-[#FFC915] transition">
                {STORE_INFO.phone}
              </a>
            </li>

            <li className="flex items-center gap-2.5">
              <MessageSquare className="w-4 h-4 text-[#16A34A] shrink-0" />
              <a 
                href={`https://wa.me/${STORE_INFO.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="text-[#16A34A] font-bold hover:underline"
              >
                WhatsApp: +91 {STORE_INFO.phone}
              </a>
            </li>

            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[#FFC915] shrink-0" />
              <span className="text-gray-300 font-medium">{STORE_INFO.email}</span>
            </li>
          </ul>
        </div>

        {/* Column 4: Store Guarantee */}
        <div className="space-y-4">
          <h3 className="text-xs font-black text-white uppercase tracking-widest border-b border-[#333333] pb-2 inline-block">
            Store Guarantee
          </h3>

          <div className="bg-[#1A1A1A] p-4 rounded-2xl space-y-2 border border-[#333333] text-xs">
            <p className="font-bold text-white">Owner: {STORE_INFO.owner}</p>
            <p className="text-gray-400 font-medium">All mobile phones physically verified at our Balrampur outlet.</p>
            <div className="flex items-center gap-1.5 text-[#16A34A] font-bold text-[11px] pt-1">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>100% Genuine Certified Devices</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Legal Credit */}
      <div className="max-w-7xl mx-auto px-4 mt-10 pt-6 border-t border-[#222222] flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-4 font-medium">
        <p>
          © {new Date().getFullYear()} <strong className="text-white">{STORE_INFO.name}</strong>. Owned by <strong className="text-[#FFC915]">{STORE_INFO.owner}</strong>. Balrampur, UP.
        </p>
        <p className="text-gray-400">
          WhatsApp Showroom Catalog • Direct Inquiries Only
        </p>
      </div>
    </footer>
  );
}
