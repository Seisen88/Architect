export { drawFurniture, FurnitureSVG };
import { FurnitureType } from "@/lib/siteData";

function drawFurniture(type: FurnitureType, x: number, y: number, w: number, h: number, col: string, sw: number) {
  const cx = x + w / 2, cy = y + h / 2;
  switch (type) {
    case "door": return <>
      <rect x={x} y={y + h - sw * 4} width={w * 0.1} height={sw * 4} fill="none" stroke={col} strokeWidth={sw} />
      <rect x={x + w * 0.9} y={y + h - sw * 4} width={w * 0.1} height={sw * 4} fill="none" stroke={col} strokeWidth={sw} />
      <rect x={x + w * 0.9} y={y} width={w * 0.1} height={h} fill={col} stroke="none" />
      <path d={`M${x + w * 0.9},${y} A${w * 0.9},${h} 0 0,0 ${x + w * 0.1},${y + h - sw * 2}`} fill="none" stroke={col} strokeWidth={sw} strokeDasharray={`${sw * 4} ${sw * 3}`} />
    </>;
    case "double-door": return <>
      <rect x={x} y={y + h - sw * 4} width={w * 0.1} height={sw * 4} fill="none" stroke={col} strokeWidth={sw} />
      <rect x={x + w * 0.9} y={y + h - sw * 4} width={w * 0.1} height={sw * 4} fill="none" stroke={col} strokeWidth={sw} />
      <rect x={x} y={y} width={w * 0.1} height={h} fill={col} stroke="none" />
      <rect x={x + w * 0.9} y={y} width={w * 0.1} height={h} fill={col} stroke="none" />
      <path d={`M${x + w * 0.1},${y} A${w * 0.45},${h} 0 0,1 ${cx},${y + h - sw * 2}`} fill="none" stroke={col} strokeWidth={sw} strokeDasharray={`${sw * 4} ${sw * 3}`} />
      <path d={`M${x + w * 0.9},${y} A${w * 0.45},${h} 0 0,0 ${cx},${y + h - sw * 2}`} fill="none" stroke={col} strokeWidth={sw} strokeDasharray={`${sw * 4} ${sw * 3}`} />
    </>;
    case "window": return <>
      <rect x={x} y={y} width={w} height={h} fill="none" stroke={col} strokeWidth={sw} />
      <line x1={x} y1={cy} x2={x + w} y2={cy} stroke={col} strokeWidth={sw * 0.6} />
      <line x1={x + w * 0.25} y1={y} x2={x + w * 0.25} y2={y + h} stroke={col} strokeWidth={sw * 0.4} />
      <line x1={x + w * 0.75} y1={y} x2={x + w * 0.75} y2={y + h} stroke={col} strokeWidth={sw * 0.4} />
    </>;
    case "stairs-up": case "stairs-down": {
      const up = type === "stairs-up";
      const treads = 8;
      const elements = [<rect key="o" x={x} y={y} width={w} height={h} fill="none" stroke={col} strokeWidth={sw} />];
      for (let i = 1; i < treads; i++) {
        const ty = y + (h * i) / treads;
        elements.push(<line key={i} x1={x} y1={ty} x2={x + w} y2={ty} stroke={col} strokeWidth={sw * 0.5} />);
      }
      const ay1 = up ? y + h * 0.8 : y + h * 0.2;
      const ay2 = up ? y + h * 0.2 : y + h * 0.8;
      elements.push(<line key="ar" x1={cx} y1={ay1} x2={cx} y2={ay2} stroke={col} strokeWidth={sw} />);
      const arrowD = up ? h * 0.1 : -h * 0.1;
      elements.push(<line key="al" x1={cx} y1={ay2} x2={cx - w * 0.15} y2={ay2 + arrowD} stroke={col} strokeWidth={sw} />);
      elements.push(<line key="ar2" x1={cx} y1={ay2} x2={cx + w * 0.15} y2={ay2 + arrowD} stroke={col} strokeWidth={sw} />);
      return <>{elements}</>;
    }
    case "elevator": return <>
      <rect x={x} y={y} width={w} height={h} fill="none" stroke={col} strokeWidth={sw} />
      <line x1={x} y1={y} x2={x + w} y2={y + h} stroke={col} strokeWidth={sw * 0.5} />
      <line x1={x + w} y1={y} x2={x} y2={y + h} stroke={col} strokeWidth={sw * 0.5} />
    </>;
    case "table-rect": return <>
      <rect x={x + w * 0.03} y={y + h * 0.06} width={w * 0.94} height={h * 0.88} fill="none" stroke={col} strokeWidth={sw} rx={sw} />
    </>;
    case "table-round": return <>
      <ellipse cx={cx} cy={cy} rx={w * 0.45} ry={h * 0.45} fill="none" stroke={col} strokeWidth={sw} />
    </>;
    case "desk": return <>
      <rect x={x} y={y} width={w} height={h * 0.45} fill="none" stroke={col} strokeWidth={sw} />
      <rect x={x + w * 0.6} y={y + h * 0.45} width={w * 0.4} height={h * 0.55} fill="none" stroke={col} strokeWidth={sw} />
    </>;
    case "reception-desk": return <>
      <path d={`M${x},${y} L${x + w * 0.7},${y} Q${x + w},${y} ${x + w},${y + h * 0.5} L${x + w},${y + h} L${x},${y + h} Z`} fill="none" stroke={col} strokeWidth={sw} />
      <rect x={x + w * 0.05} y={y + h * 0.2} width={w * 0.5} height={h * 0.6} fill="none" stroke={col} strokeWidth={sw * 0.5} />
    </>;
    case "counter": return <>
      <rect x={x} y={y} width={w} height={h} fill="none" stroke={col} strokeWidth={sw} />
      <line x1={x + w * 0.05} y1={cy} x2={x + w * 0.95} y2={cy} stroke={col} strokeWidth={sw * 0.4} />
    </>;
    case "chair": return <>
      <rect x={x + w * 0.1} y={y + h * 0.25} width={w * 0.8} height={h * 0.65} fill="none" stroke={col} strokeWidth={sw} />
      <rect x={x + w * 0.05} y={y + h * 0.05} width={w * 0.9} height={h * 0.2} fill="none" stroke={col} strokeWidth={sw * 1.2} rx={sw} />
    </>;
    case "office-chair": return <>
      <ellipse cx={cx} cy={cy} rx={w * 0.42} ry={h * 0.42} fill="none" stroke={col} strokeWidth={sw} />
      <rect x={x + w * 0.22} y={y + h * 0.18} width={w * 0.56} height={h * 0.35} fill="none" stroke={col} strokeWidth={sw * 0.6} rx={sw} />
      <line x1={cx} y1={y + h * 0.85} x2={cx} y2={y + h * 0.55} stroke={col} strokeWidth={sw * 0.5} />
      <line x1={x + w * 0.2} y1={y + h * 0.88} x2={x + w * 0.8} y2={y + h * 0.88} stroke={col} strokeWidth={sw * 0.5} />
    </>;
    case "sofa": return <>
      <rect x={x + w * 0.04} y={y + h * 0.05} width={w * 0.92} height={h * 0.3} fill="none" stroke={col} strokeWidth={sw} rx={sw} />
      <rect x={x + w * 0.04} y={y + h * 0.35} width={w * 0.92} height={h * 0.4} fill="none" stroke={col} strokeWidth={sw} />
      <rect x={x} y={y + h * 0.05} width={w * 0.1} height={h * 0.85} fill="none" stroke={col} strokeWidth={sw} rx={sw} />
      <rect x={x + w * 0.9} y={y + h * 0.05} width={w * 0.1} height={h * 0.85} fill="none" stroke={col} strokeWidth={sw} rx={sw} />
    </>;
    case "toilet": return <>
      <rect x={x + w * 0.1} y={y} width={w * 0.8} height={h * 0.3} fill="none" stroke={col} strokeWidth={sw} />
      <ellipse cx={cx} cy={y + h * 0.65} rx={w * 0.4} ry={h * 0.32} fill="none" stroke={col} strokeWidth={sw} />
      <line x1={x + w * 0.1} y1={y + h * 0.3} x2={x + w * 0.1} y2={y + h * 0.4} stroke={col} strokeWidth={sw * 0.5} />
      <line x1={x + w * 0.9} y1={y + h * 0.3} x2={x + w * 0.9} y2={y + h * 0.4} stroke={col} strokeWidth={sw * 0.5} />
    </>;
    case "sink": return <>
      <rect x={x + w * 0.08} y={y} width={w * 0.84} height={h * 0.2} fill="none" stroke={col} strokeWidth={sw} />
      <ellipse cx={cx} cy={y + h * 0.6} rx={w * 0.38} ry={h * 0.35} fill="none" stroke={col} strokeWidth={sw} />
      <line x1={cx} y1={y + h * 0.35} x2={cx} y2={y + h * 0.55} stroke={col} strokeWidth={sw * 0.5} />
      <line x1={cx - w * 0.08} y1={y + h * 0.48} x2={cx + w * 0.08} y2={y + h * 0.48} stroke={col} strokeWidth={sw * 0.5} />
    </>;
    case "urinal": return <>
      <rect x={x + w * 0.12} y={y} width={w * 0.76} height={h * 0.25} fill="none" stroke={col} strokeWidth={sw} />
      <path d={`M${x + w * 0.12},${y + h * 0.25} Q${x + w * 0.12},${y + h} ${cx},${y + h} Q${x + w * 0.88},${y + h} ${x + w * 0.88},${y + h * 0.25}`} fill="none" stroke={col} strokeWidth={sw} />
    </>;
    case "shower": return <>
      <rect x={x} y={y} width={w} height={h} fill="none" stroke={col} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={Math.min(w, h) * 0.08} fill="none" stroke={col} strokeWidth={sw} />
      {[0, 45, 90, 135, 180, 225, 270, 315].map(a => {
        const r1 = Math.min(w, h) * 0.12, r2 = Math.min(w, h) * 0.22;
        const rad = (a * Math.PI) / 180;
        return <line key={a} x1={cx + r1 * Math.cos(rad)} y1={cy + r1 * Math.sin(rad)} x2={cx + r2 * Math.cos(rad)} y2={cy + r2 * Math.sin(rad)} stroke={col} strokeWidth={sw * 0.4} />;
      })}
    </>;
    case "shelf": return <>
      <rect x={x} y={y} width={w} height={h} fill="none" stroke={col} strokeWidth={sw} />
      <line x1={x + w * 0.33} y1={y} x2={x + w * 0.33} y2={y + h} stroke={col} strokeWidth={sw * 0.4} />
      <line x1={x + w * 0.66} y1={y} x2={x + w * 0.66} y2={y + h} stroke={col} strokeWidth={sw * 0.4} />
    </>;
    case "filing-cabinet": return <>
      <rect x={x + w * 0.05} y={y} width={w * 0.9} height={h} fill="none" stroke={col} strokeWidth={sw} />
      <line x1={x + w * 0.05} y1={cy} x2={x + w * 0.95} y2={cy} stroke={col} strokeWidth={sw * 0.4} />
      <line x1={cx - w * 0.12} y1={y + h * 0.25} x2={cx + w * 0.12} y2={y + h * 0.25} stroke={col} strokeWidth={sw * 0.6} />
      <line x1={cx - w * 0.12} y1={y + h * 0.75} x2={cx + w * 0.12} y2={y + h * 0.75} stroke={col} strokeWidth={sw * 0.6} />
    </>;
    case "fire-exit": return <>
      <line x1={x} y1={y} x2={x + w} y2={y} stroke={col} strokeWidth={sw * 2} />
      <path d={`M${x + w},${y} A${w},${w} 0 0,1 ${x},${Math.min(y + w, y + h)}`} fill="none" stroke={col} strokeWidth={sw} />
      <polygon points={`${x + w * 0.55},${y + h * 0.3} ${x + w * 0.75},${cy} ${x + w * 0.55},${y + h * 0.7}`} fill="none" stroke={col} strokeWidth={sw} />
    </>;
    case "column": return <>
      <rect x={x} y={y} width={w} height={h} fill={col} fillOpacity={0.15} stroke={col} strokeWidth={sw} />
      <line x1={x} y1={y} x2={x + w} y2={y + h} stroke={col} strokeWidth={sw * 0.4} />
      <line x1={x + w} y1={y} x2={x} y2={y + h} stroke={col} strokeWidth={sw * 0.4} />
    </>;
    case "planter": return <>
      <circle cx={cx} cy={cy} r={Math.min(w, h) * 0.45} fill="none" stroke={col} strokeWidth={sw} />
      <line x1={cx} y1={cy - h * 0.25} x2={cx} y2={cy + h * 0.25} stroke={col} strokeWidth={sw * 0.4} />
      <line x1={cx - w * 0.25} y1={cy} x2={cx + w * 0.25} y2={cy} stroke={col} strokeWidth={sw * 0.4} />
      <line x1={cx - w * 0.18} y1={cy - h * 0.18} x2={cx + w * 0.18} y2={cy + h * 0.18} stroke={col} strokeWidth={sw * 0.3} />
      <line x1={cx + w * 0.18} y1={cy - h * 0.18} x2={cx - w * 0.18} y2={cy + h * 0.18} stroke={col} strokeWidth={sw * 0.3} />
    </>;
    case "shrub": {
      const rx = w * 0.44, ry = h * 0.42;
      return <>
        <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="rgba(30,60,30,0.25)" stroke={col} strokeWidth={sw} />
        <ellipse cx={cx - w * 0.12} cy={cy - h * 0.08} rx={rx * 0.5} ry={ry * 0.5} fill="none" stroke={col} strokeWidth={sw * 0.35} />
        <ellipse cx={cx + w * 0.12} cy={cy + h * 0.06} rx={rx * 0.45} ry={ry * 0.45} fill="none" stroke={col} strokeWidth={sw * 0.35} />
      </>;
    }
    case "tree1": return <image href="/tree1.svg" x={x} y={y} width={w} height={h} opacity={0.9} preserveAspectRatio="none" style={{ filter: "invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(118%) contrast(119%)" }} />;
    case "tree2": return <image href="/tree2.svg" x={x} y={y} width={w} height={h} opacity={0.9} preserveAspectRatio="none" style={{ filter: "invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(118%) contrast(119%)" }} />;
    case "tree3": return <image href="/tree3.svg" x={x} y={y} width={w} height={h} opacity={0.9} preserveAspectRatio="none" style={{ filter: "invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(118%) contrast(119%)" }} />;
    case "partition": return <>
      <rect x={x} y={y} width={w} height={h} fill={col} fillOpacity={0.2} stroke={col} strokeWidth={sw} />
    </>;
    default: return <rect x={x} y={y} width={w} height={h} fill="none" stroke={col} strokeWidth={sw} />;
  }
}

interface FurnitureSVGProps {
  type: FurnitureType;
  x: number;
  y: number;
  w: number;
  h: number;
  rotation: number;
  selected?: boolean;
  color?: string; // Optional custom color (e.g., from room)
  label?: string; // Optional custom text for labels
  flipX?: boolean;
  flipY?: boolean;
}

const FurnitureSVG = ({ type, x, y, w, h, rotation, selected, color, label, flipX, flipY }: FurnitureSVGProps) => {
  const cx = x + w / 2, cy = y + h / 2;
  const baseCol = color || "#8b9dc3";
  const col = selected ? "#fff" : baseCol;
  const sw = selected ? 1.2 : 0.8;
  
  let transform = "";
  if (rotation) transform += `rotate(${rotation} ${cx} ${cy}) `;
  if (flipX || flipY) {
    const sx = flipX ? -1 : 1;
    const sy = flipY ? -1 : 1;
    // Translate to origin, scale, then translate back
    transform += `translate(${cx}, ${cy}) scale(${sx}, ${sy}) translate(${-cx}, ${-cy})`;
  }

  return (
    <g transform={transform || undefined} style={{ pointerEvents: "none" }}>
      {drawFurniture(type, x, y, w, h, col, sw)}
    </g>
  );
}
