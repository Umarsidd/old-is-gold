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
  ShieldCheck,
  Star
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

    const contactText = encodeURIComponent(
      `Hello Umar Khan,\n\nName: ${formState.name}\nPhone: ${formState.phone}\nEmail: ${formState.email}\nMessage: ${formState.message}`
    );
    
    setSubmitted(true);
    setTimeout(() => {
      window.open(`https://wa.me/${STORE_INFO.whatsappNumber}?text=${contactText}`, '_blank');
    }, 800);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a0a0a' }}>
      
      {/* Hero Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #111827 50%, #0a0a0a 100%)',
          borderBottom: '1px solid #1f2937',
          padding: '60px 16px 48px',
          textAlign: 'center'
        }}
      >
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(22, 163, 74, 0.12)',
            border: '1px solid rgba(22, 163, 74, 0.3)',
            color: '#4ade80',
            padding: '6px 16px',
            borderRadius: '9999px',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: '20px'
          }}>
            <Star style={{ width: '12px', height: '12px' }} />
            Official Showroom Contact
          </div>

          <h1 style={{
            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
            fontWeight: 900,
            color: '#ffffff',
            lineHeight: 1.1,
            margin: '0 0 16px'
          }}>
            Get In Touch With<br />
            <span style={{ color: '#16A34A' }}>Mobile Hub</span>
          </h1>

          <p style={{
            color: '#9ca3af',
            fontSize: '14px',
            lineHeight: 1.7,
            margin: 0
          }}>
            Visit our showroom in Balrampur or reach out directly on WhatsApp.
            Available 7 days a week for sales, exchange & inquiries.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 16px' }}>
        
        {/* Quick Contact Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '48px'
        }}>
          {[
            { icon: Phone, label: 'Call Now', value: STORE_INFO.phone, href: `tel:${STORE_INFO.phone}`, color: '#16A34A' },
            { icon: MessageSquare, label: 'WhatsApp', value: '+91 ' + STORE_INFO.phone, href: `https://wa.me/${STORE_INFO.whatsappNumber}`, color: '#16A34A', external: true },
            { icon: Mail, label: 'Email', value: STORE_INFO.email, href: `mailto:${STORE_INFO.email}`, color: '#60a5fa' },
            { icon: Clock, label: 'Hours', value: STORE_INFO.hours, color: '#f59e0b' },
          ].map(({ icon: Icon, label, value, href, color, external }) => (
            <div key={label} style={{
              background: '#111827',
              border: '1px solid #1f2937',
              borderRadius: '20px',
              padding: '24px',
              transition: 'all 0.2s ease',
              cursor: href ? 'pointer' : 'default'
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = color}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#1f2937'}
            >
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: `${color}18`,
                border: `1px solid ${color}40`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                <Icon style={{ width: '20px', height: '20px', color }} />
              </div>
              <p style={{ color: '#6b7280', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 6px' }}>{label}</p>
              {href ? (
                <a 
                  href={href} 
                  {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  style={{ color: '#ffffff', fontSize: '13px', fontWeight: 600, textDecoration: 'none', wordBreak: 'break-all' }}
                >
                  {value}
                </a>
              ) : (
                <p style={{ color: '#ffffff', fontSize: '13px', fontWeight: 600, margin: 0 }}>{value}</p>
              )}
            </div>
          ))}
        </div>

        {/* 2-Column Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', alignItems: 'start' }}>
          
          {/* Left: Store Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Address Card */}
            <div style={{
              background: '#111827',
              border: '1px solid #1f2937',
              borderRadius: '24px',
              padding: '32px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid #1f2937' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#16A34A22', border: '1px solid #16A34A40', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MapPin style={{ width: '20px', height: '20px', color: '#4ade80' }} />
                </div>
                <div>
                  <h2 style={{ color: '#ffffff', fontSize: '16px', fontWeight: 800, margin: 0 }}>Store Location</h2>
                  <p style={{ color: '#6b7280', fontSize: '12px', margin: '2px 0 0' }}>Visit us in person</p>
                </div>
              </div>

              <p style={{ color: '#d1d5db', fontSize: '14px', lineHeight: 1.7, margin: '0 0 24px' }}>
                {STORE_INFO.address}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <a
                  href={`tel:${STORE_INFO.phone}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '12px',
                    background: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '14px',
                    color: '#ffffff',
                    fontSize: '13px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#16A34A'; e.currentTarget.style.borderColor = '#16A34A'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#1f2937'; e.currentTarget.style.borderColor = '#374151'; }}
                >
                  <Phone style={{ width: '16px', height: '16px' }} />
                  Call Owner
                </a>
                <a
                  href={`https://wa.me/${STORE_INFO.whatsappNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '12px',
                    background: '#16A34A',
                    borderRadius: '14px',
                    color: '#ffffff',
                    fontSize: '13px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    border: '1px solid #16A34A'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#15803d'}
                  onMouseLeave={e => e.currentTarget.style.background = '#16A34A'}
                >
                  <MessageSquare style={{ width: '16px', height: '16px' }} />
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Guarantee Card */}
            <div style={{
              background: '#111827',
              border: '1px solid #16A34A40',
              borderRadius: '24px',
              padding: '24px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px'
            }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#16A34A20', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <ShieldCheck style={{ width: '22px', height: '22px', color: '#4ade80' }} />
              </div>
              <div>
                <p style={{ color: '#ffffff', fontSize: '14px', fontWeight: 800, margin: '0 0 6px' }}>100% Genuine Certified Devices</p>
                <p style={{ color: '#9ca3af', fontSize: '13px', lineHeight: 1.6, margin: 0 }}>All mobile phones are physically verified at our Balrampur showroom before sale. Owner: <strong style={{ color: '#ffffff' }}>{STORE_INFO.owner}</strong></p>
              </div>
            </div>

            {/* Google Maps */}
            <div style={{
              background: '#111827',
              border: '1px solid #1f2937',
              borderRadius: '24px',
              overflow: 'hidden'
            }}>
              <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid #1f2937', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MapPin style={{ width: '18px', height: '18px', color: '#f59e0b' }} />
                <h3 style={{ color: '#ffffff', fontSize: '14px', fontWeight: 800, margin: 0 }}>Google Maps — Balrampur</h3>
              </div>
              <div style={{ width: '100%', height: '220px' }}>
                <iframe
                  title="Mobile Hub Store Location"
                  src={STORE_INFO.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          {/* Right: Inquiry Form */}
          <div style={{
            background: '#111827',
            border: '1px solid #1f2937',
            borderRadius: '24px',
            padding: '32px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px', paddingBottom: '20px', borderBottom: '1px solid #1f2937' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#16A34A22', border: '1px solid #16A34A40', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Send style={{ width: '18px', height: '18px', color: '#4ade80' }} />
              </div>
              <div>
                <h2 style={{ color: '#ffffff', fontSize: '16px', fontWeight: 800, margin: 0 }}>Send An Inquiry</h2>
                <p style={{ color: '#6b7280', fontSize: '12px', margin: '2px 0 0' }}>We'll redirect you to WhatsApp instantly</p>
              </div>
            </div>

            {submitted ? (
              <div style={{
                background: 'rgba(22, 163, 74, 0.1)',
                border: '1px solid rgba(22, 163, 74, 0.3)',
                borderRadius: '20px',
                padding: '40px',
                textAlign: 'center'
              }}>
                <CheckCircle2 style={{ width: '48px', height: '48px', color: '#4ade80', margin: '0 auto 16px' }} />
                <h3 style={{ color: '#ffffff', fontSize: '18px', fontWeight: 800, margin: '0 0 8px' }}>Opening WhatsApp...</h3>
                <p style={{ color: '#9ca3af', fontSize: '13px', margin: 0 }}>Your inquiry has been prepared and will open in WhatsApp (+91 {STORE_INFO.phone}).</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', color: '#9ca3af', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mohd Ali"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      style={{
                        width: '100%',
                        background: '#0a0a0a',
                        border: '1px solid #374151',
                        borderRadius: '12px',
                        padding: '12px 16px',
                        color: '#ffffff',
                        fontSize: '14px',
                        outline: 'none',
                        boxSizing: 'border-box',
                        transition: 'border-color 0.2s'
                      }}
                      onFocus={e => e.target.style.borderColor = '#16A34A'}
                      onBlur={e => e.target.style.borderColor = '#374151'}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', color: '#9ca3af', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="8573929638"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      style={{
                        width: '100%',
                        background: '#0a0a0a',
                        border: '1px solid #374151',
                        borderRadius: '12px',
                        padding: '12px 16px',
                        color: '#ffffff',
                        fontSize: '14px',
                        outline: 'none',
                        boxSizing: 'border-box',
                        transition: 'border-color 0.2s'
                      }}
                      onFocus={e => e.target.style.borderColor = '#16A34A'}
                      onBlur={e => e.target.style.borderColor = '#374151'}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', color: '#9ca3af', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="yourname@gmail.com"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    style={{
                      width: '100%',
                      background: '#0a0a0a',
                      border: '1px solid #374151',
                      borderRadius: '12px',
                      padding: '12px 16px',
                      color: '#ffffff',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={e => e.target.style.borderColor = '#16A34A'}
                    onBlur={e => e.target.style.borderColor = '#374151'}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', color: '#9ca3af', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                    Phone Model Query *
                  </label>
                  <textarea
                    rows="4"
                    required
                    placeholder="Tell us which mobile phone model you are looking for..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    style={{
                      width: '100%',
                      background: '#0a0a0a',
                      border: '1px solid #374151',
                      borderRadius: '12px',
                      padding: '12px 16px',
                      color: '#ffffff',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box',
                      resize: 'vertical',
                      fontFamily: 'inherit',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={e => e.target.style.borderColor = '#16A34A'}
                    onBlur={e => e.target.style.borderColor = '#374151'}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    background: '#16A34A',
                    border: 'none',
                    borderRadius: '14px',
                    padding: '16px',
                    color: '#ffffff',
                    fontSize: '15px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    transition: 'all 0.2s ease',
                    letterSpacing: '0.3px'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#15803d'}
                  onMouseLeave={e => e.currentTarget.style.background = '#16A34A'}
                >
                  <MessageSquare style={{ width: '18px', height: '18px' }} />
                  Send Message via WhatsApp
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
