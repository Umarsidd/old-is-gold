import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowRight, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';
import { STORE_INFO } from '../data/storeInfo';

const SLIDES = [
  {
    id: 'apple', brand: 'Apple', headline: 'iPhone 15 Series',
    subline: 'Titanium Design • A17 Pro Chip • 48MP Pro Camera',
    tagline: 'The most powerful iPhone ever.',
    bgFrom: '#1A1A2E', bgTo: '#16213E', accentColor: '#A8B8D0',
    glowColor: 'rgba(168,184,208,0.15)', phoneColor: '#D1D5DB',
    screenBg: '#000011', screenEmoji: '📱', badge: 'FLAGSHIP',
  },
  {
    id: 'samsung', brand: 'Samsung', headline: 'Galaxy S24 Ultra',
    subline: '200MP ProVisual • S Pen • Snapdragon 8 Gen 3',
    tagline: 'Galaxy AI. Now on your phone.',
    bgFrom: '#0A1628', bgTo: '#1A2744', accentColor: '#4DA3FF',
    glowColor: 'rgba(77,163,255,0.15)', phoneColor: '#2C3E50',
    screenBg: '#0A1628', screenEmoji: '🌌', badge: 'ULTRA',
  },
  {
    id: 'realme', brand: 'realme', headline: 'realme 13 Pro+',
    subline: '50MP Sony Camera • 80W Fast Charge • Dimensity 7300',
    tagline: 'Dare to Leap. Real Performance.',
    bgFrom: '#1A0A0A', bgTo: '#2D1200', accentColor: '#FF6B35',
    glowColor: 'rgba(255,107,53,0.15)', phoneColor: '#1C1C1E',
    screenBg: '#1A0800', screenEmoji: '🔥', badge: 'PRO+',
  },
  {
    id: 'oppo', brand: 'OPPO/vivo', headline: 'OPPO Reno 12 Pro',
    subline: '50MP AI Portrait • 80W SUPERVOOC • ColorOS 14',
    tagline: 'Capture Every Moment in Style.',
    bgFrom: '#0D1B2A', bgTo: '#1B2838', accentColor: '#00D4AA',
    glowColor: 'rgba(0,212,170,0.15)', phoneColor: '#1E3A4C',
    screenBg: '#001A14', screenEmoji: '✨', badge: 'PRO',
  },
  {
    id: 'motorola', brand: 'Motorola', headline: 'Edge 50 Pro',
    subline: '50MP OIS Camera • 125W TurboPower • OLED 165Hz',
    tagline: 'Hello Moto. Smarter. Bolder.',
    bgFrom: '#1A0A2E', bgTo: '#2D1A4E', accentColor: '#C084FC',
    glowColor: 'rgba(192,132,252,0.15)', phoneColor: '#2A1A3E',
    screenBg: '#140028', screenEmoji: '🚀', badge: 'PRO',
  },
];

function PhoneMockup({ slide }) {
  return (
    <div className="phone-float" style={{
      width: '160px', height: '320px', position: 'relative',
      filter: `drop-shadow(0 30px 50px ${slide.glowColor}) drop-shadow(0 0 60px ${slide.glowColor})`,
    }}>
      <div style={{
        width: '100%', height: '100%', borderRadius: '34px',
        background: `linear-gradient(145deg, ${slide.phoneColor}, ${slide.phoneColor}88)`,
        border: '2px solid rgba(255,255,255,0.12)', position: 'relative', overflow: 'hidden',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.18), 0 20px 60px rgba(0,0,0,0.6)',
      }}>
        <div style={{
          position: 'absolute', top: '12px', left: '7px', right: '7px', bottom: '12px',
          borderRadius: '26px', background: slide.screenBg, overflow: 'hidden',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '6px',
        }}>
          {/* Plain elegant screen overlay shimmer only */}
          <div style={{
            position: 'absolute', top: 0, left: '-50%', width: '80%', height: '100%',
            background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.04) 50%, transparent 60%)',
            animation: 'phoneShimmer 3s ease-in-out infinite',
          }} />
        </div>
        <div style={{ position: 'absolute', top: '18px', left: '50%', transform: 'translateX(-50%)', width: '54px', height: '12px', borderRadius: '99px', background: '#000', zIndex: 10 }} />
        <div style={{ position: 'absolute', right: '-3px', top: '80px', width: '3px', height: '36px', borderRadius: '0 3px 3px 0', background: `${slide.phoneColor}BB` }} />
        <div style={{ position: 'absolute', left: '-3px', top: '72px', width: '3px', height: '25px', borderRadius: '3px 0 0 3px', background: `${slide.phoneColor}BB` }} />
        <div style={{ position: 'absolute', left: '-3px', top: '106px', width: '3px', height: '25px', borderRadius: '3px 0 0 3px', background: `${slide.phoneColor}BB` }} />
      </div>
    </div>
  );
}

