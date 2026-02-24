"use client";
import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { Room, RoomCategory, ROOM_COLORS, defaultRooms, FurnitureItem, FurnitureType, FURNITURE_CATALOG, FurnitureCatalogEntry, defaultFurniture } from "@/lib/siteData";
import { drawFurniture, FurnitureSVG } from "@/components/FurnitureRenderer";
import FloorPlanRenderer from "@/components/FloorPlanRenderer";
import PerspectiveFloorView from "@/components/PerspectiveFloorView";

/* ═══ UNDO / REDO ═══ */
interface EditorState { rooms: Room[]; furniture: FurnitureItem[]; }
function useHistory(initial: EditorState) {
  const [hState, setHState] = useState({
    history: [initial],
    idx: 0
  });
  const current = hState.history[hState.idx];

  const push = useCallback((next: EditorState) => {
    setHState(prev => {
      const newHistory = prev.history.slice(0, prev.idx + 1);
      if (newHistory.length >= 60) newHistory.shift();
      const updatedHistory = [...newHistory, next];
      return {
        history: updatedHistory,
        idx: updatedHistory.length - 1
      };
    });
  }, []);

  const undo = useCallback(() => {
    setHState(prev => ({ ...prev, idx: Math.max(0, prev.idx - 1) }));
  }, []);

  const redo = useCallback(() => {
    setHState(prev => ({ ...prev, idx: Math.min(prev.history.length - 1, prev.idx + 1) }));
  }, []);

  const reset = useCallback((s: EditorState) => {
    setHState({ history: [s], idx: 0 });
  }, []);

  return { 
    current, 
    push, 
    undo, 
    redo, 
    canUndo: hState.idx > 0, 
    canRedo: hState.idx < hState.history.length - 1, 
    reset, 
    histLen: hState.history.length, 
    histIdx: hState.idx 
  };
}

const SNAP = 5;
const snap = (v: number) => Math.round(v / SNAP) * SNAP;

// Auto-fit font size: shrinks to fit the longest line within room width
function autoFitFontSize(label: string, w: number, h: number, customFs?: number): number {
  if (customFs) return customFs;
  const lines = label.split("\n");
  const longestLine = Math.max(...lines.map(l => l.length));
  const lineCount = lines.length;
  // ~0.55 avg char width ratio for Inter at fontSize
  const fsByWidth = longestLine > 0 ? (w * 0.9) / (longestLine * 0.55) : 8;
  const fsByHeight = (h * 0.85) / (lineCount * 1.4);
  return Math.max(3.5, Math.min(8, fsByWidth, fsByHeight));
}



/* ═══ CATALOG PREVIEW ═══ */
function CatalogPreview({ entry }: { entry: FurnitureCatalogEntry }) {
  const pw = 28, ph = 28;
  const aspect = entry.defaultW / entry.defaultH;
  const sx = aspect > 1 ? pw * 0.85 : ph * 0.85 * aspect;
  const sy = aspect > 1 ? pw * 0.85 / aspect : ph * 0.85;
  const ox = (pw - sx) / 2, oy = (ph - sy) / 2;
  return (
    <svg viewBox={`0 0 ${pw} ${ph}`} width={pw} height={ph}>
      {drawFurniture(entry.type, ox, oy, sx, sy, "#8b9dc3", 0.5)}
    </svg>
  );
}

