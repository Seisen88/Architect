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
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track which section is currently in view
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection("#" + entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-stone-950/95 backdrop-blur-xl shadow-lg shadow-black/20 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo with diamond icon */}
        <Link href="#hero" className="group flex items-center gap-3">
          {/* Diamond icon */}
          <div className="relative w-8 h-8 transition-transform duration-500 group-hover:rotate-[360deg]">
            <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
              <rect
                x="20" y="2" width="25" height="25"
                transform="rotate(45 20 2)"
                className="fill-transparent stroke-architect-500"
                strokeWidth="1.5"
              />
              <rect
                x="20" y="8" width="17" height="17"
                transform="rotate(45 20 8)"
                className="fill-architect-600/80"
              />
            </svg>
          </div>
          <span
            className={`text-sm tracking-[0.35em] uppercase transition-colors duration-500 ${
              scrolled ? "text-architect-200" : "text-white"
            }`}
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
          >
            ARCHI
            <span className={`font-light transition-colors duration-500 ${scrolled ? "text-architect-400" : "text-white/60"}`}>
              DESIGN
            </span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`relative text-[11px] uppercase tracking-[0.2em] transition-all duration-500 pb-1 ${
                  activeSection === l.href
                    ? scrolled
                      ? "text-architect-400"
                      : "text-white"
                    : scrolled
                      ? "text-stone-400 hover:text-architect-400"
                      : "text-white/50 hover:text-white"
                }`}
              >
                {l.label}
                {/* Animated underline */}
                <span
                  className={`absolute left-0 bottom-0 h-[1px] transition-all duration-500 ${
                    activeSection === l.href
                      ? "w-full bg-architect-500"
                      : "w-0 bg-architect-500/50 group-hover:w-full"
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#process"
          className={`hidden md:inline-flex items-center px-5 py-2 text-[10px] uppercase tracking-[0.25em] border transition-all duration-300 ${
            scrolled
              ? "border-architect-600 text-architect-400 hover:bg-architect-600 hover:text-stone-950"
              : "border-architect-500/50 text-architect-400 hover:bg-architect-600/10 hover:border-architect-500"
          }`}
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
          <span
            className={`w-6 h-[1.5px] transition-all duration-300 ${
              scrolled ? "bg-architect-400" : "bg-white"
            } ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`}
          />
          <span
            className={`w-6 h-[1.5px] transition-all duration-300 ${
              scrolled ? "bg-architect-400" : "bg-white"
            } ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`w-6 h-[1.5px] transition-all duration-300 ${
              scrolled ? "bg-architect-400" : "bg-white"
            } ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } ${
          scrolled
            ? "bg-stone-950/98 border-t border-stone-800"
            : "bg-black/70 backdrop-blur-xl"
        }`}
      >
        <ul className="flex flex-col px-6 py-4 gap-3">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className={`block text-sm uppercase tracking-[0.2em] transition-colors py-2 ${
                  activeSection === l.href
                    ? "text-architect-400 border-l-2 border-architect-500 pl-3"
                    : "text-stone-400 hover:text-architect-400 pl-3"
                }`}
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
