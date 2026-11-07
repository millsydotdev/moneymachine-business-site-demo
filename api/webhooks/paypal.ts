import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const payload = req.body;
  if (!payload || !payload.id || !payload.event_type) {
    return res.status(400).json({ error: 'Invalid PayPal webhook payload' });
  }

  const eventId = payload.id;
  const eventType = payload.event_type;
  const webhookId = process.env.PAYPAL_WEBHOOK_ID;
  const isSandbox = (process.env.PAYPAL_MODE || 'sandbox').toLowerCase() !== 'live';
  const apiBase = isSandbox ? 'https://api-m.sandbox.paypal.com' : 'https://api-m.paypal.com';

  console.log(`[PayPal Webhook] Inbound event: ${eventType} (ID: ${eventId})`);

  try {
    // If Webhook ID and PayPal Client Credentials are set, verify signature
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

    if (webhookId && clientId && clientSecret) {
      const transmissionId = req.headers['paypal-transmission-id'] as string;
      const transmissionTime = req.headers['paypal-transmission-time'] as string;
      const certUrl = req.headers['paypal-cert-url'] as string;
      const authAlgo = req.headers['paypal-auth-algo'] as string;
      const transmissionSig = req.headers['paypal-transmission-sig'] as string;

      if (transmissionId && transmissionSig) {
        // Authenticate with PayPal
        const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
        const tokenRes = await fetch(`${apiBase}/v1/oauth2/token`, {
          method: 'POST',
          headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: 'grant_type=client_credentials',
        });

        if (tokenRes.ok) {
          const { access_token } = await tokenRes.json();
          const verifyRes = await fetch(`${apiBase}/v1/notifications/verify-webhook-signature`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${access_token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              transmission_id: transmissionId,
              transmission_time: transmissionTime,
              cert_url: certUrl,
              auth_algo: authAlgo,
              transmission_sig: transmissionSig,
              webhook_id: webhookId,
              webhook_event: payload,
            }),
          });

          if (verifyRes.ok) {
            const verifyJson = await verifyRes.json();
            if (verifyJson.verification_status !== 'SUCCESS') {
              console.warn('[PayPal Webhook] Signature verification rejected by PayPal API');
              return res.status(400).json({ error: 'PayPal webhook signature verification failed' });
            }
          }
        }
      }
    }

    // Process payment lifecycle events
    switch (eventType) {
      case 'PAYMENT.CAPTURE.COMPLETED': {
        const capture = payload.resource;
        const amount = capture?.amount?.value || '49.00';
        const currency = capture?.amount?.currency_code || 'GBP';
        console.log(`[PayPal Webhook] Capture completed: £${amount} ${currency}`);
        break;
      }
      case 'PAYMENT.CAPTURE.REFUNDED': {
        console.log(`[PayPal Webhook] Refund processed for capture: ${payload.resource?.id}`);
        break;
      }
      case 'CHECKOUT.ORDER.APPROVED': {
        console.log(`[PayPal Webhook] Order approved by payer: ${payload.resource?.id}`);
        break;
      }
      default:
        console.log(`[PayPal Webhook] Ignored non-critical event: ${eventType}`);
    }

    return res.status(200).json({
      received: true,
      eventId,
      eventType,
      status: 'processed',
      message: 'PayPal webhook processed successfully.',
    });
  } catch (err: any) {
    console.error('[PayPal Webhook] Error:', err);
    return res.status(500).json({ error: err.message || 'Webhook processing failed' });
  }
}
