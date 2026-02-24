"use client";
import { useState } from "react";
import { elevationViews } from "@/lib/siteData";

export default function ElevationSection() {
  const [active, setActive] = useState(elevationViews[0].id);
  const view = elevationViews.find((v) => v.id === active)!;

  return (
    <section id="elevation" className="py-24 bg-stone-950">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <p className="text-architect-500 text-xs uppercase tracking-[0.3em] mb-3">03 — Elevation Views</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2
              className="font-serif text-4xl md:text-5xl text-stone-100"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Architectural Elevations
              <span className="block text-architect-400 italic text-3xl mt-1">All Four Faces</span>
            </h2>
            <p className="max-w-sm text-stone-400 text-sm leading-relaxed">
              Each elevation reveals how the building responds to its surroundings —
              street presence, solar access, privacy, and material expression.
            </p>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex flex-wrap gap-2 mb-8" role="tablist">
          {elevationViews.map((v) => (
            <button
              key={v.id}
              id={`tab-elevation-${v.id}`}
              role="tab"
              aria-selected={active === v.id}
              onClick={() => setActive(v.id)}
              className={`px-5 py-2.5 text-xs uppercase tracking-widest border transition-all duration-300 ${
                active === v.id
                  ? "bg-architect-600 border-architect-600 text-stone-950 font-semibold"
                  : "border-stone-700 text-stone-400 hover:border-architect-600 hover:text-architect-400"
              }`}
            >
              {v.label.split(" ").slice(0, 1).join("")} Elevation
            </button>
          ))}
        </div>

        {/* Elevation drawing */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* SVG elevation diagram */}
          <div className="lg:col-span-3 relative bg-stone-900 border border-stone-800" style={{ paddingBottom: "55%" }}>
            <svg
              viewBox="0 0 800 440"
              className="absolute inset-0 w-full h-full"
              aria-label={`${view.label} architectural elevation`}
            >
              {/* Blueprint bg */}
              <rect width="800" height="440" fill="#0d1118" />
              {Array.from({ length: 20 }, (_, i) => (
                <line key={`gv${i}`} x1={i * 40} y1="0" x2={i * 40} y2="440" stroke="#111827" strokeWidth="0.5" />
              ))}
              {Array.from({ length: 11 }, (_, i) => (
                <line key={`gh${i}`} x1="0" y1={i * 40} x2="800" y2={i * 40} stroke="#111827" strokeWidth="0.5" />
              ))}

              {/* Ground line */}
              <line x1="40" y1="380" x2="760" y2="380" stroke="#57514a" strokeWidth="1.5" />
              <text x="400" y="398" textAnchor="middle" fill="#57514a" fontSize="9" fontFamily="Inter">GL RL 0.000</text>

              {/* --- North front elevation --- */}
              {active === "north" && (
                <>
                  {/* Main structure */}
                  <rect x="80" y="120" width="640" height="260" fill="none" stroke="#a8875e" strokeWidth="2" />
                  {/* Roof */}
                  <path d="M60 120 L400 50 L740 120" fill="none" stroke="#a8875e" strokeWidth="2" />
                  {/* Garage door */}
                  <rect x="530" y="250" width="160" height="130" fill="rgba(100,116,139,0.15)" stroke="#64748b" strokeWidth="1.5" />
                  <line x1="530" y1="280" x2="690" y2="280" stroke="#64748b" strokeWidth="0.8" />
                  <line x1="530" y1="310" x2="690" y2="310" stroke="#64748b" strokeWidth="0.8" />
                  <line x1="530" y1="340" x2="690" y2="340" stroke="#64748b" strokeWidth="0.8" />
                  {/* Entry */}
                  <rect x="320" y="250" width="90" height="130" fill="rgba(168,135,94,0.1)" stroke="#a8875e" strokeWidth="1.5" />
                  <rect x="330" y="260" width="35" height="80" fill="none" stroke="#a8875e" strokeWidth="1" />
                  <rect x="368" y="260" width="35" height="80" fill="none" stroke="#a8875e" strokeWidth="1" />
                  {/* Study window */}
                  <rect x="120" y="160" width="140" height="100" fill="rgba(99,155,210,0.12)" stroke="#639bd2" strokeWidth="1.5" />
                  {/* Cedar battens */}
                  {Array.from({ length: 12 }, (_, i) => (
                    <line key={`b${i}`} x1={120 + i * 11} y1="160" x2={120 + i * 11} y2="260" stroke="#8B6914" strokeWidth="2.5" opacity="0.7" />
                  ))}
                  {/* Blade wall */}
                  <rect x="80" y="80" width="30" height="300" fill="rgba(168,135,94,0.3)" stroke="#a8875e" strokeWidth="1.5" />
                  <rect x="710" y="80" width="30" height="300" fill="rgba(168,135,94,0.3)" stroke="#a8875e" strokeWidth="1.5" />
                  {/* Dimension: total width */}
                  <line x1="80" y1="30" x2="740" y2="30" stroke="#57514a" strokeWidth="0.8" />
                  <line x1="80" y1="24" x2="80" y2="36" stroke="#57514a" strokeWidth="0.8" />
                  <line x1="740" y1="24" x2="740" y2="36" stroke="#57514a" strokeWidth="0.8" />
                  <text x="410" y="26" textAnchor="middle" fill="#57514a" fontSize="9" fontFamily="Inter">18,000</text>
                  {/* Heights */}
                  <line x1="30" y1="120" x2="30" y2="380" stroke="#57514a" strokeWidth="0.8" />
                  <line x1="24" y1="120" x2="36" y2="120" stroke="#57514a" strokeWidth="0.8" />
                  <line x1="24" y1="380" x2="36" y2="380" stroke="#57514a" strokeWidth="0.8" />
                  <text x="18" y="255" textAnchor="middle" fill="#57514a" fontSize="9" fontFamily="Inter" transform="rotate(-90 18 255)">6,500</text>
                </>
              )}

              {/* --- South garden elevation --- */}
              {active === "south" && (
                <>
                  <rect x="80" y="120" width="640" height="260" fill="none" stroke="#a8875e" strokeWidth="2" />
                  {/* Flat roof */}
                  <rect x="60" y="100" width="680" height="20" fill="rgba(168,135,94,0.2)" stroke="#a8875e" strokeWidth="1.5" />
                  {/* Full-height glazing GF */}
                  <rect x="90" y="250" width="480" height="130" fill="rgba(99,155,210,0.18)" stroke="#639bd2" strokeWidth="2" />
                  {/* Stacker door mullions */}
                  {[1,2,3,4,5].map((m) => (
                    <line key={`m${m}`} x1={90 + m * 80} y1="250" x2={90 + m * 80} y2="380" stroke="#639bd2" strokeWidth="0.8" />
                  ))}
                  {/* Cantilever slab line */}
                  <rect x="60" y="230" width="680" height="20" fill="rgba(100,116,139,0.20)" stroke="#64748b" strokeWidth="1.5" />
                  <text x="400" y="245" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="Inter">CANTILEVER SLAB — 1200mm OVERHANG</text>
                  {/* Steel column */}
                  <rect x="80" y="120" width="10" height="260" fill="rgba(100,116,139,0.4)" stroke="#94a3b8" strokeWidth="1" />
                  <rect x="710" y="120" width="10" height="260" fill="rgba(100,116,139,0.4)" stroke="#94a3b8" strokeWidth="1" />
                  {/* Terrace deck */}
                  <rect x="90" y="374" width="480" height="8" fill="rgba(139,105,20,0.4)" stroke="#8B6914" strokeWidth="1" />
                  <text x="330" y="398" textAnchor="middle" fill="#8B6914" fontSize="9" fontFamily="Inter">HARDWOOD DECK RL -0.150</text>
                </>
              )}

              {/* --- East side elevation --- */}
              {active === "east" && (
                <>
                  <rect x="120" y="120" width="560" height="260" fill="none" stroke="#a8875e" strokeWidth="2" />
                  <path d="M100 120 L400 50 L700 120" fill="none" stroke="#a8875e" strokeWidth="2" />
                  {/* Masonry spine */}
                  <rect x="120" y="80" width="30" height="300" fill="rgba(168,135,94,0.25)" stroke="#a8875e" strokeWidth="1.5" />
                  {/* masonry hatch */}
                  {Array.from({ length: 15 }, (_, i) => (
                    <line key={`mc${i}`} x1="120" y1={80 + i * 20} x2="150" y2={80 + i * 20} stroke="#6b5840" strokeWidth="0.6" />
                  ))}
                  {/* Slot windows */}
                  <rect x="300" y="200" width="30" height="120" fill="rgba(99,155,210,0.15)" stroke="#639bd2" strokeWidth="1" />
                  <rect x="480" y="220" width="30" height="80" fill="rgba(99,155,210,0.15)" stroke="#639bd2" strokeWidth="1" />
                  <text x="315" y="198" fill="#639bd2" fontSize="8" fontFamily="Inter">300×1200 obscure</text>
                  {/* Setback annotation */}
                  <line x1="760" y1="380" x2="680" y2="380" stroke="#ef4444" strokeWidth="0.8" strokeDasharray="4 3" />
                  <line x1="760" y1="374" x2="760" y2="386" stroke="#ef4444" strokeWidth="0.8" />
                  <line x1="680" y1="374" x2="680" y2="386" stroke="#ef4444" strokeWidth="0.8" />
                  <text x="720" y="370" textAnchor="middle" fill="#ef4444" fontSize="9" fontFamily="Inter">900 setback</text>
                </>
              )}

              {/* --- Cross section --- */}
              {active === "section" && (
                <>
                  {/* Outline */}
                  <rect x="80" y="80" width="640" height="300" fill="none" stroke="#a8875e" strokeWidth="2" />
                  {/* Ground slab */}
                  <rect x="80" y="360" width="640" height="20" fill="rgba(168,135,94,0.3)" stroke="#a8875e" strokeWidth="1.5" />
                  {/* Foundation beams */}
                  <rect x="80" y="378" width="100" height="20" fill="rgba(168,135,94,0.3)" stroke="#a8875e" strokeWidth="1" />
                  <rect x="620" y="378" width="100" height="20" fill="rgba(168,135,94,0.3)" stroke="#a8875e" strokeWidth="1" />
                  {/* First floor slab */}
                  <rect x="80" y="220" width="640" height="15" fill="rgba(100,116,139,0.4)" stroke="#64748b" strokeWidth="1.5" />
                  {/* Void / double height */}
                  <rect x="80" y="80" width="280" height="280" fill="rgba(99,155,210,0.06)" stroke="#639bd2" strokeWidth="1" strokeDasharray="4 3" />
                  <text x="220" y="210" textAnchor="middle" fill="#639bd2" fontSize="10" fontFamily="Inter">VOID</text>
                  <text x="220" y="224" textAnchor="middle" fill="#639bd2" fontSize="9" fontFamily="Inter">4500</text>
                  {/* Stair */}
                  {[0,1,2,3,4,5,6,7].map((s) => (
                    <rect key={`s${s}`} x={180 + s * 22} y={358 - s * 18} width="22" height="18" fill="rgba(139,105,20,0.25)" stroke="#8B6914" strokeWidth="0.8" />
                  ))}
                  {/* Bridge */}
                  <rect x="280" y="215" width="440" height="8" fill="rgba(99,155,210,0.3)" stroke="#639bd2" strokeWidth="1" />
                  <text x="500" y="210" textAnchor="middle" fill="#639bd2" fontSize="9" fontFamily="Inter">GLASS BALUSTRADE BRIDGE</text>
                  {/* Ceiling line GF */}
                  <line x1="360" y1="220" x2="720" y2="220" stroke="#57514a" strokeWidth="0.8" strokeDasharray="3 3" />
                  <text x="715" y="216" fill="#57514a" fontSize="8" fontFamily="Inter" textAnchor="end">2700 ceiling</text>
                  {/* Height dimension */}
                  <line x1="750" y1="80" x2="750" y2="380" stroke="#57514a" strokeWidth="0.8" />
                  <line x1="744" y1="80" x2="756" y2="80" stroke="#57514a" strokeWidth="0.8" />
                  <line x1="744" y1="380" x2="756" y2="380" stroke="#57514a" strokeWidth="0.8" />
                  <text x="768" y="235" textAnchor="start" fill="#57514a" fontSize="9" fontFamily="Inter" transform="rotate(90 768 235)">8,200 total height</text>
                </>
              )}

              {/* Section cut label */}
              <text x="760" y="30" fill="#57514a" fontSize="10" fontFamily="Inter" fontWeight="bold">{view.label}</text>
            </svg>

            {/* Annotation pins */}
            {view.annotations.map((ann, i) => (
              <div
                key={i}
                className="absolute group"
                style={{ left: `${ann.x}%`, top: `${ann.y}%`, transform: "translate(-50%, -50%)" }}
              >
                <div className="w-5 h-5 rounded-full bg-architect-600 flex items-center justify-center text-[9px] font-bold text-stone-950 cursor-default hover:scale-125 transition-transform duration-200">
                  {i + 1}
                </div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-52 glass text-xs text-stone-300 p-2 rounded-sm shadow-xl z-20 leading-snug">
                  {ann.text}
                </div>
              </div>
            ))}
          </div>

          {/* Description panel */}
          <div className="lg:col-span-2 flex flex-col justify-start gap-6">
            <div>
              <h3 className="font-serif text-2xl text-stone-100 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                {view.label}
              </h3>
              <p className="text-stone-400 text-sm leading-relaxed">{view.description}</p>
            </div>

            {/* Numbered annotations list */}
            <div>
              <h4 className="text-xs uppercase tracking-widest text-stone-600 mb-4">Key Annotations</h4>
              <ul className="space-y-3">
                {view.annotations.map((ann, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-architect-600/20 border border-architect-700 flex items-center justify-center text-[9px] font-bold text-architect-400">
                      {i + 1}
                    </span>
                    <span className="text-sm text-stone-400 leading-snug">{ann.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Material note */}
            <div className="glass p-4 rounded-sm">
              <p className="text-xs text-stone-500 uppercase tracking-widest mb-2">Drawing Note</p>
              <p className="text-xs text-stone-400 leading-relaxed">
                All dimensions in millimetres. Elevations drawn to 1:100 scale. Refer to structural engineer drawings
                for connection details and hold-down specifications.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
