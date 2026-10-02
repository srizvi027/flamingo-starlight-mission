"use client";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { campaignConfig, percentRaised, money } from "@/lib/campaignConfig";
export default function FundraisingProgress() {
  return (
    <section aria-labelledby="progress-h" className="bg-plum/[0.04]">
      <div className="section !py-16 text-center">
        <h2 id="progress-h" className="h2">Help Nico Turn Every Job Into a Difference</h2>
        <p className="mt-8 font-display text-6xl font-semibold text-plum md:text-7xl">{money(campaignConfig.totalRaised)}</p>
        <p className="mt-1 text-lg">raised of {money(campaignConfig.goalAmount)} goal</p>
        <div className="mx-auto mt-8 max-w-3xl">
          <div className="relative h-8 rounded-full bg-plum/10 p-1" role="progressbar" aria-valuenow={percentRaised} aria-valuemin={0} aria-valuemax={100} aria-label="Fundraising progress">
            <motion.div className="relative h-full rounded-full bg-plum" initial={{ width: 0 }} whileInView={{ width: `${percentRaised}%` }} viewport={{ once: true }} transition={{ duration: 1.4, ease: "easeOut" }}>
              <Star className="absolute -right-3 -top-3 h-9 w-9 fill-sun text-sun drop-shadow" aria-hidden />
            </motion.div>
          </div>
          <p className="mt-4 font-semibold text-plum">{percentRaised}% of our goal</p>
        </div>
        <p className="mx-auto mt-6 max-w-xl">Every contribution helps support Starlight and the important work they do for seriously ill children and their families.</p>
        <a href="#donate" className="btn-plum mt-8 px-10 text-lg">Donate Now</a>
      </div>
    </section>
  );
}
