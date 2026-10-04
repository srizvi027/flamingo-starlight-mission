import { NextResponse } from "next/server";
import { campaignConfig } from "@/lib/campaignConfig";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  try {
    const { data, error } = await getSupabaseAdmin().rpc("get_donation_totals");

    if (error) throw error;
    const donationCount = Number(data?.donationCount ?? 0);
    const submitted = Number(data?.submittedTotal ?? 0);
    if (!Number.isFinite(donationCount) || !Number.isFinite(submitted)) {
      throw new Error("The donation totals function returned invalid data.");
    }
    return NextResponse.json(
      {
        totalRaised: campaignConfig.totalRaised + submitted,
        donationCount,
        submittedTotal: submitted,
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("Fundraising total could not be loaded:", error);
    return NextResponse.json(
      { totalRaised: campaignConfig.totalRaised, donationCount: null, submittedTotal: null },
      { headers: { "Cache-Control": "no-store" } },
    );
  }
}