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
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Blueprint-grid background */}
      <div className="absolute inset-0 blueprint-bg opacity-60" />

      {/* Animated SVG blueprint lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10" aria-hidden="true">
        {/* horizontal lines */}
        {[15, 30, 45, 60, 75, 90].map((y) => (
          <line
            key={`h${y}`}
            x1="0"
            y1={`${y}%`}
            x2="100%"
            y2={`${y}%`}
            stroke="#639bd2"
            strokeWidth="0.5"
            strokeDasharray="6 10"
          />
        ))}
        {/* vertical lines */}
        {[10, 25, 40, 55, 70, 85].map((x) => (
          <line
            key={`v${x}`}
            x1={`${x}%`}
            y1="0"
            x2={`${x}%`}
            y2="100%"
            stroke="#639bd2"
            strokeWidth="0.5"
            strokeDasharray="6 10"
          />
        ))}
        {/* floor plan silhouette */}
        <rect x="30%" y="22%" width="40%" height="55%" fill="none" stroke="#639bd2" strokeWidth="1" strokeDasharray="4 6" className="opacity-40" />
        <rect x="32%" y="24%" width="16%" height="25%" fill="none" stroke="#a8875e" strokeWidth="0.8" />
        <rect x="52%" y="24%" width="16%" height="25%" fill="none" stroke="#a8875e" strokeWidth="0.8" />
        <rect x="32%" y="53%" width="36%" height="22%" fill="none" stroke="#a8875e" strokeWidth="0.8" />
      </svg>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950/80 via-stone-950/60 to-stone-950" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Category tag */}
        <div className="inline-flex items-center gap-3 mb-8">
          <span className="w-12 h-[1px] bg-architect-500" />
          <span className="text-architect-400 text-xs uppercase tracking-[0.3em] font-medium">
            Architecture Design Showcase
          </span>
          <span className="w-12 h-[1px] bg-architect-500" />
        </div>

        {/* Main heading */}
        <h1
          ref={titleRef}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight mb-6 transition-all duration-1000"
          style={{
            fontFamily: "'Playfair Display', serif",
            opacity: 0,
            transform: "translateY(40px)",
          }}
        >
          <span className="text-stone-100">Designed with</span>
          <br />
          <span className="text-architect-400 italic">Intention</span>
          <br />
          <span className="text-stone-100">Built with Precision</span>
        </h1>

        <p className="text-stone-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          A complete walkthrough of the residential architecture process — from site survey
          to handover — with annotated floor plans, elevation views, and every design decision explained.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <a
            href="#floor-plan"
            className="px-8 py-4 bg-architect-600 hover:bg-architect-500 text-stone-950 font-semibold text-sm uppercase tracking-widest transition-all duration-300 hover:shadow-lg hover:shadow-architect-900/50"
            id="hero-cta-primary"
          >
            Explore Floor Plan
          </a>
          <a
            href="#process"
            className="px-8 py-4 border border-stone-600 text-stone-300 hover:border-architect-500 hover:text-architect-400 text-sm uppercase tracking-widest transition-all duration-300"
            id="hero-cta-process"
          >
            Architect Process
          </a>
        </div>

        {/* Stats row */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16">
          {[
            { value: "650", unit: "m²", label: "Total Site" },
            { value: "310", unit: "m²", label: "Built Area" },
            { value: "7", unit: "", label: "Design Phases" },
            { value: "24", unit: "mo", label: "Project Duration" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-serif text-3xl text-architect-400" style={{ fontFamily: "'Playfair Display', serif" }}>
                {s.value}
                <span className="text-lg text-architect-600 ml-1">{s.unit}</span>
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
