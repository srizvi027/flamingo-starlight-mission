"use client";
import { useState } from "react";
import { Menu, X, Droplets } from "lucide-react";
export const navLinks = [
  { href: "#story", label: "My Story" },
  { href: "#starlight", label: "About Starlight" },
  { href: "#support", label: "Where Your Support Helps" },
  { href: "#money", label: "Where the Money Goes" },
];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-plum/10 bg-cream/90 backdrop-blur">
      <nav aria-label="Main" className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <a href="#top" className="flex items-center gap-2 font-display text-xl font-semibold text-plum">
          <Droplets className="h-5 w-5 text-blush" aria-hidden /> Nico Gives Back
        </a>
        <ul className="hidden items-center gap-7 text-sm font-medium lg:flex">
          {navLinks.map((l) => (<li key={l.href}><a className="hover:text-plum" href={l.href}>{l.label}</a></li>))}
        </ul>
        <div className="flex items-center gap-2">
          <a href="#donate" className="btn-plum !px-5 !py-2.5 text-sm">Donate Now</a>
          <button className="rounded-full p-2 text-plum lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </nav>
      {open && (
        <ul className="border-t border-plum/10 bg-cream px-5 pb-4 lg:hidden">
          {navLinks.map((l) => (<li key={l.href}><a onClick={() => setOpen(false)} className="block py-3 text-lg font-medium text-plum" href={l.href}>{l.label}</a></li>))}
        </ul>
      )}
    </header>
  );
}
