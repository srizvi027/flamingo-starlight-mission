import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { campaignConfig } from "@/lib/campaignConfig";
import { donationReceiptBucket, getSupabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

const maxReceiptSize = 10 * 1024 * 1024;
const allowedTypes = new Set(["application/pdf", "image/jpeg", "image/png", "image/webp"]);

export async function GET() {
  try {
    const { data, error } = await getSupabaseAdmin()
      .from("donations")
      .select("id, donor_name, amount")
      .eq("show_publicly", true)
      .order("created_at", { ascending: false })
      .limit(20);

    if (error) throw error;
    const donations = (data ?? []).map((donation) => ({
      id: donation.id,
      name: donation.donor_name.trim().split(/\s+/)[0] || "Supporter",
      amount: Number(donation.amount),
    }));
    return NextResponse.json({ donations }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Recent donations could not be loaded:", error);
    return NextResponse.json({ error: "Recent donations are temporarily unavailable." }, { status: 503 });
  }
}

export async function POST(request: Request) {
  let receiptPath: string | undefined;

  try {
    const form = await request.formData();
    if (String(form.get("website") ?? "").trim()) return NextResponse.json({ ok: true });

    const donorName = String(form.get("name") ?? "").trim();
    const donorEmail = String(form.get("email") ?? "").trim().toLowerCase();
    const phone = String(form.get("phone") ?? "").trim();
    const amount = Number(form.get("amount"));
    const organization = "Flamingo Plumbing and Roofing";
    const receipt = form.get("receipt");

    if (!donorName || donorName.length > 120) {
      return NextResponse.json({ error: "Enter your name (up to 120 characters)." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donorEmail) || donorEmail.length > 254) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    }
    if (!phone || phone.length > 32) {
      return NextResponse.json({ error: "Enter your phone number (up to 32 characters)." }, { status: 400 });
    }
    if (!Number.isFinite(amount) || amount < 1 || amount > 100000) {
      return NextResponse.json({ error: "Enter a donation amount between $1 and $100,000." }, { status: 400 });
    }
    if (!(receipt instanceof File) || receipt.size === 0) {
      return NextResponse.json({ error: "Upload your payment receipt to submit." }, { status: 400 });
    }
    if (receipt.size > maxReceiptSize || !allowedTypes.has(receipt.type)) {
      return NextResponse.json({ error: "Upload a PDF, JPG, PNG, or WebP receipt up to 10 MB." }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const extension = receipt.name.split(".").pop()?.replace(/[^a-zA-Z0-9]/g, "").slice(0, 8) || "file";
    receiptPath = `${randomUUID()}.${extension}`;
    const { error: uploadError } = await supabase.storage
      .from(donationReceiptBucket)
      .upload(receiptPath, receipt, { contentType: receipt.type, upsert: false });
    if (uploadError) throw uploadError;

    const { error: insertError } = await supabase.from("donations").insert({
      donor_name: donorName,
      donor_email: donorEmail,
      phone_number: phone,
      amount: Math.round(amount * 100) / 100,
      organization,
      receipt_path: receiptPath,
      receipt_name: receipt.name.slice(0, 255),
      show_publicly: String(form.get("show_publicly") ?? "") === "true",
      status: "pending",
    });
    if (insertError) throw insertError;

    const { data: totals, error: totalsError } = await supabase.rpc("get_donation_totals");
    if (totalsError) console.error("Donation was saved, but its updated total could not be loaded:", totalsError);
    const submittedTotal = Number(totals?.submittedTotal);
    const totalRaised = Number.isFinite(submittedTotal)
      ? campaignConfig.totalRaised + submittedTotal
      : undefined;

    return NextResponse.json({ ok: true, totalRaised }, { status: 201 });
  } catch (error) {
    if (receiptPath) {
      try {
        const supabase = getSupabaseAdmin();
        await supabase.storage.from(donationReceiptBucket).remove([receiptPath]);
      } catch {
        // Keep the user-facing error generic if cleanup is unavailable.
      }
    }
    console.error("Donation submission failed:", error);
    return NextResponse.json(
      { error: "We couldn't submit your receipt. Please try again later." },
      { status: 503 },
    );
  }
}