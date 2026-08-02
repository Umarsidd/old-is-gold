import React from 'react';
import { STORE_INFO } from '../data/storeInfo';
import { MessageSquare, Phone } from 'lucide-react';

export default function FloatingContact() {
  const whatsappUrl = `https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(
    `Hello, I am interested in inquiring about mobile phone prices at Mobile Hub.`
  )}`;

  return (
    <>
      {/* Floating Action Buttons for Desktop & Tablet */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        
        {/* Call Button */}
        <a
          href={`tel:${STORE_INFO.phone}`}
          className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-slate-900 text-white rounded-full border-2 border-white shadow-xl hover:scale-110 transition duration-300"
          title="Call Umar Khan"
        >
          <Phone className="w-6 h-6" />
        </a>

        {/* WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-emerald-600 text-white rounded-full border-2 border-white shadow-2xl hover:scale-110 transition duration-300 relative"
          title="WhatsApp Inquiry"
        >
          <MessageSquare className="w-6 h-6 fill-current" />
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
          </span>
        </a>

      </div>
    </>
  );
}
