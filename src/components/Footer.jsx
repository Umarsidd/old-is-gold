import React from 'react';
import { STORE_INFO } from '../data/storeInfo';
import { 
  MapPin, 
  Mail, 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  Award, 
  Clock, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

export default function Footer({ onOpenPolicy }) {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-12 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Column 1: Store Branding & Logo */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img 
              src={STORE_INFO.logo} 
              alt={STORE_INFO.name} 
              className="w-14 h-14 rounded-full object-cover border-2 border-amber-500 shadow-md"
              onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=200&q=80"; }}
            />
            <div>
              <h2 className="text-xl font-black text-white gold-gradient-text tracking-wide">
                {STORE_INFO.name}
              </h2>
              <p className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
                {STORE_INFO.tagline}
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Your most trusted mobile store in Balrampur for brand new, like-new, and certified refurbished mobile phones at unbeatable local prices.
          </p>

          <div className="bg-slate-900/90 border border-amber-500/30 p-3 rounded-xl flex items-center gap-3">
            <Award className="w-8 h-8 text-amber-400 shrink-0" />
            <div>
              <p className="text-xs font-bold text-white uppercase">Store Owner</p>
              <p className="text-sm font-extrabold text-amber-400">{STORE_INFO.owner}</p>
            </div>
          </div>
        </div>

        {/* Column 2: Official Store Address & Contact */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white uppercase tracking-wider border-b border-amber-500/30 pb-2 inline-block">
            Store Contact Details
          </h3>

          <ul className="space-y-3 text-xs">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span className="text-slate-300 font-medium">
                {STORE_INFO.address}
              </span>
            </li>

            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-amber-400 shrink-0" />
              <a href={`mailto:${STORE_INFO.email}`} className="text-slate-300 hover:text-amber-400 underline transition">
                {STORE_INFO.email}
              </a>
            </li>

            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-amber-400 shrink-0" />
              <a href={`tel:${STORE_INFO.phone}`} className="text-slate-200 font-bold hover:text-amber-400 transition">
                {STORE_INFO.phone}
              </a>
            </li>

            <li className="flex items-center gap-2.5">
              <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
              <a 
                href={`https://wa.me/${STORE_INFO.whatsappNumber}`} 
                target="_blank" 
                rel="noreferrer"
                className="text-emerald-400 font-bold hover:underline"
              >
                WhatsApp: {STORE_INFO.phone}
              </a>
            </li>

            <li className="flex items-center gap-2.5 text-slate-400">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{STORE_INFO.hours}</span>
            </li>
          </ul>
        </div>

        {/* Column 3: Quick Links & Help */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white uppercase tracking-wider border-b border-amber-500/30 pb-2 inline-block">
            Quick Links
          </h3>

          <ul className="space-y-2 text-xs">
            {['Privacy Policy', 'Refund Policy', 'Terms & Conditions', 'Customer Support', 'Frequently Asked Questions (FAQ)'].map((linkText, idx) => (
              <li key={idx}>
                <button
                  onClick={() => onOpenPolicy && onOpenPolicy(linkText)}
                  className="flex items-center gap-1.5 text-slate-400 hover:text-amber-400 transition font-medium text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-amber-500" />
                  <span>{linkText}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: WhatsApp Direct Ordering Info */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white uppercase tracking-wider border-b border-amber-500/30 pb-2 inline-block">
            WhatsApp Orders
          </h3>

          <p className="text-xs text-slate-400 leading-relaxed">
            No payment gateway needed! Click <strong className="text-amber-400">Place Order</strong> at checkout to generate an automated WhatsApp order sent directly to Umar Khan.
          </p>

          <a
            href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent('Hello Umar Khan, I would like to inquire about available mobile phones in OLD IS GOLD store.')}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-lg shadow-emerald-600/20 transition transform hover:-translate-y-0.5"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat on WhatsApp ({STORE_INFO.phone})</span>
          </a>

          <div className="flex items-center gap-2 text-[11px] text-amber-400/90 pt-1">
            <ShieldCheck className="w-4 h-4 shrink-0 text-amber-400" />
            <span>100% Genuine Handsets & Physical Verification</span>
          </div>
        </div>

      </div>

      {/* Bottom Legal Credit */}
      <div className="max-w-7xl mx-auto px-4 mt-10 pt-6 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>
          © {new Date().getFullYear()} <span className="text-white font-bold">{STORE_INFO.name}</span> - All Models Phones. Owned by <span className="text-amber-400 font-bold">{STORE_INFO.owner}</span>. Balrampur, UP.
        </p>

        <p className="flex items-center gap-1 text-slate-400">
          <span>Netlify Compatible SPA • Powered by React & LocalStorage</span>
        </p>
      </div>
    </footer>
  );
}
