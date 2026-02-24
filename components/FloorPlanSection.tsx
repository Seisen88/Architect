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
            <p className="text-architect-500 text-xs uppercase tracking-[0.3em] mb-3">01 — Floor Plan · Sheet A 03 (Scale 1:200)</p>
            <h2 className="font-serif text-4xl md:text-5xl text-stone-100" style={{ fontFamily: "'Playfair Display', serif" }}>
              Ground Floor Plan
              <span className="block text-architect-400 italic text-3xl mt-1">New Government Center, E. B. Magalona</span>
            </h2>
          </div>
          <p className="max-w-md text-stone-400 text-sm leading-relaxed">
            Click any <span className="text-architect-400 font-medium">guide arrow dot</span> to reveal the
            architect's design rationale — from the circular Grand Lobby void to the Integrated Services Hub layout.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-8">
          {[
            { color: "bg-architect-500", label: "Executive / Admin" },
            { color: "bg-blue-600", label: "Financial Services" },
            { color: "bg-emerald-700", label: "Public Services" },
            { color: "bg-slate-500", label: "Judicial / Legal" },
            { color: "bg-amber-700", label: "Integrated Hub" },
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
            aria-label="New Government Center — Ground Floor Plan (Sheet A03)"
          >
            {/* Background */}
            <rect width="1000" height="620" fill="#111110" />

            {/* Column grid — A to Q horizontally */}
            {["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q"].map((col, i) => {
              const x = 60 + i * 53;
              return (
                <g key={col}>
                  <line x1={x} y1="40" x2={x} y2="590" stroke="#1e1c1a" strokeWidth="0.7" />
                  <text x={x} y="32" textAnchor="middle" fill="#3f3a35" fontSize="10" fontFamily="Inter">{col}</text>
                </g>
              );
            })}
            {/* Row grid — 1 to 12 vertically */}
            {Array.from({ length: 12 }, (_, i) => {
              const y = 50 + i * 46;
              return (
                <g key={i}>
                  <line x1="40" y1={y} x2="960" y2={y} stroke="#1e1c1a" strokeWidth="0.7" />
                  <text x="32" y={y + 4} textAnchor="middle" fill="#3f3a35" fontSize="10" fontFamily="Inter">{i + 1}</text>
                </g>
              );
            })}

            {/* Outer building boundary */}
            <rect x="60" y="50" width="900" height="530" fill="none" stroke="#a8875e" strokeWidth="2.5" />

            {/* === WEST WING — Executive & Financial === */}
            <rect x="60" y="50" width="290" height="530" fill="rgba(168,135,94,0.06)" stroke="#a8875e" strokeWidth="1" />

            {/* Office of the Mayor */}
            <rect x="65" y="55" width="130" height="90" fill="rgba(168,135,94,0.18)" stroke="#a8875e" strokeWidth="1.5" />
            <text x="100" y="98" fill="#a8875e" fontSize="9" fontFamily="Inter" opacity={0.9}>MAYOR'S</text>
            <text x="100" y="110" fill="#a8875e" fontSize="9" fontFamily="Inter" opacity={0.9}>OFFICE</text>

            {/* Office of the Vice Mayor */}
            <rect x="195" y="55" width="155" height="90" fill="rgba(168,135,94,0.14)" stroke="#a8875e" strokeWidth="1.5" />
            <text x="238" y="98" fill="#a8875e" fontSize="9" fontFamily="Inter" opacity={0.9}>VICE MAYOR'S</text>
            <text x="245" y="110" fill="#a8875e" fontSize="9" fontFamily="Inter" opacity={0.9}>OFFICE</text>

            {/* SB Secretary */}
            <rect x="65" y="145" width="285" height="60" fill="rgba(168,135,94,0.10)" stroke="#a8875e" strokeWidth="1" />
            <text x="170" y="179" fill="#a8875e" fontSize="9" fontFamily="Inter" opacity={0.8}>SANGGUNIANG BAYAN SECRETARY</text>

            {/* Treasury */}
            <rect x="65" y="205" width="140" height="80" fill="rgba(37,99,235,0.14)" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="110" y="245" fill="#60a5fa" fontSize="9" fontFamily="Inter">TREASURY</text>

            {/* Accounting */}
            <rect x="205" y="205" width="145" height="80" fill="rgba(37,99,235,0.12)" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="250" y="245" fill="#60a5fa" fontSize="9" fontFamily="Inter">ACCOUNTING</text>

            {/* Budget */}
            <rect x="65" y="285" width="100" height="75" fill="rgba(37,99,235,0.10)" stroke="#3b82f6" strokeWidth="1" />
            <text x="95" y="326" fill="#60a5fa" fontSize="9" fontFamily="Inter">BUDGET</text>

            {/* Assessor */}
            <rect x="165" y="285" width="100" height="75" fill="rgba(37,99,235,0.10)" stroke="#3b82f6" strokeWidth="1" />
            <text x="190" y="326" fill="#60a5fa" fontSize="9" fontFamily="Inter">ASSESSOR</text>

            {/* MPDC */}
            <rect x="265" y="285" width="85" height="75" fill="rgba(37,99,235,0.10)" stroke="#3b82f6" strokeWidth="1" />
            <text x="280" y="326" fill="#60a5fa" fontSize="8" fontFamily="Inter">MPDC</text>

            {/* Business Permit & Licensing */}
            <rect x="65" y="360" width="285" height="60" fill="rgba(245,158,11,0.14)" stroke="#d97706" strokeWidth="1.5" />
            <text x="150" y="394" fill="#fbbf24" fontSize="9" fontFamily="Inter">BUSINESS PERMIT &amp; LICENSING</text>

            {/* MSWDO / HR / Records */}
            <rect x="65" y="420" width="130" height="80" fill="rgba(21,128,61,0.12)" stroke="#16a34a" strokeWidth="1" />
            <text x="82" y="460" fill="#22c55e" fontSize="8" fontFamily="Inter">MSWDO</text>

            <rect x="195" y="420" width="80" height="80" fill="rgba(21,128,61,0.10)" stroke="#16a34a" strokeWidth="1" />
            <text x="214" y="460" fill="#22c55e" fontSize="8" fontFamily="Inter">HR</text>

            <rect x="275" y="420" width="75" height="80" fill="rgba(21,128,61,0.10)" stroke="#16a34a" strokeWidth="1" />
            <text x="285" y="460" fill="#22c55e" fontSize="8" fontFamily="Inter">RECORDS</text>

            {/* Staff rooms / Comcen */}
            <rect x="65" y="500" width="285" height="75" fill="rgba(100,116,139,0.10)" stroke="#64748b" strokeWidth="1" />
            <text x="135" y="537" fill="#94a3b8" fontSize="9" fontFamily="Inter">COMCEN · ELECTRICAL RM · STAFF</text>

            {/* === CENTRAL — Grand Lobby (Circular void) === */}
            <rect x="350" y="50" width="300" height="530" fill="rgba(255,255,255,0.02)" />
            <circle cx="500" cy="330" r="110" fill="rgba(168,135,94,0.06)" stroke="#a8875e" strokeWidth="2" strokeDasharray="6 4" />
            <text x="500" y="325" textAnchor="middle" fill="#a8875e" fontSize="12" fontFamily="Inter" fontWeight="600">GRAND</text>
            <text x="500" y="342" textAnchor="middle" fill="#a8875e" fontSize="12" fontFamily="Inter" fontWeight="600">LOBBY</text>
            <text x="500" y="358" textAnchor="middle" fill="#6b5840" fontSize="9" fontFamily="Inter">Circular Void</text>

            {/* Guard House */}
            <rect x="370" y="55" width="80" height="60" fill="rgba(100,116,139,0.12)" stroke="#64748b" strokeWidth="1" />
            <text x="395" y="88" fill="#94a3b8" fontSize="8" fontFamily="Inter">GUARD</text>

            {/* Elevator + Stairs */}
            <rect x="460" y="55" width="80" height="60" fill="rgba(168,135,94,0.10)" stroke="#a8875e" strokeWidth="1" />
            <text x="476" y="82" fill="#a8875e" fontSize="8" fontFamily="Inter">LIFT</text>
            <text x="476" y="94" fill="#a8875e" fontSize="8" fontFamily="Inter">STAIRS</text>

            {/* PWD Ramps */}
            <rect x="552" y="55" width="90" height="60" fill="rgba(21,128,61,0.10)" stroke="#16a34a" strokeWidth="1" />
            <text x="570" y="82" fill="#22c55e" fontSize="8" fontFamily="Inter">PWD</text>
            <text x="570" y="94" fill="#22c55e" fontSize="8" fontFamily="Inter">RAMPS</text>

            {/* Conference Rooms */}
            <rect x="360" y="486" width="140" height="88" fill="rgba(100,116,139,0.10)" stroke="#64748b" strokeWidth="1" />
            <text x="400" y="532" fill="#94a3b8" fontSize="9" fontFamily="Inter">CONFERENCE</text>

            <rect x="502" y="486" width="140" height="88" fill="rgba(100,116,139,0.10)" stroke="#64748b" strokeWidth="1" />
            <text x="542" y="532" fill="#94a3b8" fontSize="9" fontFamily="Inter">STORAGE</text>

            {/* === EAST WING — Public Services === */}
            <rect x="650" y="50" width="310" height="530" fill="rgba(21,128,61,0.04)" stroke="#a8875e" strokeWidth="1" />

            {/* LCR */}
            <rect x="655" y="55" width="145" height="80" fill="rgba(21,128,61,0.14)" stroke="#16a34a" strokeWidth="1.5" />
            <text x="712" y="99" fill="#22c55e" fontSize="9" fontFamily="Inter">LCR</text>

            {/* Agriculture */}
            <rect x="800" y="55" width="155" height="80" fill="rgba(21,128,61,0.12)" stroke="#16a34a" strokeWidth="1.5" />
            <text x="850" y="99" fill="#22c55e" fontSize="9" fontFamily="Inter">AGRICULTURE</text>

            {/* Engineering */}
            <rect x="655" y="135" width="145" height="80" fill="rgba(21,128,61,0.10)" stroke="#16a34a" strokeWidth="1" />
            <text x="700" y="179" fill="#22c55e" fontSize="9" fontFamily="Inter">ENGINEERING</text>

            {/* MENRO */}
            <rect x="800" y="135" width="155" height="80" fill="rgba(21,128,61,0.10)" stroke="#16a34a" strokeWidth="1" />
            <text x="848" y="179" fill="#22c55e" fontSize="9" fontFamily="Inter">MENRO</text>

            {/* BIR */}
            <rect x="655" y="215" width="100" height="75" fill="rgba(245,158,11,0.14)" stroke="#d97706" strokeWidth="1.5" />
            <text x="690" y="256" fill="#fbbf24" fontSize="9" fontFamily="Inter">BIR</text>

            {/* LTO */}
            <rect x="755" y="215" width="100" height="75" fill="rgba(245,158,11,0.12)" stroke="#d97706" strokeWidth="1.5" />
            <text x="790" y="256" fill="#fbbf24" fontSize="9" fontFamily="Inter">LTO</text>

            {/* PhilHealth */}
            <rect x="855" y="215" width="100" height="75" fill="rgba(245,158,11,0.12)" stroke="#d97706" strokeWidth="1.5" />
            <text x="880" y="256" fill="#fbbf24" fontSize="8" fontFamily="Inter">PHILHEALTH</text>

            {/* Post Office */}
            <rect x="655" y="290" width="145" height="70" fill="rgba(245,158,11,0.10)" stroke="#d97706" strokeWidth="1" />
            <text x="700" y="328" fill="#fbbf24" fontSize="9" fontFamily="Inter">POST OFFICE</text>

            {/* Toilets */}
            <rect x="800" y="290" width="155" height="70" fill="rgba(100,116,139,0.10)" stroke="#64748b" strokeWidth="1" />
            <text x="848" y="328" fill="#94a3b8" fontSize="9" fontFamily="Inter">M/F TOILETS</text>

            {/* Storage / Electrical east */}
            <rect x="655" y="360" width="300" height="60" fill="rgba(100,116,139,0.08)" stroke="#64748b" strokeWidth="1" />
            <text x="775" y="394" fill="#64748b" fontSize="9" fontFamily="Inter">STORAGE · ELECTRICAL RM</text>

            {/* Staff rooms east */}
            <rect x="655" y="420" width="300" height="160" fill="rgba(100,116,139,0.08)" stroke="#64748b" strokeWidth="1" />
            <text x="780" y="505" fill="#64748b" fontSize="9" fontFamily="Inter">STAFF ROOMS · PANTRY</text>

            {/* North arrow */}
            <g transform="translate(948 86)">
              <circle cx="0" cy="0" r="24" fill="none" stroke="#3f3a35" strokeWidth="1" />
              <path d="M0-18 L4 6 L0 2 L-4 6Z" fill="#a8875e" />
              <path d="M0-18 L-4 6 L0 2 L4 6Z" fill="#3f3a35" />
              <text x="0" y="26" textAnchor="middle" fill="#a8875e" fontSize="9" fontFamily="Inter" fontWeight="bold">N</text>
            </g>

            {/* Scale bar — 1:200 */}
            <g transform="translate(80 605)">
              <line x1="0" y1="0" x2="160" y2="0" stroke="#57514a" strokeWidth="1" />
              <line x1="0" y1="-4" x2="0" y2="4" stroke="#57514a" strokeWidth="1" />
              <line x1="80" y1="-4" x2="80" y2="4" stroke="#57514a" strokeWidth="1" />
              <line x1="160" y1="-4" x2="160" y2="4" stroke="#57514a" strokeWidth="1" />
              <text x="0" y="14" fill="#57514a" fontSize="8" fontFamily="Inter">0</text>
              <text x="72" y="14" fill="#57514a" fontSize="8" fontFamily="Inter">10m</text>
              <text x="151" y="14" fill="#57514a" fontSize="8" fontFamily="Inter">20m</text>
            </g>

            {/* Sheet label */}
            <text x="840" y="615" fill="#3f3a35" fontSize="9" fontFamily="Inter">Sheet A03 · Ground Floor Plan · Scale 1:200</text>
          </svg>

          {/* Guide Arrow overlays */}
          {floorPlanAnnotations.map((ann) => (
            <GuideArrow key={ann.id} annotation={ann} />
          ))}
        </div>

        {/* Caption */}
        <p className="mt-4 text-xs text-stone-600 text-right">
          Sheet A 03 — Ground Floor Plan 1:200 &nbsp;|&nbsp; New Government Center for E. B. Magalona &nbsp;|&nbsp; Erica Mae D. Pancho, BS Architecture 5C &nbsp;|&nbsp; Ar. Gary Peter L. Bello, UAP
        </p>
      </div>
    </section>
  );
}
