// Safaricom Daraja API integration for M-Pesa STK Push payments.
// Docs: https://developer.safaricom.co.ke/APIs/MpesaExpressSimulate
//
// Required env vars:
//   MPESA_ENV               "sandbox" or "production"
//   MPESA_CONSUMER_KEY
//   MPESA_CONSUMER_SECRET
//   MPESA_SHORTCODE          your Paybill/Till number
//   MPESA_PASSKEY
//   MPESA_CALLBACK_URL       full public URL Safaricom will POST results to,
//                            e.g. https://fitness.tuistech.co.ke/api/mpesa/callback

function getBaseUrl() {
  return process.env.MPESA_ENV === "production"
    ? "https://api.safaricom.co.ke"
    : "https://sandbox.safaricom.co.ke";
}

function getTimestamp() {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    now.getFullYear().toString() +
    pad(now.getMonth() + 1) +
    pad(now.getDate()) +
    pad(now.getHours()) +
    pad(now.getMinutes()) +
    pad(now.getSeconds())
  );
}

function isConfigured() {
  return Boolean(
    process.env.MPESA_CONSUMER_KEY &&
      process.env.MPESA_CONSUMER_SECRET &&
      process.env.MPESA_SHORTCODE &&
      process.env.MPESA_PASSKEY &&
      process.env.MPESA_CALLBACK_URL
  );
}

async function getAccessToken(): Promise<string> {
  const key = process.env.MPESA_CONSUMER_KEY!;
  const secret = process.env.MPESA_CONSUMER_SECRET!;
  const credentials = Buffer.from(`${key}:${secret}`).toString("base64");

  const res = await fetch(
    `${getBaseUrl()}/oauth/v1/generate?grant_type=client_credentials`,
    {
      headers: { Authorization: `Basic ${credentials}` },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to get Daraja access token: ${res.status}`);
  }

  const data = await res.json();
  return data.access_token as string;
}

// Normalizes Kenyan numbers like "0712345678" or "+254712345678" to
// Safaricom's required "254712345678" format.
export function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("254")) return digits;
  if (digits.startsWith("0")) return `254${digits.slice(1)}`;
  if (digits.startsWith("7") || digits.startsWith("1")) return `254${digits}`;
  return digits;
}

export async function initiateSTKPush({
  phone,
  amount,
  accountReference,
  transactionDesc,
}: {
  phone: string;
  amount: number;
  accountReference: string;
  transactionDesc: string;
}) {
  if (!isConfigured()) {
    throw new Error(
      "M-Pesa is not configured yet - missing MPESA_* environment variables."
    );
  }

  const shortcode = process.env.MPESA_SHORTCODE!;
  const passkey = process.env.MPESA_PASSKEY!;
  const timestamp = getTimestamp();
  const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString(
    "base64"
  );

  const accessToken = await getAccessToken();
  const normalizedPhone = normalizePhone(phone);

  const res = await fetch(`${getBaseUrl()}/mpesa/stkpush/v1/processrequest`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      BusinessShortCode: shortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: Math.round(amount),
      PartyA: normalizedPhone,
      PartyB: shortcode,
      PhoneNumber: normalizedPhone,
      CallBackURL: process.env.MPESA_CALLBACK_URL,
      AccountReference: accountReference.slice(0, 12),
      TransactionDesc: transactionDesc.slice(0, 13),
    }),
  });

  const data = await res.json();

  if (!res.ok || data.ResponseCode !== "0") {
    throw new Error(
      `STK push failed: ${data.errorMessage || data.ResponseDescription || res.status}`
    );
  }

  return {
    checkoutRequestId: data.CheckoutRequestID as string,
    merchantRequestId: data.MerchantRequestID as string,
  };
}

export { isConfigured as isMpesaConfigured };