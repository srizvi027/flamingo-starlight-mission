import { createClient } from "@supabase/supabase-js";

export const donationReceiptBucket = "donation-receipts";

export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY;

  if (!url || !secretKey) {
    throw new Error("Supabase server credentials are not configured.");
  }

  return createClient(url, secretKey, {
    auth: { autoRefreshToken: false, persistSession: false },
    // Next.js 14 caches fetch() results by default. Without this, Supabase reads
    // (donation totals, recent donations) are served stale until the cache is purged.
    global: { fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }) },
  });
}