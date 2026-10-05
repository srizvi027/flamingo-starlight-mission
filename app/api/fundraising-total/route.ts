import { NextResponse } from "next/server";
import { campaignConfig } from "@/lib/campaignConfig";
import { getDonationTotals } from "@/lib/donationTotals";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";
export const runtime = "nodejs";

const noCacheHeaders = {
  "Cache-Control": "no-store, no-cache, max-age=0, must-revalidate",
  "CDN-Cache-Control": "no-store",
  "Vercel-CDN-Cache-Control": "no-store",
};

export async function GET() {
  try {
    const { donationCount, submittedTotal: submitted } = await getDonationTotals();
    if (!Number.isFinite(donationCount) || !Number.isFinite(submitted)) {
      throw new Error("The donation totals function returned invalid data.");
    }
    return NextResponse.json(
      {
        totalRaised: campaignConfig.totalRaised + submitted,
        donationCount,
        submittedTotal: submitted,
      },
      { headers: noCacheHeaders },
    );
  } catch (error) {
    console.error("Fundraising total could not be loaded:", error);
    return NextResponse.json(
      { totalRaised: campaignConfig.totalRaised, donationCount: null, submittedTotal: null },
      { status: 503, headers: noCacheHeaders },
    );
  }
}