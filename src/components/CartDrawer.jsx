import React from 'react';
import { STORE_INFO } from '../data/storeInfo';
import { ShoppingCart, X, Trash2, Plus, Minus, ArrowRight, ShieldCheck } from 'lucide-react';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQty, 
  onRemoveItem, 
  onProceedCheckout 
}) {
  if (!isOpen) return null;

  const totalAmount = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 text-slate-100 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-bold text-white">Your Shopping Cart</h2>
              <span className="bg-amber-500/20 text-amber-300 text-xs px-2 py-0.5 rounded-full font-bold">
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
              </span>
            </div>
            <button 
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 bg-slate-800 text-slate-500 rounded-full flex items-center justify-center mx-auto">
                  <ShoppingCart className="w-8 h-8" />
                </div>
                <p className="text-slate-400 font-medium">Your cart is currently empty.</p>
                <button
                  onClick={onClose}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-2.5 rounded-full text-sm transition"
                >
                  Explore Phones Catalog
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-slate-950/80 border border-slate-800 p-3 rounded-xl flex items-center gap-3 relative group"
                >
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg bg-slate-900 shrink-0"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=200&q=80";
                    }}
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-xs text-slate-100 truncate pr-2">{item.name}</h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-slate-500 hover:text-red-400 transition"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-[10px] text-amber-400 font-semibold uppercase">{item.condition}</p>

                    <div className="flex justify-between items-center mt-2">
                      <span className="font-extrabold text-amber-400 text-xs font-mono">
                        {formatPrice(item.price)}
                      </span>

                      {/* Qty Controls */}
                      <div className="flex items-center bg-slate-800 rounded-lg border border-slate-700">
                        <button
                          onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                          className="p-1 text-slate-300 hover:text-amber-400"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-white font-mono">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                          className="p-1 text-slate-300 hover:text-amber-400"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {cartItems.length > 0 && (
            <div className="p-4 border-t border-slate-800 bg-slate-950 space-y-4">
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-white">{formatPrice(totalAmount)}</span>
                </div>
                <div className="flex justify-between text-emerald-400">
                  <span>WhatsApp Direct Order Delivery</span>
                  <span className="font-bold">FREE</span>
                </div>
                <div className="flex justify-between text-base font-black text-white pt-2 border-t border-slate-800">
                  <span>Grand Total</span>
                  <span className="text-amber-400 font-mono">{formatPrice(totalAmount)}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-400 bg-slate-900 p-2 rounded-lg border border-slate-800">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Orders are sent directly to Umar Khan on WhatsApp for instant confirmation.</span>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onProceedCheckout();
                }}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black py-3 rounded-xl flex items-center justify-center gap-2 transition shadow-lg shadow-amber-500/20"
              >
                <span>Proceed to WhatsApp Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
