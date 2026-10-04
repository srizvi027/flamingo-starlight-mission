import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

const pageSize = 1000;

export async function getDonationTotals() {
  const supabase = getSupabaseAdmin();
  let donationCount = 0;
  let submittedCents = 0;
  let offset = 0;

  while (true) {
    const { data, error } = await supabase
      .from("donations")
      .select("amount")
      .order("created_at", { ascending: true })
      .order("id", { ascending: true })
      .range(offset, offset + pageSize - 1);

    if (error) throw error;

    const donations = data ?? [];
    donationCount += donations.length;
    for (const donation of donations) {
      const amount = Number(donation.amount);
      if (!Number.isFinite(amount)) throw new Error("A donation has an invalid amount.");
      submittedCents += Math.round(amount * 100);
    }

    if (donations.length < pageSize) break;
    offset += pageSize;
  }

  return { donationCount, submittedTotal: submittedCents / 100 };
}