import { Smile, Users, Sun, Star, Home } from "lucide-react";
export type StoryItem = { title: string; body: string }; // reusable shape for real Starlight stories later
export function StoryCard({ title, body }: StoryItem) {
  return (<article className="rounded-3xl bg-white p-6 shadow-soft"><h3 className="font-display text-xl font-semibold text-plum">{title}</h3><p className="mt-2">{body}</p></article>);
}
const items = [
  { Icon: Smile, title: "Joy", body: "A moment of fun can lighten a hard day." },
  { Icon: Users, title: "Connection", body: "Shared experiences bring children and families closer." },
  { Icon: Sun, title: "Hope", body: "Positive moments help families look forward." },
  { Icon: Star, title: "Positive experiences", body: "Something to look forward to during treatment." },
  { Icon: Home, title: "Family support", body: "Support that includes the whole family." },
];
export default function ImpactSection() {
  return (
    <section aria-labelledby="impact-h" className="bg-plum/[0.04]">
      <div className="section">
        <h2 id="impact-h" className="h2">Why Moments of Happiness Matter</h2>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {items.map(({ Icon, title, body }, i) => (
            <li key={title} className="rounded-3xl bg-white p-6 shadow-soft">
              <Icon className={`h-8 w-8 ${i % 2 ? "text-sun" : "text-blush"}`} aria-hidden />
              <h3 className="mt-4 font-display text-xl font-semibold text-plum">{title}</h3>
              <p className="mt-1 text-sm">{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
