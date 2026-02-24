"use client";
import { useState } from "react";
import { timelinePhases } from "@/lib/siteData";
import {
  ScanLine, Shovel, Layers, Home, Paintbrush, KeyRound,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  ScanLine:  <ScanLine  size={20} />,
  Shovel:    <Shovel    size={20} />,
  Layers:    <Layers    size={20} />,
  Home:      <Home      size={20} />,
  Paintbrush:<Paintbrush size={20} />,
  KeyRound:  <KeyRound  size={20} />,
};

export default function SiteDevelopmentSection() {
  const [activePhase, setActivePhase] = useState(timelinePhases[0].id);
  const phase = timelinePhases.find((p) => p.id === activePhase)!;
  const activeIdx = timelinePhases.findIndex((p) => p.id === activePhase);

  return (
    <section id="site-dev" className="py-24 bg-stone-900">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-16">
          <p className="text-architect-500 text-xs uppercase tracking-[0.3em] mb-3">04 — Site Development</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2
              className="font-serif text-4xl md:text-5xl text-stone-100"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Construction Timeline
              <span className="block text-architect-400 italic text-3xl mt-1">From Ground to Handover</span>
            </h2>
            <p className="max-w-sm text-stone-400 text-sm leading-relaxed">
              Six coordinated phases from initial earthworks through to practical completion.
              Click each phase to see what happens on site and what gets delivered.
            </p>
          </div>
        </div>

        {/* Timeline steps (horizontal scroll on mobile) */}
        <div className="relative mb-12 overflow-x-auto pb-4">
          {/* Connecting line */}
          <div className="absolute top-7 left-0 right-0 h-0.5 bg-stone-800 z-0" />
          {/* Progress line */}
          <div
            className="absolute top-7 left-0 h-0.5 bg-architect-600 z-0 transition-all duration-700"
            style={{ width: `${((activeIdx + 1) / timelinePhases.length) * 100}%` }}
          />

          <div className="relative z-10 flex min-w-max gap-0">
            {timelinePhases.map((p, i) => {
              const isActive = p.id === activePhase;
              const isPast = i <= activeIdx;
              return (
                <button
                  key={p.id}
                  id={`phase-${p.id}`}
                  onClick={() => setActivePhase(p.id)}
                  className="flex flex-col items-center gap-3 px-6 group focus:outline-none"
                  style={{ minWidth: "120px" }}
                >
                  {/* Circle */}
                  <div
                    className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                      isActive
                        ? "border-architect-500 bg-architect-600 text-stone-950 shadow-lg shadow-architect-900/50 scale-110"
                        : isPast
                        ? "border-architect-700 bg-architect-900/40 text-architect-500"
                        : "border-stone-700 bg-stone-900 text-stone-600 group-hover:border-architect-600 group-hover:text-architect-400"
                    }`}
                  >
                    {iconMap[p.icon]}
                  </div>
                  {/* Phase label */}
                  <div className="text-center">
                    <div className={`text-[10px] uppercase tracking-widest mb-0.5 ${isPast ? "text-architect-600" : "text-stone-600"}`}>
                      {p.phase}
                    </div>
                    <div className={`text-xs font-medium leading-tight ${isActive ? "text-architect-300" : "text-stone-500"}`}>
                      {p.title}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Phase detail panel */}
        <div
          key={phase.id}
          className="grid md:grid-cols-2 gap-8 glass rounded-sm p-8 transition-all duration-300"
        >
          {/* Left: description */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-10 flex items-center justify-center bg-architect-600 text-stone-950 rounded-sm">
                {iconMap[phase.icon]}
              </span>
              <div>
                <p className="text-architect-500 text-xs uppercase tracking-widest">{phase.phase}</p>
                <h3 className="font-serif text-xl text-stone-100" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {phase.title}
                </h3>
              </div>
              <span className="ml-auto text-xs px-3 py-1 bg-stone-800 border border-stone-700 text-stone-400 rounded-full">
                ⏱ {phase.duration}
              </span>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed">{phase.description}</p>
          </div>

          {/* Right: deliverables */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-stone-600 mb-4">Key Deliverables</h4>
            <ul className="space-y-3">
              {phase.deliverables.map((d, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-architect-500 shrink-0" />
                  <span className="text-sm text-stone-300">{d}</span>
                </li>
              ))}
            </ul>

            {/* Phase nav buttons */}
            <div className="flex gap-3 mt-8">
              <button
                onClick={() => {
                  const idx = timelinePhases.findIndex((p) => p.id === activePhase);
                  if (idx > 0) setActivePhase(timelinePhases[idx - 1].id);
                }}
                disabled={activeIdx === 0}
                className="px-5 py-2 text-xs border border-stone-700 text-stone-400 hover:border-architect-600 hover:text-architect-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                ← Previous
              </button>
              <button
                onClick={() => {
                  const idx = timelinePhases.findIndex((p) => p.id === activePhase);
                  if (idx < timelinePhases.length - 1) setActivePhase(timelinePhases[idx + 1].id);
                }}
                disabled={activeIdx === timelinePhases.length - 1}
                className="px-5 py-2 text-xs border border-architect-700 text-architect-400 hover:bg-architect-700 hover:text-stone-950 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                Next Phase →
              </button>
            </div>
          </div>
        </div>

        {/* Summary strip */}
        <div className="mt-10 grid grid-cols-3 md:grid-cols-6 gap-px bg-stone-800">
          {timelinePhases.map((p, i) => (
            <div
              key={p.id}
              onClick={() => setActivePhase(p.id)}
              className={`p-4 cursor-pointer transition-all duration-300 ${
                p.id === activePhase ? "bg-architect-900/60" : "bg-stone-950 hover:bg-stone-900"
              }`}
            >
              <p className="text-[10px] uppercase tracking-widest text-stone-600 mb-1">{p.phase}</p>
              <p className={`text-xs font-medium ${p.id === activePhase ? "text-architect-300" : "text-stone-500"}`}>
                {p.title}
              </p>
              <p className="text-[10px] text-stone-700 mt-1">{p.duration}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
