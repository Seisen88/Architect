"use client";
import { Room, ROOM_COLORS, RoomCategory, FurnitureItem } from "@/lib/siteData";
import { FurnitureSVG } from "@/components/FurnitureRenderer";

// Column grid positions matched exactly to architectural blueprint dimensions
// Adjusted Left Wing (A-I) to snap exactly to room walls:
const COL_GRID: [string, number][] = [
  ["A",50], ["B",106], ["C",155], ["D",259], ["E",316],
  ["F",354], ["G",403], ["H",474], ["I",540], ["J",691], ["K",755], ["L",828],
  ["M",901], ["N",975], ["O",1065], ["P",1114], ["Q",1167]
];
// Row grid positions restored to original proportions
const ROWS: [number, number][] = [
  [1,50], [2,89], [3,149], [4,184], [5,235], [6,272],
  [7,320], [8,358], [9,440], [10,465], [12,508]
];
interface Props {
  rooms: Room[];
  furniture?: FurnitureItem[];
  interactive?: boolean;
  selectedId?: string | null;
  onRoomClick?: (room: Room) => void;
  showGrid?: boolean;
  showLabels?: boolean;
  showFurniture?: boolean;
  showReferences?: boolean;
  className?: string;
  floorColor?: string;
  activeFloor?: number | "all" | null;
  width?: number | string;
  height?: number | string;
  x?: number | string;
  y?: number | string;
  showRooms?: boolean;
}

