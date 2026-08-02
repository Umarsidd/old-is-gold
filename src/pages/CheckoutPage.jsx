import React, { useState } from 'react';
import { STORE_INFO } from '../data/storeInfo';
import { ShoppingCart, MessageSquare, ArrowLeft, ShieldCheck, CheckCircle2, User, Phone, MapPin, FileText } from 'lucide-react';

export default function CheckoutPage({ cartItems, onBack, onCompleteOrder }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    pin: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});

  const grandTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const validateForm = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Customer Name is required";
    if (!formData.phone.trim()) errs.phone = "Mobile Number is required";
    if (!formData.address.trim()) errs.address = "Delivery Address is required";
    if (!formData.pin.trim()) errs.pin = "PIN Code is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Generate random 5-digit Order ID
    const orderId = 'OIG-' + Math.floor(10000 + Math.random() * 90000);
    const currentDate = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    // Format products section for WhatsApp message
    const productsText = cartItems.map(item => (
`📱 ${item.name}
Condition : ${item.condition}
Qty : ${item.quantity}
₹${(item.price * item.quantity).toLocaleString('en-IN')}

Image :
${item.image}`
    )).join('\n\n');

    // Build EXACT WhatsApp message format requested by USER
    const rawMessage = 
`----------------------------------------
🛒 NEW ORDER

Order ID : ${orderId}
Date : ${currentDate}

Customer
Name : ${formData.name.trim()}
Phone : ${formData.phone.trim()}
Address : ${formData.address.trim()}
PIN : ${formData.pin.trim()}
${formData.notes ? `Notes : ${formData.notes.trim()}\n` : ''}----------------------------------------
PRODUCTS
${productsText}

----------------------------------------
Grand Total
₹${grandTotal.toLocaleString('en-IN')}

Please confirm this order.
Thank You.
----------------------------------------`;

    const encodedText = encodeURIComponent(rawMessage);
    const whatsappRedirectUrl = `https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodedText}`;

    const orderData = {
      orderId,
      date: currentDate,
      customer: formData,
      items: cartItems,
      grandTotal,
      rawMessage,
      whatsappRedirectUrl
    };

    // Save order in LocalStorage
    try {
      const existingOrders = JSON.parse(localStorage.getItem('old_is_gold_orders') || '[]');
      existingOrders.unshift(orderData);
      localStorage.setItem('old_is_gold_orders', JSON.stringify(existingOrders));
    } catch (err) {
      console.error("LocalStorage save error", err);
    }

    // Callback to parent App state
    onCompleteOrder(orderData);

    // Redirect automatically to WhatsApp
    window.open(whatsappRedirectUrl, '_blank');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-amber-400 bg-slate-900 px-4 py-2 rounded-xl border border-slate-800 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Cart / Catalog</span>
      </button>

      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-black text-white">
          WhatsApp Direct Checkout
        </h1>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          No credit card or online payment required! Simply fill in your address and click <strong className="text-amber-400">Place Order</strong> to send your order directly to Umar Khan on WhatsApp.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Customer Form */}
        <div className="lg:col-span-7 glass-card p-6 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <User className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold text-white uppercase tracking-wider">
              Customer Shipping Details
            </h2>
          </div>

          <form onSubmit={handlePlaceOrder} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                Full Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full bg-slate-900 text-white placeholder-slate-500 text-sm rounded-xl pl-10 pr-4 py-3 border focus:outline-none ${errors.name ? 'border-red-500' : 'border-slate-700 focus:border-amber-500'}`}
                />
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              </div>
              {errors.name && <p className="text-red-400 text-[11px] mt-1 font-semibold">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                Mobile Number (WhatsApp) *
              </label>
              <div className="relative">
                <input
                  type="tel"
                  placeholder="e.g. 9876543210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full bg-slate-900 text-white placeholder-slate-500 text-sm rounded-xl pl-10 pr-4 py-3 border focus:outline-none ${errors.phone ? 'border-red-500' : 'border-slate-700 focus:border-amber-500'}`}
                />
                <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              </div>
              {errors.phone && <p className="text-red-400 text-[11px] mt-1 font-semibold">{errors.phone}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Complete Delivery Address *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="House No., Street, Landmark, City..."
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className={`w-full bg-slate-900 text-white placeholder-slate-500 text-sm rounded-xl pl-10 pr-4 py-3 border focus:outline-none ${errors.address ? 'border-red-500' : 'border-slate-700 focus:border-amber-500'}`}
                  />
                  <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                </div>
                {errors.address && <p className="text-red-400 text-[11px] mt-1 font-semibold">{errors.address}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  PIN Code *
                </label>
                <input
                  type="text"
                  placeholder="271201"
                  value={formData.pin}
                  onChange={(e) => setFormData({ ...formData, pin: e.target.value })}
                  className={`w-full bg-slate-900 text-white placeholder-slate-500 text-sm rounded-xl px-4 py-3 border focus:outline-none font-mono ${errors.pin ? 'border-red-500' : 'border-slate-700 focus:border-amber-500'}`}
                />
                {errors.pin && <p className="text-red-400 text-[11px] mt-1 font-semibold">{errors.pin}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                Customer Notes / Preferred Time (Optional)
              </label>
              <div className="relative">
                <textarea
                  rows="2"
                  placeholder="Any special instructions for store owner Umar Khan..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-slate-900 text-white placeholder-slate-500 text-xs rounded-xl pl-10 pr-4 py-2.5 border border-slate-700 focus:outline-none focus:border-amber-500"
                ></textarea>
                <FileText className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 hover:from-emerald-500 hover:to-emerald-400 text-white font-black text-base py-4 rounded-2xl shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-3 transition transform hover:-translate-y-0.5"
            >
              <MessageSquare className="w-5 h-5 fill-current" />
              <span>PLACE ORDER VIA WHATSAPP (+91 8573929638)</span>
            </button>
          </form>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5 glass-card p-6 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-base font-bold text-white uppercase tracking-wider">
              Order Summary
            </h2>
            <span className="bg-amber-500/20 text-amber-300 text-xs px-2.5 py-0.5 rounded-full font-bold">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
            </span>
          </div>

          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-2 bg-slate-950/80 rounded-xl border border-slate-800/80">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-14 h-14 object-cover rounded-lg bg-slate-900 shrink-0"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=200&q=80";
                  }}
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-xs text-white truncate">{item.name}</h4>
                  <p className="text-[10px] text-amber-400 font-semibold">{item.condition} • Qty: {item.quantity}</p>
                  <p className="font-bold text-amber-400 text-xs font-mono mt-0.5">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-800 pt-4 space-y-2 text-xs">
            <div className="flex justify-between text-slate-300">
              <span>Subtotal</span>
              <span className="font-mono text-white">{formatPrice(grandTotal)}</span>
            </div>
            <div className="flex justify-between text-emerald-400 font-bold">
              <span>Direct WhatsApp Order Fee</span>
              <span>FREE</span>
            </div>
            <div className="flex justify-between text-base font-black text-white pt-2 border-t border-slate-800">
              <span>Grand Total</span>
              <span className="text-amber-400 font-mono">{formatPrice(grandTotal)}</span>
            </div>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2 text-[11px] text-slate-400">
            <div className="flex items-center gap-2 font-bold text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>How it works:</span>
            </div>
            <p>1. Clicking Place Order opens WhatsApp with your full order details pre-filled.</p>
            <p>2. Send the message to Store Owner <strong className="text-white">Umar Khan</strong> for physical confirmation & pickup/delivery details in Balrampur.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
