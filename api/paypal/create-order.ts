import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { customerEmail } = req.body || {};
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  const isSandbox = (process.env.PAYPAL_MODE || 'sandbox').toLowerCase() !== 'live';
  const apiBase = isSandbox ? 'https://api-m.sandbox.paypal.com' : 'https://api-m.paypal.com';

  const internalOrderId = `ord-pp-${Date.now()}`;
  const productName = 'Turnkey Enterprise React 19 + TypeScript Starter Kit';

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

      // 2. Create Order for £49 GBP
      const host = req.headers['x-forwarded-host'] || req.headers.host || 'moneymachine-business-site-demo.vercel.app';
      const proto = req.headers['x-forwarded-proto'] || 'https';
      const origin = `${proto}://${host}`;

      const orderPayload = {
        intent: 'CAPTURE',
        purchase_units: [{
          reference_id: internalOrderId,
          description: productName,
          custom_id: 'turnkey_react19_kit',
          amount: {
            currency_code: 'GBP',
            value: '49.00',
            breakdown: {
              item_total: {
                currency_code: 'GBP',
                value: '49.00',
              },
            },
          },
          items: [{
            name: productName,
            unit_amount: {
              currency_code: 'GBP',
              value: '49.00',
            },
            quantity: '1',
            category: 'DIGITAL_GOODS',
          }],
        }],
        application_context: {
          brand_name: 'MoneyMachine AI',
          landing_page: 'NO_PREFERENCE',
          user_action: 'PAY_NOW',
          return_url: `${origin}?payment=success&provider=paypal`,
          cancel_url: `${origin}?payment=cancelled&provider=paypal`,
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
        amountCents: 4900,
        currency: 'GBP',
        isSandbox,
        message: `PayPal Order created (${isSandbox ? 'SANDBOX' : 'LIVE'})`,
      });
    }

    // Deterministic simulation fallback if live credentials not configured yet in Vercel environment
    const simId = `TEST-PP-${internalOrderId}`;
    return res.status(200).json({
      orderId: simId,
      internalOrderId,
      status: 'CREATED',
      checkoutUrl: `/?payment=success&provider=paypal&order_id=${simId}&email=${encodeURIComponent(customerEmail || 'buyer@domain.com')}`,
      amountCents: 4900,
      currency: 'GBP',
      isSandbox: true,
      message: 'PayPal Sandbox Test Order Initialized (£49 GBP).',
    });
  } catch (err: any) {
    console.error('PayPal create-order error:', err);
    return res.status(500).json({ error: err.message || 'Failed to create PayPal order' });
  }
}
