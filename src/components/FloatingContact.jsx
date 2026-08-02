import React from 'react';
import { STORE_INFO } from '../data/storeInfo';
import { MessageSquare, Phone } from 'lucide-react';

export default function FloatingContact() {
  const whatsappUrl = `https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(
    `Hello Umar Khan, I am visiting your website OLD IS GOLD and would like to buy a phone!`
  )}`;

  return (
    <>
      {/* Floating Action Buttons for Desktop & Tablet (Bottom Right) */}
      <div className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-40 flex flex-col gap-3">
        {/* Floating Call Button */}
        <a
          href={`tel:${STORE_INFO.phone}`}
          className="group relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-slate-900 text-amber-400 rounded-full border-2 border-amber-500 shadow-xl hover:scale-110 hover:bg-amber-500 hover:text-slate-950 transition duration-300"
          title="Call Owner Umar Khan"
        >
          <Phone className="w-6 h-6 animate-pulse" />
          <span className="absolute right-16 bg-slate-900 text-amber-300 text-xs font-bold px-3 py-1.5 rounded-lg border border-amber-500/40 whitespace-nowrap opacity-0 group-hover:opacity-100 transition duration-200 pointer-events-none shadow-lg">
            Call Umar Khan ({STORE_INFO.phone})
          </span>
        </a>

        {/* Floating WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="group relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-emerald-600 text-white rounded-full border-2 border-emerald-400 shadow-2xl hover:scale-110 hover:bg-emerald-500 transition duration-300"
          title="WhatsApp Order / Query"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="absolute right-16 bg-slate-900 text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-lg border border-emerald-500/40 whitespace-nowrap opacity-0 group-hover:opacity-100 transition duration-200 pointer-events-none shadow-lg">
            WhatsApp Direct Chat
          </span>
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
          </span>
        </a>
      </div>

      {/* Sticky Bottom Contact Bar for Mobile Devices */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 border-t border-amber-500/30 p-2.5 backdrop-blur-lg flex items-center gap-2">
        <a
          href={`tel:${STORE_INFO.phone}`}
          className="flex-1 flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/50 font-bold py-2.5 px-3 rounded-xl text-xs transition"
        >
          <Phone className="w-4 h-4 text-amber-400" />
          <span>Call ({STORE_INFO.phone})</span>
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-3 rounded-xl text-xs shadow-lg shadow-emerald-600/30 transition"
        >
          <MessageSquare className="w-4 h-4" />
          <span>WhatsApp Order</span>
        </a>
      </div>
    </>
  );
}
