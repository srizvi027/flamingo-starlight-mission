"use client";
import { useEffect, useState } from "react";
import { campaignConfig, money } from "@/lib/campaignConfig";

type Donation = { id: string; name: string; amount: number };

const initialDonations: Donation[] = [
  { id: "nico-initial-gift", name: "Nico", amount: 550 },
  { id: "joanna-initial-gift", name: "Joanna", amount: 500 },
];

export default function RecentDonations() {
  const [donations, setDonations] = useState<Donation[]>(initialDonations);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    let active = true;
    async function refreshDonations() {
      try {
        const response = await fetch("/api/donations", { cache: "no-store" });
        if (!response.ok) return;
        const result = await response.json();
        if (active && Array.isArray(result.donations)) {
          setDonations([...initialDonations, ...result.donations]);
        }
      } catch {
        // Keep Nico's initial gift visible if the donations service is unavailable.
      }
    }

    const handleSubmission = () => { void refreshDonations(); };
    void refreshDonations();
    window.addEventListener("donation-submitted", handleSubmission);
    const timer = window.setInterval(refreshDonations, 30_000);
    return () => {
      active = false;
      window.removeEventListener("donation-submitted", handleSubmission);
      window.clearInterval(timer);
    };
  }, []);

  const visibleDonations = expanded ? donations : donations.slice(0, 3);

  return (
    <section aria-labelledby="recent-donations-heading" className="bg-plum/[0.04]">
      <div className="section !py-12">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <h2 id="recent-donations-heading" className="font-display text-2xl font-semibold text-plum">Recent donations</h2>
          <p className="text-sm text-ink/65">Names appear only with the donor&apos;s permission.</p>
        </div>
        <ul id="recent-donations-list" className="divide-y divide-plum/10 border-y border-plum/10">
          {visibleDonations.map((donation) => (
            <li key={donation.id} className="flex items-center justify-between gap-4 py-4">
              <span className="font-medium text-ink">{donation.name} donated</span>
              <span className="shrink-0 font-semibold text-plum">{money(donation.amount)}</span>
            </li>
          ))}
        </ul>
        {donations.length > 3 && (
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls="recent-donations-list"
            onClick={() => setExpanded((isExpanded) => !isExpanded)}
            className="mt-4 text-sm font-semibold text-plum underline underline-offset-4"
          >
            {expanded ? "View fewer" : "View more"}
          </button>
        )}
      </div>
    </section>
  );
}