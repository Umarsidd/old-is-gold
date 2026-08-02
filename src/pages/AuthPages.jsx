import React, { useState } from 'react';
import { STORE_INFO } from '../data/storeInfo';
import { User, Mail, Lock, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function AuthPages({ onLoginSuccess, onBackToShop }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;

    // Simulate login / register success
    const userData = {
      name: isRegister ? name : (email.includes('umar') ? 'Umar Khan (Admin)' : email.split('@')[0]),
      email: email,
      isAdmin: email.toLowerCase() === STORE_INFO.email.toLowerCase() || email.toLowerCase().includes('admin') || email.toLowerCase().includes('umar')
    };

    onLoginSuccess(userData);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="glass-card border border-amber-500/40 p-8 rounded-3xl text-center space-y-6 shadow-2xl">
        
        {/* Official Logo Banner */}
        <div className="space-y-3">
          <img 
            src={STORE_INFO.logo} 
            alt={STORE_INFO.name} 
            className="w-20 h-20 mx-auto rounded-full object-cover border-4 border-amber-500 shadow-xl"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80";
            }}
          />
          <div>
            <h1 className="text-2xl font-black text-white gold-gradient-text">
              {STORE_INFO.name}
            </h1>
            <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              {STORE_INFO.tagline}
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-bold">
          <button
            onClick={() => setIsRegister(false)}
            className={`flex-1 py-2 rounded-lg transition ${!isRegister ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
          >
            Customer / Admin Login
          </button>
          <button
            onClick={() => setIsRegister(true)}
            className={`flex-1 py-2 rounded-lg transition ${isRegister ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
          >
            Register Account
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {isRegister && (
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="Your Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-900 text-white placeholder-slate-500 text-xs rounded-xl pl-10 pr-4 py-3 border border-slate-700 focus:outline-none focus:border-amber-500"
                />
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder={STORE_INFO.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900 text-white placeholder-slate-500 text-xs rounded-xl pl-10 pr-4 py-3 border border-slate-700 focus:outline-none focus:border-amber-500"
              />
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900 text-white placeholder-slate-500 text-xs rounded-xl pl-10 pr-4 py-3 border border-slate-700 focus:outline-none focus:border-amber-500"
              />
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm py-3.5 rounded-2xl shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 transition"
          >
            <span>{isRegister ? 'Create Account' : 'Login to Store'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Admin Credential Hint */}
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1 text-left">
          <p className="font-bold text-amber-400 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Store Admin Note:</span>
          </p>
          <p>Login with <strong className="text-white">{STORE_INFO.email}</strong> to gain full Owner Admin Dashboard privileges.</p>
        </div>

        <button
          onClick={onBackToShop}
          className="text-xs text-slate-400 hover:text-white font-medium underline"
        >
          Return to Guest Store View
        </button>

      </div>
    </div>
  );
}
