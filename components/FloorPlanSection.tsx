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
            <p className="text-architect-500 text-xs uppercase tracking-[0.3em] mb-3">01 — Floor Plan</p>
            <h2
              className="font-serif text-4xl md:text-5xl text-stone-100"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Ground Floor Plan
              <span className="block text-architect-400 italic text-3xl mt-1">Annotated & Explained</span>
            </h2>
          </div>
          <p className="max-w-md text-stone-400 text-sm leading-relaxed">
            Click any <span className="text-architect-400 font-medium">guide arrow dot</span> to reveal the
            architect's design rationale for each space — from orientation decisions to structural choices.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-8">
          {[
            { color: "bg-architect-500", label: "Living Zones" },
            { color: "bg-emerald-700", label: "Outdoor Areas" },
            { color: "bg-slate-500", label: "Service / Garage" },
            { color: "bg-blue-600", label: "Wet Areas" },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-sm ${l.color}`} />
              <span className="text-xs text-stone-500 uppercase tracking-wider">{l.label}</span>
            </div>
          ))}
          <div className="flex items-center gap-2 ml-auto">
            <span className="w-3 h-0.5 bg-architect-500" />
            <span className="text-xs text-stone-500">Click dot to read annotation</span>
          </div>
        </div>

        {/* Plan diagram */}
        <div className="relative w-full bg-stone-900 border border-stone-800 overflow-hidden" style={{ paddingBottom: "62%" }}>
          {/* SVG floor plan */}
          <svg
            viewBox="0 0 1000 620"
            className="absolute inset-0 w-full h-full"
            aria-label="Annotated ground floor plan"
          >
            {/* Background */}
            <rect width="1000" height="620" fill="#111110" />

            {/* Grid */}
            {Array.from({ length: 25 }, (_, i) => (
              <line key={`gv${i}`} x1={i * 40} y1="0" x2={i * 40} y2="620" stroke="#1e1c1a" strokeWidth="0.5" />
            ))}
            {Array.from({ length: 16 }, (_, i) => (
              <line key={`gh${i}`} x1="0" y1={i * 40} x2="1000" y2={i * 40} stroke="#1e1c1a" strokeWidth="0.5" />
            ))}

            {/* Outer wall */}
            <rect x="80" y="60" width="840" height="500" rx="2" fill="none" stroke="#a8875e" strokeWidth="3" />

            {/* Living Room */}
            <rect x="80" y="220" width="360" height="240" fill="rgba(168,135,94,0.12)" stroke="#a8875e" strokeWidth="1.5" />
            <text x="175" y="345" fill="#a8875e" fontSize="11" fontFamily="Inter" opacity={0.7}>LIVING ROOM</text>
            <text x="175" y="360" fill="#6b5840" fontSize="9" fontFamily="Inter">48 m²</text>

            {/* Study */}
            <rect x="80" y="60" width="220" height="160" fill="rgba(100,116,139,0.10)" stroke="#64748b" strokeWidth="1.5" />
            <text x="130" y="140" fill="#94a3b8" fontSize="11" fontFamily="Inter" opacity={0.7}>STUDY</text>
            <text x="130" y="155" fill="#475569" fontSize="9" fontFamily="Inter">14 m²</text>

            {/* Hallway / stair */}
            <rect x="300" y="60" width="120" height="160" fill="rgba(255,255,255,0.03)" stroke="#3f3a35" strokeWidth="1" />
            <text x="315" y="145" fill="#57514a" fontSize="10" fontFamily="Inter">STAIR</text>

            {/* Kitchen & Dining */}
            <rect x="440" y="60" width="360" height="240" fill="rgba(168,135,94,0.08)" stroke="#a8875e" strokeWidth="1.5" strokeDasharray="6 3" />
            <text x="540" y="170" fill="#a8875e" fontSize="11" fontFamily="Inter" opacity={0.7}>KITCHEN / DINING</text>
            <text x="570" y="185" fill="#6b5840" fontSize="9" fontFamily="Inter">32 m²</text>

            {/* Bathroom */}
            <rect x="540" y="300" width="180" height="120" fill="rgba(37,99,235,0.10)" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="580" y="360" fill="#60a5fa" fontSize="10" fontFamily="Inter" opacity={0.7}>BATHROOM</text>
            <text x="590" y="374" fill="#1d4ed8" fontSize="9" fontFamily="Inter">11 m²</text>

            {/* Master Bedroom */}
            <rect x="720" y="60" width="200" height="240" fill="rgba(168,135,94,0.10)" stroke="#a8875e" strokeWidth="1.5" />
            <text x="755" y="170" fill="#a8875e" fontSize="11" fontFamily="Inter" opacity={0.7}>MASTER BED</text>
            <text x="770" y="185" fill="#6b5840" fontSize="9" fontFamily="Inter">26 m²</text>

            {/* Terrace */}
            <rect x="80" y="460" width="460" height="100" fill="rgba(21,128,61,0.12)" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="5 4" />
            <text x="220" y="515" fill="#22c55e" fontSize="11" fontFamily="Inter" opacity={0.7}>OUTDOOR TERRACE</text>
            <text x="253" y="530" fill="#15803d" fontSize="9" fontFamily="Inter">22 m²</text>

            {/* Garage */}
            <rect x="720" y="300" width="200" height="260" fill="rgba(100,116,139,0.10)" stroke="#64748b" strokeWidth="1.5" />
            <text x="764" y="430" fill="#94a3b8" fontSize="11" fontFamily="Inter" opacity={0.7}>GARAGE</text>
            <text x="768" y="445" fill="#475569" fontSize="9" fontFamily="Inter">38 m²</text>

            {/* Laundry */}
            <rect x="540" y="420" width="180" height="140" fill="rgba(255,255,255,0.03)" stroke="#3f3a35" strokeWidth="1" />
            <text x="575" y="495" fill="#57514a" fontSize="10" fontFamily="Inter">LAUNDRY</text>

            {/* Door arcs */}
            <path d="M80 220 A30 30 0 0 1 110 190" fill="none" stroke="#a8875e" strokeWidth="1" />
            <path d="M440 300 A25 25 0 0 1 465 275" fill="none" stroke="#a8875e" strokeWidth="1" />

            {/* North arrow */}
            <g transform="translate(940 80)">
              <circle cx="0" cy="0" r="24" fill="none" stroke="#3f3a35" strokeWidth="1" />
              <path d="M0-18 L4 6 L0 2 L-4 6Z" fill="#a8875e" />
              <path d="M0-18 L-4 6 L0 2 L4 6Z" fill="#3f3a35" />
              <text x="0" y="26" textAnchor="middle" fill="#a8875e" fontSize="9" fontFamily="Inter" fontWeight="bold">N</text>
            </g>

            {/* Scale bar */}
            <g transform="translate(80 590)">
              <line x1="0" y1="0" x2="120" y2="0" stroke="#57514a" strokeWidth="1" />
              <line x1="0" y1="-4" x2="0" y2="4" stroke="#57514a" strokeWidth="1" />
              <line x1="60" y1="-4" x2="60" y2="4" stroke="#57514a" strokeWidth="1" />
              <line x1="120" y1="-4" x2="120" y2="4" stroke="#57514a" strokeWidth="1" />
              <text x="0" y="14" fill="#57514a" fontSize="8" fontFamily="Inter">0</text>
              <text x="54" y="14" fill="#57514a" fontSize="8" fontFamily="Inter">3m</text>
              <text x="110" y="14" fill="#57514a" fontSize="8" fontFamily="Inter">6m</text>
            </g>

            {/* Section cut line A-A */}
            <line x1="0" y1="310" x2="1000" y2="310" stroke="#ef4444" strokeWidth="0.8" strokeDasharray="8 4" opacity="0.4" />
            <text x="12" y="305" fill="#ef4444" fontSize="10" fontFamily="Inter" opacity="0.6">A</text>
            <text x="975" y="305" fill="#ef4444" fontSize="10" fontFamily="Inter" opacity="0.6">A</text>

            {/* Dimension lines */}
            {/* Overall width */}
            <line x1="80" y1="30" x2="920" y2="30" stroke="#57514a" strokeWidth="0.8" />
            <line x1="80" y1="22" x2="80" y2="38" stroke="#57514a" strokeWidth="0.8" />
            <line x1="920" y1="22" x2="920" y2="38" stroke="#57514a" strokeWidth="0.8" />
            <text x="485" y="25" textAnchor="middle" fill="#57514a" fontSize="9" fontFamily="Inter">21,000</text>

            {/* Overall height */}
            <line x1="50" y1="60" x2="50" y2="560" stroke="#57514a" strokeWidth="0.8" />
            <line x1="42" y1="60" x2="58" y2="60" stroke="#57514a" strokeWidth="0.8" />
            <line x1="42" y1="560" x2="58" y2="560" stroke="#57514a" strokeWidth="0.8" />
            <text x="36" y="315" textAnchor="middle" fill="#57514a" fontSize="9" fontFamily="Inter" transform="rotate(-90 36 315)">14,600</text>
          </svg>

          {/* Guide Arrow overlays */}
          {floorPlanAnnotations.map((ann) => (
            <GuideArrow key={ann.id} annotation={ann} />
          ))}
        </div>

        {/* Caption */}
        <p className="mt-4 text-xs text-stone-600 text-right">
          Drawing No. A1.01 — Ground Floor Plan 1:100 &nbsp;|&nbsp; All dimensions in millimetres unless noted
        </p>
      </div>
    </section>
  );
}
