"use client";
import { useState } from "react";
import { processsteps } from "@/lib/siteData";
import {
  MessageSquare, Lightbulb, PenTool, FileText, ClipboardList, HardHat, Star,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  MessageSquare: <MessageSquare size={24} />,
  Lightbulb:     <Lightbulb    size={24} />,
  PenTool:       <PenTool      size={24} />,
  FileText:      <FileText     size={24} />,
  ClipboardList: <ClipboardList size={24} />,
  HardHat:       <HardHat      size={24} />,
  Star:          <Star         size={24} />,
};

export default function ArchitectProcessSection() {
  const [expanded, setExpanded] = useState<string | null>(processsteps[0].id);

  return (
    <section id="process" className="py-24 bg-stone-950">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-16">
          <p className="text-architect-500 text-xs uppercase tracking-[0.3em] mb-3">05 — Architect Process</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2
              className="font-serif text-4xl md:text-5xl text-stone-100"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              How the Architect
              <span className="block text-architect-400 italic text-3xl mt-1">Works on Your Project</span>
            </h2>
            <p className="max-w-sm text-stone-400 text-sm leading-relaxed">
              Architecture is a collaborative, iterative discipline. Each stage builds on the last — here's
              exactly what the architect does, and when, from first meeting to post-occupancy.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Steps list */}
          <div className="lg:col-span-1 space-y-2">
            {processsteps.map((step) => (
              <button
                key={step.id}
                id={`process-step-${step.id}`}
                onClick={() => setExpanded(expanded === step.id ? null : step.id)}
                className={`w-full text-left flex items-center gap-4 p-4 border transition-all duration-300 rounded-sm group ${
                  expanded === step.id
                    ? "border-architect-600 bg-architect-900/30"
                    : "border-stone-800 hover:border-architect-700/50"
                }`}
              >
                <span
                  className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-serif text-base transition-all duration-300 ${
                    expanded === step.id
                      ? "bg-architect-600 text-stone-950"
                      : "bg-stone-800 text-stone-500 group-hover:bg-architect-900 group-hover:text-architect-400"
                  }`}
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {step.step}
                </span>
                <div className="min-w-0">
                  <div className={`text-sm font-semibold transition-colors ${expanded === step.id ? "text-architect-300" : "text-stone-300"}`}>
                    {step.title}
                  </div>
                  <div className="text-xs text-stone-600 truncate">{step.subtitle}</div>
                </div>
                <span className={`ml-auto text-stone-500 text-lg leading-none transition-transform duration-300 ${expanded === step.id ? "rotate-90" : ""}`}>
                  ›
                </span>
              </button>
            ))}
          </div>

          {/* Step detail */}
          <div className="lg:col-span-2">
            {processsteps.filter((s) => s.id === expanded).map((step) => (
              <div key={step.id} className="glass rounded-sm p-8 h-full animate-fade-in">
                {/* Step header */}
                <div className="flex items-start gap-5 mb-6">
                  <div className="w-14 h-14 shrink-0 bg-architect-600/20 border border-architect-700/40 flex items-center justify-center text-architect-400 rounded-sm">
                    {iconMap[step.icon]}
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-[0.25em] text-architect-600">Step {step.step} of {processsteps.length}</span>
                    <h3
                      className="font-serif text-2xl text-stone-100 mt-1"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-sm text-stone-500 mt-1 italic">{step.subtitle}</p>
                  </div>
                  <div className="ml-auto hidden md:block">
                    <span className="text-xs px-3 py-1.5 bg-stone-800 border border-stone-700 text-stone-400 rounded-full whitespace-nowrap">
                      ⏱ {step.duration}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-stone-400 text-sm leading-relaxed mb-8">{step.description}</p>

                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Tools */}
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-stone-600 mb-3 flex items-center gap-2">
                      <span className="w-3 h-0.5 bg-architect-600" /> Tools & Methods
                    </h4>
                    <ul className="space-y-2">
                      {step.tools.map((t, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-stone-400">
                          <span className="w-1 h-1 rounded-full bg-architect-600/60 shrink-0" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Deliverables */}
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-stone-600 mb-3 flex items-center gap-2">
                      <span className="w-3 h-0.5 bg-emerald-600" /> Deliverables
                    </h4>
                    <ul className="space-y-2">
                      {step.deliverables.map((d, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-stone-400">
                          <span className="w-1 h-1 rounded-full bg-emerald-600/60 shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Step nav */}
                <div className="flex gap-3 mt-8 pt-6 border-t border-stone-800">
                  {processsteps.find((s) => s.step === step.step - 1) && (
                    <button
                      onClick={() => setExpanded(processsteps.find((s) => s.step === step.step - 1)!.id)}
                      className="px-4 py-2 text-xs border border-stone-700 text-stone-400 hover:border-architect-600 hover:text-architect-400 transition-all"
                    >
                      ← Previous Step
                    </button>
                  )}
                  {processsteps.find((s) => s.step === step.step + 1) && (
                    <button
                      onClick={() => setExpanded(processsteps.find((s) => s.step === step.step + 1)!.id)}
                      className="px-4 py-2 text-xs border border-architect-700 text-architect-400 hover:bg-architect-700 hover:text-stone-950 transition-all ml-auto"
                    >
                      Next Step →
                    </button>
                  )}
                </div>
              </div>
            ))}
            {!expanded && (
              <div className="glass rounded-sm p-8 h-full flex items-center justify-center">
                <p className="text-stone-600 text-sm text-center">← Select a step to read the architect's notes</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
