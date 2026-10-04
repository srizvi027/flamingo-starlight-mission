"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LoaderCircle, RefreshCw, Star } from "lucide-react";
import { campaignConfig, money } from "@/lib/campaignConfig";

async function fetchFundraisingTotal() {
  const response = await fetch("/api/fundraising-total", { cache: "no-store" });
  if (!response.ok) throw new Error("Fundraising total request failed.");
  const result = await response.json();
  if (!Number.isFinite(result.totalRaised)) throw new Error("Fundraising total response was invalid.");
  return result.totalRaised as number;
}

export default function FundraisingProgress() {
  const [totalRaised, setTotalRaised] = useState<number | null>(null);
  const [liveTotalAvailable, setLiveTotalAvailable] = useState<boolean | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshMessage, setRefreshMessage] = useState("");
  useEffect(() => {
    let active = true;
    async function refreshTotal() {
      try {
        const updatedTotal = await fetchFundraisingTotal();
        if (active) {
          setTotalRaised(updatedTotal);
          setLiveTotalAvailable(true);
        }
      } catch {
        if (active) {
          setTotalRaised((current) => current ?? campaignConfig.totalRaised);
          setLiveTotalAvailable(false);
        }
      }
    }
    const handleSubmission = (event: Event) => {
      const submittedTotal = (event as CustomEvent<{ totalRaised?: number }>).detail?.totalRaised;
      if (typeof submittedTotal === "number" && Number.isFinite(submittedTotal)) {
        setTotalRaised(submittedTotal);
        return;
      }
      void refreshTotal();
    };
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") void refreshTotal();
    };
    void refreshTotal();
    window.addEventListener("donation-submitted", handleSubmission);
    window.addEventListener("focus", refreshTotal);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    const timer = window.setInterval(refreshTotal, 10_000);
    return () => {
      active = false;
      window.removeEventListener("donation-submitted", handleSubmission);
      window.removeEventListener("focus", refreshTotal);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.clearInterval(timer);
    };
  }, []);
  async function handleManualRefresh() {
    setIsRefreshing(true);
    setRefreshMessage("");
    try {
      const updatedTotal = await fetchFundraisingTotal();
      setTotalRaised(updatedTotal);
      setLiveTotalAvailable(true);
      setRefreshMessage(updatedTotal === totalRaised ? "Total checked; no change from the server." : "Total updated from the server.");
    } catch {
      setTotalRaised((current) => current ?? campaignConfig.totalRaised);
      setLiveTotalAvailable(false);
      setRefreshMessage("Refresh failed; showing the last available total.");
    } finally {
      setIsRefreshing(false);
    }
  }
  const percentRaised = totalRaised === null
    ? 0
    : Math.min(100, Math.round((totalRaised / campaignConfig.goalAmount) * 10000) / 100);
  return (
    <section aria-labelledby="progress-h" className="bg-plum/[0.04]">
      <div className="section !py-16 text-center">
        <h2 id="progress-h" className="h2">Help Nico Turn Every Job Into a Difference</h2>
        <p className="mt-8 flex min-h-[4.5rem] items-center justify-center font-display text-6xl font-semibold text-plum md:min-h-[5.25rem] md:text-7xl" aria-live="polite">
          {totalRaised === null ? (
            <span className="inline-flex items-center gap-3 text-2xl md:text-3xl"><LoaderCircle className="h-7 w-7 animate-spin" aria-hidden />Loading total…</span>
          ) : money(totalRaised)}
        </p>
        <p className="mt-1 text-lg">raised of {money(campaignConfig.goalAmount)} goal</p>
        {liveTotalAvailable === false && (
          <p role="status" className="mt-2 text-sm text-ink/70">Live total unavailable; showing the campaign starting amount.</p>
        )}
        <div className="mx-auto mt-8 max-w-3xl">
          <div className="relative h-8 rounded-full bg-plum/10 p-1" role="progressbar" aria-valuenow={percentRaised} aria-valuemin={0} aria-valuemax={100} aria-label="Fundraising progress">
            <motion.div className="relative h-full rounded-full bg-plum" initial={{ width: 0 }} animate={{ width: `${percentRaised}%` }} transition={{ duration: 1.4, ease: "easeOut" }}>
              <Star className="absolute -right-3 -top-3 h-9 w-9 fill-sun text-sun drop-shadow" aria-hidden />
            </motion.div>
          </div>
          <p className="mt-4 font-semibold text-plum">{totalRaised === null ? "Loading progress…" : `${percentRaised}% of our goal`}</p>
          <button
            type="button"
            onClick={handleManualRefresh}
            disabled={isRefreshing}
            className="mt-4 inline-flex items-center gap-2 rounded-xl border border-plum/20 px-4 py-2 font-semibold text-plum transition hover:bg-plum/5 disabled:cursor-wait disabled:opacity-60"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} aria-hidden />
            {isRefreshing ? "Refreshing…" : "Refresh total"}
          </button>
          {refreshMessage && <p className="mt-2 text-sm text-ink/70" role="status">{refreshMessage}</p>}
        </div>
        <p className="mx-auto mt-6 max-w-xl">Every contribution helps support Starlight and the important work they do for seriously ill children and their families.</p>
        <a href="#donate" className="btn-plum mt-8 px-10 text-lg">Donate Now</a>
      </div>
    </section>
  );
}
