import { NextResponse } from "next/server";
import { campaignConfig } from "@/lib/campaignConfig";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { data, error } = await getSupabaseAdmin()
      .from("donations")
      .select("amount");

    if (error) throw error;
    const submitted = (data ?? []).reduce((sum, donation) => sum + Number(donation.amount), 0);
    return NextResponse.json(
      { totalRaised: campaignConfig.totalRaised + submitted },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("Fundraising total could not be loaded:", error);
    return NextResponse.json(
      { totalRaised: campaignConfig.totalRaised },
      { headers: { "Cache-Control": "no-store" } },
    );
  }
}