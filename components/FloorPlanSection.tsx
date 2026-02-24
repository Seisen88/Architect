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
            architect's design rationale — from the circular entrance drive to the integrated services hub.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-8">
          {[
            { color: "bg-architect-600", label: "Executive / Admin" },
            { color: "bg-blue-700", label: "Financial Services" },
            { color: "bg-emerald-700", label: "Public Services" },
            { color: "bg-amber-700", label: "Integrated Hub (BIR/LTO/PhilHealth)" },
            { color: "bg-stone-600", label: "Support / Circulation" },
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

        {/* Plan diagram — matches Sheet A03 layout */}
        <div
          className="relative w-full bg-stone-900 border border-stone-800 overflow-hidden"
          style={{ paddingBottom: "55%" }}
        >
          <svg
            viewBox="0 0 1100 605"
            className="absolute inset-0 w-full h-full"
            aria-label="New Government Center — Ground Floor Plan Sheet A03"
          >
            <defs>
              <pattern id="grid" width="4" height="4" patternUnits="userSpaceOnUse">
                <path d="M 4 0 L 0 0 0 4" fill="none" stroke="#1a1916" strokeWidth="0.4" />
              </pattern>
            </defs>

            {/* Background */}
            <rect width="1100" height="605" fill="#0f0e0c" />
            <rect width="1100" height="605" fill="url(#grid)" />

            {/* ─── COLUMN GRID LABELS A–Q ─── */}
            {/* Col positions (x): A=55 B=110 C=165 D=235 E=290 F=345 G=400 H=455 I=510 J=565 K=620 L=695 M=755 N=815 O=875 P=935 Q=995 */}
            {[
              ["A",55],["B",112],["C",169],["D",240],["E",297],["F",354],
              ["G",411],["H",468],["I",525],["J",582],["K",639],
              ["L",710],["M",767],["N",824],["O",881],["P",938],["Q",995]
            ].map(([col, x]) => (
              <g key={col}>
                <circle cx={x} cy={16} r={10} fill="none" stroke="#3f3a35" strokeWidth={1}/>
                <text x={x} y={20} textAnchor="middle" fill="#3f3a35" fontSize="10" fontFamily="Inter">{col}</text>
              </g>
            ))}

            {/* ROW LABELS 1–12 */}
            {[1,2,3,4,5,6,7,8,9,10,12].map((row, i) => {
              const y = 38 + i * 47;
              return (
                <g key={row}>
                  <circle cx={30} cy={y} r={10} fill="none" stroke="#3f3a35" strokeWidth={1}/>
                  <text x={30} y={y+4} textAnchor="middle" fill="#3f3a35" fontSize="10" fontFamily="Inter">{row}</text>
                </g>
              );
            })}

            {/* ─────────────────────────────────────────── */}
            {/* WEST WING — columns A–C, rows 1–12         */}
            {/* ─────────────────────────────────────────── */}
            <rect x="48" y="30" width="125" height="530" fill="rgba(255,255,255,0.02)" stroke="#a8875e" strokeWidth="2"/>

            {/* Electrical Room top-left (rows 1-2) */}
            <rect x="48" y="30" width="60" height="75" fill="rgba(100,116,139,0.18)" stroke="#64748b" strokeWidth="1"/>
            <text x="63" y="63" fill="#94a3b8" fontSize="7" fontFamily="Inter">ELECTRICAL</text>
            <text x="68" y="73" fill="#94a3b8" fontSize="7" fontFamily="Inter">ROOM</text>

            {/* Stairs top-left (rows 1-2) */}
            <rect x="108" y="30" width="65" height="75" fill="rgba(100,116,139,0.12)" stroke="#64748b" strokeWidth="1"/>
            <text x="130" y="67" fill="#64748b" fontSize="7" fontFamily="Inter">STAIRS</text>
            {/* stair lines */}
            {[0,1,2,3,4,5].map(s=><line key={s} x1="110" y1={35+s*11} x2="172" y2={35+s*11} stroke="#475569" strokeWidth="0.7"/>)}

            {/* IT / Office rows 2-4 */}
            <rect x="48" y="105" width="125" height="65" fill="rgba(168,135,94,0.10)" stroke="#a8875e" strokeWidth="1"/>
            <text x="90" y="141" fill="#a8875e" fontSize="7.5" fontFamily="Inter">IT / OFFICE</text>

            {/* Office rows 4-5 */}
            <rect x="48" y="170" width="125" height="55" fill="rgba(168,135,94,0.10)" stroke="#a8875e" strokeWidth="1"/>
            <text x="88" y="200" fill="#a8875e" fontSize="7.5" fontFamily="Inter">OFFICE</text>

            {/* North arrow on left */}
            <g transform="translate(28 228)">
              <circle cx="0" cy="0" r="14" fill="none" stroke="#3f3a35" strokeWidth="1"/>
              <path d="M0-11 L3 4 L0 1 L-3 4Z" fill="#a8875e"/>
              <path d="M0-11 L-3 4 L0 1 L3 4Z" fill="#3f3a35"/>
              <text x="0" y="22" textAnchor="middle" fill="#a8875e" fontSize="8" fontFamily="Inter" fontWeight="bold">N</text>
            </g>

            {/* Treasury Hall / Treasurer (rows 5-7) */}
            <rect x="48" y="225" width="125" height="95" fill="rgba(37,99,235,0.15)" stroke="#3b82f6" strokeWidth="1.5"/>
            <text x="86" y="262" fill="#60a5fa" fontSize="7.5" fontFamily="Inter">TREASURER'S</text>
            <text x="90" y="273" fill="#60a5fa" fontSize="7.5" fontFamily="Inter">OFFICE</text>
            <text x="88" y="284" fill="#3b82f6" fontSize="7" fontFamily="Inter">TREASURY HALL</text>

            {/* Self-service / Transaction (rows 7-8) */}
            <rect x="48" y="320" width="60" height="70" fill="rgba(37,99,235,0.10)" stroke="#3b82f6" strokeWidth="1"/>
            <text x="56" y="352" fill="#60a5fa" fontSize="6.5" fontFamily="Inter">SELF</text>
            <text x="52" y="362" fill="#60a5fa" fontSize="6.5" fontFamily="Inter">SERVICE</text>
            <rect x="108" y="320" width="65" height="70" fill="rgba(37,99,235,0.10)" stroke="#3b82f6" strokeWidth="1"/>
            <text x="118" y="352" fill="#60a5fa" fontSize="6.5" fontFamily="Inter">TRANSACTION</text>
            <text x="120" y="362" fill="#60a5fa" fontSize="6.5" fontFamily="Inter">COUNTER</text>

            {/* Transaction Window (row 8) */}
            <rect x="48" y="390" width="125" height="40" fill="rgba(37,99,235,0.08)" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4 2"/>
            <text x="90" y="413" fill="#3b82f6" fontSize="7" fontFamily="Inter">TRANSACTION WINDOW</text>

            {/* Library (rows 9-10) */}
            <rect x="48" y="430" width="125" height="65" fill="rgba(168,135,94,0.12)" stroke="#a8875e" strokeWidth="1.5"/>
            <text x="93" y="465" fill="#a8875e" fontSize="8" fontFamily="Inter">LIBRARY</text>

            {/* Bottom west (row 12) */}
            <rect x="48" y="495" width="125" height="65" fill="rgba(100,116,139,0.08)" stroke="#64748b" strokeWidth="1"/>
            <text x="78" y="530" fill="#64748b" fontSize="7" fontFamily="Inter">LINKS / LOBBY</text>

            {/* ─────────────────────────────────────────── */}
            {/* LEFT-CENTER WING — cols D–H, rows 1–8      */}
            {/* ─────────────────────────────────────────── */}
            <rect x="173" y="30" width="298" height="398" fill="rgba(255,255,255,0.015)" stroke="#a8875e" strokeWidth="2"/>

            {/* Offices top D-H row 1-2 */}
            <rect x="173" y="30" width="75" height="75" fill="rgba(168,135,94,0.12)" stroke="#a8875e" strokeWidth="1"/>
            <text x="195" y="70" fill="#a8875e" fontSize="7.5" fontFamily="Inter">OFFICE</text>
            <rect x="248" y="30" width="75" height="75" fill="rgba(168,135,94,0.10)" stroke="#a8875e" strokeWidth="1"/>
            <text x="268" y="70" fill="#a8875e" fontSize="7.5" fontFamily="Inter">OFFICE</text>
            <rect x="323" y="30" width="75" height="75" fill="rgba(168,135,94,0.10)" stroke="#a8875e" strokeWidth="1"/>
            <text x="343" y="62" fill="#a8875e" fontSize="7" fontFamily="Inter">MUNICIPAL</text>
            <text x="345" y="73" fill="#a8875e" fontSize="7" fontFamily="Inter">BUDGET</text>
            <rect x="398" y="30" width="73" height="75" fill="rgba(168,135,94,0.10)" stroke="#a8875e" strokeWidth="1"/>
            <text x="412" y="70" fill="#a8875e" fontSize="7.5" fontFamily="Inter">OFFICE</text>

            {/* Offices rows 2-4 D-E */}
            <rect x="173" y="105" width="150" height="95" fill="rgba(168,135,94,0.10)" stroke="#a8875e" strokeWidth="1"/>
            <text x="225" y="158" fill="#a8875e" fontSize="7.5" fontFamily="Inter">ASSESSOR'S OFFICE</text>
            {/* Offices rows 2-4 F-H */}
            <rect x="323" y="105" width="148" height="95" fill="rgba(37,99,235,0.12)" stroke="#3b82f6" strokeWidth="1"/>
            <text x="358" y="145" fill="#60a5fa" fontSize="7.5" fontFamily="Inter">ACCOUNTING</text>

            {/* Offices rows 4-6 D-E */}
            <rect x="173" y="200" width="150" height="100" fill="rgba(37,99,235,0.12)" stroke="#3b82f6" strokeWidth="1"/>
            <text x="215" y="243" fill="#60a5fa" fontSize="7.5" fontFamily="Inter">BUDGET OFFICE</text>

            {/* Offices rows 4-6 F-H */}
            <rect x="323" y="200" width="148" height="55" fill="rgba(168,135,94,0.12)" stroke="#a8875e" strokeWidth="1"/>
            <text x="362" y="232" fill="#a8875e" fontSize="7.5" fontFamily="Inter">MPDC / OFFICE</text>
            <rect x="323" y="255" width="148" height="45" fill="rgba(168,135,94,0.10)" stroke="#a8875e" strokeWidth="1"/>
            <text x="365" y="281" fill="#a8875e" fontSize="7" fontFamily="Inter">CONF. ROOM</text>

            {/* OPEN WAITING AREA (rows 7-9, cols D-H) */}
            <rect x="173" y="300" width="298" height="128" fill="rgba(168,135,94,0.04)" stroke="#a8875e" strokeWidth="1.5" strokeDasharray="6 3"/>
            <text x="285" y="352" fill="#6b5840" fontSize="10" fontFamily="Inter">OPEN WAITING AREA</text>
            {/* Decorative trees in waiting area */}
            {[[215,328],[250,340],[290,325],[330,340],[360,328],[400,340],[445,328]].map(([tx,ty],i)=>(
              <circle key={i} cx={tx} cy={ty} r="10" fill="none" stroke="#2d4a2d" strokeWidth="1" opacity={0.6}/>
            ))}

            {/* Reception (row 9-10) */}
            <rect x="173" y="428" width="298" height="52" fill="rgba(168,135,94,0.14)" stroke="#a8875e" strokeWidth="1.5"/>
            <text x="290" y="457" fill="#a8875e" fontSize="9" fontFamily="Inter" fontWeight="600">RECEPTION</text>

            {/* Employees / bottom center */}
            <rect x="173" y="480" width="298" height="80" fill="rgba(100,116,139,0.08)" stroke="#64748b" strokeWidth="1"/>
            <text x="270" y="517" fill="#64748b" fontSize="8" fontFamily="Inter">EMPLOYEE ENTRANCE</text>
            <text x="272" y="530" fill="#64748b" fontSize="7" fontFamily="Inter">CITIZENS HALL ANTECHAMBER</text>

            {/* ─────────────────────────────────────────── */}
            {/* CENTRAL OPEN COURT — cols I–K              */}
            {/* ─────────────────────────────────────────── */}
            <rect x="471" y="30" width="173" height="395" fill="rgba(0,0,0,0)" stroke="#3f3a35" strokeWidth="1" strokeDasharray="4 4"/>
            {/* Tree clusters in courtyard */}
            {[[510,80],[557,95],[520,140],[570,140],[515,185],[560,185],[510,240],[560,240]].map(([tx,ty],i)=>(
              <g key={i}>
                <circle cx={tx} cy={ty} r="13" fill="rgba(21,50,21,0.5)" stroke="#2d4a2d" strokeWidth="1"/>
                <circle cx={tx} cy={ty} r="7" fill="rgba(21,60,21,0.4)" stroke="#2d4a2d" strokeWidth="0.5"/>
              </g>
            ))}
            <text x="557" y="310" textAnchor="middle" fill="#2d2c29" fontSize="8" fontFamily="Inter">OPEN COURT</text>

            {/* CIRCULAR ENTRANCE DRIVE at bottom center */}
            {/* Large circle centered at x=557, y=495 */}
            <circle cx="557" cy="510" r="90" fill="rgba(168,135,94,0.04)" stroke="#a8875e" strokeWidth="2"/>
            <circle cx="557" cy="510" r="60" fill="rgba(0,0,0,0)" stroke="#a8875e" strokeWidth="1" strokeDasharray="5 3"/>
            {/* Arc cutout at top — open to building */}
            <text x="557" y="507" textAnchor="middle" fill="#6b5840" fontSize="8" fontFamily="Inter">GRAND LOBBY VOID</text>
            <text x="557" y="518" textAnchor="middle" fill="#6b5840" fontSize="7" fontFamily="Inter">Circular Drive</text>

            {/* ─────────────────────────────────────────── */}
            {/* RIGHT-CENTER WING — cols J–N, rows 1–8     */}
            {/* ─────────────────────────────────────────── */}
            <rect x="644" y="30" width="298" height="398" fill="rgba(255,255,255,0.015)" stroke="#a8875e" strokeWidth="2"/>

            {/* Offices top J-K row 1-2 */}
            <rect x="644" y="30" width="75" height="75" fill="rgba(21,128,61,0.12)" stroke="#16a34a" strokeWidth="1"/>
            <text x="658" y="62" fill="#22c55e" fontSize="7" fontFamily="Inter">MSWDO /</text>
            <text x="658" y="73" fill="#22c55e" fontSize="7" fontFamily="Inter">SOCIAL WELAFRE</text>
            <rect x="719" y="30" width="75" height="75" fill="rgba(21,128,61,0.10)" stroke="#16a34a" strokeWidth="1"/>
            <text x="730" y="70" fill="#22c55e" fontSize="7.5" fontFamily="Inter">AGRICULTURE</text>
            <rect x="794" y="30" width="75" height="75" fill="rgba(21,128,61,0.10)" stroke="#16a34a" strokeWidth="1"/>
            <text x="808" y="70" fill="#22c55e" fontSize="7.5" fontFamily="Inter">ENGINEERING</text>
            <rect x="869" y="30" width="73" height="75" fill="rgba(21,128,61,0.10)" stroke="#16a34a" strokeWidth="1"/>
            <text x="878" y="70" fill="#22c55e" fontSize="7.5" fontFamily="Inter">MENRO</text>

            {/* LCR / HR rows 2-4 */}
            <rect x="644" y="105" width="150" height="95" fill="rgba(21,128,61,0.12)" stroke="#16a34a" strokeWidth="1"/>
            <text x="690" y="152" fill="#22c55e" fontSize="8" fontFamily="Inter">LCR</text>
            <rect x="794" y="105" width="148" height="95" fill="rgba(168,135,94,0.12)" stroke="#a8875e" strokeWidth="1"/>
            <text x="843" y="145" fill="#a8875e" fontSize="7.5" fontFamily="Inter">HUMAN RESOURCES</text>

            {/* Rows 4-6 — SB Board Office / SANGGUNIANG BAYAN */}
            <rect x="644" y="200" width="150" height="100" fill="rgba(168,135,94,0.14)" stroke="#a8875e" strokeWidth="1.5"/>
            <text x="672" y="240" fill="#a8875e" fontSize="7" fontFamily="Inter">SANGGUNIANG BAYAN</text>
            <text x="686" y="251" fill="#a8875e" fontSize="7" fontFamily="Inter">OFFICE / SB SEC.</text>

            {/* OFFICE OF THE VICE MAYOR rows 4-6 */}
            <rect x="794" y="200" width="148" height="55" fill="rgba(168,135,94,0.14)" stroke="#a8875e" strokeWidth="1.5"/>
            <text x="815" y="225" fill="#a8875e" fontSize="7" fontFamily="Inter">OFFICE OF THE VICE MAYOR</text>
            <rect x="794" y="255" width="148" height="45" fill="rgba(168,135,94,0.10)" stroke="#a8875e" strokeWidth="1"/>
            <text x="840" y="281" fill="#a8875e" fontSize="7" fontFamily="Inter">CONF. ROOM</text>

            {/* OPEN WAITING AREA right (rows 7-9, cols J-N) */}
            <rect x="644" y="300" width="298" height="128" fill="rgba(168,135,94,0.04)" stroke="#a8875e" strokeWidth="1.5" strokeDasharray="6 3"/>
            <text x="760" y="352" fill="#6b5840" fontSize="10" fontFamily="Inter">OPEN WAITING AREA</text>
            {[[680,328],[720,340],[760,325],[800,340],[840,328],[878,340],[920,328]].map(([tx,ty],i)=>(
              <circle key={i} cx={tx} cy={ty} r="10" fill="none" stroke="#2d4a2d" strokeWidth="1" opacity={0.6}/>
            ))}

            {/* Office of the Municipal Mayor rows 9-10 right center */}
            <rect x="644" y="428" width="298" height="52" fill="rgba(168,135,94,0.18)" stroke="#a8875e" strokeWidth="2"/>
            <text x="762" y="457" fill="#a8875e" fontSize="9" fontFamily="Inter" fontWeight="600">OFFICE OF THE MAYOR</text>

            {/* Bottom right */}
            <rect x="644" y="480" width="298" height="80" fill="rgba(100,116,139,0.08)" stroke="#64748b" strokeWidth="1"/>
            <text x="750" y="517" fill="#64748b" fontSize="8" fontFamily="Inter">OFFICE OF THE VICE MAYOR</text>
            <text x="758" y="530" fill="#64748b" fontSize="7" fontFamily="Inter">MUNICIPAL ADMINISTRATOR</text>

            {/* ─────────────────────────────────────────── */}
            {/* EAST WING — columns O–Q, rows 1–12         */}
            {/* ─────────────────────────────────────────── */}
            <rect x="942" y="30" width="120" height="530" fill="rgba(255,255,255,0.02)" stroke="#a8875e" strokeWidth="2"/>

            {/* Electrical room top-right */}
            <rect x="1002" y="30" width="60" height="75" fill="rgba(100,116,139,0.18)" stroke="#64748b" strokeWidth="1"/>
            <text x="1015" y="63" fill="#94a3b8" fontSize="7" fontFamily="Inter">ELECTRICAL</text>
            <text x="1020" y="73" fill="#94a3b8" fontSize="7" fontFamily="Inter">ROOM</text>

            {/* Stairs top-right */}
            <rect x="942" y="30" width="60" height="75" fill="rgba(100,116,139,0.12)" stroke="#64748b" strokeWidth="1"/>
            <text x="963" y="67" fill="#64748b" fontSize="7" fontFamily="Inter">STAIRS</text>
            {[0,1,2,3,4,5].map(s=><line key={s} x1="944" y1={35+s*11} x2="1000" y2={35+s*11} stroke="#475569" strokeWidth="0.7"/>)}

            {/* BIR rows 2-3 */}
            <rect x="942" y="105" width="120" height="65" fill="rgba(245,158,11,0.18)" stroke="#d97706" strokeWidth="1.5"/>
            <text x="985" y="141" fill="#fbbf24" fontSize="9" fontFamily="Inter">BIR</text>

            {/* LTO rows 3-4 */}
            <rect x="942" y="170" width="120" height="55" fill="rgba(245,158,11,0.14)" stroke="#d97706" strokeWidth="1.5"/>
            <text x="985" y="200" fill="#fbbf24" fontSize="9" fontFamily="Inter">LTO</text>

            {/* PhilHealth rows 4-5 */}
            <rect x="942" y="225" width="120" height="55" fill="rgba(245,158,11,0.14)" stroke="#d97706" strokeWidth="1.5"/>
            <text x="970" y="255" fill="#fbbf24" fontSize="9" fontFamily="Inter">PHILHEALTH</text>

            {/* Post Office / Records rows 5-7 */}
            <rect x="942" y="280" width="120" height="75" fill="rgba(21,128,61,0.14)" stroke="#16a34a" strokeWidth="1.5"/>
            <text x="972" y="313" fill="#22c55e" fontSize="8" fontFamily="Inter">POST OFFICE</text>

            {/* Business Permit */}
            <rect x="942" y="355" width="120" height="65" fill="rgba(245,158,11,0.10)" stroke="#d97706" strokeWidth="1"/>
            <text x="958" y="381" fill="#fbbf24" fontSize="7" fontFamily="Inter">BUSINESS PERMIT</text>
            <text x="962" y="392" fill="#fbbf24" fontSize="7" fontFamily="Inter">& LICENSING</text>

            {/* Guard House rows 9-10 */}
            <rect x="942" y="420" width="120" height="55" fill="rgba(100,116,139,0.14)" stroke="#64748b" strokeWidth="1.5"/>
            <text x="968" y="450" fill="#94a3b8" fontSize="8" fontFamily="Inter">GUARD HOUSE</text>

            {/* PWD Ramp */}
            <rect x="942" y="475" width="120" height="45" fill="rgba(21,128,61,0.10)" stroke="#16a34a" strokeWidth="1"/>
            <text x="970" y="500" fill="#22c55e" fontSize="8" fontFamily="Inter">PWD RAMP</text>

            {/* Bottom east */}
            <rect x="942" y="520" width="120" height="40" fill="rgba(100,116,139,0.08)" stroke="#64748b" strokeWidth="1"/>
            <text x="966" y="545" fill="#64748b" fontSize="7" fontFamily="Inter">STAFF / PANTRY</text>

            {/* Lift / elevator - center */}
            <rect x="505" y="395" width="50" height="38" fill="rgba(168,135,94,0.16)" stroke="#a8875e" strokeWidth="1.5"/>
            <text x="516" y="415" fill="#a8875e" fontSize="7.5" fontFamily="Inter">LIFT</text>
            <rect x="560" y="395" width="50" height="38" fill="rgba(100,116,139,0.14)" stroke="#64748b" strokeWidth="1.5"/>
            <text x="568" y="415" fill="#94a3b8" fontSize="7.5" fontFamily="Inter">STAIRS</text>
            {[0,1,2].map(s=><line key={s} x1="562" y1={398+s*12} x2="608" y2={398+s*12} stroke="#475569" strokeWidth="0.7"/>)}

            {/* ═══ SCALE BAR ═══ */}
            <g transform="translate(200 598)">
              <line x1="0" y1="0" x2="200" y2="0" stroke="#57514a" strokeWidth="1"/>
              <line x1="0" y1="-4" x2="0" y2="4" stroke="#57514a" strokeWidth="1"/>
              <line x1="100" y1="-4" x2="100" y2="4" stroke="#57514a" strokeWidth="1"/>
              <line x1="200" y1="-4" x2="200" y2="4" stroke="#57514a" strokeWidth="1"/>
              <text x="0" y="14" fill="#57514a" fontSize="8" fontFamily="Inter">0</text>
              <text x="92" y="14" fill="#57514a" fontSize="8" fontFamily="Inter">10m</text>
              <text x="190" y="14" fill="#57514a" fontSize="8" fontFamily="Inter">20m</text>
            </g>

            {/* Sheet label */}
            <text x="760" y="598" fill="#3f3a35" fontSize="9" fontFamily="Inter">Sheet A 03  ·  Ground Floor Plan  ·  Scale 1:200</text>

          </svg>

          {/* Guide Arrow overlays */}
          {floorPlanAnnotations.map((ann) => (
            <GuideArrow key={ann.id} annotation={ann} />
          ))}
        </div>

        {/* Caption */}
        <div className="mt-4 flex flex-col sm:flex-row justify-between text-xs text-stone-600 gap-1">
          <span>Column Grid A–Q · Rows 1–12 · Scale 1:200</span>
          <span>Sheet A 03 · New Government Center · E.B. Magalona · Erica Mae D. Pancho · Ar. Gary Peter L. Bello, UAP</span>
        </div>
      </div>
    </section>
  );
}
