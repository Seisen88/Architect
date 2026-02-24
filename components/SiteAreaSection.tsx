"use client";
import { useEffect, useRef, useState } from "react";
import { siteAreas } from "@/lib/siteData";
import {
  Maximize2, Building2, Leaf, Grid3X3, Sprout, BarChart3,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Maximize2: <Maximize2 size={22} />,
  Building2: <Building2 size={22} />,
  Leaf:      <Leaf size={22} />,
  Grid3x3:   <Grid3X3 size={22} />,
  Sprout:    <Sprout size={22} />,
  BarChart3: <BarChart3 size={22} />,
};

function CountUp({ target, duration = 1800 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const isDecimal = target < 10;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(isDecimal ? Math.round(current * 100) / 100 : Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{target < 10 ? count.toFixed(2) : count.toLocaleString()}</span>;
}

export default function SiteAreaSection() {
  return (
    <section id="site-area" className="py-24 bg-stone-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <p className="text-architect-500 text-xs uppercase tracking-[0.3em] mb-3">02 — Site Area</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2
              className="font-serif text-4xl md:text-5xl text-stone-100"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Area Breakdown
              <span className="block text-architect-400 italic text-3xl mt-1">What the Numbers Say</span>
            </h2>
            <p className="max-w-sm text-stone-400 text-sm leading-relaxed">
              Every square metre is accounted for. The design maximises liveable space while meeting council
              requirements for open area, permeability, and setbacks.
            </p>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteAreas.map((area, i) => (
            <div
              key={area.label}
              className="glass rounded-sm p-6 hover:border-architect-600/40 transition-all duration-500 group"
              style={{ animationDelay: `${i * 0.1}s` }}
              id={`area-card-${area.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {/* Icon */}
              <div className={`inline-flex p-3 rounded-sm bg-gradient-to-br ${area.color} bg-opacity-20 mb-4 text-white/70 group-hover:text-white transition-colors duration-300`}>
                {iconMap[area.icon]}
              </div>

              {/* Value */}
              <div className="flex items-baseline gap-1 mb-1">
                <span className="font-serif text-4xl text-stone-100" style={{ fontFamily: "'Playfair Display', serif" }}>
                  <CountUp target={area.value} />
                </span>
                <span className="text-architect-400 text-lg font-light">{area.unit}</span>
              </div>

              {/* Label */}
              <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-300 mb-3">
                {area.label}
              </h3>

              {/* Progress bar */}
              <div className="h-0.5 bg-stone-800 mb-4 rounded-full">
                <div
                  className={`h-full bg-gradient-to-r ${area.color} rounded-full transition-all duration-1000`}
                  style={{ width: `${Math.min((area.value / 650) * 100, 100)}%` }}
                />
              </div>

              {/* Description */}
              <p className="text-xs text-stone-500 leading-relaxed">{area.description}</p>
            </div>
          ))}
        </div>

        {/* Proportional bar chart */}
        <div className="mt-16">
          <h3 className="text-sm uppercase tracking-widest text-stone-500 mb-6">Proportional Area Breakdown</h3>
          <div className="flex rounded-sm overflow-hidden h-10">
            {[
              { label: "Built-up", pct: 47.7, color: "bg-architect-600" },
              { label: "Garden", pct: 32.3, color: "bg-emerald-700" },
              { label: "Paving", pct: 14.8, color: "bg-slate-600" },
              { label: "Green Roof", pct: 5.2, color: "bg-lime-700" },
            ].map((b) => (
              <div
                key={b.label}
                className={`${b.color} relative group transition-all duration-500 hover:brightness-125`}
                style={{ width: `${b.pct}%` }}
                title={`${b.label}: ${b.pct}%`}
              >
                <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white/80 group-hover:text-white transition-colors truncate px-1">
                  {b.pct >= 12 ? `${b.label} ${b.pct}%` : ""}
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-6 mt-4">
            {[
              { label: "Built-up", color: "bg-architect-600" },
              { label: "Garden", color: "bg-emerald-700" },
              { label: "Paving", color: "bg-slate-600" },
              { label: "Green Roof", color: "bg-lime-700" },
            ].map((b) => (
              <div key={b.label} className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-sm ${b.color}`} />
                <span className="text-xs text-stone-500">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