/* ═══ ADMIN PAGE ═══ */
export default function AdminPage() {
  const { current: state, push, undo, redo, canUndo, canRedo, reset: resetH, histLen, histIdx } = useHistory({ rooms: [...defaultRooms], furniture: [...defaultFurniture] });
  
  // Safety check for race conditions
  if (!state) return <div className="p-8 text-stone-500 font-serif">Initializing editor state...</div>;
  const { rooms, furniture } = state;

  const [floorColor, setFloorColor] = useState("rgba(26,24,22,0.15)");

  // Load from localStorage AFTER hydration to avoid server/client mismatch
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    if (hydrated) return;
    try {
      const sr = localStorage.getItem("ngc-rooms");
      const sf = localStorage.getItem("ngc-furniture");
      if (sr || sf) {
        resetH({
          rooms: sr ? JSON.parse(sr) : [...defaultRooms],
          furniture: sf ? JSON.parse(sf) : [...defaultFurniture],
        });
      }
      const sc = localStorage.getItem("ngc-floor-color");
      if (sc) setFloorColor(sc);
    } catch { /* ignore */ }
    setHydrated(true);
  }, [hydrated, resetH]);

  const commitRooms = useCallback((fn: (p: Room[]) => Room[]) => push({ rooms: fn(rooms), furniture }), [rooms, furniture, push]);
  const commitFurn = useCallback((fn: (p: FurnitureItem[]) => FurnitureItem[]) => push({ rooms, furniture: fn(furniture) }), [rooms, furniture, push]);
  const commitBoth = useCallback((fr: (p: Room[]) => Room[], ff: (p: FurnitureItem[]) => FurnitureItem[]) => push({ rooms: fr(rooms), furniture: ff(furniture) }), [rooms, furniture, push]);

  const [saved, setSaved] = useState(false);

  const saveToStorage = () => {
    try {
      localStorage.setItem("ngc-rooms", JSON.stringify(rooms));
      localStorage.setItem("ngc-furniture", JSON.stringify(furniture));
      localStorage.setItem("ngc-floor-color", floorColor);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      alert("Failed to save to local storage.");
    }
  };

  /* ─ State ─ */
  // Selection modes: "room" or "furniture" or "mixed"
  type SelKind = "room" | "furniture" | "mixed";
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPan, setIsPan] = useState(false);
  const [panSt, setPanSt] = useState({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);

  const [selection, setSelection] = useState<Set<string>>(new Set());
  const [selKind, setSelKind] = useState<SelKind>("room");
  const [viewMode, setViewMode] = useState<"2d"|"3d">("2d");
  const [activeFloor, setActiveFloor] = useState<number|"all">(1);
  const filteredRooms = activeFloor === "all" ? rooms : rooms.filter(r => (r.floor || 1) === activeFloor);
  const filteredFurniture = activeFloor === "all" ? furniture : furniture.filter(f => (f.floor || 1) === activeFloor);
  
  const [dragging, setDragging] = useState<{ id: string; kind: SelKind } | null>(null);
  const [dragOff, setDragOff] = useState({ x: 0, y: 0 });
  const [resizing, setResizing] = useState<{ id: string; kind: SelKind; dir: string } | null>(null);
  const [resizeStart, setResizeStart] = useState<{ x: number, y: number, w: number, h: number, sx: number, sy: number } | null>(null);

  const [snapOn, setSnapOn] = useState(true);
  const [sideTab, setSideTab] = useState<"rooms" | "furniture" | "all">("all");

  const [showAdd, setShowAdd] = useState(false);
  const [newRoom, setNewRoom] = useState({ label: "", category: "executive" as RoomCategory });
  const [search, setSearch] = useState("");

  const [clipboard, setClipboard] = useState<{ rooms: Room[]; furniture: FurnitureItem[] }>({ rooms: [], furniture: [] });
  const [copied, setCopied] = useState(false);

  const [isMarquee, setIsMarquee] = useState(false);
  const [marquee, setMarquee] = useState<{ x1: number, y1: number, x2: number, y2: number } | null>(null);

  // Furniture catalog filter
  const [furnFilter, setFurnFilter] = useState("");
  const furnGroups = useMemo(() => {
    const groups = new Map<string, FurnitureCatalogEntry[]>();
    FURNITURE_CATALOG.forEach(e => {
      if (furnFilter && !e.label.toLowerCase().includes(furnFilter.toLowerCase()) && !e.group.toLowerCase().includes(furnFilter.toLowerCase())) return;
      if (!groups.has(e.group)) groups.set(e.group, []);
      groups.get(e.group)!.push(e);
    });
    return groups;
  }, [furnFilter]);

  // SVG point
  const svgPt = useCallback((cx: number, cy: number) => {
    const svg = svgRef.current; if (!svg) return { x: 0, y: 0 };
    const pt = svg.createSVGPoint(); pt.x = cx; pt.y = cy;
    const s = pt.matrixTransform(svg.getScreenCTM()!.inverse());
    return { x: s.x, y: s.y };
  }, []);

  const selectedRoom = selKind === "room" && selection.size === 1 ? rooms.find(r => selection.has(r.id)) : null;
  const selectedFurn = selKind === "furniture" && selection.size === 1 ? furniture.find(f => selection.has(f.id)) : null;

  /* ─ Keyboard ─ */
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      const t = (e.target as HTMLElement).tagName;
      if (t === "INPUT" || t === "TEXTAREA" || t === "SELECT") return;
      if (e.ctrlKey && e.key === "z" && !e.shiftKey) { e.preventDefault(); undo(); }
      if (e.ctrlKey && (e.key === "y" || (e.key === "z" && e.shiftKey))) { e.preventDefault(); redo(); }
      if ((e.key === "Delete" || e.key === "Backspace") && selection.size > 0) {
        commitBoth(p => p.filter(r => !selection.has(r.id)), p => p.filter(f => !selection.has(f.id)));
        setSelection(new Set());
      }
      if (e.ctrlKey && e.key === "a") {
        e.preventDefault();
        if (sideTab === "rooms") setSelection(new Set(rooms.map(r => r.id)));
        else if (sideTab === "furniture") setSelection(new Set(furniture.map(f => f.id)));
        else setSelection(new Set([...rooms.map(r => r.id), ...furniture.map(f => f.id)]));
      }
      if (e.key === "Escape") setSelection(new Set());
      // Duplicate
      if (e.ctrlKey && e.key === "d" && selection.size > 0) {
        e.preventDefault();
        const ns = new Set<string>();
        const dupesR: Room[] = [];
        const dupesF: FurnitureItem[] = [];
        rooms.filter(r => selection.has(r.id)).forEach(r => { const id = `room-${Date.now()}-${Math.random().toString(36).slice(2,5)}`; dupesR.push({ ...r, id, x: r.x+15, y: r.y+15 }); ns.add(id); });
        furniture.filter(f => selection.has(f.id)).forEach(f => { const id = `furn-${Date.now()}-${Math.random().toString(36).slice(2,5)}`; dupesF.push({ ...f, id, x: f.x+15, y: f.y+15 }); ns.add(id); });
        commitBoth(p => [...p, ...dupesR], p => [...p, ...dupesF]);
        setSelection(ns);
      }
      // Copy / Paste
      if (e.ctrlKey && e.key === "c" && selection.size > 0) {
        setClipboard({
          rooms: rooms.filter(r => selection.has(r.id)),
          furniture: furniture.filter(f => selection.has(f.id)),
        });
      }
      if (e.ctrlKey && e.key === "v" && (clipboard.rooms.length > 0 || clipboard.furniture.length > 0)) {
        const ns = new Set<string>();
        const pastedR: Room[] = [];
        const pastedF: FurnitureItem[] = [];
        clipboard.rooms.forEach(r => { const id = `p-${Date.now()}-${Math.random().toString(36).slice(2,5)}`; pastedR.push({ ...r, id, x: r.x+20, y: r.y+20 }); ns.add(id); });
        clipboard.furniture.forEach(f => { const id = `pf-${Date.now()}-${Math.random().toString(36).slice(2,5)}`; pastedF.push({ ...f, id, x: f.x+20, y: f.y+20 }); ns.add(id); });
        commitBoth(p => [...p, ...pastedR], p => [...p, ...pastedF]);
        setSelection(ns);
      }
      // Nudge
      const nudge = e.shiftKey ? 10 : 1;
      const moveItems = (dx: number, dy: number) => {
        commitBoth(
          p => p.map(r => selection.has(r.id) ? { ...r, x: r.x+dx, y: r.y+dy } : r),
          p => p.map(f => selection.has(f.id) ? { ...f, x: f.x+dx, y: f.y+dy } : f)
        );
      };
      if (e.key === "ArrowLeft" && selection.size) { e.preventDefault(); moveItems(-nudge, 0); }
      if (e.key === "ArrowRight" && selection.size) { e.preventDefault(); moveItems(nudge, 0); }
      if (e.key === "ArrowUp" && selection.size) { e.preventDefault(); moveItems(0, -nudge); }
      if (e.key === "ArrowDown" && selection.size) { e.preventDefault(); moveItems(0, nudge); }
      // Rotate furniture
      if (e.key === "r" && selection.size > 0) {
        commitFurn(p => p.map(f => selection.has(f.id) ? { ...f, rotation: (f.rotation + 90) % 360 } : f));
      }
      // Zoom
      if (e.ctrlKey && e.key === "=") { e.preventDefault(); setZoom(z => Math.min(5, z + 0.25)); }
      if (e.ctrlKey && e.key === "-") { e.preventDefault(); setZoom(z => Math.max(0.2, z - 0.25)); }
      if (e.ctrlKey && e.key === "0") { e.preventDefault(); setZoom(1); setPan({ x: 0, y: 0 }); }
      if (e.key === "g") setSnapOn(s => !s);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [selection, selKind, rooms, furniture, undo, redo, commitRooms, commitFurn, clipboard]);

  const onWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom(z => Math.max(0.2, Math.min(5, z + delta)));
  }, []);

  /* ─ Mouse handlers ─ */
  const onCanvasDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 1) { e.preventDefault(); setIsPan(true); setPanSt({ x: e.clientX - pan.x, y: e.clientY - pan.y }); return; }
    const target = e.target as SVGElement;
    const isBg = target === svgRef.current || (target.tagName === "rect" && (target.getAttribute("data-bg") === "1" || target.getAttribute("data-bg") === "floor"));
    if (e.button === 0 && isBg) {
      const pt = svgPt(e.clientX, e.clientY);
      setIsMarquee(true);
      setMarquee({ x1: pt.x, y1: pt.y, x2: pt.x, y2: pt.y });
      if (!e.shiftKey) setSelection(new Set());
    }
  }, [svgPt, pan]);

  const onItemDown = useCallback((e: React.MouseEvent, id: string, kind: SelKind, mode: string) => {
    e.stopPropagation();
    const pt = svgPt(e.clientX, e.clientY);
    const item = kind === "room" ? rooms.find(r => r.id === id) : furniture.find(f => f.id === id);
    if (!item) return;
    setSelKind(kind);
    if (mode === "drag") {
      if (e.shiftKey) {
        setSelection(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
        setSelKind(s => s === kind ? s : "mixed");
      } else if (!selection.has(id)) {
        setSelection(new Set([id]));
        setSelKind(kind);
      }
      setDragging({ id, kind });
      setDragOff({ x: pt.x - item.x, y: pt.y - item.y });
    } else {
      setSelection(new Set([id]));
      setResizing({ id, kind, dir: mode });
      setResizeStart({ x: item.x, y: item.y, w: item.w, h: item.h, sx: pt.x, sy: pt.y });
    }
  }, [svgPt, rooms, furniture, selection]);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (isPan) { setPan({ x: e.clientX - panSt.x, y: e.clientY - panSt.y }); return; }
    const pt = svgPt(e.clientX, e.clientY);
    if (isMarquee && marquee) { 
      const nextM = { ...marquee, x2: pt.x, y2: pt.y };
      setMarquee(nextM);

      // Real-time selection update (Windows-style)
      const x1 = Math.min(nextM.x1, nextM.x2), x2 = Math.max(nextM.x1, nextM.x2);
      const y1 = Math.min(nextM.y1, nextM.y2), y2 = Math.max(nextM.y1, nextM.y2);
      
      if (Math.abs(x2-x1) > 2 || Math.abs(y2-y1) > 2) {
        if (sideTab === "rooms") {
          const hitRooms = rooms.filter(r => r.x < x2 && r.x+r.w > x1 && r.y < y2 && r.y+r.h > y1);
          setSelKind("room");
          setSelection(new Set(hitRooms.map(r => r.id)));
        } else if (sideTab === "furniture") {
          const hitFurn = furniture.filter(f => f.x < x2 && f.x+f.w > x1 && f.y < y2 && f.y+f.h > y1);
          setSelKind("furniture");
          setSelection(new Set(hitFurn.map(f => f.id)));
        } else {
          const hitRooms = rooms.filter(r => r.x < x2 && r.x+r.w > x1 && r.y < y2 && r.y+r.h > y1);
          const hitFurn = furniture.filter(f => f.x < x2 && f.x+f.w > x1 && f.y < y2 && f.y+f.h > y1);
          setSelKind("mixed");
          setSelection(new Set([...hitRooms.map(r => r.id), ...hitFurn.map(f => f.id)]));
        }
      }
      return; 
    }
    if (dragging) {
      const newX = pt.x - dragOff.x;
      const newY = pt.y - dragOff.y;
      const r0 = dragging.kind === "room" ? rooms.find(r => r.id === dragging.id) : furniture.find(f => f.id === dragging.id);
      if (!r0) return;
      const targetX = snapOn ? snap(newX) : Math.round(newX);
      const targetY = snapOn ? snap(newY) : Math.round(newY);
      const mx = targetX - r0.x, my = targetY - r0.y;
      if (mx !== 0 || my !== 0) {
        push({ 
          rooms: rooms.map(r => selection.has(r.id) ? { ...r, x: r.x+mx, y: r.y+my } : r), 
          furniture: furniture.map(f => selection.has(f.id) ? { ...f, x: f.x+mx, y: f.y+my } : f) 
        });
      }
    } else if (resizing && resizeStart) {
      const dx = pt.x - resizeStart.sx, dy = pt.y - resizeStart.sy;
      const d = resizing.dir;
      const calc = () => {
        let nx = resizeStart.x, ny = resizeStart.y, nw = resizeStart.w, nh = resizeStart.h;
        if (d.includes("e")) nw = Math.max(10, resizeStart.w + dx);
        if (d.includes("w")) { const dw = Math.min(dx, resizeStart.w - 10); nx = resizeStart.x + dw; nw = resizeStart.w - dw; }
        if (d.includes("s")) nh = Math.max(8, resizeStart.h + dy);
        if (d.includes("n")) { const dh = Math.min(dy, resizeStart.h - 8); ny = resizeStart.y + dh; nh = resizeStart.h - dh; }
        if (snapOn) { nx = snap(nx); ny = snap(ny); nw = snap(nw); nh = snap(nh); }
        return { x: Math.round(nx), y: Math.round(ny), w: Math.max(10, Math.round(nw)), h: Math.max(8, Math.round(nh)) };
      };
      const n = calc();
      if (resizing.kind === "room") push({ rooms: rooms.map(r => r.id === resizing.id ? { ...r, ...n } : r), furniture });
      else push({ rooms, furniture: furniture.map(f => f.id === resizing.id ? { ...f, ...n } : f) });
    }
  }, [isPan, panSt, svgPt, isMarquee, marquee, dragging, resizing, resizeStart, dragOff, rooms, furniture, push, selection, snapOn]);

  const onMouseUp = useCallback(() => {
    if (isPan) { setIsPan(false); return; }
    if (isMarquee && marquee) {
      // Selection was already processed in real-time during onMouseMove. Let's just finalize.
      setMarquee(null); 
      setIsMarquee(false); 
      return;
    }
    setDragging(null); setResizing(null); setResizeStart(null);
  }, [isPan, isMarquee, marquee]);

  /* ─ Actions ─ */
  const addRoom = () => {
    if (!newRoom.label.trim()) return;
    const id = `room-${Date.now()}`;
    const floor = activeFloor === "all" ? 1 : activeFloor;
    commitRooms(p => [...p, { id, label: newRoom.label.replace(/\\n/g, "\n"), category: newRoom.category, x: 500, y: 300, w: 120, h: 70, floor }]);
    setSelKind("room"); setSelection(new Set([id])); setShowAdd(false); setNewRoom({ label: "", category: "executive" });
  };

  const placeFurniture = (type: FurnitureType) => {
    const entry = FURNITURE_CATALOG.find(e => e.type === type)!;
    const label = "";
    const id = `furn-${Date.now()}-${Math.random().toString(36).slice(2,4)}`;
    const floor = activeFloor === "all" ? 1 : activeFloor;
    commitFurn(p => [...p, { id, type, x: 500, y: 300, w: entry.defaultW, h: entry.defaultH, rotation: 0, floor, label }]);
    setSelKind("furniture"); setSelection(new Set([id])); setSideTab("furniture");
  };

  const deleteSelected = () => {
    if (selKind === "room") commitRooms(p => p.filter(r => !selection.has(r.id)));
    else commitFurn(p => p.filter(f => !selection.has(f.id)));
    setSelection(new Set());
  };

  const updateRoom = (updates: Partial<Room>) => {
    if (!selectedRoom) return;
    commitRooms(p => p.map(r => r.id === selectedRoom.id ? { ...r, ...updates } : r));
  };
  const updateFurn = (updates: Partial<FurnitureItem>) => {
    if (!selectedFurn) return;
    commitFurn(p => p.map(f => f.id === selectedFurn.id ? { ...f, ...updates } : f));
  };

  // Align
  const align = (dir: string) => {
    if (selKind !== "room" || selection.size < 2) return;
    const sel = rooms.filter(r => selection.has(r.id));
    const minX = Math.min(...sel.map(r => r.x)), maxX = Math.max(...sel.map(r => r.x + r.w));
    const minY = Math.min(...sel.map(r => r.y)), maxY = Math.max(...sel.map(r => r.y + r.h));
    const cX = (minX + maxX) / 2, cY = (minY + maxY) / 2;
    commitRooms(prev => prev.map(r => {
      if (!selection.has(r.id)) return r;
      switch (dir) {
        case "left": return { ...r, x: minX }; case "right": return { ...r, x: maxX - r.w };
        case "top": return { ...r, y: minY }; case "bottom": return { ...r, y: maxY - r.h };
        case "centerH": return { ...r, x: Math.round(cX - r.w/2) }; case "centerV": return { ...r, y: Math.round(cY - r.h/2) };
        default: return r;
      }
    }));
  };

  // Combine: assign same group to selected rooms (hides shared internal borders)
  const combineRooms = () => {
    if (selKind !== "room" || selection.size < 2) return;
    const groupId = `grp-${Date.now()}`;
    commitRooms(p => p.map(r => selection.has(r.id) ? { ...r, group: groupId } : r));
  };

  // Ungroup: remove group from selected rooms
  const ungroupRooms = () => {
    if (selKind !== "room") return;
    commitRooms(p => p.map(r => selection.has(r.id) ? { ...r, group: undefined } : r));
  };

  const exportJSON = () => {
    navigator.clipboard.writeText(JSON.stringify({ rooms, furniture }, null, 2));
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };
  const importJSON = () => {
    const input = prompt("Paste JSON:"); if (!input) return;
    try {
      const p = JSON.parse(input);
      if (p.rooms && p.furniture) { resetH({ rooms: p.rooms, furniture: p.furniture }); }
      else if (Array.isArray(p)) { resetH({ rooms: p, furniture: [] }); }
      setSelection(new Set());
    } catch { alert("Invalid JSON"); }
  };
  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify({ rooms, furniture }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = "floor-plan.json"; a.click(); URL.revokeObjectURL(url);
  };
  const uploadJSON = () => {
    const input = document.createElement("input"); input.type = "file"; input.accept = ".json";
    input.onchange = (evt) => {
      const file = (evt.target as HTMLInputElement).files?.[0]; if (!file) return;
      const reader = new FileReader();
      reader.onload = () => { try { const p = JSON.parse(reader.result as string); if (p.rooms) resetH(p); else if (Array.isArray(p)) resetH({ rooms: p, furniture: [] }); setSelection(new Set()); } catch { alert("Invalid JSON"); } };
      reader.readAsText(file);
    };
    input.click();
  };

  const zoomPct = Math.round(zoom * 100);
  const mRect = marquee ? { x: Math.min(marquee.x1, marquee.x2), y: Math.min(marquee.y1, marquee.y2), w: Math.abs(marquee.x2-marquee.x1), h: Math.abs(marquee.y2-marquee.y1) } : null;

  // Resize handle renderer
  const renderHandles = (item: { x: number; y: number; w: number; h: number }, id: string, kind: SelKind) => {
    const handles = [
      { dir: "nw", x: item.x-4, y: item.y-4, cursor: "nw-resize" },
      { dir: "n",  x: item.x+item.w/2-3, y: item.y-4, cursor: "n-resize" },
      { dir: "ne", x: item.x+item.w-3, y: item.y-4, cursor: "ne-resize" },
      { dir: "w",  x: item.x-4, y: item.y+item.h/2-3, cursor: "w-resize" },
      { dir: "e",  x: item.x+item.w-3, y: item.y+item.h/2-3, cursor: "e-resize" },
      { dir: "sw", x: item.x-4, y: item.y+item.h-3, cursor: "sw-resize" },
      { dir: "s",  x: item.x+item.w/2-3, y: item.y+item.h-3, cursor: "s-resize" },
      { dir: "se", x: item.x+item.w-3, y: item.y+item.h-3, cursor: "se-resize" },
    ];
    return <>
      {handles.map(h => (
        <rect key={h.dir} x={h.x} y={h.y} width={7} height={7}
          fill={h.dir.length === 2 ? "#fff" : "#ccc"} stroke="#000" strokeWidth={0.5}
          style={{ cursor: h.cursor }}
          onMouseDown={e => onItemDown(e, id, kind, h.dir)} />
      ))}
      <text x={item.x+item.w/2} y={item.y-8} textAnchor="middle" fill="#888" fontSize="6" fontFamily="Inter">
        {item.w}×{item.h} @ ({item.x},{item.y})
      </text>
    </>;
  };

  if (!hydrated) return null;

  return (
    <div className="min-h-screen bg-stone-950 text-stone-200 select-none">
      {/* ═══ TOOLBAR ═══ */}
      <header className="sticky top-0 z-50 bg-stone-900/95 backdrop-blur border-b border-stone-800 px-3 py-1.5 flex items-center gap-2 text-xs overflow-x-auto">
        <a href="/" className="text-architect-500 hover:text-architect-400 shrink-0">← Site</a>
        <span className="w-px h-5 bg-stone-700" />
        <span className="text-stone-100 font-serif shrink-0" style={{ fontFamily: "'Playfair Display', serif" }}>Floor Plan Editor</span>
        <span className="text-stone-600 shrink-0">{rooms.length}R · {furniture.length}F</span>
        <span className="w-px h-5 bg-stone-700" />
        
        {/* View Toggle */}
        <div className="flex bg-stone-900 border border-stone-800 rounded p-1 shrink-0">
          <button onClick={() => setViewMode("2d")} className={`px-2 py-0.5 text-xs font-semibold uppercase tracking-wider rounded transition-colors ${viewMode === "2d" ? "bg-stone-800 text-stone-200" : "text-stone-500 hover:text-stone-300"}`}>2D</button>
          <button onClick={() => setViewMode("3d")} className={`px-2 py-0.5 text-xs font-semibold uppercase tracking-wider rounded transition-colors ${viewMode === "3d" ? "bg-stone-800 text-architect-400" : "text-stone-500 hover:text-stone-300"}`}>3D</button>
        </div>
        <span className="w-px h-5 bg-stone-700" />

        {/* Floor Toggle */}
        <div className="flex bg-stone-900 border border-stone-800 rounded p-1 shrink-0">
          {(["all", 1, 2, 3] as const).map(f => (
            <button key={f} onClick={() => setActiveFloor(f)} className={`px-2 py-0.5 text-[10px] uppercase font-semibold rounded transition-colors ${activeFloor === f ? "bg-stone-800 text-stone-200" : "text-stone-500 hover:text-stone-300"}`}>
              {f === "all" ? "All" : `F${f}`}
            </button>
          ))}
        </div>
        <span className="w-px h-5 bg-stone-700" />

        {/* Undo/Redo */}
        <div className="flex items-center border border-stone-800 rounded overflow-hidden shrink-0">
          <button onClick={undo} disabled={!canUndo} title="Undo · Ctrl+Z" className={`px-2 py-1 ${canUndo ? "hover:bg-stone-800 text-stone-300" : "text-stone-700 cursor-not-allowed"}`}>↶</button>
          <span className="text-[9px] text-stone-600 px-1">{histIdx}/{histLen-1}</span>
          <button onClick={redo} disabled={!canRedo} title="Redo · Ctrl+Y" className={`px-2 py-1 ${canRedo ? "hover:bg-stone-800 text-stone-300" : "text-stone-700 cursor-not-allowed"}`}>↷</button>
        </div>

        {/* Zoom */}
        <div className="flex items-center border border-stone-800 rounded overflow-hidden shrink-0">
          <button onClick={() => setZoom(z => Math.max(0.2, z-0.25))} className="px-2 py-1 hover:bg-stone-800 text-stone-300">−</button>
          <button onClick={() => { setZoom(1); setPan({x:0,y:0}); }} className="px-2 py-1 hover:bg-stone-800 text-stone-400 min-w-[40px] text-center">{zoomPct}%</button>
          <button onClick={() => setZoom(z => Math.min(5, z+0.25))} className="px-2 py-1 hover:bg-stone-800 text-stone-300">+</button>
        </div>

        <button onClick={() => setSnapOn(s => !s)} title="Toggle Snap · G" className={`px-2 py-1 border rounded shrink-0 ${snapOn ? "border-architect-600 text-architect-400 bg-architect-600/10" : "border-stone-700 text-stone-500"}`}>
          ⊞ Snap {snapOn ? "ON" : "OFF"}
        </button>

        <span className="w-px h-5 bg-stone-700" />

        {selection.size > 0 && <>
          <span className="text-architect-400 shrink-0">{selection.size} {selKind === "room" ? "room" : "item"}{selection.size > 1 ? "s" : ""}</span>
          <button onClick={deleteSelected} title="Delete · Del" className="px-2 py-1 border border-red-900/50 text-red-400 hover:bg-red-900/30 rounded shrink-0">🗑</button>
          <button onClick={() => { const ns = new Set<string>(); const dupes = selKind === "room" ? rooms.filter(r => selection.has(r.id)).map(r => { const id = `d-${Date.now()}-${Math.random().toString(36).slice(2,5)}`; ns.add(id); return { ...r, id, x: r.x+15, y: r.y+15 }; }) : []; const furnDupes = selKind === "furniture" ? furniture.filter(f => selection.has(f.id)).map(f => { const id = `fd-${Date.now()}-${Math.random().toString(36).slice(2,5)}`; ns.add(id); return { ...f, id, x: f.x+15, y: f.y+15 }; }) : []; if (dupes.length) commitRooms(p => [...p, ...dupes]); if (furnDupes.length) commitFurn(p => [...p, ...furnDupes]); setSelection(ns); }} title="Duplicate · Ctrl+D" className="px-2 py-1 border border-stone-700 text-stone-400 hover:bg-stone-800 rounded shrink-0">⧉ Dupe</button>
          {selKind === "furniture" && (
            <>
              <button onClick={() => commitFurn(p => p.map(f => selection.has(f.id) ? { ...f, rotation: (f.rotation+90)%360 } : f))} title="Rotate 90° · R" className="px-2 py-1 border border-stone-700 text-stone-400 hover:bg-stone-800 rounded shrink-0">↻ Rot</button>
              <button onClick={() => commitFurn(p => p.map(f => selection.has(f.id) ? { ...f, flipX: !f.flipX } : f))} title="Flip Horizontal" className="px-2 py-1 border border-stone-700 text-stone-400 hover:bg-stone-800 rounded shrink-0">↔ Flip H</button>
              <button onClick={() => commitFurn(p => p.map(f => selection.has(f.id) ? { ...f, flipY: !f.flipY } : f))} title="Flip Vertical" className="px-2 py-1 border border-stone-700 text-stone-400 hover:bg-stone-800 rounded shrink-0">↕ Flip V</button>
            </>
          )}
          {selKind === "room" && selection.size >= 2 && <>
            <button onClick={combineRooms} title="Group rooms — hide shared borders" className="px-2 py-1 border border-architect-700 text-architect-400 hover:bg-architect-600/20 rounded shrink-0">⊞ Combine</button>
            {rooms.some(r => selection.has(r.id) && r.group) && <button onClick={ungroupRooms} title="Ungroup rooms — show all borders again" className="px-2 py-1 border border-stone-700 text-stone-400 hover:bg-stone-800 rounded shrink-0">⊟ Ungroup</button>}
            <span className="text-stone-600 shrink-0">Align:</span>
            {["left","centerH","right","top","centerV","bottom"].map(d => (
              <button key={d} onClick={() => align(d)} title={d} className="px-1.5 py-1 hover:bg-stone-800 text-stone-400 rounded">
                {d === "left" ? "⫷" : d === "centerH" ? "⫿" : d === "right" ? "⫸" : d === "top" ? "⊤" : d === "centerV" ? "⊶" : "⊥"}
              </button>
            ))}
          </>}
        </>}

        <div className="flex-1" />
        <button onClick={uploadJSON} className="px-2 py-1 border border-stone-700 text-stone-400 hover:text-stone-200 rounded shrink-0">📂</button>
        <button onClick={downloadJSON} className="px-2 py-1 border border-stone-700 text-stone-400 hover:text-stone-200 rounded shrink-0" title="Save JSON file">💾</button>
        <button onClick={importJSON} className="px-2 py-1 border border-stone-700 text-stone-400 hover:text-stone-200 rounded shrink-0" title="Import from clipboard">📋</button>
        <button onClick={exportJSON} className="px-2 py-1 border border-stone-700 text-stone-400 hover:text-stone-200 rounded shrink-0">{copied ? "✓ Copied" : "📎 JSON"}</button>
        <button onClick={saveToStorage} className={`px-3 py-1 font-semibold rounded shrink-0 transition-colors ${saved ? "bg-green-600 text-white" : "bg-architect-600 text-stone-950 hover:bg-architect-500"}`}>{saved ? "✓ Saved!" : "💾 Save"}</button>
        <button onClick={() => { resetH({ rooms: [...defaultRooms], furniture: [] }); setSelection(new Set()); }} className="px-2 py-1 border border-red-900/50 text-red-400 hover:bg-red-900/30 rounded shrink-0" title="Reset to defaults">↺</button>
      </header>

      <div className="flex" style={{ height: "calc(100vh - 36px)" }}>
        {/* ═══ CANVAS ═══ */}
        <div className="flex-1 overflow-hidden relative"
          onMouseDown={e => { if (e.button === 1) { e.preventDefault(); setIsPan(true); setPanSt({ x: e.clientX - pan.x, y: e.clientY - pan.y }); } }}
          onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp} onWheel={onWheel}
          onContextMenu={e => { if (isPan) e.preventDefault(); }}
          style={{ cursor: isPan ? "grabbing" : isMarquee ? "crosshair" : "default" }}>
          <div className="inline-block origin-top-left p-4" style={{ transform: `translate(${pan.x}px,${pan.y}px) scale(${zoom})`, transformOrigin: "0 0" }}>
            <div className="bg-stone-900 border border-stone-800">
              {viewMode === "3d" ? (
                <div style={{ width: 1250, height: 605, overflow: 'hidden' }}>
                  <PerspectiveFloorView rooms={rooms} furniture={furniture} />
                </div>
              ) : (
                <svg ref={svgRef} viewBox="-10 0 1250 605" width="1250" height="605" className="block" onMouseDown={onCanvasDown}>
                <defs><pattern id="eg" width="4" height="4" patternUnits="userSpaceOnUse"><path d="M 4 0 L 0 0 0 4" fill="none" stroke="#1a1916" strokeWidth="0.4"/></pattern></defs>
                <rect data-bg="1" width="1250" height="605" fill="#0f0e0c"/>
                <rect data-bg="floor" width="1150" height="605" fill={floorColor} />
                <rect data-bg="1" width="1150" height="605" fill="url(#eg)"/>

                {snapOn && zoom >= 2 && Array.from({ length: Math.floor(1250/SNAP) }, (_, i) => <line key={`gv${i}`} x1={i*SNAP} y1="0" x2={i*SNAP} y2="605" stroke="#1a1916" strokeWidth="0.2"/>)}
                {snapOn && zoom >= 2 && Array.from({ length: Math.floor(605/SNAP) }, (_, i) => <line key={`gh${i}`} x1="0" y1={i*SNAP} x2="1250" y2={i*SNAP} stroke="#1a1916" strokeWidth="0.2"/>)}

                {/* Column grid */}
                {[["A",50], ["B",106], ["C",155], ["D",259], ["E",316], ["F",354], ["G",403], ["H",474], ["I",540], ["J",691], ["K",755], ["L",828], ["M",901], ["N",975], ["O",1065], ["P",1114], ["Q",1167]].map(([c,x])=>(
                  <g key={c as string}>
                    <line x1={x as number} y1={26} x2={x as number} y2={580} stroke="#3f3a35" strokeWidth={0.5} strokeDasharray="3 3"/>
                    <circle cx={x as number} cy={16} r={10} fill="#0f0e0c" stroke="#3f3a35" strokeWidth={1}/>
                    <text x={x as number} y={20} textAnchor="middle" fill="#3f3a35" fontSize="10" fontFamily="Inter">{c}</text>
                  </g>
                ))}
                {[[1,50], [2,89], [3,149], [4,184], [5,235], [6,272], [7,320], [8,358], [9,440], [10,465], [12,508]].map(([r,y])=>(
                  <g key={r}>
                    <line x1={40} y1={y} x2={1230} y2={y} stroke="#3f3a35" strokeWidth={0.5} strokeDasharray="3 3"/>
                    <circle cx={30} cy={y} r={10} fill="#0f0e0c" stroke="#3f3a35" strokeWidth={1}/>
                    <text x={30} y={y+4} textAnchor="middle" fill="#3f3a35" fontSize="10" fontFamily="Inter">{r}</text>
                  </g>
                ))}

                {/* Wing outlines */}
                <rect x="50" y="30" width="258" height="530" fill="none" stroke="#2a2520" strokeWidth="1.5" strokeDasharray="4 4"/>
                <rect x="308" y="30" width="593" height="530" fill="none" stroke="#2a2520" strokeWidth="1.5" strokeDasharray="4 4"/>
                <rect x="901" y="30" width="266" height="530" fill="none" stroke="#2a2520" strokeWidth="1.5" strokeDasharray="4 4"/>
                <rect x="460" y="30" width="295" height="395" fill="none" stroke="#1f1d1a" strokeWidth="1" strokeDasharray="4 4"/>
                <g transform="translate(28 228)"><circle cx="0" cy="0" r="14" fill="none" stroke="#3f3a35" strokeWidth="1"/><path d="M0-11 L3 4 L0 1 L-3 4Z" fill="#a8875e"/><text x="0" y="22" textAnchor="middle" fill="#a8875e" fontSize="8" fontFamily="Inter" fontWeight="bold">N</text></g>
                <g transform="translate(625 302.5)" opacity="0">
                  <rect x="-625" y="-302.5" width="1250" height="605" fill="none" pointerEvents="none" />
                </g>

                <FloorPlanRenderer 
                  className="pointer-events-none"
                  rooms={filteredRooms} 
                  furniture={filteredFurniture} 
                  selectedId={selKind === "room" ? Array.from(selection)[0] : null}
                  floorColor={floorColor}
                  showFurniture={false} // Disable base furniture to prevent ghosting
                  activeFloor={activeFloor}
                />

                {/* Overlays for interaction (drag handles etc) */}
                {/* ── ROOMS ── */}
                {filteredRooms.map((room, index, arr) => {
                  const isGrouped = !!room.group;
                  if (isGrouped && arr.findIndex(r => r.group === room.group) !== index) return null;

                  const renderRooms = isGrouped ? arr.filter(r => r.group === room.group) : [room];

                  return (
                    <g key={isGrouped ? `group-${room.group}` : `room-${room.id}`}>
                      {isGrouped && (
                        <defs>
                          <mask id={`mask-group-admin-${room.group}`}>
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
                      <g mask={isGrouped ? `url(#mask-group-admin-${room.group})` : undefined}>
                        {renderRooms.map(r => {
                          const c = ROOM_COLORS[r.category] || ROOM_COLORS["support"]; // Fallback
                          const isSel = selKind === "room" && selection.has(r.id);
                          const strokeCol = isSel ? "#fff" : c.stroke;
                          const sw = isSel ? 2.5 : 1;
                          const strokeW = isGrouped ? sw * 2 : sw;
                          return r.shape === "circle" ? (
                            <ellipse key={`s-${r.id}`} cx={r.x + r.w / 2} cy={r.y + r.h / 2} rx={r.w / 2} ry={r.h / 2} fill="none" stroke={strokeCol} strokeWidth={strokeW} />
                          ) : (
                            <rect key={`s-${r.id}`} x={r.x} y={r.y} width={r.w} height={r.h} fill="none" stroke={strokeCol} strokeWidth={strokeW} rx={1} />
                          );
                        })}
                      </g>

                      {/* Fills Layer */}
                      {(() => {
                        const firstCat = ROOM_COLORS[renderRooms[0].category] || ROOM_COLORS["support"]; // Fallback
                        const match = firstCat.fill.match(/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)/);
                        const groupOpacity = isGrouped && match ? parseFloat(match[4]) : undefined;
                        
                        return (
                          <g opacity={groupOpacity}>
                            {renderRooms.map(r => {
                              const c = ROOM_COLORS[r.category] || ROOM_COLORS["support"]; // Fallback
                              const rMatch = c.fill.match(/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)/);
                              const solidFill = isGrouped && rMatch ? `rgb(${rMatch[1]},${rMatch[2]},${rMatch[3]})` : c.fill;
                              const isSel = selKind === "room" && selection.has(r.id);
                              
                              return (
                                <g key={`f-${r.id}`}>
                                  {r.shape === "circle" ? (
                                    <ellipse cx={r.x + r.w / 2} cy={r.y + r.h / 2} rx={r.w / 2} ry={r.h / 2} fill={solidFill} stroke="none"
                                      style={{ cursor: dragging?.id === r.id ? "grabbing" : "grab" }} onMouseDown={e => onItemDown(e, r.id, "room", "drag")} />
                                  ) : (
                                    <rect x={r.x} y={r.y} width={r.w} height={r.h} fill={solidFill} stroke="none" rx={1}
                                      style={{ cursor: dragging?.id === r.id ? "grabbing" : "grab" }} onMouseDown={e => onItemDown(e, r.id, "room", "drag")} />
                                  )}
                                  {isSel && renderHandles(r, r.id, "room")}
                                </g>
                              );
                            })}
                          </g>
                        );
                      })()}
                    </g>
                  );
                })}

                {/* ── FURNITURE ── */}
                {filteredFurniture.map(fItem => {
                  const isSel = selKind === "furniture" && selection.has(fItem.id);
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
                  
                  const furnColor = parentRoom ? ROOM_COLORS[parentRoom.category].stroke : undefined;

                  return (
                    <g key={fItem.id}>
                      <rect x={fItem.x} y={fItem.y} width={fItem.w} height={fItem.h} fill="transparent" stroke="none"
                        style={{ cursor: dragging?.id === fItem.id ? "grabbing" : "grab" }}
                        onMouseDown={e => onItemDown(e, fItem.id, "furniture", "drag")} />
                      <FurnitureSVG type={fItem.type} x={fItem.x} y={fItem.y} w={fItem.w} h={fItem.h} rotation={fItem.rotation} selected={isSel} label={fItem.label} flipX={fItem.flipX} flipY={fItem.flipY} color={furnColor} />
                      {isSel && renderHandles(fItem, fItem.id, "furniture")}
                    </g>
                  );
                })}

                {/* Marquee */}
                {isMarquee && mRect && mRect.w > 2 && (
                  <rect x={mRect.x} y={mRect.y} width={mRect.w} height={mRect.h} fill="rgba(0,120,215,0.25)" stroke="#0078d7" strokeWidth="1"/>
                )}

                <g transform="translate(200 598)"><line x1="0" y1="0" x2="200" y2="0" stroke="#57514a" strokeWidth="1"/><text x="0" y="14" fill="#57514a" fontSize="8" fontFamily="Inter">0</text><text x="190" y="14" fill="#57514a" fontSize="8" fontFamily="Inter">20m</text></g>
                <text x="760" y="598" fill="#3f3a35" fontSize="9" fontFamily="Inter">{activeFloor === "all" ? "Sheet A 03–05 · All Floors" : activeFloor === 1 ? "Sheet A 03 · Ground Floor Plan" : activeFloor === 2 ? "Sheet A 04 · Second Floor Plan" : "Sheet A 05 · Third Floor Plan"} · Scale 1:200</text>
              </svg>
              )}
            </div>
          </div>
          <div className="absolute bottom-2 left-2 flex gap-3 text-[9px] text-stone-600 bg-stone-900/90 px-3 py-1.5 rounded border border-stone-800">
            <span>Drag=move</span><span>⬚ Marquee</span><span>⇧+Click multi</span><span>↑↓←→ nudge</span><span>R rotate</span><span>Del delete</span><span>Ctrl+D dupe</span><span>G snap</span>
          </div>
        </div>

        {/* ═══ SIDEBAR ═══ */}
        <div className="w-72 bg-stone-900 border-l border-stone-800 flex flex-col overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-stone-800">
            <button onClick={() => setSideTab("rooms")} className={`flex-1 py-2 text-xs font-medium transition-colors ${sideTab === "rooms" ? "bg-stone-800 text-stone-100" : "text-stone-500 hover:text-stone-300"}`}>
              🏠 Rooms ({rooms.length})
            </button>
            <button onClick={() => setSideTab("furniture")} className={`flex-1 py-2 text-xs font-medium transition-colors ${sideTab === "furniture" ? "bg-stone-800 text-stone-100" : "text-stone-500 hover:text-stone-300"}`}>
              🪑 Furniture ({furniture.length})
            </button>
          </div>
          
          <div className="p-2.5 border-b border-stone-800 bg-stone-900/40">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[9px] uppercase tracking-wider text-stone-500 font-bold">Floor Base Tint</span>
              <button onClick={() => setFloorColor("rgba(26,24,22,0.15)")} className="text-[8px] text-stone-600 hover:text-stone-400">Reset</button>
            </div>
            <div className="flex gap-2">
              <input type="color" value={floorColor.startsWith("#") ? floorColor : "#1a1816"} onChange={e => setFloorColor(e.target.value)}
                className="w-6 h-6 bg-transparent border-none cursor-pointer shrink-0 p-0 overflow-hidden rounded-full" />
              <input type="text" value={floorColor} onChange={e => setFloorColor(e.target.value)}
                className="flex-1 bg-stone-950 border border-stone-800 rounded px-1.5 py-0.5 text-[10px] text-stone-400 font-mono outline-none focus:border-stone-700 transition-colors" />
            </div>
          </div>

          {sideTab === "rooms" && (
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Add room */}
              <div className="p-2.5 border-b border-stone-800">
                {!showAdd ? (
                  <button onClick={() => setShowAdd(true)} className="w-full py-1.5 bg-architect-600/20 border border-architect-700 text-architect-400 text-xs hover:bg-architect-600/30">+ Add Room</button>
                ) : (
                  <div className="space-y-1.5">
                    <input type="text" placeholder="Label (\\n for breaks)" value={newRoom.label} onChange={e => setNewRoom(p => ({ ...p, label: e.target.value }))}
                      className="w-full px-2 py-1 bg-stone-800 border border-stone-700 text-stone-200 text-xs outline-none focus:border-architect-500" autoFocus onKeyDown={e => e.key === "Enter" && addRoom()}/>
                    <select value={newRoom.category} onChange={e => setNewRoom(p => ({ ...p, category: e.target.value as RoomCategory }))}
                      className="w-full px-2 py-1 bg-stone-800 border border-stone-700 text-stone-200 text-xs outline-none">
                      {(Object.keys(ROOM_COLORS) as RoomCategory[]).map(c => <option key={c} value={c}>{ROOM_COLORS[c].label}</option>)}
                    </select>
                    <div className="flex gap-1.5">
                      <button onClick={addRoom} className="flex-1 py-1 bg-architect-600 text-stone-950 text-xs font-semibold">Add</button>
                      <button onClick={() => setShowAdd(false)} className="flex-1 py-1 border border-stone-700 text-stone-400 text-xs">Cancel</button>
                    </div>
                  </div>
                )}
              </div>

              {/* Room editor */}
              {selectedRoom && (
                <div className="p-2.5 border-b border-stone-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-stone-300">Edit Room</span>
                    <button onClick={deleteSelected} className="text-[9px] text-red-400 hover:text-red-300">Delete</button>
                  </div>
                  <input type="text" value={selectedRoom.label.replace(/\n/g, "\\n")} onChange={e => updateRoom({ label: e.target.value.replace(/\\n/g, "\n") })}
                    className="w-full px-2 py-1 bg-stone-800 border border-stone-700 text-stone-200 text-[11px] outline-none"/>
                  <div className="grid grid-cols-5 gap-1">
                    {(Object.keys(ROOM_COLORS) as RoomCategory[]).map(cat => (
                      <button key={cat} onClick={() => updateRoom({ category: cat })} title={ROOM_COLORS[cat].label}
                        className={`h-5 rounded-sm border ${selectedRoom.category === cat ? "border-white ring-1 ring-white/30" : "border-stone-700 hover:border-stone-500"}`}
                        style={{ backgroundColor: ROOM_COLORS[cat].stroke }}/>
                    ))}
                  </div>
                  <div className="flex gap-2 items-center">
                    <label className="text-[10px] text-stone-500">Shape:</label>
                    <button onClick={() => updateRoom({ shape: "rect" })} className={`flex-1 px-2 py-0.5 text-[10px] rounded border ${!selectedRoom.shape || selectedRoom.shape === "rect" ? "bg-stone-700 border-stone-500 text-stone-200" : "bg-stone-800 border-stone-700 text-stone-400"}`}>Rect</button>
                    <button onClick={() => updateRoom({ shape: "circle" })} className={`flex-1 px-2 py-0.5 text-[10px] rounded border ${selectedRoom.shape === "circle" ? "bg-stone-700 border-stone-500 text-stone-200" : "bg-stone-800 border-stone-700 text-stone-400"}`}>Circle</button>
                  </div>
                  <div className="flex justify-between items-center bg-stone-800/50 p-1.5 rounded border border-stone-800">
                    <label className="text-[10px] text-stone-500">Floor Level:</label>
                    <div className="flex gap-1">
                      {[1,2,3].map(f => (
                        <button key={f} onClick={() => updateRoom({ floor: f })} className={`w-6 h-5 rounded text-[10px] font-bold ${selectedRoom.floor === f ? "bg-stone-600 text-white" : "bg-stone-800 text-stone-500 hover:text-stone-300"}`}>
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-1">
                    {(["x","y","w","h"] as const).map(f => (
                      <div key={f}><label className="text-[8px] uppercase text-stone-600 block">{f}</label>
                        <input type="number" value={selectedRoom[f]} onChange={e => updateRoom({ [f]: +e.target.value })}
                          className="w-full px-1 py-0.5 bg-stone-800 border border-stone-700 text-stone-200 text-[10px] outline-none"/>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Multi-select batch color */}
              {selKind === "room" && selection.size > 1 && (
                <div className="p-2.5 border-b border-stone-800">
                  <span className="text-[10px] text-architect-400">{selection.size} rooms selected</span>
                  <div className="mt-1.5 flex gap-1">
                    {(Object.keys(ROOM_COLORS) as RoomCategory[]).map(cat => (
                      <button key={cat} onClick={() => commitRooms(p => p.map(r => selection.has(r.id) ? { ...r, category: cat } : r))}
                        className="w-5 h-5 rounded-sm border border-stone-700 hover:border-white" style={{ backgroundColor: ROOM_COLORS[cat].stroke }}/>
                    ))}
                  </div>
                </div>
              )}

              {/* Room list */}
              <div className="flex-1 overflow-y-auto p-2">
                {filteredRooms.map(room => {
                  const c = ROOM_COLORS[room.category];
                  return (
                    <button key={room.id} onClick={() => { setSelKind("room"); setSelection(new Set([room.id])); }}
                      className={`w-full text-left px-2 py-1 text-[10px] flex items-center gap-1.5 ${selKind === "room" && selection.has(room.id) ? "bg-stone-800 border-l-2 border-architect-500" : "hover:bg-stone-800/50 border-l-2 border-transparent"}`}>
                      <span className="w-1.5 h-1.5 rounded-sm shrink-0" style={{ backgroundColor: c.stroke }}/><span className="text-stone-300 truncate">{room.label.replace(/\n/g," ")}</span>
                      <span className="ml-auto text-stone-700 text-[8px] shrink-0">{room.w}×{room.h}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {sideTab === "furniture" && (
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Furniture editor */}
              {selectedFurn && (() => {
                const entry = FURNITURE_CATALOG.find(e => e.type === selectedFurn.type);
                return (
                  <div className="p-2.5 border-b border-stone-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-semibold text-stone-300">{entry?.label || selectedFurn.type}</span>
                      <button onClick={deleteSelected} className="text-[9px] text-red-400 hover:text-red-300">Delete</button>
                    </div>
                    <div className="grid grid-cols-4 gap-1">
                      {(["x","y","w","h"] as const).map(f => (
                        <div key={f}><label className="text-[8px] uppercase text-stone-600 block">{f}</label>
                          <input type="number" value={selectedFurn[f]} onChange={e => updateFurn({ [f]: +e.target.value })}
                            className="w-full px-1 py-0.5 bg-stone-800 border border-stone-700 text-stone-200 text-[10px] outline-none"/>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-[8px] uppercase text-stone-600">Rotation</label>
                      <div className="flex gap-1">
                        {[0,90,180,270].map(deg => (
                          <button key={deg} onClick={() => updateFurn({ rotation: deg })}
                            className={`px-1.5 py-0.5 text-[9px] rounded ${selectedFurn.rotation === deg ? "bg-architect-600 text-stone-950" : "bg-stone-800 text-stone-400 hover:bg-stone-700"}`}>
                            {deg}°
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center bg-stone-800/50 p-1.5 rounded border border-stone-800">
                      <label className="text-[10px] text-stone-500">Floor Level:</label>
                      <div className="flex gap-1">
                        {[1,2,3].map(f => (
                          <button key={f} onClick={() => updateFurn({ floor: f })} className={`w-6 h-5 rounded text-[10px] font-bold ${selectedFurn.floor === f ? "bg-stone-600 text-white" : "bg-stone-800 text-stone-500 hover:text-stone-300"}`}>
                            {f}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Placed furniture list */}
              {filteredFurniture.length > 0 && (
                <div className="p-2 border-b border-stone-800 max-h-[120px] overflow-y-auto">
                  <h4 className="text-[9px] uppercase tracking-widest text-stone-600 mb-1">Placed ({filteredFurniture.length})</h4>
                  {filteredFurniture.map(f => {
                    const entry = FURNITURE_CATALOG.find(e => e.type === f.type);
                    return (
                      <button key={f.id} onClick={() => { setSelKind("furniture"); setSelection(new Set([f.id])); }}
                        className={`w-full text-left px-2 py-1 text-[10px] flex items-center gap-1.5 ${selKind === "furniture" && selection.has(f.id) ? "bg-stone-800 border-l-2 border-blue-500" : "hover:bg-stone-800/50 border-l-2 border-transparent"}`}>
                        <span className="text-stone-400 truncate">{entry?.label || f.type}</span>
                        <span className="ml-auto text-stone-700 text-[8px]">{f.rotation > 0 ? `${f.rotation}° ` : ""}{f.w}×{f.h}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Furniture catalog palette */}
              <div className="p-2 border-b border-stone-800">
                <input type="text" placeholder="Search furniture..." value={furnFilter} onChange={e => setFurnFilter(e.target.value)}
                  className="w-full px-2 py-1 bg-stone-800 border border-stone-700 text-stone-200 text-xs outline-none focus:border-architect-500 mb-1.5"/>
              </div>
              <div className="flex-1 overflow-y-auto p-2">
                {Array.from(furnGroups).map(([group, items]) => (
                  <div key={group} className="mb-3">
                    <h4 className="text-[9px] uppercase tracking-widest text-stone-500 mb-1">{group}</h4>
                    <div className="grid grid-cols-3 gap-1">
                      {items.map(entry => (
                        <button key={entry.type} onClick={() => placeFurniture(entry.type)} title={`Place ${entry.label}`}
                          className="flex flex-col items-center gap-0.5 p-1.5 bg-stone-800/50 hover:bg-stone-800 border border-stone-700 hover:border-stone-500 rounded transition-colors">
                          <CatalogPreview entry={entry} />
                          <span className="text-[8px] text-stone-400 text-center leading-tight">{entry.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Legend */}
          <div className="p-2 border-t border-stone-800">
            {(Object.keys(ROOM_COLORS) as RoomCategory[]).map(c => (
              <div key={c} className="flex items-center gap-1.5 py-0.5">
                <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: ROOM_COLORS[c].stroke }}/><span className="text-[9px] text-stone-500">{ROOM_COLORS[c].label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
