import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { STORE_INFO } from '../data/storeInfo';
import { 
  CheckCircle2, 
  Printer, 
  MessageSquare, 
  ArrowLeft, 
  FileText, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck,
  ShoppingBag
} from 'lucide-react';

export default function OrderSuccessPage({ orderData, onBackToShop }) {
  useEffect(() => {
    // Launch celebratory confetti burst
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log("Confetti trigger skipped", e);
    }
  }, []);

  if (!orderData) {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">No Order Found</h2>
        <button onClick={onBackToShop} className="bg-amber-500 text-slate-950 font-bold px-6 py-2 rounded-xl text-xs">
          Return to Shop
        </button>
      </div>
    );
  }

  const { orderId, date, customer, items, grandTotal, whatsappRedirectUrl } = orderData;

  const handlePrintInvoice = () => {
    window.print();
  };

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      
      {/* On-Screen Top Success Banner (Hidden during Print) */}
      <div className="no-print glass-card border border-emerald-500/40 p-8 rounded-3xl text-center space-y-4">
        <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-500/50">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h1 className="text-3xl font-black text-white">
          Order Placed Successfully!
        </h1>

        <p className="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed">
          Your WhatsApp order <strong className="text-amber-400 font-mono">{orderId}</strong> has been generated and sent directly to store owner <strong className="text-white">Umar Khan</strong> (+91 8573929638).
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href={whatsappRedirectUrl}
            target="_blank"
            rel="noreferrer"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3 px-5 rounded-xl shadow-lg flex items-center gap-2 transition"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Open Order in WhatsApp</span>
          </a>

          <button
            onClick={handlePrintInvoice}
            className="bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/40 font-bold text-xs py-3 px-5 rounded-xl flex items-center gap-2 transition"
          >
            <Printer className="w-4 h-4" />
            <span>Print Official Store Invoice</span>
          </button>

          <button
            onClick={onBackToShop}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs py-3 px-5 rounded-xl flex items-center gap-2 transition"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Continue Shopping</span>
          </button>
        </div>
      </div>

      {/* Official Printable Store Invoice Section */}
      <div className="invoice-card bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 text-slate-100 shadow-2xl">
        
        {/* Invoice Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-4">
            <img 
              src={STORE_INFO.logo} 
              alt={STORE_INFO.name} 
              className="w-16 h-16 rounded-full object-cover border-2 border-amber-500"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=200&q=80";
              }}
            />
            <div>
              <h2 className="text-2xl font-black text-white gold-gradient-text tracking-wide">
                {STORE_INFO.name}
              </h2>
              <p className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                {STORE_INFO.tagline}
              </p>
              <p className="text-[11px] text-slate-400">
                Owner: <strong className="text-slate-200">{STORE_INFO.owner}</strong>
              </p>
            </div>
          </div>

          <div className="text-left md:text-right">
            <span className="bg-amber-500/20 text-amber-400 border border-amber-500/40 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              OFFICIAL CASH INVOICE
            </span>
            <p className="text-xs text-slate-400 mt-2">Order ID: <strong className="text-white font-mono">{orderId}</strong></p>
            <p className="text-xs text-slate-400">Date: <strong className="text-slate-200">{date}</strong></p>
          </div>
        </div>

        {/* Store & Customer Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
          
          {/* Store Info */}
          <div className="space-y-1">
            <p className="font-extrabold text-amber-400 uppercase text-[11px]">STORE LOCATION DETAILS:</p>
            <p className="font-bold text-white">{STORE_INFO.name}</p>
            <p className="text-slate-300">{STORE_INFO.address}</p>
            <p className="text-slate-400">Email: {STORE_INFO.email}</p>
            <p className="text-slate-400">Phone / WhatsApp: {STORE_INFO.phone}</p>
          </div>

          {/* Customer Info */}
          <div className="space-y-1 border-t md:border-t-0 md:border-l border-slate-800 pt-3 md:pt-0 md:pl-4">
            <p className="font-extrabold text-amber-400 uppercase text-[11px]">CUSTOMER BILLING DETAILS:</p>
            <p className="font-bold text-white">{customer.name}</p>
            <p className="text-slate-300">{customer.address}, PIN: {customer.pin}</p>
            <p className="text-slate-400">Mobile: {customer.phone}</p>
            {customer.notes && <p className="text-slate-400 italic">Notes: {customer.notes}</p>}
          </div>

        </div>

        {/* Itemized Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                <th className="py-2.5 px-3 font-bold">Item Description</th>
                <th className="py-2.5 px-3 font-bold">Condition</th>
                <th className="py-2.5 px-3 font-bold text-center">Qty</th>
                <th className="py-2.5 px-3 font-bold text-right">Price</th>
                <th className="py-2.5 px-3 font-bold text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {items.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40">
                  <td className="py-3 px-3">
                    <p className="font-bold text-white">{item.name}</p>
                    <p className="text-[10px] text-slate-400">{item.brand}</p>
                  </td>
                  <td className="py-3 px-3 font-semibold text-amber-400">{item.condition}</td>
                  <td className="py-3 px-3 text-center font-mono font-bold text-slate-200">{item.quantity}</td>
                  <td className="py-3 px-3 text-right font-mono text-slate-300">{formatPrice(item.price)}</td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-amber-400">
                    {formatPrice(item.price * item.quantity)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Invoice Summary */}
        <div className="flex flex-col sm:flex-row justify-between items-end border-t border-slate-800 pt-4 gap-4 text-xs">
          <div className="text-[11px] text-slate-400 space-y-1">
            <p className="flex items-center gap-1 text-emerald-400 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Tested Genuine Handset Guarantee</span>
            </p>
            <p>Thank you for shopping at OLD IS GOLD Balrampur!</p>
          </div>

          <div className="w-full sm:w-64 space-y-1.5 text-right font-mono">
            <div className="flex justify-between text-slate-400">
              <span>Subtotal:</span>
              <span>{formatPrice(grandTotal)}</span>
            </div>
            <div className="flex justify-between text-emerald-400">
              <span>Delivery / Pickup:</span>
              <span>FREE</span>
            </div>
            <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-slate-800">
              <span>GRAND TOTAL:</span>
              <span className="text-amber-400">{formatPrice(grandTotal)}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
