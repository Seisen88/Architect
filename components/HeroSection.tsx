"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

export default function HeroSection() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    // Staggered fade-in for child elements
    const children = el.querySelectorAll("[data-animate]");
    children.forEach((child, i) => {
      const htmlChild = child as HTMLElement;
      setTimeout(() => {
        htmlChild.style.opacity = "1";
        htmlChild.style.transform = "translateY(0)";
      }, 300 + i * 150);
    });
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-end justify-center overflow-hidden pb-24">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/123123123123.png"
          alt="New Government Center — E.B. Magalona"
          fill
          className="object-cover object-center scale-105"
          priority
          quality={90}
        />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950/30 via-transparent to-stone-950/95 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-stone-950/40 via-transparent to-stone-950/40 z-[1]" />

      {/* Large watermark title — "WOODLAND" style */}
      <div className="absolute inset-0 flex items-center justify-center z-[2] pointer-events-none select-none overflow-hidden">
        <h1
          className="text-[7rem] sm:text-[10rem] md:text-[14rem] lg:text-[18rem] xl:text-[22rem] font-black leading-none whitespace-nowrap"
          style={{
            fontFamily: "'Inter', sans-serif",
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.06)",
            textShadow: "0 0 80px rgba(255,255,255,0.02)",
            letterSpacing: "0.05em",
          }}
        >
          MAGALONA
        </h1>
      </div>

      {/* Main content — bottom aligned */}
      <div ref={contentRef} className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12">
        {/* Top badge */}
        <div
          data-animate
          className="inline-flex items-center gap-3 mb-6 transition-all duration-700"
          style={{ opacity: 0, transform: "translateY(20px)" }}
        >
          <span className="w-10 h-[1px] bg-architect-500/60" />
          <span className="text-white/60 text-[10px] uppercase tracking-[0.3em]">
            La Consolacion College Bacolod · BS Architecture 5C
          </span>
          <span className="w-10 h-[1px] bg-architect-500/60" />
        </div>

        {/* Title */}
        <h2
          data-animate
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.1] mb-4 transition-all duration-700"
          style={{ opacity: 0, transform: "translateY(20px)", fontFamily: "'Playfair Display', serif" }}
        >
          New Government Center
          <span className="block text-architect-400 italic text-3xl sm:text-4xl md:text-5xl mt-2">
            E.B. Magalona
          </span>
        </h2>

        {/* Subtitle */}
        <p
          data-animate
          className="text-white/50 text-sm md:text-base max-w-xl leading-relaxed mb-6 transition-all duration-700"
          style={{ opacity: 0, transform: "translateY(20px)" }}
        >
          A three-storey civic landmark — annotated floor plans, site development,
          elevations, and the complete design journey from brief to occupancy.
        </p>

        {/* Credits */}
        <div
          data-animate
          className="flex flex-wrap items-center gap-x-6 gap-y-1 text-[10px] uppercase tracking-[0.2em] text-white/40 mb-8 transition-all duration-700"
          style={{ opacity: 0, transform: "translateY(20px)" }}
        >
          <span>Proponent: <span className="text-white/60">Erica Mae D. Pancho</span></span>
          <span className="hidden sm:inline text-white/20">|</span>
          <span>Adviser: <span className="text-white/60">Ar. Gary Peter L. Bello, UAP</span></span>
        </div>

        {/* CTA Buttons */}
        <div
          data-animate
          className="flex flex-wrap gap-4 mb-14 transition-all duration-700"
          style={{ opacity: 0, transform: "translateY(20px)" }}
        >
          <a
            href="#floor-plan"
            className="px-8 py-3.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs uppercase tracking-[0.2em] hover:bg-white/20 hover:border-white/40 transition-all duration-300"
          >
            Explore Plans
          </a>
          <a
            href="#process"
            className="px-8 py-3.5 border border-white/15 text-white/70 text-xs uppercase tracking-[0.2em] hover:border-white/40 hover:text-white transition-all duration-300"
          >
            Design Process
          </a>
        </div>

        {/* Stats row */}
        <div
          data-animate
          className="flex flex-wrap gap-8 md:gap-12 pt-8 border-t border-white/10 transition-all duration-700"
          style={{ opacity: 0, transform: "translateY(20px)" }}
        >
          {[
            { value: "37,581", unit: "m²", label: "Total Lot Area" },
            { value: "3", unit: "floors", label: "Building Height" },
            { value: "A01–A05", unit: "", label: "Drawing Sheets" },
            { value: "30+", unit: "offices", label: "Government Offices" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-2xl md:text-3xl font-light text-white/90" style={{ fontFamily: "'Playfair Display', serif" }}>
                {s.value}
                {s.unit && <span className="text-sm text-white/40 ml-1">{s.unit}</span>}
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/35 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-[9px] uppercase tracking-[0.3em] text-white/30">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
