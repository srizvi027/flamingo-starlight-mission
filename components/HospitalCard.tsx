import { Building2 } from "lucide-react";
export default function HospitalCard({ name, body, accent }: { name: string; body: string; accent: "blush" | "sun" }) {
  return (
    <article className="rounded-3xl bg-white p-8 shadow-soft">
      <span className={`grid h-14 w-14 place-items-center rounded-2xl ${accent === "blush" ? "bg-blush/20" : "bg-sun/25"} text-plum`}><Building2 className="h-7 w-7" aria-hidden /></span>
      <h3 className="mt-6 font-display text-2xl font-semibold text-plum">{name}</h3>
      <p className="mt-2">{body}</p>
    </article>
  );
}
