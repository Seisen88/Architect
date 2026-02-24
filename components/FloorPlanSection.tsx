"use client";
import GuideArrow from "@/components/GuideArrow";
import { floorPlanAnnotations } from "@/lib/siteData";

export default function FloorPlanSection() {
  return (
    <section id="floor-plan" className="py-24 bg-stone-950">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
          <div>
            <p className="text-architect-500 text-xs uppercase tracking-[0.3em] mb-3">01 — Floor Plan Diagram</p>
            <h2 className="font-serif text-4xl md:text-5xl text-stone-100" style={{ fontFamily: "'Playfair Display', serif" }}>
              Functional Layout
              <span className="block text-architect-400 italic text-3xl mt-1">New Government Center, E. B. Magalona</span>
            </h2>
          </div>
          <p className="max-w-md text-stone-400 text-sm leading-relaxed">
            Click any <span className="text-architect-400 font-medium">guide arrow dot</span> to reveal the
            functional zones of the ground floor layout.
          </p>
        </div>

        {/* Legend block based on EXACT user image colors */}
        <div className="flex flex-wrap gap-4 mb-8">
          {[
            { color: "bg-[#85d5fd]", label: "Executive & Admin" },
            { color: "bg-[#9a8b84]", label: "Civil Records & Permits" },
            { color: "bg-[#7ee0a5]", label: "Engineering, Health & Welfare" },
            { color: "bg-[#f6de8c]", label: "Financial Services" },
            { color: "bg-[#a1a1a1]", label: "National Hub (BIR/LTO)" },
            { color: "bg-[#e5dcd3]", label: "Circulation & Lobby" },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-sm ${l.color}`} />
              <span className="text-xs text-stone-400 uppercase tracking-wider">{l.label}</span>
            </div>
          ))}
          <div className="flex items-center gap-2 ml-auto">
            <span className="w-3 h-0.5 bg-architect-500" />
            <span className="text-xs text-stone-500">Click dot to read annotation</span>
          </div>
        </div>

        {/* Image-perfect Block Diagram SVG */}
        <div
          className="relative w-full overflow-hidden bg-white/5 rounded-xl border border-white/10"
          style={{ paddingBottom: "50%" }}
        >
          <svg
            viewBox="0 0 1000 500"
            className="absolute inset-0 w-full h-full bg-white shadow-inner"
            aria-label="New Government Center — Simplified Ground Floor Plan"
          >
            {/* BEIGE BASE (Circulation/Corridors) */}
            <rect x="50" y="50" width="80" height="350" fill="#e5dcd3" />
            <rect x="130" y="50" width="220" height="330" fill="#e5dcd3" />
            <rect x="130" y="330" width="280" height="50" fill="#e5dcd3" />
            
            <rect x="870" y="50" width="80" height="350" fill="#e5dcd3" />
            <rect x="620" y="50" width="250" height="330" fill="#e5dcd3" />
            <rect x="580" y="330" width="290" height="50" fill="#e5dcd3" />
            
            <circle cx="500" cy="380" r="95" fill="#e5dcd3" />
            <rect x="480" y="330" width="40" height="50" fill="#e5dcd3" />
            
            {/* FAR LEFT WING */}
            <rect x="50" y="50" width="60" height="15" fill="#e0e0e0" />
            <rect x="50" y="75" width="60" height="25" fill="#e0e0e0" />
            <rect x="50" y="115" width="60" height="25" fill="#e0e0e0" />
            <rect x="50" y="150" width="80" height="70" fill="#9a8b84" />
            <rect x="50" y="230" width="80" height="130" fill="#7ee0a5" />
            <rect x="50" y="375" width="80" height="25" fill="#e0e0e0" />
            
            {/* INNER LEFT WING */}
            <rect x="130" y="50" width="150" height="80" fill="#9a8b84" />
            <rect x="280" y="50" width="70" height="90" fill="#85d5fd" />
            <rect x="210" y="160" width="140" height="70" fill="#85d5fd" />
            <rect x="170" y="235" width="110" height="70" fill="#85d5fd" />
            
            {/* INNER RIGHT WING */}
            <rect x="640" y="50" width="230" height="80" fill="#7ee0a5" />
            <rect x="620" y="150" width="130" height="70" fill="#7ee0a5" />
            <rect x="710" y="225" width="90" height="100" fill="#7ee0a5" />
            
            {/* FAR RIGHT WING */}
            <rect x="890" y="50" width="60" height="20" fill="#e0e0e0" />
            <rect x="890" y="80" width="60" height="30" fill="#e0e0e0" />
            <rect x="890" y="130" width="60" height="60" fill="#a1a1a1" />
            <rect x="870" y="200" width="80" height="65" fill="#f6de8c" />
            <rect x="870" y="280" width="80" height="70" fill="#7ee0a5" />
            <rect x="870" y="375" width="80" height="25" fill="#e0e0e0" />
          </svg>

          {/* Guide Arrow overlays */}
          {floorPlanAnnotations.map((ann) => (
            <GuideArrow key={ann.id} annotation={ann} />
          ))}
        </div>

        {/* Caption */}
        <div className="mt-4 flex flex-col sm:flex-row justify-between text-xs text-stone-600 gap-1">
          <span>Functional Diagram · Ground Floor</span>
          <span>New Government Center · E.B. Magalona</span>
        </div>
      </div>
    </section>
  );
}
