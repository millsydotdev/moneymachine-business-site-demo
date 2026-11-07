import { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'services' | 'pricing' | 'contact'>('home');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  return (
    <div style={{ minHeight: '100vh', padding: '40px 20px', maxWidth: '840px', margin: '0 auto', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#F1F4F9' }}>
      <header style={{ borderBottom: '1px solid #202634', paddingBottom: '20px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'inline-block', padding: '4px 10px', fontSize: '11px', fontFamily: 'monospace', background: 'rgba(16,185,129,0.1)', color: '#10B981', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '4px', marginBottom: '8px' }}>
            Commercial Web Platform
          </div>
          <h1 style={{ fontSize: '26px', fontWeight: 'bold', margin: '0 0 6px 0', letterSpacing: '-0.02em', color: '#FFFFFF' }}>
            MoneyMachine AI Commercial Platform
          </h1>
          <p style={{ color: '#9BA7B9', fontSize: '14px', margin: 0 }}>
            Autonomous React 19 + TypeScript business website featuring Homepage, Navigation, Services, Pricing, and Contact sections.
          </p>
        </div>
      </header>

      {/* Navigation Bar */}
      <nav style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        {(['home', 'services', 'pricing', 'contact'] as const).map((tab) => (
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
            {tab}
          </button>
        ))}
      </nav>

      {/* Content Container */}
      <main style={{ background: '#0F1217', border: '1px solid #202634', borderRadius: '8px', padding: '28px' }}>
        {activeTab === 'home' && (
          <div>
            <h2 style={{ fontSize: '20px', color: '#FFFFFF', marginTop: 0, marginBottom: '12px' }}>
              Welcome to MoneyMachine AI Commercial Platform
            </h2>
            <p style={{ color: '#9BA7B9', fontSize: '14px', lineHeight: 1.7, margin: '0 0 20px 0' }}>
              Turnkey autonomous commercial web platform engineered on Linux via MoneyMachine AI. Zero external dependencies, pure TypeScript safety, and sub-second cold starts.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginTop: '20px' }}>
              <div style={{ background: '#07080B', border: '1px solid #202634', padding: '16px', borderRadius: '6px' }}>
                <div style={{ color: '#10B981', fontFamily: 'monospace', fontSize: '12px', marginBottom: '6px' }}>01 / ARCHITECTURE</div>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#FFFFFF', marginBottom: '4px' }}>Native React 19</div>
                <div style={{ fontSize: '12px', color: '#7E8B9F' }}>Zero-overhead TypeScript typing with strict compiler safety.</div>
              </div>
              <div style={{ background: '#07080B', border: '1px solid #202634', padding: '16px', borderRadius: '6px' }}>
                <div style={{ color: '#10B981', fontFamily: 'monospace', fontSize: '12px', marginBottom: '6px' }}>02 / VELOCITY</div>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#FFFFFF', marginBottom: '4px' }}>Vite Production Bundler</div>
                <div style={{ fontSize: '12px', color: '#7E8B9F' }}>Sub-second cold starts and optimized production chunks.</div>
              </div>
              <div style={{ background: '#07080B', border: '1px solid #202634', padding: '16px', borderRadius: '6px' }}>
                <div style={{ color: '#10B981', fontFamily: 'monospace', fontSize: '12px', marginBottom: '6px' }}>03 / AUTONOMY</div>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#FFFFFF', marginBottom: '4px' }}>Cloud & Edge Ready</div>
                <div style={{ fontSize: '12px', color: '#7E8B9F' }}>Deployable instantly to Vercel, Cloudflare, or local runtime.</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'services' && (
          <div>
            <h2 style={{ fontSize: '20px', color: '#FFFFFF', marginTop: 0, marginBottom: '16px' }}>
              Our Professional Services
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ padding: '16px', background: '#07080B', border: '1px solid #202634', borderRadius: '6px' }}>
                <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#FFFFFF' }}>Custom Solution Engineering</div>
                <p style={{ fontSize: '13px', color: '#9BA7B9', margin: '6px 0 0 0' }}>
                  Tailored web applications designed from scratch using modern headless APIs, edge data routing, and verified local performance benchmarks.
                </p>
              </div>
              <div style={{ padding: '16px', background: '#07080B', border: '1px solid #202634', borderRadius: '6px' }}>
                <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#FFFFFF' }}>Architecture Auditing & Security Hardening</div>
                <p style={{ fontSize: '13px', color: '#9BA7B9', margin: '6px 0 0 0' }}>
                  End-to-end vulnerability inspection, secrets isolation via encrypted SQLite vaults, and static analysis verification.
                </p>
              </div>
              <div style={{ padding: '16px', background: '#07080B', border: '1px solid #202634', borderRadius: '6px' }}>
                <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#FFFFFF' }}>Continuous Autonomous Deployment</div>
                <p style={{ fontSize: '13px', color: '#9BA7B9', margin: '6px 0 0 0' }}>
                  Automated CI pipelines, Git worktree synchronization, and multi-region deployment via Vercel CLI.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'pricing' && (
          <div>
            <h2 style={{ fontSize: '20px', color: '#FFFFFF', marginTop: 0, marginBottom: '8px' }}>
              Commercial Licensing
            </h2>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#10B981', fontFamily: 'monospace', margin: '14px 0' }}>
              $49.00 USD <span style={{ fontSize: '13px', color: '#7E8B9F', fontWeight: 'normal' }}>/ Perpetual Operator License</span>
            </div>
            <p style={{ color: '#9BA7B9', fontSize: '14px', lineHeight: 1.6 }}>
              Full commercial redistribution rights, complete source code, reproducible Bun build scripts, and local verification fixtures included.
            </p>
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
