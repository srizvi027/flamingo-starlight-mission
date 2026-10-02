import { Wrench, HeartHandshake, Sparkles } from "lucide-react";
const steps = [
  { Icon: Wrench, title: "Book a Plumbing Job", body: "Nico completes plumbing work for customers." },
  { Icon: HeartHandshake, title: "Nico Gives Back", body: "A portion of what Nico earns from his plumbing work goes towards supporting Starlight." },
  { Icon: Sparkles, title: "Help Bring Happiness", body: "Together, we help support Starlight's work with seriously ill children and their families." },
];
export default function HowItWorks() {
  return (
    <section aria-labelledby="how-h" className="bg-plum text-cream">
      <div className="section">
        <h2 id="how-h" className="font-display text-3xl font-semibold md:text-5xl">How It Works</h2>
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map(({ Icon, title, body }, i) => (
            <li key={title} className="rounded-3xl bg-cream/10 p-7">
              <div className="flex items-center justify-between">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-cream text-plum"><Icon className="h-7 w-7" aria-hidden /></span>
                <span className="font-display text-4xl text-sun">0{i + 1}</span>
              </div>
              <h3 className="mt-6 font-display text-2xl font-semibold">{title}</h3>
              <p className="mt-2 text-cream/85">{body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
