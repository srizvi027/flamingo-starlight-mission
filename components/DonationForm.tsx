"use client";
import { useState } from "react";
import { ShieldCheck, ExternalLink } from "lucide-react";
import { campaignConfig } from "@/lib/campaignConfig";
const presets = [25, 50, 100, 250];
export default function DonationForm() {
  const [preset, setPreset] = useState<number | "custom">(50);
  const [custom, setCustom] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const amount = preset === "custom" ? Number(custom) : preset;
  function go(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return setError("Enter your full name to continue.");
    if (!amount || amount < 1) return setError("Enter a donation amount of $1 or more.");
    setError("");
    // Intent only. Payment happens on Starlight's platform; this never updates the fundraising total.
    window.open(campaignConfig.starLightDonationUrl, "_blank", "noopener,noreferrer");
  }
  const sel = "border-plum bg-plum text-cream";
  const unsel = "border-plum/15 text-plum hover:border-plum";
  const input = "mt-1 w-full rounded-xl border-2 border-plum/15 px-4 py-3 font-normal text-ink focus:border-plum focus:outline-none";
  return (
    <section id="donate" aria-labelledby="donate-h" className="section">
      <div className="grid gap-10 md:grid-cols-2 md:items-start">
        <div>
          <h2 id="donate-h" className="h2">Make a Difference Today</h2>
          <p className="mt-4 max-w-md text-lg">Choose an amount and continue to the official Starlight donation page to complete your donation.</p>
          <div className="mt-8 rounded-3xl bg-plum/[0.05] p-6">
            <h3 className="flex items-center gap-2 font-display text-xl font-semibold text-plum"><ShieldCheck className="h-5 w-5 text-blush" aria-hidden /> Your Donation Goes Through Starlight</h3>
            <p className="mt-2">Starlight does not provide a public payment API, so this website does not process or hold your donation. When you choose to donate, you'll be taken to Starlight's official donation platform to complete your contribution.</p>
          </div>
        </div>
        <form onSubmit={go} className="rounded-3xl bg-white p-6 shadow-soft md:p-8" noValidate>
          <fieldset>
            <legend className="font-semibold text-plum">Donation amount</legend>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {presets.map((p) => (
                <button type="button" key={p} aria-pressed={preset === p} onClick={() => setPreset(p)} className={`rounded-2xl border-2 py-3.5 text-lg font-semibold transition ${preset === p ? sel : unsel}`}>${p}</button>
              ))}
              <button type="button" aria-pressed={preset === "custom"} onClick={() => setPreset("custom")} className={`col-span-2 rounded-2xl border-2 py-3.5 font-semibold transition ${preset === "custom" ? sel : unsel}`}>Custom Amount</button>
            </div>
          </fieldset>
          <label className="mt-5 block font-semibold text-plum">Full Name
            <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className={input} />
          </label>
          <label className="mt-4 block font-semibold text-plum">Donation Amount (AUD)
            <input inputMode="decimal" value={preset === "custom" ? custom : String(preset)} readOnly={preset !== "custom"} onChange={(e) => setCustom(e.target.value.replace(/[^0-9.]/g, ""))} placeholder="Enter amount" className={`${input} read-only:bg-plum/[0.04]`} />
          </label>
          {error && <p role="alert" className="mt-3 text-sm font-medium text-[#b3264f]">{error}</p>}
          <button type="submit" className="btn-plum mt-6 w-full text-lg">Continue to Donate <ExternalLink className="h-5 w-5" aria-hidden /></button>
          <p className="mt-3 text-center text-sm text-ink/70">Your donation will be completed securely through Starlight's official donation platform.</p>
        </form>
      </div>
    </section>
  );
}
