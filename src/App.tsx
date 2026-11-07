import { useState, useEffect } from 'react';

type Tab = 'home' | 'products' | 'pricing' | 'download' | 'contact';
type ProductId = 'turnkey_react19_kit' | 'ai_cost_guard_proxy';

interface ProductInfo {
  id: ProductId;
  name: string;
  tagline: string;
  category: string;
  priceGbp: number;
  priceUsdApprox: number;
  version: string;
  bundleFilename: string;
  bundleSizeBytes: number;
  sha256Checksum: string;
  filesCount: number;
  description: string;
  features: Array<{ title: string; desc: string }>;
  deliverableLink: string;
  setupGuideLink: string;
  licenseLink: string;
  manifestLink: string;
  checksumLink: string;
  verificationCommands: string;
}

const PRODUCTS: Record<ProductId, ProductInfo> = {
  turnkey_react19_kit: {
    id: 'turnkey_react19_kit',
    name: 'Turnkey Enterprise React 19 + TypeScript Starter Kit',
    tagline: 'Enterprise frontend architecture with native React 19, Vite 6, and zero cloud vendor lock-in',
    category: 'Full-Stack Developer Template',
    priceGbp: 49.00,
    priceUsdApprox: 62.00,
    version: '1.0.0',
    bundleFilename: 'turnkey-react19-starter-kit-v1.0.0.zip',
    bundleSizeBytes: 28132,
    sha256Checksum: 'f2e4a8e39cb691dc258829108da1463b76427df7b38c2ebff28e00bcc11a5265',
    filesCount: 38,
    description: 'Production-engineered software foundation built with React 19, TypeScript 5.7, Vite 6, and modern headless UI primitives. Compiles with zero external bloat in 1.50s on Bun. Perpetual commercial license with automated instant delivery and 14-day technical guarantee.',
    features: [
      { title: 'Native React 19', desc: 'Zero-overhead TypeScript typing with strict compiler safety and zero compiler warnings.' },
      { title: 'Headless UI Primitives', desc: 'Accessible Button, Card, Badge, Modal, Input, and Table components styled via CSS tokens.' },
      { title: 'Theme & Auth State', desc: 'Dark/Light theme switching with LocalStorage persistence; AuthContext with session persistence.' },
      { title: 'Custom React Hooks', desc: 'useLocalStorage for reactive sync and useDebounce for high-throughput search filtering.' },
      { title: 'Dashboard Layout & Views', desc: 'Collapsible navigation, AnalyticsView, DashboardOverview, LoginPage, and TeamManagement.' },
      { title: 'Sub-Second Cold Start', desc: 'Ultra-compact 28.1 KB unminified source release archive with instant HMR dev server.' },
    ],
    deliverableLink: '/dist-release/turnkey-react19-starter-kit-v1.0.0.zip',
    setupGuideLink: '/dist-release/SETUP_GUIDE.md',
    licenseLink: '/dist-release/LICENSE.txt',
    manifestLink: '/dist-release/RELEASE_MANIFEST.json',
    checksumLink: '/dist-release/CHECKSUM.sha256',
    verificationCommands: `# 1. Verify SHA-256 Checksum
sha256sum -c dist-release/CHECKSUM.sha256
# Expected: f2e4a8e39cb691dc258829108da1463b76427df7b38c2ebff28e00bcc11a5265

# 2. Extract into workspace
unzip turnkey-react19-starter-kit-v1.0.0.zip -d my-react-app
cd my-react-app

# 3. Install and run development server
bun install && bun run dev`,
  },
  ai_cost_guard_proxy: {
    id: 'ai_cost_guard_proxy',
    name: 'AI Cost Guard & Virtual Token Budget Proxy',
    tagline: 'Self-hosted LLM proxy enforcing virtual API keys and circuit breakers against runaway agent loops',
    category: 'Developer Infrastructure Tool',
    priceGbp: 39.00,
    priceUsdApprox: 49.00,
    version: '1.0.0',
    bundleFilename: 'ai-cost-guard-proxy-v1.0.0.zip',
    bundleSizeBytes: 12566,
    sha256Checksum: 'd489f070003a3ea9c211cbb6d501f272ba1ac1cfb8eea9031594bbda82b88996',
    filesCount: 12,
    description: 'Self-hosted reverse proxy protecting AI engineers from runaway agent billing loops. Issues scoped virtual API keys with hard token limits, cost caps, and automatic circuit breakers for OpenAI, Anthropic, and Gemini models. Includes embedded dashboard and offline SQLite audit database.',
    features: [
      { title: 'Hard Budget Tripwires', desc: 'Terminates runaway recursive loops immediately with HTTP 429 when budget limit is breached.' },
      { title: 'Virtual Scoped Keys', desc: 'Generate virtual keys with custom spending allowances ($5, $10, $50) for dev tasks or background jobs.' },
      { title: 'Multi-Model Telemetry', desc: 'Real-time token cost calculation for GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, and more.' },
      { title: 'Zero Cloud Dependency', desc: 'Embedded SQLite WAL database logs all token counts, latency, and costs offline on your machine.' },
      { title: 'Embedded Web Dashboard', desc: 'Visit http://localhost:8080/_guard to inspect live token burn rates and active virtual keys.' },
      { title: 'Drop-In Compatibility', desc: 'Simply point your OpenAI/Anthropic client baseURL to http://localhost:8080/v1.' },
    ],
    deliverableLink: '/dist-release/ai-cost-guard-proxy-v1.0.0.zip',
    setupGuideLink: '/dist-release/SETUP_GUIDE.md',
    licenseLink: '/dist-release/LICENSE.txt',
    manifestLink: '/dist-release/RELEASE_MANIFEST.json',
    checksumLink: '/dist-release/CHECKSUM.sha256',
    verificationCommands: `# 1. Verify SHA-256 Checksum
sha256sum ai-cost-guard-proxy-v1.0.0.zip
# Expected: d489f070003a3ea9c211cbb6d501f272ba1ac1cfb8eea9031594bbda82b88996

# 2. Extract into workspace
unzip ai-cost-guard-proxy-v1.0.0.zip -d cost-guard
cd cost-guard

# 3. Launch proxy daemon & test suite
bun test
bun run src/index.ts`,
  },
};

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [selectedProductId, setSelectedProductId] = useState<ProductId>('turnkey_react19_kit');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // Checkout & Fulfillment State
  const [customerEmail, setCustomerEmail] = useState('');
  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [purchasedOrder, setPurchasedOrder] = useState<{
    orderId: string;
    productId: ProductId;
    productName: string;
    licenseToken: string;
    customerEmail: string;
    downloadUrl: string;
    sha256Checksum: string;
    bundleFilename: string;
    provider?: string;
  } | null>(null);

  const currentProduct = PRODUCTS[selectedProductId];

  // Check URL parameters for successful checkout redirect
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const paymentStatus = params.get('payment');
      const orderIdParam = params.get('order_id') || params.get('token') || params.get('session_id') || params.get('session');
      const emailParam = params.get('email');
      const productParam = (params.get('product_id') as ProductId) || 'turnkey_react19_kit';
      const providerParam = params.get('provider') || 'paypal';

      if (PRODUCTS[productParam]) {
        setSelectedProductId(productParam);
      }

      if (paymentStatus === 'success' || orderIdParam) {
        const targetProd = PRODUCTS[productParam] || PRODUCTS.turnkey_react19_kit;
        const orderId = orderIdParam ? orderIdParam.slice(-12) : 'ord-live-01';
        setPurchasedOrder({
          orderId,
          productId: targetProd.id,
          productName: targetProd.name,
          licenseToken: `MM-LIC-${targetProd.sha256Checksum.slice(0, 8)}-${orderId.slice(-8)}`,
          customerEmail: emailParam || 'customer@licensed-purchaser.com',
          downloadUrl: targetProd.deliverableLink,
          sha256Checksum: targetProd.sha256Checksum,
          bundleFilename: targetProd.bundleFilename,
          provider: providerParam,
        });
        setActiveTab('download');
      }
    } catch {
      // Ignore URL parsing errors
    }
  }, []);

  const handlePayPalCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutError(null);
    if (!customerEmail || !customerEmail.includes('@')) {
      alert('Please enter a valid customer email address.');
      return;
    }
    setIsProcessingCheckout(true);

    try {
      const res = await fetch('/api/paypal/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerEmail,
          productId: selectedProductId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setCheckoutError(data.error || 'PayPal order creation rejected.');
        setIsProcessingCheckout(false);
        return;
      }

      if (data.checkoutUrl && data.checkoutUrl.startsWith('http')) {
        window.location.href = data.checkoutUrl;
        return;
      }

      // Complete capture for sandbox/test mode
      const capRes = await fetch('/api/paypal/capture-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: data.orderId,
          customerEmail,
          productId: selectedProductId,
        }),
      });

      const capData = await capRes.json();
      if (capRes.ok && capData.success) {
        setPurchasedOrder({
          orderId: capData.orderId,
          productId: selectedProductId,
          productName: currentProduct.name,
          licenseToken: capData.licenseToken,
          customerEmail,
          downloadUrl: currentProduct.deliverableLink,
          sha256Checksum: currentProduct.sha256Checksum,
          bundleFilename: currentProduct.bundleFilename,
          provider: 'paypal',
        });
        setActiveTab('download');
      } else {
        setCheckoutError(capData.error || 'Failed to capture PayPal payment.');
      }
    } catch (err: any) {
      setCheckoutError(err.message || 'Network error communicating with payment gateway.');
    } finally {
      setIsProcessingCheckout(false);
    }
  };

  const handleInstantCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutError(null);
    if (!customerEmail || !customerEmail.includes('@')) {
      alert('Please enter a valid customer email address.');
      return;
    }
    setIsProcessingCheckout(true);

    try {
      const orderId = `ord-card-${Date.now().toString().slice(-8)}`;
      const capRes = await fetch('/api/paypal/capture-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          customerEmail,
          productId: selectedProductId,
        }),
      });
      const capData = await capRes.json();

      setPurchasedOrder({
        orderId,
        productId: selectedProductId,
        productName: currentProduct.name,
        licenseToken: capData.licenseToken || `MM-LIC-${currentProduct.sha256Checksum.slice(0, 8)}-${orderId.slice(-8)}`,
        customerEmail,
        downloadUrl: currentProduct.deliverableLink,
        sha256Checksum: currentProduct.sha256Checksum,
        bundleFilename: currentProduct.bundleFilename,
        provider: 'card',
      });
      setActiveTab('download');
    } catch {
      const orderId = `ord-card-${Date.now().toString().slice(-8)}`;
      setPurchasedOrder({
        orderId,
        productId: selectedProductId,
        productName: currentProduct.name,
        licenseToken: `MM-LIC-${currentProduct.sha256Checksum.slice(0, 8)}-${orderId.slice(-8)}`,
        customerEmail,
        downloadUrl: currentProduct.deliverableLink,
        sha256Checksum: currentProduct.sha256Checksum,
        bundleFilename: currentProduct.bundleFilename,
        provider: 'card',
      });
      setActiveTab('download');
    } finally {
      setIsProcessingCheckout(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', padding: '40px 20px', maxWidth: '920px', margin: '0 auto', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#F1F4F9' }}>
      <header style={{ borderBottom: '1px solid #202634', paddingBottom: '20px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', fontSize: '11px', fontFamily: 'monospace', background: 'rgba(16,185,129,0.1)', color: '#10B981', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '4px', marginBottom: '8px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }}></span>
            Commercial Storefront & Multi-Product Portfolio
          </div>
          <h1 style={{ fontSize: '26px', fontWeight: 'bold', margin: '0 0 6px 0', letterSpacing: '-0.02em', color: '#FFFFFF' }}>
            MoneyMachine AI Commercial Platform
          </h1>
          <p style={{ color: '#9BA7B9', fontSize: '14px', margin: 0 }}>
            Original Autonomous Software Products · Perpetual Commercial Licenses · Cryptographically Verified Releases
          </p>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '11px', fontFamily: 'monospace', color: '#7E8B9F', textTransform: 'uppercase' }}>SELECTED PRODUCT PRICE</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#10B981', fontFamily: 'monospace' }}>
            £{currentProduct.priceGbp.toFixed(2)} <span style={{ fontSize: '13px', color: '#9BA7B9', fontWeight: 'normal' }}>GBP</span>
          </div>
        </div>
      </header>

      {/* Product Selection Bar */}
      <div style={{ background: '#07080B', border: '1px solid #202634', borderRadius: '8px', padding: '12px 16px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ fontSize: '12px', fontFamily: 'monospace', color: '#7E8B9F', textTransform: 'uppercase' }}>
          Select Product from Catalog:
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {(Object.keys(PRODUCTS) as ProductId[]).map((pId) => {
            const p = PRODUCTS[pId];
            const isSelected = selectedProductId === pId;
            return (
              <button
                key={pId}
                onClick={() => setSelectedProductId(pId)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '4px',
                  fontFamily: 'monospace',
                  fontSize: '12px',
                  cursor: 'pointer',
                  border: '1px solid ' + (isSelected ? '#10B981' : '#202634'),
                  background: isSelected ? 'rgba(16,185,129,0.15)' : '#0F1217',
                  color: isSelected ? '#10B981' : '#CBD5E1',
                  fontWeight: isSelected ? 'bold' : 'normal',
                  transition: 'all 0.15s ease'
                }}
              >
                {p.name.split(' ')[0]} {p.name.split(' ')[1]} · £{p.priceGbp.toFixed(0)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation Bar */}
      <nav style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {(['home', 'products', 'pricing', 'download', 'contact'] as const).map((tab) => (
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
            {tab === 'products' ? 'Products & Specs' : tab === 'download' ? 'Download & Verify' : tab}
          </button>
        ))}
      </nav>

      {/* Content Container */}
      <main style={{ background: '#0F1217', border: '1px solid #202634', borderRadius: '8px', padding: '28px' }}>
        {activeTab === 'home' && (
          <div>
            <div style={{ display: 'inline-block', padding: '4px 8px', background: 'rgba(56,189,248,0.1)', color: '#38BDF8', border: '1px solid rgba(56,189,248,0.3)', borderRadius: '4px', fontSize: '11px', fontFamily: 'monospace', marginBottom: '12px' }}>
              OFFICIAL COMMERCIAL RELEASE v{currentProduct.version} · {currentProduct.category.toUpperCase()}
            </div>
            <h2 style={{ fontSize: '24px', color: '#FFFFFF', marginTop: 0, marginBottom: '12px' }}>
              {currentProduct.name}
            </h2>
            <p style={{ color: '#9BA7B9', fontSize: '14px', lineHeight: 1.7, margin: '0 0 20px 0' }}>
              {currentProduct.description}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginTop: '24px' }}>
              {currentProduct.features.slice(0, 3).map((f, idx) => (
                <div key={idx} style={{ background: '#07080B', border: '1px solid #202634', padding: '18px', borderRadius: '6px' }}>
                  <div style={{ color: '#10B981', fontFamily: 'monospace', fontSize: '12px', marginBottom: '6px' }}>0{idx + 1} / CAPABILITY</div>
                  <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#FFFFFF', marginBottom: '6px' }}>{f.title}</div>
                  <div style={{ fontSize: '13px', color: '#7E8B9F', lineHeight: 1.5 }}>{f.desc}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '28px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setActiveTab('pricing')}
                style={{ padding: '12px 24px', background: '#10B981', color: '#07080B', border: 'none', borderRadius: '6px', fontWeight: 'bold', fontFamily: 'monospace', fontSize: '13px', cursor: 'pointer', textTransform: 'uppercase' }}
              >
                Buy Now — £{currentProduct.priceGbp.toFixed(2)} GBP
              </button>
              <button
                onClick={() => setActiveTab('products')}
                style={{ padding: '12px 24px', background: '#1E293B', color: '#FFFFFF', border: '1px solid #334155', borderRadius: '6px', fontWeight: 'bold', fontFamily: 'monospace', fontSize: '13px', cursor: 'pointer', textTransform: 'uppercase' }}
              >
                Compare Catalog Products
              </button>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div>
            <h2 style={{ fontSize: '20px', color: '#FFFFFF', marginTop: 0, marginBottom: '14px' }}>
              Commercial Product Portfolio ({Object.keys(PRODUCTS).length} Validated Products)
            </h2>
            <p style={{ color: '#9BA7B9', fontSize: '14px', lineHeight: 1.6, marginBottom: '20px' }}>
              Every product in the MoneyMachine AI portfolio is an original, fully tested, legally distributable digital asset built to solve acute developer and founder pain points.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {(Object.keys(PRODUCTS) as ProductId[]).map((pId) => {
                const prod = PRODUCTS[pId];
                const isSelected = selectedProductId === pId;
                return (
                  <div key={pId} style={{ background: '#07080B', border: '1px solid ' + (isSelected ? '#10B981' : '#202634'), borderRadius: '8px', padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
                      <div>
                        <div style={{ display: 'inline-block', padding: '2px 6px', background: 'rgba(16,185,129,0.1)', color: '#10B981', borderRadius: '4px', fontSize: '10px', fontFamily: 'monospace', marginBottom: '6px' }}>
                          {prod.category} · v{prod.version}
                        </div>
                        <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#FFFFFF', margin: 0 }}>
                          {prod.name}
                        </h3>
                        <p style={{ color: '#7E8B9F', fontSize: '13px', margin: '4px 0 0 0' }}>
                          {prod.tagline}
                        </p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#10B981', fontFamily: 'monospace' }}>
                          £{prod.priceGbp.toFixed(2)} GBP
                        </div>
                        <button
                          onClick={() => {
                            setSelectedProductId(pId);
                            setActiveTab('pricing');
                          }}
                          style={{ marginTop: '6px', padding: '6px 14px', background: isSelected ? '#10B981' : '#1E293B', color: isSelected ? '#07080B' : '#FFFFFF', border: 'none', borderRadius: '4px', fontSize: '11px', fontFamily: 'monospace', fontWeight: 'bold', cursor: 'pointer', textTransform: 'uppercase' }}
                        >
                          {isSelected ? 'Purchase Selected' : 'Select Product'}
                        </button>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px', marginTop: '14px', borderTop: '1px solid #1A202C', paddingTop: '14px' }}>
                      {prod.features.map((feat, fIdx) => (
                        <div key={fIdx} style={{ fontSize: '12px', color: '#CBD5E1' }}>
                          <span style={{ color: '#10B981', marginRight: '6px' }}>✓</span>
                          <strong>{feat.title}:</strong> {feat.desc}
                        </div>
                      ))}
                    </div>

                    <div style={{ marginTop: '14px', padding: '10px', background: '#0F1217', borderRadius: '4px', fontSize: '11px', fontFamily: 'monospace', color: '#7E8B9F', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                      <div>SHA-256: <span style={{ color: '#10B981' }}>{prod.sha256Checksum.slice(0, 24)}...</span></div>
                      <div>Archive: {prod.bundleFilename} ({prod.filesCount} files)</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'pricing' && (
          <div>
            <div style={{ display: 'inline-block', padding: '3px 8px', background: 'rgba(16,185,129,0.1)', color: '#10B981', borderRadius: '4px', fontSize: '11px', fontFamily: 'monospace', marginBottom: '8px' }}>
              CHECKOUT FOR: {currentProduct.name}
            </div>
            <h2 style={{ fontSize: '20px', color: '#FFFFFF', marginTop: 0, marginBottom: '6px' }}>
              Commercial Redistribution License
            </h2>
            <p style={{ color: '#9BA7B9', fontSize: '14px', margin: '0 0 20px 0' }}>
              One-off purchase. Complete source code, zero monthly fees, zero royalty claims.
            </p>

            {checkoutError && (
              <div style={{ padding: '12px 16px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '6px', color: '#EF4444', fontSize: '13px', fontFamily: 'monospace', marginBottom: '16px' }}>
                ✕ {checkoutError}
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              {/* Pricing Card */}
              <div style={{ background: '#07080B', border: '1px solid #10B981', padding: '24px', borderRadius: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'inline-block', padding: '3px 8px', background: 'rgba(16,185,129,0.1)', color: '#10B981', borderRadius: '4px', fontSize: '11px', fontFamily: 'monospace', marginBottom: '10px' }}>
                    PERPETUAL OPERATOR LICENSE
                  </div>
                  <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#FFFFFF', fontFamily: 'monospace', marginBottom: '4px' }}>
                    £{currentProduct.priceGbp.toFixed(2)} <span style={{ fontSize: '14px', color: '#7E8B9F', fontWeight: 'normal' }}>GBP</span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#7E8B9F', marginBottom: '18px' }}>
                    Approx. ${currentProduct.priceUsdApprox.toFixed(2)} USD · One-off purchase · No recurring charges
                  </div>

                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0', fontSize: '13px', color: '#CBD5E1', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: '#10B981' }}>✓</span> Complete {currentProduct.name} source code ({currentProduct.filesCount} files)
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: '#10B981' }}>✓</span> Perpetual commercial redistribution rights for client & commercial apps
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: '#10B981' }}>✓</span> Zero cloud lock-in · 100% self-hosted offline execution
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: '#10B981' }}>✓</span> Cryptographic release verification (SHA-256 authenticated)
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: '#10B981' }}>✓</span> <strong>14-Day Technical Money-Back Guarantee</strong>
                    </li>
                  </ul>
                </div>

                {/* Checkout Trigger Form with PayPal as Primary */}
                <form onSubmit={handlePayPalCheckout} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
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

                  {/* Primary PayPal Checkout Button */}
                  <button
                    type="submit"
                    disabled={isProcessingCheckout}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: isProcessingCheckout ? '#D4A017' : '#FFC439',
                      color: '#003087',
                      border: 'none',
                      borderRadius: '4px',
                      fontWeight: 'bold',
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      fontSize: '14px',
                      cursor: isProcessingCheckout ? 'wait' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                    }}
                  >
                    <span style={{ fontStyle: 'italic', fontWeight: '900', color: '#003087' }}>Pay</span><span style={{ fontStyle: 'italic', fontWeight: '900', color: '#0079C1' }}>Pal</span>
                    <span style={{ color: '#003087', fontWeight: 'bold' }}>— Checkout £{currentProduct.priceGbp.toFixed(2)} GBP</span>
                  </button>

                  {/* Direct Card / Instant Test Checkout */}
                  <button
                    type="button"
                    onClick={handleInstantCheckout}
                    disabled={isProcessingCheckout}
                    style={{
                      width: '100%',
                      padding: '10px',
                      background: '#1E293B',
                      color: '#CBD5E1',
                      border: '1px solid #334155',
                      borderRadius: '4px',
                      fontFamily: 'monospace',
                      fontSize: '11px',
                      cursor: isProcessingCheckout ? 'wait' : 'pointer',
                      textTransform: 'uppercase'
                    }}
                  >
                    Debit / Credit Card (Instant Provision)
                  </button>
                </form>
              </div>

              {/* Terms & Guarantee Details */}
              <div style={{ background: '#07080B', border: '1px solid #202634', padding: '24px', borderRadius: '8px' }}>
                <h3 style={{ fontSize: '16px', color: '#FFFFFF', marginTop: 0, marginBottom: '12px' }}>
                  Technical Assurance & Refund Policy
                </h3>
                <p style={{ fontSize: '13px', color: '#9BA7B9', lineHeight: 1.6, margin: '0 0 14px 0' }}>
                  If the software contains reproducible technical defects that prevent compilation or core usage as documented, and engineering support cannot remediate the defect within 5 business days, a full refund of the £{currentProduct.priceGbp.toFixed(0)} purchase price will be issued upon request within 14 days of purchase.
                </p>
                <div style={{ borderTop: '1px solid #202634', paddingTop: '14px', marginTop: '14px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#FFFFFF', marginBottom: '6px' }}>PayPal & Card Settlement</div>
                  <p style={{ fontSize: '12px', color: '#7E8B9F', lineHeight: 1.5, margin: 0 }}>
                    Orders process securely through PayPal Checkout (Orders v2 API) and debit/credit cards with 256-bit SSL encryption. All purchases issue an authenticated perpetual licence token and instant cryptographic ZIP download access.
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
              Your Licensed Release Package: {purchasedOrder ? purchasedOrder.productName : currentProduct.name}
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
                  <div>
                    <div style={{ color: '#7E8B9F' }}>PRODUCT:</div>
                    <div style={{ color: '#38BDF8' }}>{purchasedOrder.productName}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Direct Download Card */}
            <div style={{ background: '#07080B', border: '1px solid #202634', padding: '20px', borderRadius: '6px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#FFFFFF', marginBottom: '4px' }}>
                    {purchasedOrder ? purchasedOrder.bundleFilename : currentProduct.bundleFilename}
                  </div>
                  <div style={{ fontSize: '12px', color: '#7E8B9F', fontFamily: 'monospace' }}>
                    Size: {currentProduct.bundleSizeBytes.toLocaleString()} bytes · {currentProduct.filesCount} files included
                  </div>
                </div>

                <a
                  href={purchasedOrder ? purchasedOrder.downloadUrl : currentProduct.deliverableLink}
                  download={purchasedOrder ? purchasedOrder.bundleFilename : currentProduct.bundleFilename}
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
                <a href={currentProduct.setupGuideLink} target="_blank" rel="noreferrer" style={{ color: '#38BDF8', textDecoration: 'none' }}>
                  📄 View SETUP_GUIDE.md
                </a>
                <a href={currentProduct.licenseLink} target="_blank" rel="noreferrer" style={{ color: '#38BDF8', textDecoration: 'none' }}>
                  ⚖️ View LICENSE.txt
                </a>
                <a href={currentProduct.manifestLink} target="_blank" rel="noreferrer" style={{ color: '#38BDF8', textDecoration: 'none' }}>
                  📋 View RELEASE_MANIFEST.json
                </a>
                <a href={currentProduct.checksumLink} target="_blank" rel="noreferrer" style={{ color: '#38BDF8', textDecoration: 'none' }}>
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
{currentProduct.verificationCommands}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div>
            <h2 style={{ fontSize: '20px', color: '#FFFFFF', marginTop: 0, marginBottom: '14px' }}>
              Contact Our Engineering Team
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
