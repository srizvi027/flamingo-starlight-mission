"use client";
import { useState } from "react";
import { ShieldCheck, ExternalLink, LoaderCircle, Star } from "lucide-react";
import { campaignConfig } from "@/lib/campaignConfig";
export default function DonationForm() {
  const [amount, setAmount] = useState("");
  const [receiptName, setReceiptName] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  async function submitReceipt(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSubmitted(false);
    setSending(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const response = await fetch("/api/donations", { method: "POST", body: data });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Couldn't submit your receipt.");
      setSubmitted(true);
      window.dispatchEvent(new CustomEvent("donation-submitted", { detail: { totalRaised: result.totalRaised } }));
      const destination = new URL(window.location.href);
      destination.hash = "recent-donations";
      window.history.replaceState(null, "", destination.toString());
      window.setTimeout(() => window.location.reload(), 1400);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Couldn't submit your receipt.");
      setSending(false);
    }
  }
  const input = "mt-1 w-full rounded-xl border-2 border-plum/15 px-4 py-3 font-normal text-ink focus:border-plum focus:outline-none";
  return (
    <section id="donate" aria-labelledby="donate-h" className="section">
      <div className="grid gap-10 md:grid-cols-2 md:items-start">
        <div>
          <h2 id="donate-h" className="h2">Make a Difference Today</h2>
          <p className="mt-4 max-w-md text-lg">Donate directly to Starlight, then send us your receipt. Submitted amounts are added to the campaign total automatically.</p>
          <div className="mt-8 rounded-3xl bg-plum/[0.05] p-6">
            <h3 className="flex items-center gap-2 font-display text-xl font-semibold text-plum"><ShieldCheck className="h-5 w-5 text-blush" aria-hidden /> Your Donation Goes Through Starlight</h3>
            <p className="mt-2">Your payment goes to Starlight, not this website. The amount you enter is added when you submit your receipt, but this site cannot independently verify the payment.</p>
          </div>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-soft md:p-8">
          <a href={campaignConfig.starLightDonationUrl} target="_blank" rel="noreferrer" className="btn-plum flex w-full items-center justify-center gap-2 text-lg">
            Pay Starlight <ExternalLink className="h-5 w-5" aria-hidden />
          </a>
          <p className="mt-3 text-sm text-ink/70">On Starlight's page, choose “Add organisation” and enter “Flamingo Plumbing and Roofing.” After paying, return here to submit your receipt.</p>
          <form onSubmit={submitReceipt} className="mt-7 border-t border-plum/10 pt-6">
            <h3 className="font-display text-xl font-semibold text-plum">Submit your payment receipt</h3>
            <p className="mt-4 text-plum">Ensure to click the box I am donating on behalf of an organisation and write &quot;<strong>Flamingo Plumbing and roofing</strong>&quot;</p>
            <label className="mt-4 block font-semibold text-plum">Full Name
              <input name="name" required maxLength={120} autoComplete="name" className={input} />
            </label>
            <label className="mt-4 block font-semibold text-plum">Email Address
              <input name="email" required type="email" maxLength={254} autoComplete="email" className={input} />
            </label>
            <label className="mt-4 block font-semibold text-plum">Donation Amount (AUD)
              <input name="amount" required type="number" min="1" max="100000" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount paid" className={input} />
            </label>
            <label className="mt-4 block font-semibold text-plum">Phone Number
              <input name="phone" required type="tel" maxLength={32} autoComplete="tel" className={input} />
            </label>
            <label className="mt-4 block font-semibold text-plum">Payment receipt
              <input name="receipt" required type="file" accept=".pdf,.jpg,.jpeg,.png,.webp,application/pdf,image/jpeg,image/png,image/webp" onChange={(e) => setReceiptName(e.target.files?.[0]?.name ?? "")} className={`${input} file:mr-3 file:rounded-md file:border-0 file:bg-plum/10 file:px-3 file:py-2 file:font-semibold file:text-plum`} />
              <span className="mt-1 block text-sm font-normal text-ink/60">PDF, JPG, PNG or WebP, up to 10 MB.</span>
            </label>
            <label className="mt-4 flex items-start gap-3 text-sm text-ink/80">
              <input name="show_publicly" type="checkbox" value="true" className="mt-1 h-4 w-4 accent-plum" />
              <span>Show my first name and donation amount in the recent donations list.</span>
            </label>
            <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
            {receiptName && <p className="mt-2 text-sm text-ink/70">Selected: {receiptName}</p>}
            {error && <p role="alert" className="mt-3 text-sm font-medium text-[#b3264f]">{error}</p>}
            {submitted && <p role="status" className="mt-3 text-sm font-medium text-green-800">Receipt received. Refreshing to show the updated total and recent donations…</p>}
            <button type="submit" disabled={sending} className="btn-plum mt-6 w-full text-lg disabled:cursor-wait disabled:opacity-60">
              {sending && <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden />}
              {submitted ? "Refreshing…" : sending ? "Submitting receipt…" : "Submit Receipt"}
            </button>
            <p className="mt-3 text-center text-sm text-ink/70">Your receipt is stored privately for campaign records. Submitted amounts are not independently verified.</p>
          </form>
        </div>
      </div>
      {sending && submitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/30 px-5 backdrop-blur-sm" role="status" aria-live="polite">
          <div className="flex w-full max-w-xs flex-col items-center rounded-2xl bg-white px-8 py-9 text-center shadow-soft">
            <div className="relative flex h-16 w-16 items-center justify-center">
              <LoaderCircle className="absolute h-16 w-16 animate-spin text-plum/25" aria-hidden />
              <Star className="h-8 w-8 animate-pulse fill-sun text-plum" aria-hidden />
            </div>
            <p className="mt-4 font-display text-xl font-semibold text-plum">Donation received</p>
            <p className="mt-1 text-sm text-ink/70">Refreshing the fundraiser…</p>
          </div>
        </div>
      )}
    </section>
  );
}
