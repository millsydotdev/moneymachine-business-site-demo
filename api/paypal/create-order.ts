import type { VercelRequest, VercelResponse } from '@vercel/node';

// Official Product Catalog with Server-Side Price Verification
export const CATALOG: Record<string, {
  name: string;
  amount: string;
  amountCents: number;
  currency: string;
  bundleFilename: string;
  checksum: string;
}> = {
  'turnkey_react19_kit': {
    name: 'Turnkey Enterprise React 19 + TypeScript Starter Kit',
    amount: '49.00',
    amountCents: 4900,
    currency: 'GBP',
    bundleFilename: 'turnkey-react19-starter-kit-v1.0.0.zip',
    checksum: 'f2e4a8e39cb691dc258829108da1463b76427df7b38c2ebff28e00bcc11a5265',
  },
  'ai_cost_guard_proxy': {
    name: 'AI Cost Guard & Virtual Token Budget Proxy',
    amount: '39.00',
    amountCents: 3900,
    currency: 'GBP',
    bundleFilename: 'ai-cost-guard-proxy-v1.0.0.zip',
    checksum: 'd489f070003a3ea9c211cbb6d501f272ba1ac1cfb8eea9031594bbda82b88996',
  },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { customerEmail, productId = 'turnkey_react19_kit' } = req.body || {};
  const product = CATALOG[productId] || CATALOG['turnkey_react19_kit'];

  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  const isLiveMode = (process.env.PAYPAL_MODE || '').toLowerCase() === 'live';
  const isSandbox = !isLiveMode;
  const apiBase = isLiveMode ? 'https://api-m.paypal.com' : 'https://api-m.sandbox.paypal.com';

  const internalOrderId = `ord-pp-${Date.now()}`;

  // STRICT FAIL-CLOSED SECURITY RULE:
  // If Live mode is configured or requested, NEVER silently fall back to mock payments!
  if (isLiveMode && (!clientId || !clientSecret || !clientId.trim() || !clientSecret.trim())) {
    return res.status(503).json({
      error: 'Live Payment Gateway Not Configured: PAYPAL_CLIENT_ID or PAYPAL_CLIENT_SECRET missing in production environment.',
      code: 'PAYPAL_LIVE_CREDENTIALS_MISSING',
      isLiveMode: true,
      actionRequired: 'Configure live PayPal credentials in Vercel project environment variables.',
    });
  }

  try {
    if (clientId && clientSecret && clientId.trim() && clientSecret.trim()) {
      // 1. Get OAuth Access Token
      const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
      const tokenRes = await fetch(`${apiBase}/v1/oauth2/token`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials',
      });

      if (!tokenRes.ok) {
        throw new Error(`PayPal OAuth rejected: ${await tokenRes.text()}`);
      }

      const tokenJson = await tokenRes.json();
      const accessToken = tokenJson.access_token;

      // 2. Create Order for verified catalog price (Never trusting client-supplied amounts)
      const host = req.headers['x-forwarded-host'] || req.headers.host || 'moneymachine-business-site-demo.vercel.app';
      const proto = req.headers['x-forwarded-proto'] || 'https';
      const origin = `${proto}://${host}`;

      const orderPayload = {
        intent: 'CAPTURE',
        purchase_units: [{
          reference_id: internalOrderId,
          description: product.name,
          custom_id: productId,
          amount: {
            currency_code: product.currency,
            value: product.amount,
            breakdown: {
              item_total: {
                currency_code: product.currency,
                value: product.amount,
              },
            },
          },
          items: [{
            name: product.name,
            unit_amount: {
              currency_code: product.currency,
              value: product.amount,
            },
            quantity: '1',
            category: 'DIGITAL_GOODS',
          }],
        }],
        application_context: {
          brand_name: 'MoneyMachine AI',
          landing_page: 'NO_PREFERENCE',
          user_action: 'PAY_NOW',
          return_url: `${origin}?payment=success&provider=paypal&product_id=${productId}`,
          cancel_url: `${origin}?payment=cancelled&provider=paypal&product_id=${productId}`,
        },
      };

      const orderRes = await fetch(`${apiBase}/v2/checkout/orders`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderPayload),
      });

      if (!orderRes.ok) {
        throw new Error(`PayPal order rejected: ${await orderRes.text()}`);
      }

      const orderJson = await orderRes.json();
      const approveLink = orderJson.links?.find((l: any) => l.rel === 'approve')?.href;

      return res.status(200).json({
        orderId: orderJson.id,
        internalOrderId,
        status: orderJson.status,
        checkoutUrl: approveLink,
        productId,
        amountCents: product.amountCents,
        currency: product.currency,
        isSandbox,
        message: `PayPal Order created (${isSandbox ? 'SANDBOX' : 'LIVE'})`,
      });
    }

    // Deterministic simulation fallback only when explicitly in sandbox / testing mode without live config
    const simId = `TEST-PP-${internalOrderId}`;
    return res.status(200).json({
      orderId: simId,
      internalOrderId,
      productId,
      status: 'CREATED',
      checkoutUrl: `/?payment=success&provider=paypal&order_id=${simId}&product_id=${productId}&email=${encodeURIComponent(customerEmail || 'buyer@domain.com')}`,
      amountCents: product.amountCents,
      currency: product.currency,
      isSandbox: true,
      message: `PayPal Sandbox Test Order Initialized for ${product.name} (£${product.amount} GBP).`,
    });
  } catch (err: any) {
    console.error('PayPal create-order error:', err);
    return res.status(500).json({ error: err.message || 'Failed to create PayPal order' });
  }
}
