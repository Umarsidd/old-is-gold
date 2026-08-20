import React, { useState } from 'react';
import { STORE_INFO } from '../data/storeInfo';
import { MessageSquare, Heart, Eye, CheckCircle, XCircle } from 'lucide-react';

function getSpecs(product) {
  const model = (product.model || product.name || '').toLowerCase();
  const brand = (product.brand || '').toLowerCase();
  if (brand === 'apple') {
    if (model.includes('iphone 16')) return { ram: '8GB', chip: 'A18 Bionic' };
    if (model.includes('iphone 15')) return { ram: '6GB', chip: 'A16 Bionic' };
    if (model.includes('iphone 14')) return { ram: '6GB', chip: 'A15 Bionic' };
    if (model.includes('iphone 13')) return { ram: '4GB', chip: 'A15 Bionic' };
    return { ram: '4GB', chip: 'Apple Bionic' };
  }
  if (brand === 'samsung') {
    if (model.includes('s24')) return { ram: '8GB', chip: 'SD 8 Gen 3' };
    if (model.includes('s23')) return { ram: '8GB', chip: 'SD 8 Gen 2' };
    return { ram: '8GB', chip: 'Snapdragon' };
  }
  if (brand === 'oneplus') return { ram: '12GB', chip: 'SD 8+ Gen 1' };
  if (brand === 'realme') return { ram: '8GB', chip: 'Dimensity' };
  if (brand === 'oppo') return { ram: '8GB', chip: 'Dimensity' };
  if (brand === 'vivo') return { ram: '8GB', chip: 'Snapdragon' };
  if (brand === 'motorola') return { ram: '8GB', chip: 'Snapdragon' };
  return { ram: '8GB', chip: 'Octa-Core' };
}

export default function ProductCard({ product, onViewDetails }) {
  const [isLiked, setIsLiked] = useState(false);
  const specs = getSpecs(product);
  const isAvailable = (product.stock > 0 || product.isAvailable) && !product.isSold;

  const whatsappMessage = encodeURIComponent(
    `Hello OLD IS GOLD! I'm interested in: ${product.brand} ${product.model || product.name}${product.storage ? ` (${product.storage})` : ''}. Please share the latest price.`
  );
  const whatsappUrl = `https://wa.me/${STORE_INFO.whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="product-card" style={{ height: '100%' }}>

      {/* Image Area */}
      <div className="product-card-image" style={{ position: 'relative' }}>
        {/* Status Badge */}
        <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 2 }}>
          {isAvailable ? (
            <span className="badge-green" style={{ fontSize: '10px' }}>
              <CheckCircle style={{ width: '10px', height: '10px' }} /> In Stock
            </span>
          ) : (
            <span className="badge-red" style={{ fontSize: '10px' }}>
              <XCircle style={{ width: '10px', height: '10px' }} /> Sold Out
            </span>
          )}
        </div>

        {/* Featured Badge */}
        {product.isFeatured && (
          <div style={{ position: 'absolute', top: '10px', right: '36px', zIndex: 2 }}>
            <span className="badge-amber" style={{ fontSize: '10px' }}>★ Featured</span>
          </div>
        )}

        {/* Wishlist */}
        <button
          onClick={e => { e.stopPropagation(); setIsLiked(!isLiked); }}
          aria-label={isLiked ? 'Remove from wishlist' : 'Add to wishlist'}
          style={{
            position: 'absolute', top: '10px', right: '10px', zIndex: 2,
            width: '28px', height: '28px', borderRadius: '99px',
            border: isLiked ? '1px solid #FCA5A5' : '1px solid #E2E8F0',
            background: isLiked ? '#FEF2F2' : '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', transition: 'all 0.18s ease',
          }}
        >
          <Heart style={{ width: '13px', height: '13px', color: isLiked ? '#EF4444' : '#94A3B8', fill: isLiked ? '#EF4444' : 'none' }} />
        </button>

        {/* Product Image */}
        <img
          src={product.image}
          alt={`${product.brand} ${product.model || product.name}`}
          loading="lazy"
          onClick={() => onViewDetails && onViewDetails(product)}
          style={{ cursor: 'pointer' }}
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80'; }}
        />
      </div>

      {/* Product Info */}
      <div style={{ padding: '14px 14px 14px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>

        {/* Brand label */}
        <div style={{ fontSize: '10px', fontWeight: 700, color: '#16A34A', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          {product.brand}
        </div>

        {/* Model Name + Storage */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '6px' }}>
          <h3
            onClick={() => onViewDetails && onViewDetails(product)}
            style={{
              fontSize: '14px', fontWeight: 700, color: '#0F172A', cursor: 'pointer',
              margin: 0, lineHeight: 1.3, flex: 1,
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#16A34A'}
            onMouseLeave={e => e.currentTarget.style.color = '#0F172A'}
          >
            {product.model || product.name}
          </h3>
          {product.storage && (
            <span style={{
              fontSize: '10px', fontWeight: 700, padding: '2px 7px',
              background: '#F1F5F9', color: '#475569', borderRadius: '6px',
              flexShrink: 0, marginTop: '1px',
            }}>{product.storage}</span>
          )}
        </div>

        {/* Specs row */}
        <p style={{ fontSize: '11px', color: '#94A3B8', margin: 0, fontWeight: 500 }}>
          {specs.ram} &nbsp;·&nbsp; {specs.chip}
        </p>

        {/* Price */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
          {product.price ? (
            <>
              <span style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>₹{Number(product.price).toLocaleString('en-IN')}</span>
              {product.salePrice && product.salePrice < product.price && (
                <span style={{ fontSize: '12px', color: '#94A3B8', textDecoration: 'line-through', fontWeight: 500 }}>
                  ₹{Number(product.salePrice).toLocaleString('en-IN')}
                </span>
              )}
            </>
          ) : (
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#475569', fontStyle: 'italic' }}>
              Contact for Price
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '7px', marginTop: 'auto', paddingTop: '8px' }}>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
              padding: '9px 0', borderRadius: '10px', background: '#16A34A', color: '#fff',
              fontSize: '12px', fontWeight: 700, textDecoration: 'none',
              boxShadow: '0 2px 8px rgba(22,163,74,0.25)', transition: 'all 0.18s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#15803D'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(22,163,74,0.35)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#16A34A'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(22,163,74,0.25)'; }}
          >
            <MessageSquare style={{ width: '13px', height: '13px', fill: 'currentColor' }} />
            Ask Price
          </a>
          {onViewDetails && (
            <button
              onClick={() => onViewDetails(product)}
              title="View Details"
              style={{
                width: '36px', height: '36px', borderRadius: '10px', border: '1.5px solid #E2E8F0',
                background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#64748B', transition: 'all 0.15s ease', flexShrink: 0,
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#16A34A'; e.currentTarget.style.color = '#16A34A'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.color = '#64748B'; }}
            >
              <Eye style={{ width: '14px', height: '14px' }} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
