"use client";
import { useState } from "react";
import { specifications } from "@/lib/siteData";
import { Columns2, Layers, Sofa, Zap, ChevronDown } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Columns:  <Columns2 size={18} />,
  Layers:   <Layers   size={18} />,
  Sofa:     <Sofa     size={18} />,
  Zap:      <Zap      size={18} />,
};

export default function SpecificationsSection() {
  const [openCat, setOpenCat] = useState<string | null>(specifications[0].category);

  return (
    <section id="specifications" className="py-24 bg-stone-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <p className="text-architect-500 text-xs uppercase tracking-[0.3em] mb-3">06 — Specifications</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2
              className="font-serif text-4xl md:text-5xl text-stone-100"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Technical Specifications
              <span className="block text-architect-400 italic text-3xl mt-1">Materials & Systems</span>
            </h2>
            <p className="max-w-sm text-stone-400 text-sm leading-relaxed">
              A full schedule of the structural systems, external materials, interior finishes,
              and mechanical & electrical systems specified for this project.
            </p>
          </div>
        </div>

        {/* Desktop: 2-col grid */}
        <div className="hidden md:grid md:grid-cols-2 gap-6">
          {specifications.map((cat) => (
            <div key={cat.category} className="glass rounded-sm overflow-hidden">
              {/* Category header */}
              <div className="flex items-center gap-3 px-6 py-4 border-b border-stone-800">
                <span className="text-architect-400">{iconMap[cat.icon]}</span>
                <h3 className="text-sm font-semibold uppercase tracking-widest text-stone-300">
                  {cat.category}
                </h3>
              </div>
              {/* Rows */}
              <table className="w-full">
                <tbody>
                  {cat.items.map((item, i) => (
                    <tr
                      key={item.name}
                      className={`border-b border-stone-800/50 last:border-0 hover:bg-stone-800/30 transition-colors ${i % 2 === 0 ? "" : "bg-stone-950/20"}`}
                    >
                      <td className="px-6 py-3 text-xs text-stone-500 w-2/5 align-top font-medium uppercase tracking-wide">
                        {item.name}
                      </td>
                      <td className="px-6 py-3 text-sm text-stone-300 align-top">
                        {item.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>

        {/* Mobile: accordion */}
        <div className="md:hidden space-y-3">
          {specifications.map((cat) => (
            <div key={cat.category} className="glass rounded-sm overflow-hidden">
              <button
                id={`spec-accordion-${cat.category.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => setOpenCat(openCat === cat.category ? null : cat.category)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
                aria-expanded={openCat === cat.category}
              >
                <div className="flex items-center gap-3">
                  <span className="text-architect-400">{iconMap[cat.icon]}</span>
                  <span className="text-sm font-semibold uppercase tracking-widest text-stone-300">
                    {cat.category}
                  </span>
                </div>
                <ChevronDown
                  size={16}
                  className={`text-stone-500 transition-transform duration-300 ${openCat === cat.category ? "rotate-180" : ""}`}
                />
              </button>
              {openCat === cat.category && (
                <div className="border-t border-stone-800">
                  {cat.items.map((item, i) => (
                    <div
                      key={item.name}
                      className={`px-5 py-3 flex flex-col gap-1 border-b border-stone-800/50 last:border-0 ${i % 2 === 0 ? "" : "bg-stone-950/20"}`}
                    >
                      <span className="text-[10px] uppercase tracking-widest text-stone-600">{item.name}</span>
                      <span className="text-sm text-stone-300">{item.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Drawing register teaser */}
        <div className="mt-16 border border-stone-800 rounded-sm overflow-hidden">
          <div className="px-6 py-4 bg-stone-950 border-b border-stone-800">
            <h3 className="text-sm uppercase tracking-widest text-stone-500">Drawing Register</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-stone-800">
            {[
              { no: "A1.01", title: "Ground Floor Plan", scale: "1:100", status: "As Built" },
              { no: "A1.02", title: "First Floor Plan",  scale: "1:100", status: "As Built" },
              { no: "A2.01", title: "North Elevation",   scale: "1:100", status: "As Built" },
              { no: "A2.02", title: "South Elevation",   scale: "1:100", status: "As Built" },
              { no: "A2.03", title: "East Elevation",    scale: "1:100", status: "As Built" },
              { no: "A2.04", title: "West Elevation",    scale: "1:100", status: "As Built" },
              { no: "A3.01", title: "Section A–A",       scale: "1:50",  status: "As Built" },
              { no: "A4.01", title: "Joinery Details",   scale: "1:20",  status: "For Construction" },
            ].map((d) => (
              <div key={d.no} className="bg-stone-950 p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs text-architect-500">{d.no}</span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider ${
                    d.status === "As Built" ? "bg-emerald-900/40 text-emerald-500" : "bg-amber-900/40 text-amber-500"
                  }`}>
                    {d.status}
                  </span>
                </div>
                <p className="text-sm text-stone-400">{d.title}</p>
                <p className="text-xs text-stone-700 mt-1">Scale {d.scale}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