export default function HeroSlideshow({ onNavigate }) {
  const [current, setCurrent] = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const intervalRef = useRef(null);
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const goTo = useCallback((idx) => {
    setCurrent(idx);
    setProgressKey(k => k + 1);
  }, []);

  const next = useCallback(() => goTo((current + 1) % SLIDES.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + SLIDES.length) % SLIDES.length), [current, goTo]);

  useEffect(() => {
    if (prefersReduced) return;
    intervalRef.current = setInterval(next, 6000);
    return () => clearInterval(intervalRef.current);
  }, [next, prefersReduced]);

  const slide = SLIDES[current];
  const waUrl = `https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(`Hello OLD IS GOLD! I want to check ${slide.brand} phones.`)}`;

  return (
    <section style={{
      position: 'relative', width: '100%', minHeight: '600px', overflow: 'hidden',
      background: `linear-gradient(135deg, ${slide.bgFrom} 0%, ${slide.bgTo} 100%)`,
      transition: prefersReduced ? 'none' : 'background 0.8s ease',
    }} aria-label="Smartphone showcase">

      {/* Ambient Glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(ellipse 70% 70% at 75% 50%, ${slide.glowColor}, transparent)`,
        transition: prefersReduced ? 'none' : 'background 0.8s ease',
      }} />

      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }} />

      {/* Main Grid */}
      <div style={{
        position: 'relative', zIndex: 2,
        maxWidth: '1280px', margin: '0 auto', padding: '0 24px',
        display: 'grid', gridTemplateColumns: '1fr auto',
        alignItems: 'center', minHeight: '600px', gap: '60px',
      }}>

        {/* Left: Text */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', paddingTop: '32px', paddingBottom: '80px' }}>
          <div className="hero-animate" key={`badge-${current}`} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              padding: '4px 12px', background: `${slide.accentColor}20`,
              border: `1px solid ${slide.accentColor}40`, borderRadius: '99px',
              fontSize: '10px', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: slide.accentColor,
            }}>● {slide.badge}</span>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{slide.brand}</span>
          </div>

          <h1 className="hero-animate-delay" key={`h-${current}`} style={{
            fontSize: 'clamp(26px, 4.5vw, 56px)', fontWeight: 900, color: '#FFF',
            lineHeight: 1.08, letterSpacing: '-0.03em', margin: 0,
            textShadow: '0 2px 20px rgba(0,0,0,0.35)',
          }}>{slide.headline}</h1>

          <p className="hero-animate-delay" key={`tag-${current}`} style={{ fontSize: '15px', fontWeight: 600, color: slide.accentColor, margin: 0 }}>
            {slide.tagline}
          </p>

          <p className="hero-animate-delay-2" key={`sub-${current}`} style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.58)', margin: 0, fontWeight: 500, lineHeight: 1.7 }}>
            {slide.subline}
          </p>

          <div className="hero-animate-delay-2" key={`ctas-${current}`} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button onClick={() => onNavigate && onNavigate('shop')} style={{
              display: 'inline-flex', alignItems: 'center', gap: '7px',
              padding: '11px 22px', background: '#16A34A', color: '#fff', border: 'none', borderRadius: '12px',
              fontSize: '13px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 18px rgba(22,163,74,0.4)',
            }}>
              <span>Browse Catalog</span><ArrowRight style={{ width: '14px', height: '14px' }} />
            </button>
            <a href={waUrl} target="_blank" rel="noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: '7px',
              padding: '11px 22px', background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(8px)', color: '#fff',
              border: '1.5px solid rgba(255,255,255,0.18)', borderRadius: '12px',
              fontSize: '13px', fontWeight: 700, textDecoration: 'none',
            }}>
              <MessageSquare style={{ width: '14px', height: '14px' }} /><span>Ask Price</span>
            </a>
          </div>
        </div>

        {/* Right: Phone */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 0 80px' }}>
          <PhoneMockup slide={slide} key={`phone-${current}`} />
        </div>
      </div>

      {/* Controls bar */}
      <div style={{
        position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', zIndex: 10,
      }}>
        {!prefersReduced && (
          <div className="hero-progress" style={{ width: '140px' }}>
            <div key={`p-${progressKey}`} className="hero-progress-bar" />
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button onClick={prev} aria-label="Previous" style={{
            width: '28px', height: '28px', borderRadius: '99px', background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center',
            justifyContent: 'center', cursor: 'pointer', color: '#fff',
          }}><ChevronLeft style={{ width: '13px', height: '13px' }} /></button>
          <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
            {SLIDES.map((s, i) => (
              <button key={s.id} onClick={() => { clearInterval(intervalRef.current); goTo(i); }}
                aria-label={`Slide ${i+1}`} className={`hero-dot${i === current ? ' active' : ''}`} />
            ))}
          </div>
          <button onClick={next} aria-label="Next" style={{
            width: '28px', height: '28px', borderRadius: '99px', background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center',
            justifyContent: 'center', cursor: 'pointer', color: '#fff',
          }}><ChevronRight style={{ width: '13px', height: '13px' }} /></button>
        </div>
      </div>

      {/* Slide counter */}
      <div style={{
        position: 'absolute', top: '20px', right: '20px', zIndex: 10,
        background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: '99px', padding: '3px 11px', fontSize: '11px', fontWeight: 700,
        color: 'rgba(255,255,255,0.7)', letterSpacing: '0.05em',
      }}>
        {String(current+1).padStart(2,'0')} / {String(SLIDES.length).padStart(2,'0')}
      </div>

      <style>{`
        @keyframes phoneShimmer { 0% { left:-50%; } 100% { left:200%; } }
        @media (max-width: 768px) {
          section > div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
            padding-top: 40px !important;
          }
          section > div[style*="grid-template-columns"] > div:last-child { display: none !important; }
          section > div[style*="grid-template-columns"] > div:first-child { padding-bottom: 100px !important; }
          section > div[style*="grid-template-columns"] > div:first-child > div:last-child { justify-content: flex-start !important; }
        }
      `}</style>
    </section>
  );
}
