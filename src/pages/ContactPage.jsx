import React, { useState } from 'react';
import { STORE_INFO } from '../data/storeInfo';
import { 
  MapPin, 
  Mail, 
  Phone, 
  MessageSquare, 
  Clock, 
  Send, 
  CheckCircle2, 
  User, 
  Sparkles,
  Award
} from 'lucide-react';

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.phone || !formState.message) return;

    // Build direct WhatsApp message string for contact inquiry
    const contactText = encodeURIComponent(
      `Hello Umar Khan,\n\nName: ${formState.name}\nPhone: ${formState.phone}\nEmail: ${formState.email}\nMessage: ${formState.message}`
    );
    
    setSubmitted(true);
    setTimeout(() => {
      window.open(`https://wa.me/${STORE_INFO.whatsappNumber}?text=${contactText}`, '_blank');
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      
      {/* Top Banner */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Get In Touch With Umar Khan</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-black text-white">
          Contact <span className="gold-gradient-text">OLD IS GOLD</span>
        </h1>

        <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
          Visit our store in Balrampur or send us a message directly on WhatsApp. We are available 7 days a week for sales, exchanges, and inquiries.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Store Details & Action Buttons */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-6">
            <h2 className="text-lg font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span>Official Store Info</span>
            </h2>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3 bg-slate-900 p-3.5 rounded-2xl border border-slate-800">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white uppercase text-[11px]">Physical Store Address</p>
                  <p className="text-slate-300 mt-0.5 leading-relaxed font-medium">{STORE_INFO.address}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-900 p-3.5 rounded-2xl border border-slate-800">
                <Mail className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <p className="font-bold text-white uppercase text-[11px]">Email Address</p>
                  <a href={`mailto:${STORE_INFO.email}`} className="text-amber-400 hover:underline font-medium">
                    {STORE_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-900 p-3.5 rounded-2xl border border-slate-800">
                <Phone className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <p className="font-bold text-white uppercase text-[11px]">Direct Phone Helpline</p>
                  <a href={`tel:${STORE_INFO.phone}`} className="text-amber-400 font-bold hover:underline">
                    {STORE_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-900 p-3.5 rounded-2xl border border-slate-800">
                <MessageSquare className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <p className="font-bold text-white uppercase text-[11px]">WhatsApp Store</p>
                  <a 
                    href={`https://wa.me/${STORE_INFO.whatsappNumber}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-emerald-400 font-bold hover:underline"
                  >
                    +91 {STORE_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-900 p-3.5 rounded-2xl border border-slate-800">
                <Clock className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <p className="font-bold text-white uppercase text-[11px]">Business Hours</p>
                  <p className="text-slate-300 font-medium">{STORE_INFO.hours}</p>
                </div>
              </div>
            </div>

            {/* Quick Action Contact Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                href={`tel:${STORE_INFO.phone}`}
                className="bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-xs py-3 px-4 rounded-2xl border border-amber-500/40 flex items-center justify-center gap-2 transition"
              >
                <Phone className="w-4 h-4" />
                <span>Call Owner</span>
              </a>

              <a
                href={`https://wa.me/${STORE_INFO.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3 px-4 rounded-2xl shadow-lg flex items-center justify-center gap-2 transition"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Chat</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form & Google Maps Embed */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Contact Form */}
          <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-6">
            <h2 className="text-lg font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center gap-2">
              <Send className="w-5 h-5 text-amber-400" />
              <span>Send An Instant Inquiry</span>
            </h2>

            {submitted ? (
              <div className="bg-emerald-950/60 border border-emerald-500/40 p-6 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h3 className="text-base font-bold text-white">Opening WhatsApp...</h3>
                <p className="text-xs text-slate-300">Your inquiry message has been prepared and redirected to WhatsApp (+91 8573929638).</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mohd Ali"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full bg-slate-900 text-white placeholder-slate-500 text-xs rounded-xl px-4 py-3 border border-slate-700 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="8573929638"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      className="w-full bg-slate-900 text-white placeholder-slate-500 text-xs rounded-xl px-4 py-3 border border-slate-700 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Email Address (Optional)</label>
                  <input
                    type="email"
                    placeholder="yourname@gmail.com"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full bg-slate-900 text-white placeholder-slate-500 text-xs rounded-xl px-4 py-3 border border-slate-700 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Your Message / Phone Model Query *</label>
                  <textarea
                    rows="3"
                    required
                    placeholder="Tell us which mobile phone model you are looking for..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-slate-900 text-white placeholder-slate-500 text-xs rounded-xl px-4 py-3 border border-slate-700 focus:outline-none focus:border-amber-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm py-3.5 rounded-2xl shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 transition"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message via WhatsApp</span>
                </button>
              </form>
            )}
          </div>

          {/* Google Maps Embed Section */}
          <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <MapPin className="w-5 h-5 text-amber-400" />
              <h2 className="text-base font-bold text-white uppercase tracking-wider">
                Google Maps Location (Balrampur)
              </h2>
            </div>

            <div className="w-full h-64 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900">
              <iframe
                title="OLD IS GOLD Store Location Google Map"
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

        </div>

      </div>
    </div>
  );
}
