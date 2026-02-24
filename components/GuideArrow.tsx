"use client";
import { useState } from "react";
import { type Annotation } from "@/lib/siteData";

interface Props {
  annotation: Annotation;
  isOpen: boolean;
  onToggle: () => void;
}

const arrowPaths: Record<string, { dx: number; dy: number; textAlign: string }> = {
  top:    { dx: 0,   dy: -1, textAlign: "center" },
  bottom: { dx: 0,   dy:  1, textAlign: "center" },
  left:   { dx: -1,  dy: 0,  textAlign: "right" },
  right:  { dx:  1,  dy: 0,  textAlign: "left" },
};

export default function GuideArrow({ annotation, isOpen, onToggle }: Props) {
  const { x, y, label, shortLabel, description, direction, area } = annotation;
  const { dx, dy } = arrowPaths[direction];

  // Arrow line length in px
  const lineLen = 52;
  const ex = dx * lineLen;
  const ey = dy * lineLen;

  // Tooltip position: intelligently position based on coordinate percentages to avoid clipping edges
  const tooltipStyle: React.CSSProperties = {
    ...(x > 50 ? { right: "calc(100% + 14px)" } : { left: "calc(100% + 14px)" }),
    ...(y > 50 ? { bottom: "-14px" } : { top: "-14px" }),
  };

  return (
    <div
      className="absolute"
      style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%,-50%)" }}
    >
      {/* SVG arrow */}
      <svg
        width={Math.abs(ex) + 24}
        height={Math.abs(ey) + 24}
        style={{
          position: "absolute",
          // SVG is anchored so its top-left [0,0] is offset such that [12,12] in the SVG is mapped to the center of the dot (which is [12,12] in the wrapper div)
          left: dx < 0 ? ex : 0,
          top:  dy < 0 ? ey : 0,
          pointerEvents: "none",
          overflow: "visible",
        }}
        aria-hidden="true"
      >
        <defs>
          <marker id={`arr-${annotation.id}`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#a8875e" />
          </marker>
        </defs>
        <line
          x1={dx < 0 ? Math.abs(ex) + 12 - 9 : dx > 0 ? 12 + 9 : 12}
          y1={dy < 0 ? Math.abs(ey) + 12 - 9 : dy > 0 ? 12 + 9 : 12}
          x2={dx < 0 ? 12 : dx > 0 ? Math.abs(ex) + 12 : 12}
          y2={dy < 0 ? 12 : dy > 0 ? Math.abs(ey) + 12 : 12}
          stroke="#a8875e"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          markerEnd={`url(#arr-${annotation.id})`}
        />
      </svg>

      {/* Dot hotspot */}
      <button
        id={`guide-${annotation.id}`}
        onClick={onToggle}
        className="relative w-6 h-6 flex items-center justify-center focus:outline-none group cursor-pointer"
        aria-expanded={isOpen}
        title={label}
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full border border-architect-500 opacity-60 group-hover:scale-150 transition-transform duration-500" />
        <span className="absolute inset-0 rounded-full border border-architect-400/30 opacity-0 group-hover:opacity-60 group-hover:scale-[2.5] transition-all duration-700" />
        {/* Core dot - slightly larger base size and text */}
        <span className="w-4 h-4 rounded-full bg-architect-500 group-hover:bg-architect-300 transition-colors duration-300 z-10 flex items-center justify-center">
          <span className="text-[7px] font-bold text-stone-950">{shortLabel}</span>
        </span>
      </button>

      {/* Tooltip card */}
      {isOpen && (
        <div
          className="absolute z-50 w-72 glass rounded-sm shadow-2xl shadow-black/60 p-4"
          style={tooltipStyle}
        >
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-serif text-sm font-semibold text-architect-300" style={{ fontFamily: "'Playfair Display', serif" }}>
              {label}
            </h4>
            {area && (
              <span className="ml-2 shrink-0 text-xs px-2 py-0.5 bg-architect-800/60 text-architect-300 border border-architect-700/40 rounded-sm">
                {area}
              </span>
            )}
          </div>
          <p className="text-xs text-stone-400 leading-relaxed">{description}</p>
          <button
            onClick={onToggle}
            className="absolute top-2 right-2 text-stone-600 hover:text-stone-300 text-lg leading-none"
            aria-label="Close"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
