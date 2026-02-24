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
            <p className="text-architect-500 text-xs uppercase tracking-[0.3em] mb-3">01 — Floor Plan · Sheet A-03 to A-04</p>
            <h2
              className="font-serif text-4xl md:text-5xl text-stone-100"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Ground Floor Plan
              <span className="block text-architect-400 italic text-3xl mt-1">Interactive Library &amp; Museum</span>
            </h2>
          </div>
          <p className="max-w-md text-stone-400 text-sm leading-relaxed">
            Click any <span className="text-architect-400 font-medium">guide arrow dot</span> to reveal the
            architect's design rationale — from the Timber Screen Fins on the north façade to the Terracotta Workshop dimensions.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-8">
          {[
            { color: "bg-architect-500", label: "Exhibition / Gallery" },
            { color: "bg-emerald-700", label: "Workshops" },
            { color: "bg-blue-600", label: "Auditorium" },
            { color: "bg-slate-500", label: "Admin / Office" },
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
          <svg
            viewBox="0 0 1000 620"
            className="absolute inset-0 w-full h-full"
            aria-label="Interactive Library & Museum — Ground Floor Plan (Sheet A-03/A-04)"
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

            {/* Irregular outer wall — angular museum footprint */}
            <polygon
              points="60,100 440,60 700,80 740,300 700,560 240,560 60,420"
              fill="none" stroke="#a8875e" strokeWidth="3"
            />

            {/* Entrance Lobby */}
            <rect x="60" y="350" width="180" height="130" fill="rgba(168,135,94,0.12)" stroke="#a8875e" strokeWidth="1.5" />
            <text x="105" y="415" fill="#a8875e" fontSize="10" fontFamily="Inter" opacity={0.8}>ENTRANCE</text>
            <text x="110" y="428" fill="#a8875e" fontSize="10" fontFamily="Inter" opacity={0.8}>LOBBY</text>

            {/* Security */}
            <rect x="60" y="280" width="120" height="70" fill="rgba(100,116,139,0.12)" stroke="#64748b" strokeWidth="1" />
            <text x="75" y="318" fill="#64748b" fontSize="9" fontFamily="Inter">SECURITY</text>

            {/* Permanent Core Gallery */}
            <rect x="240" y="100" width="260" height="180" fill="rgba(168,135,94,0.14)" stroke="#a8875e" strokeWidth="2" />
            <text x="295" y="188" fill="#a8875e" fontSize="10" fontFamily="Inter" opacity={0.8}>PERMANENT CORE</text>
            <text x="305" y="202" fill="#a8875e" fontSize="10" fontFamily="Inter" opacity={0.8}>GALLERY</text>

            {/* Interactive Zone */}
            <rect x="500" y="80" width="200" height="160" fill="rgba(168,135,94,0.1)" stroke="#a8875e" strokeWidth="1.5" strokeDasharray="5 3" />
            <text x="545" y="165" fill="#a8875e" fontSize="10" fontFamily="Inter" opacity={0.7}>INTERACTIVE</text>
            <text x="558" y="178" fill="#a8875e" fontSize="10" fontFamily="Inter" opacity={0.7}>ZONE</text>

            {/* Museum Shop */}
            <rect x="240" y="280" width="120" height="100" fill="rgba(100,116,139,0.1)" stroke="#64748b" strokeWidth="1" />
            <text x="265" y="333" fill="#64748b" fontSize="9" fontFamily="Inter">MUSEUM</text>
            <text x="268" y="346" fill="#64748b" fontSize="9" fontFamily="Inter">SHOP</text>

            {/* Auditorium */}
            <rect x="500" y="240" width="220" height="220" fill="rgba(37,99,235,0.12)" stroke="#3b82f6" strokeWidth="2" />
            <text x="565" y="355" fill="#60a5fa" fontSize="11" fontFamily="Inter" opacity={0.8}>AUDITORIUM</text>
            {/* Tiered seating lines */}
            {[0,1,2,3,4].map(r => (
              <rect key={`s${r}`} x={520 + r*22} y={270 + r*10} width={180 - r*20} height="12" fill="rgba(59,130,246,0.08)" stroke="#3b82f6" strokeWidth="0.5" />
            ))}

            {/* Exhibit Halls 1-4 */}
            <rect x="60" y="100" width="180" height="180" fill="rgba(168,135,94,0.10)" stroke="#a8875e" strokeWidth="1.5" />
            <text x="100" y="187" fill="#a8875e" fontSize="10" fontFamily="Inter" opacity={0.7}>EXHIBIT</text>
            <text x="98" y="200" fill="#a8875e" fontSize="10" fontFamily="Inter" opacity={0.7}>HALLS 1-4</text>
            <line x1="150" y1="100" x2="150" y2="280" stroke="#a8875e" strokeWidth="0.8" strokeDasharray="3 3" />
            <line x1="60" y1="190" x2="240" y2="190" stroke="#a8875e" strokeWidth="0.8" strokeDasharray="3 3" />

            {/* Wood Workshop */}
            <rect x="60" y="420" width="120" height="140" fill="rgba(21,128,61,0.12)" stroke="#16a34a" strokeWidth="1.5" />
            <text x="72" y="490" fill="#22c55e" fontSize="9" fontFamily="Inter" opacity={0.8}>WOOD W/S</text>
            <text x="72" y="503" fill="#15803d" fontSize="8" fontFamily="Inter">10 × 20m</text>

            {/* Metal Workshop */}
            <rect x="180" y="420" width="120" height="140" fill="rgba(21,128,61,0.10)" stroke="#16a34a" strokeWidth="1.5" />
            <text x="192" y="490" fill="#22c55e" fontSize="9" fontFamily="Inter" opacity={0.8}>METAL W/S</text>
            <text x="192" y="503" fill="#15803d" fontSize="8" fontFamily="Inter">10 × 20m</text>

            {/* Terracotta Workshop */}
            <rect x="300" y="420" width="110" height="140" fill="rgba(21,128,61,0.10)" stroke="#16a34a" strokeWidth="1.5" />
            <text x="310" y="490" fill="#22c55e" fontSize="9" fontFamily="Inter" opacity={0.8}>TERRACOTTA</text>
            <text x="316" y="503" fill="#15803d" fontSize="8" fontFamily="Inter">9 × 20m</text>

            {/* Director's Chamber */}
            <rect x="600" y="80" width="120" height="120" fill="rgba(100,116,139,0.14)" stroke="#64748b" strokeWidth="1.5" />
            <text x="618" y="133" fill="#94a3b8" fontSize="9" fontFamily="Inter">DIR. GEN.</text>
            <text x="618" y="146" fill="#94a3b8" fontSize="9" fontFamily="Inter">CHAMBER</text>
            <text x="624" y="159" fill="#475569" fontSize="8" fontFamily="Inter">5 × 7m</text>

            {/* Artifact Storage */}
            <rect x="410" y="380" width="90" height="100" fill="rgba(100,116,139,0.10)" stroke="#64748b" strokeWidth="1" />
            <text x="418" y="430" fill="#64748b" fontSize="8" fontFamily="Inter">ARTIFACT</text>
            <text x="418" y="442" fill="#64748b" fontSize="8" fontFamily="Inter">STORAGE</text>

            {/* Info desk */}
            <ellipse cx="150" cy="340" rx="35" ry="18" fill="rgba(168,135,94,0.15)" stroke="#a8875e" strokeWidth="1" />
            <text x="116" y="344" fill="#a8875e" fontSize="8" fontFamily="Inter">INFO DESK</text>

            {/* North arrow */}
            <g transform="translate(948 80)">
              <circle cx="0" cy="0" r="24" fill="none" stroke="#3f3a35" strokeWidth="1" />
              <path d="M0-18 L4 6 L0 2 L-4 6Z" fill="#a8875e" />
              <path d="M0-18 L-4 6 L0 2 L4 6Z" fill="#3f3a35" />
              <text x="0" y="26" textAnchor="middle" fill="#a8875e" fontSize="9" fontFamily="Inter" fontWeight="bold">N</text>
            </g>

            {/* Scale bar */}
            <g transform="translate(80 598)">
              <line x1="0" y1="0" x2="200" y2="0" stroke="#57514a" strokeWidth="1" />
              <line x1="0" y1="-4" x2="0" y2="4" stroke="#57514a" strokeWidth="1" />
              <line x1="100" y1="-4" x2="100" y2="4" stroke="#57514a" strokeWidth="1" />
              <line x1="200" y1="-4" x2="200" y2="4" stroke="#57514a" strokeWidth="1" />
              <text x="0" y="14" fill="#57514a" fontSize="8" fontFamily="Inter">0</text>
              <text x="90" y="14" fill="#57514a" fontSize="8" fontFamily="Inter">10m</text>
              <text x="188" y="14" fill="#57514a" fontSize="8" fontFamily="Inter">20m</text>
            </g>

            {/* Sheet label */}
            <text x="840" y="600" fill="#3f3a35" fontSize="9" fontFamily="Inter">Sheet A-03/A-04 · Scale 1:500 MTS</text>

            {/* Frontage dimension */}
            <line x1="60" y1="32" x2="700" y2="32" stroke="#57514a" strokeWidth="0.8" />
            <line x1="60" y1="26" x2="60" y2="38" stroke="#57514a" strokeWidth="0.8" />
            <line x1="700" y1="26" x2="700" y2="38" stroke="#57514a" strokeWidth="0.8" />
            <text x="365" y="26" textAnchor="middle" fill="#57514a" fontSize="9" fontFamily="Inter">42.61m (key segment) + compound footprint</text>
          </svg>

          {/* Guide Arrow overlays */}
          {floorPlanAnnotations.map((ann) => (
            <GuideArrow key={ann.id} annotation={ann} />
          ))}
        </div>

        {/* Caption */}
        <p className="mt-4 text-xs text-stone-600 text-right">
          Sheet A-03/A-04 — Interactive Library &amp; Museum, Himamaylan City · Karl Angelo G. Sumog-oy · Scale 1:500 MTS
        </p>
      </div>
    </section>
  );
}
