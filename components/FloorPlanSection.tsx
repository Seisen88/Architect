"use client";
import { useState, useEffect } from "react";
import FloorPlanRenderer from "@/components/FloorPlanRenderer";
import PerspectiveFloorView from "@/components/PerspectiveFloorView";
import GuideArrow from "@/components/GuideArrow";
import { Room, defaultRooms, floorPlanAnnotations, ROOM_COLORS, RoomCategory, FurnitureItem, defaultFurniture } from "@/lib/siteData";

export default function FloorPlanSection() {
  // Start with default data for SSR, then load from localStorage after hydration
  const [rooms, setRooms] = useState<Room[]>(defaultRooms);
  const [furniture, setFurniture] = useState<FurnitureItem[]>(defaultFurniture);
  const [floorColor, setFloorColor] = useState("rgba(26,24,22,0.15)");
  const [viewMode, setViewMode] = useState<"2d" | "3d">("2d");
  const [activeAnnotationId, setActiveAnnotationId] = useState<string | null>(null);
  const [focusedLayer, setFocusedLayer] = useState<number | null>(null);

  useEffect(() => {
    try {
      const savedR = localStorage.getItem("ngc-rooms");
      if (savedR) {
        const parsedR = JSON.parse(savedR);
        if (Array.isArray(parsedR) && parsedR.length > 0) setRooms(parsedR);
      }
      const savedF = localStorage.getItem("ngc-furniture");
      if (savedF) {
        const parsedF = JSON.parse(savedF);
        if (Array.isArray(parsedF) && parsedF.length > 0) setFurniture(parsedF);
      }
      const savedC = localStorage.getItem("ngc-floor-color");
      if (savedC) setFloorColor(savedC);
    } catch { /* ignore */ }
  }, []);

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
            architect&apos;s design rationale — from the circular entrance drive to the integrated services hub.
          </p>
        </div>

        {/* Controls & Legend */}
        <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 mb-8">
          <div className="flex flex-wrap gap-4">
            {(Object.keys(ROOM_COLORS) as RoomCategory[]).map((cat) => (
              <div key={cat} className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: ROOM_COLORS[cat].stroke }} />
                <span className="text-xs text-stone-500 uppercase tracking-wider">{ROOM_COLORS[cat].label}</span>
              </div>
            ))}
            {viewMode === "2d" && (
              <div className="flex items-center gap-2 ml-auto lg:ml-4">
                <span className="w-3 h-0.5 bg-architect-500" />
                <span className="text-xs text-stone-500">Click dot to read annotation</span>
              </div>
            )}
          </div>

          <div className="flex bg-stone-900 border border-stone-800 rounded p-1 w-full lg:w-auto shrink-0">
            <button 
              onClick={() => setViewMode("2d")}
              className={`flex-1 px-5 py-2 text-xs font-semibold uppercase tracking-wider rounded transition-colors ${viewMode === "2d" ? "bg-stone-800 text-stone-200" : "text-stone-500 hover:text-stone-300"}`}
            >
              2D Diagram
            </button>
            <button 
              onClick={() => setViewMode("3d")}
              className={`flex-1 px-5 py-2 text-xs font-semibold uppercase tracking-wider rounded transition-colors ${viewMode === "3d" ? "bg-stone-800 text-architect-400" : "text-stone-500 hover:text-stone-300"}`}
            >
              3D Layers
            </button>
          </div>
        </div>

        <div className="relative w-full bg-stone-900 border border-stone-800 overflow-hidden" style={{ paddingBottom: "50%" }}>
          <div className="absolute inset-0 flex items-center justify-center">
            {viewMode === "2d" ? (
              <>
                <FloorPlanRenderer
                  rooms={rooms.filter(r => (r.floor || 1) === 1)}
                  furniture={furniture.filter(f => (f.floor || 1) === 1)}
                  floorColor={floorColor}
                  showReferences={false}
                  activeFloor={1}
                />
                {floorPlanAnnotations.map((ann) => (
                  <GuideArrow 
                    key={ann.id} 
                    annotation={ann} 
                    isOpen={activeAnnotationId === ann.id}
                    onToggle={() => setActiveAnnotationId(prev => prev === ann.id ? null : ann.id)}
                  />
                ))}
              </>
            ) : (
              <div className="absolute inset-0 w-full h-full pb-[55%]">
                <div className="absolute inset-0">
                  <PerspectiveFloorView rooms={rooms} furniture={furniture} onLayerFocus={setFocusedLayer} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Caption */}
        <div className="mt-4 flex flex-col sm:flex-row justify-between text-xs text-stone-600 gap-1">
          <span>Column Grid A–Q · Rows 1–12 · Scale 1:200</span>
          <span>{viewMode === "3d" ? (!focusedLayer ? "Sheet A 03–05 · All Floors" : focusedLayer === 3 ? "Sheet A 05 · Third Floor Plan" : focusedLayer === 2 ? "Sheet A 04 · Second Floor Plan" : "Sheet A 03 · Ground Floor Plan") : "Sheet A 03 · Ground Floor Plan"} · New Government Center · E.B. Magalona · Erica Mae D. Pancho · Ar. Gary Peter L. Bello, UAP</span>
        </div>
      </div>
    </section>
  );
}
