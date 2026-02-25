"use client";

import React, { useState } from "react";
import FloorPlanRenderer from "./FloorPlanRenderer";
import { Room, FurnitureItem, floorPlanAnnotations, floorPlanAnnotations2, floorPlanAnnotations3 } from "@/lib/siteData";

interface Props {
  rooms: Room[];
  furniture?: FurnitureItem[];
  onLayerFocus?: (layer: number | null) => void;
}

const LAYER_COLORS = [
  { level: 3, name: "Third Floor",  top: "#f97316", right: "#ea580c", bottom: "#c2410c" }, // Orange
  { level: 2, name: "Second Floor", top: "#ef4444", right: "#dc2626", bottom: "#b91c1c" }, // Red
  { level: 1, name: "Ground Floor", top: "#8b5cf6", right: "#7c3aed", bottom: "#6d28d9" }, // Purple
];

export default function PerspectiveFloorView({ rooms, furniture = [], onLayerFocus }: Props) {
  const [activeLayer, setActiveLayer] = useState<number | null>(null);
  const [focusedLayer, setFocusedLayer] = useState<number | null>(null);
  const [activeAnnId, setActiveAnnId] = useState<string | null>(null);

  // Find active annotation from any floor
  let activeAnn = null;
  if (activeAnnId) {
    if (focusedLayer === 1) {
      activeAnn = floorPlanAnnotations.find(a => a.id === activeAnnId);
    } else if (focusedLayer === 2) {
      activeAnn = floorPlanAnnotations2.find(a => a.id === activeAnnId);
    } else if (focusedLayer === 3) {
      activeAnn = floorPlanAnnotations3.find(a => a.id === activeAnnId);
    }
  }

  // SVG base dimensions, scaling down slightly for isometric fit
  const BASE_W = 1100;
  const BASE_H = 605;

  return (
    <div className="w-full h-full min-h-[600px] flex items-center justify-center bg-stone-900 overflow-hidden perspective-container relative pl-12 pt-48">
      <div 
        className="relative transition-transform duration-1000 ease-in-out"
        style={{
          width: BASE_W * 0.5,
          height: BASE_H * 0.5,
          transformStyle: 'preserve-3d',
          // If a layer is focused, we flatten the perspective and zoom in
          transform: focusedLayer !== null 
            ? 'scale(1.5) rotateX(0deg) rotateZ(0deg)' 
            : 'scale(1.1) rotateX(60deg) rotateZ(45deg)', 
        }}
      >
        {LAYER_COLORS.map((layer, index) => {
          // Bottom layer is index 2 (level 1), top is index 0 (level 3)
          const zIndex = 3 - index; // Ensure top layers render on top in DOM
          const zOffset = (2 - index) * 160;
          const isHovered = activeLayer === layer.level && focusedLayer === null;
          const isFocused = focusedLayer === layer.level;
          const isDimmed = (activeLayer !== null && !isHovered && focusedLayer === null) || (focusedLayer !== null && !isFocused);
          
          const layerRooms = rooms.filter(r => (r.floor || 1) === layer.level);
          const layerFurniture = furniture.filter(f => (f.floor || 1) === layer.level);

          // The hover lifts the layer up slightly along Z axis
          const hoverZOffset = isHovered ? 40 : 0;
          
          // If focused, pull it to Z=0. If something else is focused, push it way back
          const currentZ = focusedLayer !== null 
            ? (isFocused ? 0 : zOffset - 1000) 
            : zOffset + hoverZOffset;

          return (
            <div
              key={layer.level}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${isDimmed ? 'opacity-0 pointer-events-none' : 'opacity-100 cursor-pointer'}`}
              style={{
                transformStyle: 'preserve-3d',
                transform: `translateZ(${currentZ}px) ${isFocused ? 'translateX(20%) translateY(-25%)' : ''}`, // Nudge it right and up when focused to center it and leave room for the panel
                zIndex: isFocused ? 50 : zIndex,
              }}
              onMouseEnter={() => { if (focusedLayer === null) setActiveLayer(layer.level); }}
              onMouseLeave={() => { if (focusedLayer === null) setActiveLayer(null); }}
              onClick={() => {
                if (focusedLayer === layer.level) return;
                setFocusedLayer(layer.level);
                onLayerFocus?.(layer.level);
                setActiveLayer(null);
                setActiveAnnId(null); // Reset annotation on level change
              }}
            >
              {/* Slab Top Face (Just the SVG now) */}
              <div 
                className="absolute inset-0"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* SVG Render mapped onto the top face */}
                <div 
                  className={`w-full h-full transition-transform duration-1000 ${focusedLayer !== null ? 'pointer-events-auto' : 'pointer-events-none'}`} 
                  style={{ transform: focusedLayer !== null ? 'rotateZ(0deg)' : 'rotateZ(-90deg)' }}
                >
                   {/* Floor plan rendering */}
                   <FloorPlanRenderer 
                     rooms={layerRooms} 
                     furniture={layerFurniture} 
                     floorColor="transparent" 
                     showReferences={false} 
                     showLabels={true}
                     activeFloor={layer.level}
                   />
                   
                   {/* Annotations mapped to the ground floor */}
                   {layer.level === 1 && (
                     <div className="absolute inset-0 pointer-events-none">
                       {floorPlanAnnotations.map(ann => (
                         <button
                           key={ann.id}
                           onClick={(e) => {
                             e.stopPropagation();
                             setActiveAnnId(ann.id === activeAnnId ? null : ann.id);
                           }}
                           className="absolute w-6 h-6 flex items-center justify-center group cursor-pointer pointer-events-auto"
                           style={{
                             left: `${ann.x}%`,
                             top: `${ann.y}%`,
                             transform: 'translate(-50%, -50%)',
                           }}
                           title={ann.label}
                           aria-label={`View details for ${ann.label}`}
                         >
                           {/* Pulse rings */}
                           <span className={`absolute inset-0 rounded-full border border-architect-500 transition-transform duration-500 ${activeAnnId === ann.id ? 'scale-150 opacity-100' : 'opacity-60 group-hover:scale-150'}`} />
                           
                           {/* Core dot */}
                           <span className="w-3 h-3 rounded-full bg-architect-500 group-hover:bg-architect-300 transition-colors z-10 flex items-center justify-center shadow-md shadow-black/50">
                             <span 
                               className="text-[5px] font-bold text-stone-950 block transition-transform duration-1000"
                               style={{ transform: focusedLayer !== null ? 'rotateZ(0deg)' : 'rotateZ(90deg)' }} // Rotate text smoothly based on container rotation
                             >
                               {ann.shortLabel}
                             </span>
                           </span>
                         </button>
                       ))}
                     </div>
                   )}
                   {/* Annotations mapped to the second floor */}
                   {layer.level === 2 && (
                     <div className="absolute inset-0 pointer-events-none">
                       {floorPlanAnnotations2.map(ann => (
                         <button
                           key={ann.id}
                           onClick={(e) => {
                             e.stopPropagation();
                             setActiveAnnId(ann.id === activeAnnId ? null : ann.id);
                           }}
                           className="absolute w-6 h-6 flex items-center justify-center group cursor-pointer pointer-events-auto"
                           style={{
                             left: `${ann.x}%`,
                             top: `${ann.y}%`,
                             transform: 'translate(-50%, -50%)',
                           }}
                           title={ann.label}
                           aria-label={`View details for ${ann.label}`}
                         >
                           {/* Pulse rings */}
                           <span className={`absolute inset-0 rounded-full border border-architect-500 transition-transform duration-500 ${activeAnnId === ann.id ? 'scale-150 opacity-100' : 'opacity-60 group-hover:scale-150'}`} />
                           
                           {/* Core dot */}
                           <span className="w-3 h-3 rounded-full bg-architect-500 group-hover:bg-architect-300 transition-colors z-10 flex items-center justify-center shadow-md shadow-black/50">
                             <span 
                               className="text-[5px] font-bold text-stone-950 block transition-transform duration-1000"
                               style={{ transform: focusedLayer !== null ? 'rotateZ(0deg)' : 'rotateZ(90deg)' }} // Rotate text smoothly based on container rotation
                             >
                               {ann.shortLabel}
                             </span>
                           </span>
                         </button>
                       ))}
                     </div>
                   )}
                   {/* Annotations mapped to the third floor */}
                   {layer.level === 3 && (
                     <div className="absolute inset-0 pointer-events-none">
                       {floorPlanAnnotations3.map(ann => (
                         <button
                           key={ann.id}
                           onClick={(e) => {
                             e.stopPropagation();
                             setActiveAnnId(ann.id === activeAnnId ? null : ann.id);
                           }}
                           className="absolute w-6 h-6 flex items-center justify-center group cursor-pointer pointer-events-auto"
                           style={{
                             left: `${ann.x}%`,
                             top: `${ann.y}%`,
                             transform: 'translate(-50%, -50%)',
                           }}
                           title={ann.label}
                           aria-label={`View details for ${ann.label}`}
                         >
                           {/* Pulse rings */}
                           <span className={`absolute inset-0 rounded-full border border-architect-500 transition-transform duration-500 ${activeAnnId === ann.id ? 'scale-150 opacity-100' : 'opacity-60 group-hover:scale-150'}`} />
                           
                           {/* Core dot */}
                           <span className="w-3 h-3 rounded-full bg-architect-500 group-hover:bg-architect-300 transition-colors z-10 flex items-center justify-center shadow-md shadow-black/50">
                             <span 
                               className="text-[5px] font-bold text-stone-950 block transition-transform duration-1000"
                               style={{ transform: focusedLayer !== null ? 'rotateZ(0deg)' : 'rotateZ(90deg)' }} // Rotate text smoothly based on container rotation
                             >
                               {ann.shortLabel}
                             </span>
                           </span>
                         </button>
                       ))}
                     </div>
                   )}
                </div>
              </div>
              
              {/* Shadow under each layer */}
              <div 
                className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${isFocused ? 'opacity-0' : 'opacity-100'}`}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: 'translateZ(-40px)', // Shadow is cast below the layer
                }}
              >
                <div 
                   className="w-full h-full bg-black/60 blur-[20px] transition-opacity duration-700"
                   style={{ 
                     transform: 'rotateZ(-90deg)', 
                     opacity: isHovered ? 0.4 : 0.8 
                   }}
                />
              </div>

              {/* Label floating next to layer */}
              <div 
                className={`absolute pointer-events-none bg-stone-800 text-stone-200 px-4 py-2 rounded text-sm font-medium border border-stone-600 transition-opacity duration-300 ${isHovered && !isFocused ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  // Position the label roughly "next" to the isometric plane
                  right: '-100px',
                  bottom: '-50px',
                  transform: 'rotateZ(-45deg) rotateX(-60deg) translateZ(40px)', // Reverse the container transform so text is flat
                  transformOrigin: 'center center'
                }}
              >
                {layer.name}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* 3D View Controls Panel (Fixed on the left) */}
      <div className="absolute left-6 top-6 z-40 flex flex-col gap-4">
        {focusedLayer !== null && (
          <button
            onClick={() => {
              setFocusedLayer(null);
              onLayerFocus?.(null);
              setActiveAnnId(null);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-sm font-semibold rounded-sm border border-stone-600 transition-colors shadow-lg"
          >
            <span>←</span> Back to 3D Stack
          </button>
        )}
      </div>

      {/* 3D View Info Panel (Fixed on the left) */}
      {activeAnn && (
        <div 
          className="absolute left-6 top-1/2 -translate-y-1/2 w-80 min-h-[160px] rounded-sm shadow-2xl p-5 z-50 transition-all duration-300 ease-out"
          style={{
             backgroundColor: 'rgba(26, 24, 22, 0.85)',
             backdropFilter: 'blur(12px)',
             border: '1px solid rgba(168, 135, 94, 0.3)',
             boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
             opacity: 1,
             transform: 'translateY(-50%) scale(1)',
          }}
        >
          <div className="flex items-start justify-between mb-4 pb-3 border-b border-architect-900/40">
            <h4 className="font-serif text-lg font-semibold text-architect-300 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              {activeAnn.label}
            </h4>
          </div>
          <p className="text-sm text-stone-300 leading-relaxed drop-shadow-sm">
            {activeAnn.description}
          </p>
          
          {activeAnn.area && (
            <div className="mt-4 pt-3 border-t border-stone-800/50 flex align-center">
              <span className="text-[10px] uppercase tracking-wider text-architect-500 font-semibold">Location:</span>
              <span className="ml-2 text-xs text-stone-400">{activeAnn.area}</span>
            </div>
          )}

          <button
            onClick={() => setActiveAnnId(null)}
            className="absolute top-3 right-3 text-stone-500 hover:text-stone-300 transition-colors w-6 h-6 flex items-center justify-center rounded-sm hover:bg-stone-800/50"
            aria-label="Close panel"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
