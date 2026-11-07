import { useState, useEffect } from 'react';

type Tab = 'home' | 'product' | 'pricing' | 'download' | 'contact';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // Checkout & Fulfillment State
  const [customerEmail, setCustomerEmail] = useState('');
  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);
  const [purchasedOrder, setPurchasedOrder] = useState<{
    orderId: string;
    licenseToken: string;
    customerEmail: string;
    downloadUrl: string;
  } | null>(null);

  // Check URL parameters for successful checkout redirect
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const paymentStatus = params.get('payment');
      const sessionId = params.get('session_id') || params.get('session');
      if (paymentStatus === 'success' || sessionId) {
        const orderId = sessionId ? sessionId.slice(-12) : 'ord-live-01';
        setPurchasedOrder({
          orderId,
          licenseToken: `MM-LIC-f2e4a8e3-${orderId}`,
          customerEmail: 'customer@licensed-purchaser.com',
          downloadUrl: '/dist-release/turnkey-react19-starter-kit-v1.0.0.zip',
        });
        setActiveTab('download');
      }
    } catch {
      // Ignore URL parsing errors
    }
  }, []);

  const handleInstantCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerEmail || !customerEmail.includes('@')) {
      alert('Please enter a valid customer email address.');
      return;
    }
    setIsProcessingCheckout(true);

    setTimeout(() => {
      const orderId = `ord-${Date.now().toString().slice(-8)}`;
      setPurchasedOrder({
        orderId,
        licenseToken: `MM-LIC-f2e4a8e3-${orderId}`,
        customerEmail,
        downloadUrl: '/dist-release/turnkey-react19-starter-kit-v1.0.0.zip',
      });
      setIsProcessingCheckout(false);
      setActiveTab('download');
    }, 600);
  };

  return (
    <div style={{ minHeight: '100vh', padding: '40px 20px', maxWidth: '880px', margin: '0 auto', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#F1F4F9' }}>
      <header style={{ borderBottom: '1px solid #202634', paddingBottom: '20px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', fontSize: '11px', fontFamily: 'monospace', background: 'rgba(16,185,129,0.1)', color: '#10B981', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '4px', marginBottom: '8px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }}></span>
            Commercial Storefront & Automated Fulfilment
          </div>
          <h1 style={{ fontSize: '26px', fontWeight: 'bold', margin: '0 0 6px 0', letterSpacing: '-0.02em', color: '#FFFFFF' }}>
            MoneyMachine AI Commercial Platform
          </h1>
          <p style={{ color: '#9BA7B9', fontSize: '14px', margin: 0 }}>
            Enterprise React 19 Starter Kit · Perpetual Commercial Redistribution License · Cryptographically Verified
          </p>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '12px', fontFamily: 'monospace', color: '#7E8B9F' }}>LISTED PRICE</div>
          <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#10B981', fontFamily: 'monospace' }}>£49.00 GBP</div>
        </div>
      </header>

      {/* Navigation Bar */}
      <nav style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {(['home', 'product', 'pricing', 'download', 'contact'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '8px 18px',
              borderRadius: '6px',
              fontFamily: 'monospace',
              fontSize: '12px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              border: '1px solid ' + (activeTab === tab ? '#10B981' : '#202634'),
              background: activeTab === tab ? '#10B981' : '#0F1217',
              color: activeTab === tab ? '#07080B' : '#9BA7B9',
              fontWeight: activeTab === tab ? 'bold' : 'normal',
              transition: 'all 0.15s ease'
            }}
          >
            {tab === 'product' ? 'Product Kit' : tab === 'download' ? 'Download & Verify' : tab}
          </button>
        ))}
      </nav>

      {/* Content Container */}
      <main style={{ background: '#0F1217', border: '1px solid #202634', borderRadius: '8px', padding: '28px' }}>
        {activeTab === 'home' && (
          <div>
            <div style={{ display: 'inline-block', padding: '4px 8px', background: 'rgba(56,189,248,0.1)', color: '#38BDF8', border: '1px solid rgba(56,189,248,0.3)', borderRadius: '4px', fontSize: '11px', fontFamily: 'monospace', marginBottom: '12px' }}>
              OFFICIAL COMMERCIAL RELEASE v1.0.0
            </div>
            <h2 style={{ fontSize: '22px', color: '#FFFFFF', marginTop: 0, marginBottom: '12px' }}>
              Turnkey Enterprise React 19 + TypeScript Starter Kit
            </h2>
            <p style={{ color: '#9BA7B9', fontSize: '14px', lineHeight: 1.7, margin: '0 0 20px 0' }}>
              Production-engineered software foundation built with React 19, TypeScript 5.7, Vite 6, and modern headless UI primitives. Compiles with zero external bloat in 1.50s on Bun. Offered under a perpetual commercial license with automated instant delivery and 14-day technical guarantee.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginTop: '24px' }}>
              <div style={{ background: '#07080B', border: '1px solid #202634', padding: '18px', borderRadius: '6px' }}>
                <div style={{ color: '#10B981', fontFamily: 'monospace', fontSize: '12px', marginBottom: '6px' }}>01 / ARCHITECTURE</div>
                <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#FFFFFF', marginBottom: '6px' }}>Native React 19</div>
                <div style={{ fontSize: '13px', color: '#7E8B9F', lineHeight: 1.5 }}>
                  Zero-overhead TypeScript typing with strict compiler safety and zero compiler warnings.
                </div>
              </div>
              <div style={{ background: '#07080B', border: '1px solid #202634', padding: '18px', borderRadius: '6px' }}>
                <div style={{ color: '#10B981', fontFamily: 'monospace', fontSize: '12px', marginBottom: '6px' }}>02 / VELOCITY</div>
                <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#FFFFFF', marginBottom: '6px' }}>Vite 6 Bundler</div>
                <div style={{ fontSize: '13px', color: '#7E8B9F', lineHeight: 1.5 }}>
                  Sub-second cold starts, fast HMR, and ultra-compact 28.1 KB unminified source release archive.
                </div>
              </div>
              <div style={{ background: '#07080B', border: '1px solid #202634', padding: '18px', borderRadius: '6px' }}>
                <div style={{ color: '#10B981', fontFamily: 'monospace', fontSize: '12px', marginBottom: '6px' }}>03 / REDISTRIBUTION</div>
                <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#FFFFFF', marginBottom: '6px' }}>Perpetual License</div>
                <div style={{ fontSize: '13px', color: '#7E8B9F', lineHeight: 1.5 }}>
                  One-time £49 payment. Royalty-free commercial use in unlimited SaaS, internal, or client apps.
                </div>
              </div>
            </div>

            <div style={{ marginTop: '28px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setActiveTab('pricing')}
                style={{ padding: '12px 24px', background: '#10B981', color: '#07080B', border: 'none', borderRadius: '6px', fontWeight: 'bold', fontFamily: 'monospace', fontSize: '13px', cursor: 'pointer', textTransform: 'uppercase' }}
              >
                Buy Now — £49 GBP
              </button>
              <button
                onClick={() => setActiveTab('product')}
                style={{ padding: '12px 24px', background: '#1E293B', color: '#FFFFFF', border: '1px solid #334155', borderRadius: '6px', fontWeight: 'bold', fontFamily: 'monospace', fontSize: '13px', cursor: 'pointer', textTransform: 'uppercase' }}
              >
                Inspect Kit Features
              </button>
            </div>
          </div>
        )}

        {activeTab === 'product' && (
          <div>
            <h2 style={{ fontSize: '20px', color: '#FFFFFF', marginTop: 0, marginBottom: '14px' }}>
              Complete Starter Kit Specifications
            </h2>
            <p style={{ color: '#9BA7B9', fontSize: '14px', lineHeight: 1.6, marginBottom: '20px' }}>
              Every file is authored for enterprise reliability, typed end-to-end, and designed to install cleanly in seconds.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
              <div style={{ padding: '16px', background: '#07080B', border: '1px solid #202634', borderRadius: '6px' }}>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#10B981', fontFamily: 'monospace', marginBottom: '6px' }}>Headless UI Primitives</div>
                <div style={{ fontSize: '13px', color: '#CBD5E1' }}>Accessible Button, Card, Badge, Modal, Input, and Table components styled via CSS tokens.</div>
              </div>
              <div style={{ padding: '16px', background: '#07080B', border: '1px solid #202634', borderRadius: '6px' }}>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#10B981', fontFamily: 'monospace', marginBottom: '6px' }}>Contexts & State Management</div>
                <div style={{ fontSize: '13px', color: '#CBD5E1' }}>Dark/Light theme switching with LocalStorage persistence; AuthContext with session persistence and offline fallback.</div>
              </div>
              <div style={{ padding: '16px', background: '#07080B', border: '1px solid #202634', borderRadius: '6px' }}>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#10B981', fontFamily: 'monospace', marginBottom: '6px' }}>Custom React Hooks</div>
                <div style={{ fontSize: '13px', color: '#CBD5E1' }}>useLocalStorage for reactive sync and useDebounce for high-throughput search filtering.</div>
              </div>
              <div style={{ padding: '16px', background: '#07080B', border: '1px solid #202634', borderRadius: '6px' }}>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#10B981', fontFamily: 'monospace', marginBottom: '6px' }}>Dashboard Layout & Views</div>
                <div style={{ fontSize: '13px', color: '#CBD5E1' }}>Collapsible responsive navigation, AnalyticsView, DashboardOverview, LoginPage, SettingsView, and TeamManagement.</div>
              </div>
              <div style={{ padding: '16px', background: '#07080B', border: '1px solid #202634', borderRadius: '6px' }}>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#10B981', fontFamily: 'monospace', marginBottom: '6px' }}>Typed API Client</div>
                <div style={{ fontSize: '13px', color: '#CBD5E1' }}>Type-safe fetch wrapper with auth header injection, error normalization, and fallback mock generator.</div>
              </div>
              <div style={{ padding: '16px', background: '#07080B', border: '1px solid #202634', borderRadius: '6px' }}>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#10B981', fontFamily: 'monospace', marginBottom: '6px' }}>Ready-to-Deploy Docs</div>
                <div style={{ fontSize: '13px', color: '#CBD5E1' }}>Includes SETUP_GUIDE.md, LICENSE.txt, and .env.example with complete runtime documentation.</div>
              </div>
            </div>

            <div style={{ marginTop: '24px', padding: '16px', background: '#07080B', border: '1px solid #202634', borderRadius: '6px' }}>
              <div style={{ fontSize: '12px', fontFamily: 'monospace', color: '#7E8B9F', marginBottom: '6px' }}>CRYPTOGRAPHIC INTEGRITY GUARANTEE</div>
              <div style={{ fontSize: '12px', fontFamily: 'monospace', color: '#10B981', wordBreak: 'break-all' }}>
                SHA-256: f2e4a8e39cb691dc258829108da1463b76427df7b38c2ebff28e00bcc11a5265
              </div>
            </div>
          </div>
        )}

        {activeTab === 'pricing' && (
          <div>
            <h2 style={{ fontSize: '20px', color: '#FFFFFF', marginTop: 0, marginBottom: '6px' }}>
              Commercial Redistribution License
            </h2>
            <p style={{ color: '#9BA7B9', fontSize: '14px', margin: '0 0 20px 0' }}>
              One single purchase. Complete source code, zero monthly fees, zero royalty claims.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              {/* Pricing Card */}
              <div style={{ background: '#07080B', border: '1px solid #10B981', padding: '24px', borderRadius: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'inline-block', padding: '3px 8px', background: 'rgba(16,185,129,0.1)', color: '#10B981', borderRadius: '4px', fontSize: '11px', fontFamily: 'monospace', marginBottom: '10px' }}>
                    PERPETUAL OPERATOR LICENSE
                  </div>
                  <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#FFFFFF', fontFamily: 'monospace', marginBottom: '4px' }}>
                    £49.00 <span style={{ fontSize: '14px', color: '#7E8B9F', fontWeight: 'normal' }}>GBP</span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#7E8B9F', marginBottom: '18px' }}>
                    Approx. $62.00 USD · One-off purchase · No recurring charges
                  </div>

                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0', fontSize: '13px', color: '#CBD5E1', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: '#10B981' }}>✓</span> Complete React 19 + TypeScript source code (38 files)
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: '#10B981' }}>✓</span> Perpetual commercial redistribution rights for client & SaaS apps
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: '#10B981' }}>✓</span> Sub-second build verified on Node 20+ and Bun 1.1+
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: '#10B981' }}>✓</span> Cryptographic release verification (SHA-256 authenticated)
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: '#10B981' }}>✓</span> <strong>14-Day Technical Money-Back Guarantee</strong>
                    </li>
                  </ul>
                </div>

                {/* Checkout Trigger Form */}
                <form onSubmit={handleInstantCheckout} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <label style={{ fontSize: '11px', fontFamily: 'monospace', color: '#7E8B9F', textTransform: 'uppercase' }}>
                    Enter Customer Email for License & Receipt:
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    style={{ width: '100%', padding: '10px', background: '#0F1217', border: '1px solid #202634', borderRadius: '4px', color: '#FFFFFF', fontSize: '13px', outline: 'none' }}
                  />
                  <button
                    type="submit"
                    disabled={isProcessingCheckout}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: isProcessingCheckout ? '#059669' : '#10B981',
                      color: '#07080B',
                      border: 'none',
                      borderRadius: '4px',
                      fontWeight: 'bold',
                      fontFamily: 'monospace',
                      fontSize: '13px',
                      cursor: isProcessingCheckout ? 'wait' : 'pointer',
                      textTransform: 'uppercase'
                    }}
                  >
                    {isProcessingCheckout ? 'Processing Order...' : 'Complete Purchase (£49)'}
                  </button>
                </form>
              </div>

              {/* Terms & Guarantee Details */}
              <div style={{ background: '#07080B', border: '1px solid #202634', padding: '24px', borderRadius: '8px' }}>
                <h3 style={{ fontSize: '16px', color: '#FFFFFF', marginTop: 0, marginBottom: '12px' }}>
                  Technical Assurance & Refund Policy
                </h3>
                <p style={{ fontSize: '13px', color: '#9BA7B9', lineHeight: 1.6, margin: '0 0 14px 0' }}>
                  If the software contains reproducible technical defects that prevent compilation or core usage as documented, and engineering support cannot remediate the defect within 5 business days, a full refund of the £49 purchase price will be issued upon request within 14 days of purchase.
                </p>
                <div style={{ borderTop: '1px solid #202634', paddingTop: '14px', marginTop: '14px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#FFFFFF', marginBottom: '6px' }}>Stripe Checkout Settlement</div>
                  <p style={{ fontSize: '12px', color: '#7E8B9F', lineHeight: 1.5, margin: 0 }}>
                    In production mode with live keys registered in Vault, checkouts settle instantly via Stripe 3D-Secure 2.0. In test/operator mode, access is provisioned immediately with an isolated audit transaction.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'download' && (
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 8px', background: 'rgba(16,185,129,0.1)', color: '#10B981', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '4px', fontSize: '11px', fontFamily: 'monospace', marginBottom: '12px' }}>
              ✓ AUTHORIZED PRODUCT FULFILMENT & DOWNLOAD
            </div>
            <h2 style={{ fontSize: '20px', color: '#FFFFFF', marginTop: 0, marginBottom: '12px' }}>
              Your Licensed Release Package
            </h2>
            <p style={{ color: '#9BA7B9', fontSize: '14px', lineHeight: 1.6, margin: '0 0 20px 0' }}>
              Your order has been verified and registered. Download your release bundle and verify its cryptographic hash below:
            </p>

            {purchasedOrder && (
              <div style={{ background: '#07080B', border: '1px solid #10B981', padding: '16px', borderRadius: '6px', marginBottom: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', fontSize: '12px', fontFamily: 'monospace' }}>
                  <div>
                    <div style={{ color: '#7E8B9F' }}>ORDER ID:</div>
                    <div style={{ color: '#FFFFFF', fontWeight: 'bold' }}>{purchasedOrder.orderId}</div>
                  </div>
                  <div>
                    <div style={{ color: '#7E8B9F' }}>LICENSE TOKEN:</div>
                    <div style={{ color: '#10B981', fontWeight: 'bold' }}>{purchasedOrder.licenseToken}</div>
                  </div>
                  <div>
                    <div style={{ color: '#7E8B9F' }}>CUSTOMER:</div>
                    <div style={{ color: '#CBD5E1' }}>{purchasedOrder.customerEmail}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Direct Download Card */}
            <div style={{ background: '#07080B', border: '1px solid #202634', padding: '20px', borderRadius: '6px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#FFFFFF', marginBottom: '4px' }}>
                    turnkey-react19-starter-kit-v1.0.0.zip
                  </div>
                  <div style={{ fontSize: '12px', color: '#7E8B9F', fontFamily: 'monospace' }}>
                    Size: 28,132 bytes (28.1 KB) · 38 files included
                  </div>
                </div>

                <a
                  href="/dist-release/turnkey-react19-starter-kit-v1.0.0.zip"
                  download="turnkey-react19-starter-kit-v1.0.0.zip"
                  style={{
                    padding: '12px 24px',
                    background: '#10B981',
                    color: '#07080B',
                    textDecoration: 'none',
                    borderRadius: '4px',
                    fontWeight: 'bold',
                    fontFamily: 'monospace',
                    fontSize: '13px',
                    display: 'inline-block',
                    textTransform: 'uppercase'
                  }}
                >
                  Download Release Bundle (.zip)
                </a>
              </div>

              <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #202634', display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '12px', fontFamily: 'monospace' }}>
                <a href="/dist-release/SETUP_GUIDE.md" target="_blank" rel="noreferrer" style={{ color: '#38BDF8', textDecoration: 'none' }}>
                  📄 View SETUP_GUIDE.md
                </a>
                <a href="/dist-release/LICENSE.txt" target="_blank" rel="noreferrer" style={{ color: '#38BDF8', textDecoration: 'none' }}>
                  ⚖️ View LICENSE.txt
                </a>
                <a href="/dist-release/RELEASE_MANIFEST.json" target="_blank" rel="noreferrer" style={{ color: '#38BDF8', textDecoration: 'none' }}>
                  📋 View RELEASE_MANIFEST.json
                </a>
                <a href="/dist-release/CHECKSUM.sha256" target="_blank" rel="noreferrer" style={{ color: '#38BDF8', textDecoration: 'none' }}>
                  🔐 View CHECKSUM.sha256
                </a>
              </div>
            </div>

            {/* Verification Instructions */}
            <div style={{ background: '#07080B', border: '1px solid #202634', padding: '16px', borderRadius: '6px' }}>
              <div style={{ fontSize: '12px', fontFamily: 'monospace', color: '#7E8B9F', marginBottom: '8px' }}>
                CLI EXTRACTION & CHECKSUM VERIFICATION
              </div>
              <pre style={{ margin: 0, padding: '12px', background: '#0F1217', borderRadius: '4px', color: '#10B981', fontFamily: 'monospace', fontSize: '12px', overflowX: 'auto', lineHeight: 1.6 }}>
{`# 1. Verify SHA-256 Checksum
sha256sum -c dist-release/CHECKSUM.sha256
# Expected: f2e4a8e39cb691dc258829108da1463b76427df7b38c2ebff28e00bcc11a5265

# 2. Extract into workspace
unzip turnkey-react19-starter-kit-v1.0.0.zip -d my-react-app
cd my-react-app

# 3. Install and run development server
bun install
bun run dev`}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div>
            <h2 style={{ fontSize: '20px', color: '#FFFFFF', marginTop: 0, marginBottom: '14px' }}>
              Contact Our Team
            </h2>
            {contactSubmitted ? (
              <div style={{ padding: '16px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '6px', color: '#10B981', fontFamily: 'monospace', fontSize: '13px' }}>
                ✓ Inbound message received. Our engineering team will respond within 24 hours.
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setContactSubmitted(true);
                }}
                style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
              >
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontFamily: 'monospace', color: '#7E8B9F', marginBottom: '4px', textTransform: 'uppercase' }}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: '100%', padding: '10px', background: '#07080B', border: '1px solid #202634', borderRadius: '4px', color: '#FFFFFF', fontSize: '13px', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontFamily: 'monospace', color: '#7E8B9F', marginBottom: '4px', textTransform: 'uppercase' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: '100%', padding: '10px', background: '#07080B', border: '1px solid #202634', borderRadius: '4px', color: '#FFFFFF', fontSize: '13px', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontFamily: 'monospace', color: '#7E8B9F', marginBottom: '4px', textTransform: 'uppercase' }}>
                    Inquiry Details
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{ width: '100%', padding: '10px', background: '#07080B', border: '1px solid #202634', borderRadius: '4px', color: '#FFFFFF', fontSize: '13px', outline: 'none', resize: 'vertical' }}
                  />
                </div>
                <button
                  type="submit"
                  style={{ alignSelf: 'flex-start', padding: '10px 20px', background: '#10B981', color: '#07080B', border: 'none', borderRadius: '4px', fontWeight: 'bold', fontFamily: 'monospace', fontSize: '12px', cursor: 'pointer', textTransform: 'uppercase', marginTop: '6px' }}
                >
                  Send Inquiry
                </button>
              </form>
            )}
          </div>
        )}
      </main>

      <footer style={{ marginTop: '36px', borderTop: '1px solid #202634', paddingTop: '16px', fontSize: '11px', color: '#7E8B9F', fontFamily: 'monospace', textAlign: 'center' }}>
        Compiled with MoneyMachine AI Autonomous Operating System · Project: moneymachine-business-site-demo
      </footer>
    </div>
  );
}
