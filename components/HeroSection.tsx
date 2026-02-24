"use client";
import { useEffect, useRef } from "react";

export default function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 100);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Blueprint-grid background */}
      <div className="absolute inset-0 blueprint-bg opacity-60" />

      {/* Animated SVG — mimics NGC column grid layout */}
      <svg className="absolute inset-0 w-full h-full opacity-10" aria-hidden="true">
        {/* Column grid lines A–Q */}
        {Array.from({ length: 17 }, (_, i) => (
          <line key={`cv${i}`} x1={`${5 + i * 5.6}%`} y1="0" x2={`${5 + i * 5.6}%`} y2="100%" stroke="#639bd2" strokeWidth="0.5" strokeDasharray="4 8" />
        ))}
        {/* Row grid lines 1–12 */}
        {Array.from({ length: 12 }, (_, i) => (
          <line key={`ch${i}`} x1="0" y1={`${8 + i * 7.5}%`} x2="100%" y2={`${8 + i * 7.5}%`} stroke="#639bd2" strokeWidth="0.5" strokeDasharray="4 8" />
        ))}
        {/* Circular lobby void */}
        <circle cx="50%" cy="52%" r="10%" fill="none" stroke="#a8875e" strokeWidth="1.5" strokeDasharray="5 4" className="opacity-50" />
        {/* Building outline */}
        <rect x="12%" y="20%" width="76%" height="62%" fill="none" stroke="#639bd2" strokeWidth="1" strokeDasharray="3 5" className="opacity-40" />
        {/* West wing */}
        <rect x="12%" y="22%" width="26%" height="58%" fill="none" stroke="#a8875e" strokeWidth="0.8" />
        {/* East wing */}
        <rect x="62%" y="22%" width="26%" height="58%" fill="none" stroke="#a8875e" strokeWidth="0.8" />
      </svg>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950/80 via-stone-950/60 to-stone-950" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* School / Adviser tag */}
        <div className="inline-flex items-center gap-3 mb-3">
          <span className="w-10 h-[1px] bg-architect-500" />
          <span className="text-architect-400 text-xs uppercase tracking-[0.28em] font-medium">
            La Consolacion College Bacolod · AFAID · BS Architecture 5C
          </span>
          <span className="w-10 h-[1px] bg-architect-500" />
        </div>
        <p className="text-stone-500 text-xs uppercase tracking-widest mb-2">
          Proponent: <span className="text-stone-400">Erica Mae D. Pancho</span>
        </p>
        <p className="text-stone-600 text-xs uppercase tracking-widest mb-8">
          Subject Adviser: Ar. Gary Peter L. Bello, UAP
        </p>

        {/* Main heading */}
        <h1
          ref={titleRef}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-6 transition-all duration-1000"
          style={{
            fontFamily: "'Playfair Display', serif",
            opacity: 0,
            transform: "translateY(40px)",
          }}
        >
          <span className="text-stone-100">New Government Center</span>
          <br />
          <span className="text-architect-400 italic">for E. B. Magalona</span>
          <br />
          <span className="text-stone-300 text-2xl md:text-3xl mt-2 block">Brgy. Santo Niño, Enrique B. Magalona, Negros Occidental</span>
        </h1>

        {/* Sheet set badge */}
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 border border-stone-700 bg-stone-900/40 rounded-sm">
          <span className="w-2 h-2 rounded-full bg-architect-500" />
          <span className="text-stone-400 text-xs tracking-wide">Architectural Sheets A01 · A02 · A03 · A04 · A05 &nbsp;+&nbsp; Structural · Electrical · Sanitary · Mechanical</span>
        </div>

        <p className="text-stone-400 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          A complete architectural showcase of the proposed three-storey New Government Center —
          annotated floor plans (Sheets A01–A05), site development, elevation views, construction timeline,
          and the full design process from brief to occupancy.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <a href="#floor-plan" className="px-8 py-4 bg-architect-600 hover:bg-architect-500 text-stone-950 font-semibold text-sm uppercase tracking-widest transition-all duration-300 hover:shadow-lg hover:shadow-architect-900/50" id="hero-cta-primary">
            Explore Floor Plans
          </a>
          <a href="#process" className="px-8 py-4 border border-stone-600 text-stone-300 hover:border-architect-500 hover:text-architect-400 text-sm uppercase tracking-widest transition-all duration-300" id="hero-cta-process">
            Design Process
          </a>
        </div>

        {/* Stats row */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-14">
          {[
            { value: "37,581", unit: "m²", label: "Total Lot Area" },
            { value: "3", unit: "floors", label: "Building Height" },
            { value: "A01–A05", unit: "", label: "Drawing Sheets" },
            { value: "30+", unit: "offices", label: "Government Offices" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-serif text-3xl text-architect-400" style={{ fontFamily: "'Playfair Display', serif" }}>
                {s.value}
                {s.unit && <span className="text-lg text-architect-600 ml-1">{s.unit}</span>}
              </div>
              <div className="text-xs uppercase tracking-[0.2em] text-stone-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs uppercase tracking-[0.25em] text-stone-600">Scroll</span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none" className="text-architect-600">
          <path d="M8 0v20M1 13l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}
