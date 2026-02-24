"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { href: "#floor-plan", label: "Floor Plan" },
  { href: "#site-area", label: "Site Area" },
  { href: "#elevation", label: "Elevation" },
  { href: "#site-dev", label: "Site Dev" },
  { href: "#process", label: "Process" },
  { href: "#specifications", label: "Specs" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-stone-950/95 backdrop-blur-md shadow-xl shadow-black/40 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="#hero" className="flex items-center gap-3 group">
          <div className="w-9 h-9 border border-architect-500/60 flex items-center justify-center rotate-45 group-hover:rotate-0 transition-transform duration-300">
            <div className="w-4 h-4 bg-architect-500" />
          </div>
          <span
            className="font-serif text-xl tracking-widest text-architect-200 group-hover:text-architect-400 transition-colors"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            ARCHI<span className="text-architect-500">DESIGN</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-xs uppercase tracking-[0.18em] text-stone-400 hover:text-architect-400 transition-colors underline-anim"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#process"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2 border border-architect-600 text-architect-400 text-xs uppercase tracking-widest hover:bg-architect-600 hover:text-stone-950 transition-all duration-300"
        >
          View Process
        </a>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          id="nav-hamburger"
        >
          <span className={`w-6 h-0.5 bg-architect-400 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`w-6 h-0.5 bg-architect-400 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`w-6 h-0.5 bg-architect-400 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } bg-stone-950/98 border-t border-stone-800`}
      >
        <ul className="flex flex-col px-6 py-4 gap-4">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="block text-sm uppercase tracking-widest text-stone-400 hover:text-architect-400 transition-colors py-2 border-b border-stone-800"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
