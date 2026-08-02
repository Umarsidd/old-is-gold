import React, { useState } from 'react';
import { STORE_INFO } from '../data/storeInfo';
import { ShieldCheck, HelpCircle, X, ChevronDown, ChevronUp, FileText, Phone, MessageSquare } from 'lucide-react';

export default function PolicyPages({ policyType, onClose }) {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: "How do I place an order on OLD IS GOLD?",
      a: "Simply browse our catalog, click 'Buy Now' or 'Add to Cart', and proceed to Checkout. When you click 'Place Order', an automated formatted order is generated and sent directly to Store Owner Umar Khan on WhatsApp (+91 8573929638)."
    },
    {
      q: "Are used and refurbished phones physically tested?",
      a: "Yes! Every single phone listed on OLD IS GOLD undergoes rigorous 25-point physical & technical inspection by Umar Khan at our Girls College Road store in Balrampur before listing."
    },
    {
      q: "Can I inspect the phone physically before paying?",
      a: "Absolutely! You can visit our store in Balrampur (In front of Mursalin Masjid) to physically inspect, hold, and test the phone before making your purchase."
    },
    {
      q: "What is the return/refund policy?",
      a: "We offer a 7-Day Store Replacement Warranty on all refurbished and like-new mobile phones if any technical defect is found."
    },
    {
      q: "Do you offer old phone exchange?",
      a: "Yes! Bring your existing mobile phone to our store for instant evaluation and maximum exchange valuation towards your new purchase."
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md p-4 flex items-center justify-center">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 space-y-6 shadow-2xl relative text-slate-100 max-h-[85vh] overflow-y-auto">
        
        <div className="flex justify-between items-center border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-white uppercase">{policyType || 'Store Information & Policies'}</h2>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white bg-slate-800 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content depending on policyType */}
        {policyType === 'Frequently Asked Questions (FAQ)' ? (
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left font-bold text-xs text-white flex justify-between items-center gap-2"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? <ChevronUp className="w-4 h-4 text-amber-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {openFaq === idx && (
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed pt-2 border-t border-slate-800/80">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : policyType === 'Refund Policy' ? (
          <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
            <h3 className="font-bold text-white text-sm">7-Day Store Replacement Policy</h3>
            <p>At <strong className="text-amber-400">OLD IS GOLD</strong>, we stand behind the quality of every mobile phone sold by Umar Khan. If you experience hardware or functional defects within 7 days of purchase, visit our store for an instant replacement or repair.</p>
            <p>Conditions for replacement:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Item must be returned with original cash invoice provided at purchase.</li>
              <li>Physical damage, water damage, or unauthorized software tamper are excluded.</li>
            </ul>
          </div>
        ) : policyType === 'Privacy Policy' ? (
          <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
            <h3 className="font-bold text-white text-sm">Privacy & Data Handling</h3>
            <p><strong className="text-amber-400">OLD IS GOLD</strong> respects customer privacy. We do not store credit card details or transmit personal data to third parties. Customer address and phone details entered during checkout are exclusively used to populate your direct WhatsApp order sent to store owner Umar Khan.</p>
          </div>
        ) : (
          <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
            <h3 className="font-bold text-white text-sm">Terms & Conditions of Service</h3>
            <p>All mobile phone prices, stock availability, and specifications listed on OLD IS GOLD website are subject to physical verification at our Balrampur outlet.</p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-slate-400">
              <p>Store Owner: <strong className="text-white">{STORE_INFO.owner}</strong></p>
              <p>Location: <strong className="text-slate-200">{STORE_INFO.address}</strong></p>
              <p>WhatsApp Hotline: <strong className="text-emerald-400">{STORE_INFO.phone}</strong></p>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2 rounded-xl text-xs"
          >
            Close Policy View
          </button>
        </div>

      </div>
    </div>
  );
}