export default function FloorPlanRenderer({
  rooms,
  furniture = [],
  interactive = false,
  selectedId = null,
  onRoomClick,
  showGrid = true,
  showLabels = true,
  showFurniture = true,
  showReferences = true,
  className = "",
  floorColor = "rgba(18,18,20,0.5)",
  activeFloor = 1,
  width,
  height,
  x,
  y,
  showRooms = true,
}: Props) {
  return (
    <svg
      viewBox="-30 0 1280 650"
      width={width}
      height={height}
      x={x}
      y={y}
      className={`w-full h-full ${className}`}
      aria-label="New Government Center — Ground Floor Plan Sheet A03"
    >
      <defs>
        <pattern id="fpgrid" width="4" height="4" patternUnits="userSpaceOnUse">
          <path d="M 4 0 L 0 0 0 4" fill="none" stroke="#1a1916" strokeWidth="0.4" />
        </pattern>
      </defs>

      {/* Background layer */}
      <rect x="-30" width="1280" height="650" fill="#0f0e0c" />
      <rect x="-30" width="1280" height="650" fill={floorColor} />
      {showGrid && <rect x="-30" width="1280" height="650" fill="url(#fpgrid)" />}

      {/* Column grid A–Q */}
      {showGrid && showReferences && COL_GRID.map(([col, x]) => (
        <g key={col}>
          <line x1={x} y1={26} x2={x} y2={580} stroke="#3f3a35" strokeWidth={0.5} strokeDasharray="3 3"/>
          <circle cx={x} cy={16} r={10} fill="#0f0e0c" stroke="#3f3a35" strokeWidth={1}/>
          <text x={x} y={20} textAnchor="middle" fill="#3f3a35" fontSize="10" fontFamily="Inter">{col}</text>
        </g>
      ))}

      {/* Row labels 1–12 */}
      {showGrid && showReferences && ROWS.map(([row, y]) => {
        return (
          <g key={row}>
            <line x1={40} y1={y} x2={1230} y2={y} stroke="#3f3a35" strokeWidth={0.5} strokeDasharray="3 3"/>
            <circle cx={30} cy={y} r={10} fill="#0f0e0c" stroke="#3f3a35" strokeWidth={1}/>
            <text x={30} y={y + 4} textAnchor="middle" fill="#3f3a35" fontSize="10" fontFamily="Inter">{row}</text>
          </g>
        );
      })}

      {/* Wing outlines */}
      <rect x="50" y="30" width="258" height="530" fill="none" stroke="#2a2520" strokeWidth="1.5" strokeDasharray="4 4"/>
      <rect x="308" y="30" width="593" height="530" fill="none" stroke="#2a2520" strokeWidth="1.5" strokeDasharray="4 4"/>
      <rect x="901" y="30" width="266" height="530" fill="none" stroke="#2a2520" strokeWidth="1.5" strokeDasharray="4 4"/>

      {/* Open court area */}
      <rect x="460" y="30" width="295" height="395" fill="none" stroke="#1f1d1a" strokeWidth="1" strokeDasharray="4 4"/>

      {/* North arrow */}
      {showGrid && showReferences && (
        <g transform="translate(28 228)">
          <circle cx="0" cy="0" r="14" fill="none" stroke="#3f3a35" strokeWidth="1"/>
          <path d="M0-11 L3 4 L0 1 L-3 4Z" fill="#a8875e"/>
          <path d="M0-11 L-3 4 L0 1 L3 4Z" fill="#3f3a35"/>
          <text x="0" y="22" textAnchor="middle" fill="#a8875e" fontSize="8" fontFamily="Inter" fontWeight="bold">N</text>
        </g>
      )}

      {/* ─── ROOMS ─── */}
      {showRooms && rooms.map((room, index, arr) => {
        const isGrouped = !!room.group;
        // Make sure we only map the group ONCE, when the first room of the group is encountered
        if (isGrouped && arr.findIndex(r => r.group === room.group) !== index) return null;

        // If it's grouped, we render ALL rooms in that group together. Otherwise, just render the single room.
        const renderRooms = isGrouped ? arr.filter(r => r.group === room.group) : [room];

        return (
          <g key={isGrouped ? `group-${room.group}` : `room-${room.id}`}>
            {isGrouped && (
              <defs>
                <mask id={`mask-group-${room.group}`}>
                  <rect x="-1000" y="-1000" width="3000" height="3000" fill="white" />
                  {renderRooms.map(r => r.shape === "circle" ? (
                    <ellipse key={`m-${r.id}`} cx={r.x + r.w / 2} cy={r.y + r.h / 2} rx={r.w / 2} ry={r.h / 2} fill="black" />
                  ) : (
                    <rect key={`m-${r.id}`} x={r.x} y={r.y} width={r.w} height={r.h} fill="black" rx={1} />
                  ))}
                </mask>
              </defs>
            )}

            {/* Strokes Layer */}
            <g mask={isGrouped ? `url(#mask-group-${room.group})` : undefined}>
              {renderRooms.map(r => {
                const c = ROOM_COLORS[r.category] || ROOM_COLORS["support"]; // Fallback to support
                const isSelected = selectedId === r.id;
                const strokeCol = isSelected ? "#fff" : c.stroke;
                const sw = isSelected ? 2.5 : 1;
                const strokeW = isGrouped ? sw * 2 : sw;
                return r.shape === "circle" ? (
                  <ellipse key={`s-${r.id}`} cx={r.x + r.w / 2} cy={r.y + r.h / 2} rx={r.w / 2} ry={r.h / 2} fill="none" stroke={strokeCol} strokeWidth={strokeW} />
                ) : (
                  <rect key={`s-${r.id}`} x={r.x} y={r.y} width={r.w} height={r.h} fill="none" stroke={strokeCol} strokeWidth={strokeW} rx={1} />
                );
              })}
            </g>
            
            {/* Fills Layer (drawn on top, covering interior strokes between overlapping rooms) */}
            {(() => {
              const firstCat = ROOM_COLORS[renderRooms[0].category] || ROOM_COLORS["support"];
              const match = firstCat.fill.match(/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)/);
              const groupOpacity = isGrouped && match ? parseFloat(match[4]) : undefined;
              
              return (
                <g opacity={groupOpacity}>
                {renderRooms.map(r => {
                  const c = ROOM_COLORS[r.category] || ROOM_COLORS["support"]; // Fallback to support
                  const rMatch = c.fill.match(/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)/);
                  const solidFill = isGrouped && rMatch ? `rgb(${rMatch[1]},${rMatch[2]},${rMatch[3]})` : c.fill;
                    return r.shape === "circle" ? (
                      <ellipse key={`f-${r.id}`} cx={r.x + r.w / 2} cy={r.y + r.h / 2} rx={r.w / 2} ry={r.h / 2} fill={solidFill} stroke="none" 
                        onClick={() => onRoomClick?.(r)} style={{ cursor: interactive ? "pointer" : "default" }} />
                    ) : (
                      <rect key={`f-${r.id}`} x={r.x} y={r.y} width={r.w} height={r.h} fill={solidFill} stroke="none" rx={1} 
                        onClick={() => onRoomClick?.(r)} style={{ cursor: interactive ? "pointer" : "default" }} />
                    );
                  })}
                </g>
              );
            })()}
          </g>
        );
      })}

      {/* ── ROOM LABELS ── */}
      {showLabels && rooms.map(room => {
        // For grouped rooms, we only want to show the label for the "main" room of the group
        // If it's a grouped room and not the first one, skip it
        if (room.group && rooms.findIndex(r => r.group === room.group) !== rooms.indexOf(room)) return null;

        const c = ROOM_COLORS[room.category] || ROOM_COLORS["support"];
        
        // Calculate label area (if grouped, we need the bounding box of the whole group)
        let lx = room.x, ly = room.y, lw = room.w, lh = room.h;
        if (room.group) {
          const groupRooms = rooms.filter(r => r.group === room.group);
          lx = Math.min(...groupRooms.map(r => r.x));
          ly = Math.min(...groupRooms.map(r => r.y));
          lw = Math.max(...groupRooms.map(r => r.x + r.w)) - lx;
          lh = Math.max(...groupRooms.map(r => r.y + r.h)) - ly;
        }

        return (
          <foreignObject key={`lab-${room.id}`} x={lx} y={ly} width={lw} height={lh} style={{ pointerEvents: "none" }}>
            <div 
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                color: c.text,
                fontSize: `${Math.max(6, Math.min(lh * 0.18, lw * 0.12, 11))}px`,
                fontWeight: 600,
                fontFamily: 'var(--font-inter), sans-serif',
                lineHeight: '1.25',
                padding: !room.group && room.shape === 'circle' ? '15%' : '6px',
                borderRadius: !room.group && room.shape === 'circle' ? '50%' : '0',
                overflow: 'hidden',
                textTransform: 'uppercase',
                letterSpacing: '0.02em',
                pointerEvents: 'none',
                WebkitFontSmoothing: 'antialiased'
              }}
            >
              {room.label}
            </div>
          </foreignObject>
        );
      })}

      {/* Furniture & Annotations Layer */}
      {showFurniture && (
        <g id="furniture-layer">
          {furniture.map(fItem => {
            const fcx = fItem.x + fItem.w / 2;
            const fcy = fItem.y + fItem.h / 2;
            
            // Find the room this furniture is inside to borrow its stroke color
            const parentRoom = rooms.find(r => {
              if (r.shape === "circle") {
                const rcx = r.x + r.w / 2;
                const rcy = r.y + r.h / 2;
                const dx = fcx - rcx;
                const dy = fcy - rcy;
                const rx = r.w / 2;
                const ry = r.h / 2;
                return (dx * dx) / (rx * rx) + (dy * dy) / (ry * ry) <= 1;
              }
              return fcx >= r.x && fcx <= r.x + r.w && fcy >= r.y && fcy <= r.y + r.h;
            });
            
            const furnColor = parentRoom ? (ROOM_COLORS[parentRoom.category] || ROOM_COLORS["support"]).stroke : undefined;
            
            return (
              <FurnitureSVG key={fItem.id} type={fItem.type} x={fItem.x} y={fItem.y} w={fItem.w} h={fItem.h} rotation={fItem.rotation} selected={fItem.id === selectedId} color={furnColor} flipX={fItem.flipX} flipY={fItem.flipY} />
            );
          })}
        </g>
      )}

      {/* Scale bar */}
      {showGrid && (
        <g transform="translate(300 640)">
          <line x1="0" y1="0" x2="200" y2="0" stroke="#57514a" strokeWidth="1"/>
          <line x1="0" y1="-4" x2="0" y2="4" stroke="#57514a" strokeWidth="1"/>
          <line x1="100" y1="-4" x2="100" y2="4" stroke="#57514a" strokeWidth="1"/>
          <line x1="200" y1="-4" x2="200" y2="4" stroke="#57514a" strokeWidth="1"/>
          <text x="0" y="14" fill="#57514a" fontSize="8" fontFamily="Inter">0</text>
          <text x="92" y="14" fill="#57514a" fontSize="8" fontFamily="Inter">10m</text>
          <text x="190" y="14" fill="#57514a" fontSize="8" fontFamily="Inter">20m</text>
        </g>
      )}

      {showGrid && (
        <text x="850" y="640" fill="#3f3a35" fontSize="9" fontFamily="Inter">
          {activeFloor === "all" || activeFloor === null ? "Sheet A 03–05  ·  All Floors" : activeFloor === 1 ? "Sheet A 03  ·  Ground Floor Plan" : activeFloor === 2 ? "Sheet A 04  ·  Second Floor Plan" : "Sheet A 05  ·  Third Floor Plan"}  ·  Scale 1:200
        </text>
      )}
    </svg>
  );
}
