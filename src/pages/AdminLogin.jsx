import React, { useState } from 'react';
import { ShieldCheck, Eye, EyeOff, Lock } from 'lucide-react';
import { STORE_INFO } from '../data/storeInfo';

// ─── Hardcoded Admin Credentials (hidden page, no public access) ──────────────
const ADMIN_USERNAME = 'Umarkhan24';
const ADMIN_PASSWORD = 'Gold@24carrot';

export default function AdminLogin({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate slight delay for security feel
    setTimeout(() => {
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        // Store session securely in sessionStorage (cleared on tab close)
        sessionStorage.setItem('admin_authenticated', 'true');
        sessionStorage.setItem('admin_user', ADMIN_USERNAME);
        onLoginSuccess();
      } else {
        setError('Invalid username or password.');
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0F172A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          background: '#1E293B',
          borderRadius: '20px',
          border: '1px solid #334155',
          padding: '40px 36px',
          boxShadow: '0 25px 60px rgba(0,0,0,0.5)'
        }}
      >
        {/* Logo + Title */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '56px', height: '56px',
            background: 'linear-gradient(135deg, #16A34A, #15803d)',
            borderRadius: '16px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px'
          }}>
            <Lock style={{ width: '24px', height: '24px', color: '#FFFFFF' }} />
          </div>
          <h1 style={{ color: '#F1F5F9', fontSize: '20px', fontWeight: 700, margin: '0 0 6px' }}>
            Admin Panel
          </h1>
          <p style={{ color: '#64748B', fontSize: '13px', margin: 0 }}>
            {STORE_INFO.name} · Restricted Access
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Username */}
          <div>
            <label style={{ display: 'block', color: '#94A3B8', fontSize: '12px', fontWeight: 600, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Username
            </label>
            <input
              type="text"
              autoComplete="username"
              value={username}
              onChange={e => { setUsername(e.target.value); setError(''); }}
              placeholder="Enter username"
              required
              style={{
                width: '100%', boxSizing: 'border-box',
                background: '#0F172A',
                border: error ? '1px solid #EF4444' : '1px solid #334155',
                borderRadius: '10px',
                padding: '12px 16px',
                color: '#F1F5F9',
                fontSize: '14px',
                outline: 'none',
              }}
              onFocus={e => e.target.style.borderColor = '#16A34A'}
              onBlur={e => e.target.style.borderColor = error ? '#EF4444' : '#334155'}
            />
          </div>

          {/* Password */}
          <div>
            <label style={{ display: 'block', color: '#94A3B8', fontSize: '12px', fontWeight: 600, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={e => { setPassword(e.target.value); setError(''); }}
                placeholder="Enter password"
                required
                style={{
                  width: '100%', boxSizing: 'border-box',
                  background: '#0F172A',
                  border: error ? '1px solid #EF4444' : '1px solid #334155',
                  borderRadius: '10px',
                  padding: '12px 44px 12px 16px',
                  color: '#F1F5F9',
                  fontSize: '14px',
                  outline: 'none',
                }}
                onFocus={e => e.target.style.borderColor = '#16A34A'}
                onBlur={e => e.target.style.borderColor = error ? '#EF4444' : '#334155'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: '#64748B', padding: '4px'
                }}
              >
                {showPassword
                  ? <EyeOff style={{ width: '16px', height: '16px' }} />
                  : <Eye style={{ width: '16px', height: '16px' }} />
                }
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '8px',
              padding: '10px 14px',
              color: '#F87171',
              fontSize: '13px',
              fontWeight: 500
            }}>
              ⚠️ {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              background: loading ? '#15803d99' : 'linear-gradient(135deg, #16A34A, #15803d)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '10px',
              padding: '13px',
              fontSize: '14px',
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'opacity 0.2s',
              boxShadow: '0 4px 14px rgba(22, 163, 74, 0.3)'
            }}
          >
            <ShieldCheck style={{ width: '16px', height: '16px' }} />
            {loading ? 'Verifying...' : 'Login to Admin Panel'}
          </button>

        </form>

        {/* Footer note */}
        <p style={{ color: '#334155', fontSize: '11px', textAlign: 'center', marginTop: '24px', lineHeight: 1.5 }}>
          This is a restricted admin panel.<br />
          Unauthorized access is prohibited.
        </p>
      </div>
    </div>
  );
}
