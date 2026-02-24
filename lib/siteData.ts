// ============================================================
// PROJECT DATA — PANCHO NGC PLANS.pdf (Sheets A01–A05)
// Project: New Government Center for E. B. Magalona
// Proponent: Erica Mae D. Pancho, BS Architecture 5C
// School: La Consolacion College Bacolod — AFAID
// Adviser: Ar. Gary Peter L. Bello, UAP
// Location: Brgy. Santo Niño, Enrique B. Magalona, Negros Occidental
// ============================================================

// ── Room data for the visual floor plan editor ──
export type RoomCategory =
  | "floor"        // tan   — Floor / Corridors
  | "financial"    // blue  — Financial Services
  | "public"       // green — Public Services
  | "integrated"   // orange — Integrated Hubs (BIR/LTO/PhilHealth)
  | "utility"      // red — Utility / Service
  | "support";     // gray  — Support / Circulation

export const ROOM_COLORS: Record<RoomCategory, { fill: string; stroke: string; text: string; label: string }> = {
  floor:      { fill: "rgba(212,197,169,0.22)", stroke: "#a8875e", text: "#d4c5a9", label: "Floor / Corridors" },
  financial:  { fill: "rgba(124,179,216,0.22)", stroke: "#3b82f6", text: "#7cb3d8", label: "Financial Services" },
  public:     { fill: "rgba(110,212,165,0.22)", stroke: "#16a34a", text: "#6ed4a5", label: "Public Services" },
  integrated: { fill: "rgba(232,168,76,0.22)",  stroke: "#d97706", text: "#e8a84c", label: "Integrated Hub (BIR/LTO/PhilHealth)" },
  utility:    { fill: "rgba(239,68,68,0.20)",   stroke: "#dc2626", text: "#f87171", label: "Utility / Service" },
  support:    { fill: "rgba(156,163,175,0.16)", stroke: "#64748b", text: "#9ca3af", label: "Support / Circulation" },
};

export interface Room {
  id: string;
  label: string;
  category: RoomCategory;
  x: number;       // SVG x coordinate (viewBox 0–1100)
  y: number;       // SVG y coordinate (viewBox 0–605)
  w: number;       // width in SVG units
  h: number;       // height in SVG units
  floor: number;   // 1 = ground, 2 = second, 3 = third
  fontSize?: number;
  group?: string;  // group ID — rooms in the same group hide shared internal borders
  shape?: "rect" | "circle";
}

// Current ground floor layout — matches Sheet A03
export const defaultRooms: Room[] = [
  // ── WEST WING (Cols A–C) ──
  { id: "elec-w",      label: "ELECTRICAL\nROOM",            category: "support",    x: 48,  y: 30,  w: 60,  h: 75, floor: 1 },
  { id: "stairs-w",    label: "STAIRS",                      category: "support",    x: 108, y: 30,  w: 65,  h: 75, floor: 1 },
  { id: "it-office",   label: "IT / OFFICE",                 category: "floor",  x: 48,  y: 105, w: 125, h: 65, floor: 1 },
  { id: "office-w",    label: "OFFICE",                      category: "floor",  x: 48,  y: 170, w: 125, h: 55, floor: 1 },
  { id: "treasurer",   label: "TREASURER'S\nOFFICE\nTREASURY HALL", category: "financial", x: 48, y: 225, w: 125, h: 95, floor: 1 },
  { id: "self-svc",    label: "SELF\nSERVICE",               category: "financial",  x: 48,  y: 320, w: 60,  h: 70, floor: 1 },
  { id: "txn-counter", label: "TRANSACTION\nCOUNTER",        category: "financial",  x: 108, y: 320, w: 65,  h: 70, floor: 1 },
  { id: "txn-window",  label: "TRANSACTION WINDOW",          category: "financial",  x: 48,  y: 390, w: 125, h: 40, floor: 1 },
  { id: "library",     label: "LIBRARY",                     category: "floor",  x: 48,  y: 430, w: 125, h: 65, floor: 1 },
  { id: "links-lobby", label: "LINKS / LOBBY",               category: "support",    x: 48,  y: 495, w: 125, h: 65, floor: 1 },

  // ── LEFT-CENTER WING (Cols D–H) ──
  { id: "office-d",    label: "OFFICE",                      category: "floor",  x: 173, y: 30,  w: 75,  h: 75, floor: 1 },
  { id: "office-e",    label: "OFFICE",                      category: "floor",  x: 248, y: 30,  w: 75,  h: 75, floor: 1 },
  { id: "mun-budget",  label: "MUNICIPAL\nBUDGET",           category: "financial",  x: 323, y: 30,  w: 75,  h: 75, floor: 1 },
  { id: "office-h",    label: "OFFICE",                      category: "floor",  x: 398, y: 30,  w: 73,  h: 75, floor: 1 },
  { id: "assessor",    label: "ASSESSOR'S OFFICE",           category: "floor",  x: 173, y: 105, w: 150, h: 95, floor: 1 },
  { id: "accounting",  label: "ACCOUNTING",                  category: "financial",  x: 323, y: 105, w: 148, h: 95, floor: 1 },
  { id: "budget-off",  label: "BUDGET OFFICE",               category: "financial",  x: 173, y: 200, w: 150, h: 100,floor: 1 },
  { id: "mpdc",        label: "MPDC / OFFICE",               category: "floor",  x: 323, y: 200, w: 148, h: 55, floor: 1 },
  { id: "conf-l",      label: "CONF. ROOM",                  category: "floor",  x: 323, y: 255, w: 148, h: 45, floor: 1 },
  { id: "wait-l",      label: "OPEN WAITING AREA",           category: "support",    x: 173, y: 300, w: 298, h: 128,floor: 1 },
  { id: "reception-l", label: "RECEPTION",                   category: "floor",  x: 173, y: 428, w: 298, h: 52, floor: 1 },
  { id: "emp-entrance",label: "EMPLOYEE ENTRANCE\nCITIZENS HALL ANTECHAMBER", category: "support", x: 173, y: 480, w: 298, h: 80, floor: 1 },

  // ── CENTRAL (Cols I–K) ──
  { id: "lift",        label: "LIFT",                        category: "floor",  x: 505, y: 395, w: 50,  h: 38, floor: 1 },
  { id: "stairs-c",    label: "STAIRS",                      category: "support",    x: 560, y: 395, w: 50,  h: 38, floor: 1 },

  // ── RIGHT-CENTER WING (Cols J–N) ──
  { id: "mswdo",       label: "MSWDO /\nSOCIAL WELFARE",     category: "public",     x: 644, y: 30,  w: 75,  h: 75, floor: 1 },
  { id: "agriculture", label: "AGRICULTURE",                 category: "public",     x: 719, y: 30,  w: 75,  h: 75, floor: 1 },
  { id: "engineering", label: "ENGINEERING",                  category: "public",     x: 794, y: 30,  w: 75,  h: 75, floor: 1 },
  { id: "menro",       label: "MENRO",                       category: "public",     x: 869, y: 30,  w: 73,  h: 75, floor: 1 },
  { id: "lcr",         label: "LCR",                         category: "public",     x: 644, y: 105, w: 150, h: 95, floor: 1 },
  { id: "hr",          label: "HUMAN RESOURCES",             category: "floor",  x: 794, y: 105, w: 148, h: 95, floor: 1 },
  { id: "sb-office",   label: "SANGGUNIANG BAYAN\nOFFICE / SB SEC.", category: "floor", x: 644, y: 200, w: 150, h: 100, floor: 1 },
  { id: "vice-mayor",  label: "OFFICE OF THE VICE MAYOR",   category: "floor",  x: 794, y: 200, w: 148, h: 55, floor: 1 },
  { id: "conf-r",      label: "CONF. ROOM",                  category: "floor",  x: 794, y: 255, w: 148, h: 45, floor: 1 },
  { id: "wait-r",      label: "OPEN WAITING AREA",           category: "support",    x: 644, y: 300, w: 298, h: 128,floor: 1 },
  { id: "mayor",       label: "OFFICE OF THE MAYOR",         category: "floor",  x: 644, y: 428, w: 298, h: 52, floor: 1 },
  { id: "vice-mayor-b",label: "OFFICE OF THE VICE MAYOR\nMUNICIPAL ADMINISTRATOR", category: "support", x: 644, y: 480, w: 298, h: 80, floor: 1 },

  // ── EAST WING (Cols O–Q) ──
  { id: "stairs-e",    label: "STAIRS",                      category: "support",    x: 942, y: 30,  w: 60,  h: 75, floor: 1 },
  { id: "elec-e",      label: "ELECTRICAL\nROOM",            category: "support",    x: 1002, y: 30, w: 60,  h: 75, floor: 1 },
  { id: "bir",         label: "BIR",                         category: "integrated",  x: 942, y: 105, w: 120, h: 65, floor: 1 },
  { id: "lto",         label: "LTO",                         category: "integrated",  x: 942, y: 170, w: 120, h: 55, floor: 1 },
  { id: "philhealth",  label: "PHILHEALTH",                  category: "integrated",  x: 942, y: 225, w: 120, h: 55, floor: 1 },
  { id: "post-office", label: "POST OFFICE",                 category: "public",      x: 942, y: 280, w: 120, h: 75, floor: 1 },
  { id: "biz-permit",  label: "BUSINESS PERMIT\n& LICENSING", category: "integrated", x: 942, y: 355, w: 120, h: 65, floor: 1 },
  { id: "guard",       label: "GUARD HOUSE",                 category: "support",    x: 942, y: 420, w: 120, h: 55, floor: 1 },
  { id: "pwd-ramp",    label: "PWD RAMP",                    category: "public",     x: 942, y: 475, w: 120, h: 45, floor: 1 },
  { id: "staff",       label: "STAFF / PANTRY",              category: "support",    x: 942, y: 520, w: 120, h: 40, floor: 1 },
];

// ── Furniture / Element data ──
export type FurnitureType =
  | "door" | "double-door" | "window" | "stairs-up" | "stairs-down"
  | "table-rect" | "table-round" | "chair" | "office-chair" | "desk"
  | "toilet" | "sink" | "urinal" | "shower"
  | "sofa" | "counter" | "shelf" | "filing-cabinet"
  | "reception-desk" | "elevator" | "fire-exit" | "column" | "planter" | "partition"
  | "tree1" | "tree2" | "tree3" | "shrub";

export interface FurnitureCatalogEntry {
  type: FurnitureType;
  label: string;
  group: string; // e.g. "Doors & Windows", "Seating", "Bathroom", etc.
  defaultW: number;
  defaultH: number;
  svgPath: string; // SVG path data drawn in a 0,0 → 1,1 normalized box
}

export const FURNITURE_CATALOG: FurnitureCatalogEntry[] = [
  // ── Doors & Windows (plan view: wall line + swing arc seen from above) ──
  { type: "door",         label: "Door",           group: "Doors & Windows", defaultW: 10, defaultH: 10,
    svgPath: "M0,0 L0,0.05 L1,0.05 L1,0 M0,0 A1,1 0 0,0 1,1" },
  { type: "double-door",  label: "Double Door",    group: "Doors & Windows", defaultW: 18, defaultH: 14,
    svgPath: "M0,0 L0,0.06 L1,0.06 L1,0 M0,0 A0.5,1 0 0,0 0.5,1 M1,0 A0.5,1 0 0,1 0.5,1" },
  { type: "window",       label: "Window",         group: "Doors & Windows", defaultW: 20, defaultH: 4,
    svgPath: "M0,0 L1,0 L1,1 L0,1Z M0,0.5 L1,0.5" },

  // ── Stairs (plan view: treads as horizontal lines, arrow for direction) ──
  { type: "stairs-up",    label: "Stairs Up",      group: "Stairs & Elevator", defaultW: 60, defaultH: 60,
    svgPath: "M0,0 L1,0 L1,1 L0,1Z M0,0.1 L1,0.1 M0,0.2 L1,0.2 M0,0.3 L1,0.3 M0,0.4 L1,0.4 M0,0.5 L1,0.5 M0,0.6 L1,0.6 M0,0.7 L1,0.7 M0,0.8 L1,0.8 M0,0.9 L1,0.9 M0.5,0.85 L0.5,0.15 M0.5,0.15 L0.35,0.25 M0.5,0.15 L0.65,0.25" },
  { type: "stairs-down",  label: "Stairs Down",    group: "Stairs & Elevator", defaultW: 60, defaultH: 60,
    svgPath: "M0,0 L1,0 L1,1 L0,1Z M0,0.1 L1,0.1 M0,0.2 L1,0.2 M0,0.3 L1,0.3 M0,0.4 L1,0.4 M0,0.5 L1,0.5 M0,0.6 L1,0.6 M0,0.7 L1,0.7 M0,0.8 L1,0.8 M0,0.9 L1,0.9 M0.5,0.15 L0.5,0.85 M0.5,0.85 L0.35,0.75 M0.5,0.85 L0.65,0.75" },
  { type: "elevator",     label: "Elevator",       group: "Stairs & Elevator", defaultW: 25, defaultH: 25,
    svgPath: "M0,0 L1,0 L1,1 L0,1Z M0,0 L1,1 M1,0 L0,1" },

  // ── Tables & Desks (plan view: rectangles, L-shapes, circles from above) ──
  { type: "table-rect",   label: "Table (Rect)",   group: "Tables & Desks", defaultW: 18, defaultH: 9,
    svgPath: "M0.03,0.06 L0.97,0.06 L0.97,0.94 L0.03,0.94Z" },
  { type: "table-round",  label: "Table (Round)",  group: "Tables & Desks", defaultW: 12, defaultH: 12,
    svgPath: "M0.5,0.06 A0.44,0.44 0 1,1 0.49,0.06Z" },
  { type: "desk",         label: "Office Desk",    group: "Tables & Desks", defaultW: 16, defaultH: 8,
    svgPath: "M0.04,0.06 L0.96,0.06 L0.96,0.94 L0.65,0.94 L0.65,0.5 L0.04,0.5Z" },
  { type: "reception-desk",label: "Reception Desk",group: "Tables & Desks", defaultW: 45, defaultH: 18,
    svgPath: "M0,0.1 L0.7,0.1 L0.7,0.5 A0.3,0.5 0 0,0 1,1 L0,1Z M0.05,0.3 L0.65,0.3 L0.65,0.9 L0.05,0.9Z" },
  { type: "counter",      label: "Counter",        group: "Tables & Desks", defaultW: 35, defaultH: 8,
    svgPath: "M0,0 L1,0 L1,1 L0,1Z" },

  // ── Seating (plan view: seat square/circle with backrest line from above) ──
  { type: "chair",        label: "Chair",          group: "Seating",  defaultW: 5, defaultH: 5,
    svgPath: "M0.15,0.25 L0.85,0.25 L0.85,0.9 L0.15,0.9Z M0.1,0.08 L0.9,0.08 L0.9,0.25 L0.1,0.25Z" },
  { type: "office-chair", label: "Office Chair",   group: "Seating",  defaultW: 6, defaultH: 6,
    svgPath: "M0.5,0.08 A0.42,0.42 0 1,1 0.49,0.08Z M0.25,0.2 L0.75,0.2 L0.75,0.55 L0.25,0.55Z M0.5,0.92 L0.5,0.55 M0.2,0.92 L0.8,0.92" },
  { type: "sofa",         label: "Sofa",           group: "Seating",  defaultW: 20, defaultH: 9,
    svgPath: "M0.04,0.08 L0.96,0.08 L0.96,0.35 L0.04,0.35Z M0.04,0.35 L0.96,0.35 L0.96,0.75 L0.04,0.75Z M0,0.08 L0,0.92 L0.12,0.92 L0.12,0.75 M0.88,0.75 L0.88,0.92 L1,0.92 L1,0.08" },

  // ── Bathroom / CR (plan view: bowl shapes, tank rects from above) ──
  { type: "toilet",       label: "Toilet",         group: "Bathroom (CR)", defaultW: 5, defaultH: 8,
    svgPath: "M0.15,0 L0.85,0 L0.85,0.3 L0.15,0.3Z M0.1,0.3 L0.1,0.55 A0.4,0.45 0 0,0 0.9,0.55 L0.9,0.3 M0.5,0.3 A0.4,0.4 0 0,0 0.1,0.7 A0.4,0.3 0 0,0 0.5,1 A0.4,0.3 0 0,0 0.9,0.7 A0.4,0.4 0 0,0 0.5,0.3Z" },
  { type: "sink",         label: "Sink",           group: "Bathroom (CR)", defaultW: 6, defaultH: 5,
    svgPath: "M0.1,0 L0.9,0 L0.9,0.15 L0.1,0.15Z M0.1,0.15 L0.1,0.6 A0.4,0.4 0 0,0 0.9,0.6 L0.9,0.15 M0.5,0.35 L0.5,0.55 M0.4,0.45 L0.6,0.45" },
  { type: "urinal",       label: "Urinal",         group: "Bathroom (CR)", defaultW: 4, defaultH: 5,
    svgPath: "M0.15,0 L0.85,0 L0.85,0.2 L0.15,0.2Z M0.15,0.2 L0.15,0.55 A0.35,0.45 0 0,0 0.85,0.55 L0.85,0.2" },
  { type: "shower",       label: "Shower",         group: "Bathroom (CR)", defaultW: 10, defaultH: 10,
    svgPath: "M0,0 L1,0 L1,1 L0,1Z M0.5,0.5 A0.08,0.08 0 1,1 0.49,0.5Z M0.42,0.42 L0.35,0.35 M0.58,0.42 L0.65,0.35 M0.42,0.58 L0.35,0.65 M0.58,0.58 L0.65,0.65 M0.5,0.4 L0.5,0.3 M0.5,0.6 L0.5,0.7 M0.4,0.5 L0.3,0.5 M0.6,0.5 L0.7,0.5" },

  // ── Storage (plan view: rect outlines from above) ──
  { type: "shelf",        label: "Shelf",          group: "Storage",  defaultW: 25, defaultH: 6,
    svgPath: "M0,0 L1,0 L1,1 L0,1Z M0.33,0 L0.33,1 M0.66,0 L0.66,1" },
  { type: "filing-cabinet",label: "Filing Cabinet",group: "Storage",  defaultW: 6, defaultH: 6,
    svgPath: "M0.06,0 L0.94,0 L0.94,1 L0.06,1Z M0.06,0.5 L0.94,0.5 M0.35,0.25 L0.65,0.25 M0.35,0.75 L0.65,0.75" },

  // ── Safety & Structure (plan view) ──
  { type: "fire-exit",    label: "Fire Exit",      group: "Safety & Structure", defaultW: 10, defaultH: 10,
    svgPath: "M0,0 L0,0.06 L1,0.06 L1,0 M0,0 A1,1 0 0,0 1,1 M0.6,0.25 L0.8,0.4 L0.6,0.55" },
  { type: "column",       label: "Column",         group: "Safety & Structure", defaultW: 6, defaultH: 6,
    svgPath: "M0,0 L1,0 L1,1 L0,1Z M0,0 L1,1 M1,0 L0,1" },
  { type: "planter",      label: "Planter",        group: "Safety & Structure", defaultW: 12, defaultH: 12,
    svgPath: "M0.5,0.08 A0.42,0.42 0 1,1 0.49,0.08Z M0.5,0.25 L0.5,0.75 M0.25,0.5 L0.75,0.5 M0.3,0.3 L0.7,0.7 M0.7,0.3 L0.3,0.7" },
  { type: "partition",    label: "Partition",       group: "Safety & Structure", defaultW: 40, defaultH: 3,
    svgPath: "M0,0 L1,0 L1,1 L0,1Z M0,0.5 L1,0.5" },

  // ── Outdoor / Landscaping ──
  { type: "planter",      label: "Planter Box",    group: "Outdoor & Elements", defaultW: 20, defaultH: 5,
    svgPath: "M0,0 L1,0 L1,1 L0,1Z M0.05,0.2 L0.95,0.2 L0.95,0.8 L0.05,0.8Z" },
  { type: "tree1",        label: "Tree (Oval)",    group: "Outdoor & Elements", defaultW: 150, defaultH: 150,
    svgPath: "M0.5,0.1 Q0.7,0.1 0.9,0.3 Q0.9,0.7 0.7,0.9 Q0.3,0.9 0.1,0.7 Q0.1,0.3 0.3,0.1 Z" },
  { type: "tree2",        label: "Tree (Wide)",    group: "Outdoor & Elements", defaultW: 160, defaultH: 160,
    svgPath: "M0.5,0.1 Q0.8,0.1 0.9,0.5 Q0.8,0.9 0.5,0.9 Q0.2,0.9 0.1,0.5 Q0.2,0.1 0.5,0.1 Z" },
  { type: "tree3",        label: "Tree (Fluff)",   group: "Outdoor & Elements", defaultW: 150, defaultH: 150,
    svgPath: "M0.5,0.1 A0.4,0.4 0 1,1 0.49,0.1Z" },
  { type: "shrub",        label: "Shrub",          group: "Outdoor & Elements", defaultW: 15, defaultH: 15,
    svgPath: "M0.5,0.1 Q0.8,0.1 0.9,0.5 Q0.8,0.9 0.5,0.9 Q0.2,0.9 0.1,0.5 Q0.2,0.1 0.5,0.1 Z" },
];

export interface FurnitureItem {
  id: string;
  type: FurnitureType;
  x: number;
  y: number;
  w: number;
  h: number;
  rotation: number; // degrees (0, 90, 180, 270)
  floor: number;
  label?: string;
  flipX?: boolean;
  flipY?: boolean;
}

export const defaultFurniture: FurnitureItem[] = [];

// Floor plan annotation data
export interface Annotation {
  id: string;
  x: number;       // % from left
  y: number;       // % from top
  label: string;
  shortLabel?: string;
  description: string;
  direction: "top" | "bottom" | "left" | "right";
  area?: string;
}

// Ground Floor Plan annotations — Sheet A 03 (Scale 1:200)
export const floorPlanAnnotations: Annotation[] = [
  {
    id: "records-cluster",
    x: 18,
    y: 45,
    label: "Civil Records & Assessment",
    shortLabel: "PR",
    description:
      "The West Wing (Columns A–C) houses public records and permitting offices: the Assessor's Office, Local Civil Registrar (LCR), and Licensing Office. Positioned near a secondary entry, this cluster allows citizens quick access for standard municipal documents and clearances without traversing the entire building.",
    direction: "left",
    area: "West Wing (Cols A–C)",
  },
  {
    id: "admin-services",
    x: 21,
    y: 25,
    label: "Admin & General Services",
    shortLabel: "GS",
    description:
      "The North-West administrative block contains the General Services Office and the Tourism Office. These departments handle internal municipal logistics, procurement, and local economic promotion, strategically placed near the Financial Services cluster for seamless backend operations.",
    direction: "top",
    area: "North Wing (Cols D–H)",
  },
  {
    id: "financial-services",
    x: 40,
    y: 40,
    label: "Financial Services Hub",
    shortLabel: "FS",
    description:
      "The financial core integrates the Office of the Municipal Accountant, Municipal Budget Office, and Municipal Treasurer. Equipped with secure vaults, dedicated transaction windows, ATM stations, and self-service kiosks, this high-security zone is centrally located for both internal treasury operations and public tax payments.",
    direction: "left",
    area: "Central North (Cols I–L)",
  },
  {
    id: "engineering-wing",
    x: 75,
    y: 25,
    label: "Engineering & Planning",
    shortLabel: "EP",
    description:
      "The North-East block is dedicated to infrastructure and development: the Office of the Municipal Architect, Building Official, and Municipal Engineer. This cluster processes building permits, structural inspections, and municipal construction planning.",
    direction: "top",
    area: "North-East Wing (Cols J–N)",
  },
  {
    id: "welfare-cluster",
    x: 65,
    y: 55,
    label: "Health & Social Welfare",
    shortLabel: "HW",
    description:
      "The South-East inner wing prioritizes citizen care, featuring the Municipal Health Office (with lactating area and medical storage), Senior Citizens & PWD Affairs, and the Municipal Social Welfare Office. Accessible directly from the main lobby to accommodate vulnerable demographics.",
    direction: "right",
    area: "South-East Inner (Cols L–N)",
  },
  {
    id: "enterprise-wing",
    x: 83,
    y: 50,
    label: "Enterprise & IT Center",
    shortLabel: "IT",
    description:
      "The far East Wing houses the IT Server Room & Data Center, securing the municipality's digital infrastructure. Adjacent are the Office of the Economic Enterprise and the Municipal Veterinary Office, completing the diverse ground-floor government services.",
    direction: "right",
    area: "East Wing (Cols O–Q)",
  },
  {
    id: "circulation",
    x: 50,
    y: 80,
    label: "Central Lobby & Circulation",
    shortLabel: "CL",
    description:
      "A vast, open-plan central lobby connects all specialized wings. Featuring structural columns, multiple open seating areas, a main reception desk, and clear wayfinding. The space is naturally ventilated and serves as the primary civic gathering point on the ground level.",
    direction: "top",
    area: "Center Courtyard",
  },
];

// Site area data — New Government Center (37,581 sqm)
export interface AreaCard {
  label: string;
  value: number;
  unit: string;
  icon: string;
  color: string;
  description: string;
}

export const siteAreas: AreaCard[] = [
  {
    label: "Total Lot Area",
    value: 37581,
    unit: "m²",
    icon: "Maximize2",
    color: "from-amber-700 to-amber-500",
    description: "3.7581 hectares — Brgy. Santo Niño, Enrique B. Magalona, Negros Occidental. Metes & bounds surveyed: L1-2 S 5°1'48\"E 275.56m · L2-3 N 83°12'36\"W 61.69m · L3-4 N 70°1'12\"W 114.63m · L4-5 N 4°15'36\"E 221.21m · L5-1 N 85°28'48\"E 127.72m.",
  },
  {
    label: "NGC Building Footprint",
    value: 3200,
    unit: "m²",
    icon: "Building2",
    color: "from-stone-600 to-stone-400",
    description: "3-storey reinforced concrete Government Center with a distinctive circular Grand Lobby void. Grid layout with column references A–Q (horizontal) and 1–12 (vertical). Scale 1:200 per Sheets A03–A05.",
  },
  {
    label: "Parking & Circulation",
    value: 8500,
    unit: "m²",
    icon: "Grid3x3",
    color: "from-slate-600 to-slate-400",
    description: "Comprehensive parking lots for both employees and the public, organized around the main building footprint. Main vehicle drop-off area fronts the National Highway access road.",
  },
  {
    label: "Open Space & Landscaping",
    value: 18200,
    unit: "m²",
    icon: "Leaf",
    color: "from-emerald-800 to-emerald-600",
    description: "Extensive landscaped open spaces and pedestrian access paths surrounding the Government Center. Event Hall and auxiliary structures (Power House, MRF) occupy the perimeter of the site.",
  },
  {
    label: "Auxiliary Structures",
    value: 1200,
    unit: "m²",
    icon: "Sprout",
    color: "from-lime-700 to-lime-500",
    description: "Auxiliary buildings on-site: Power House, Materials Recovery Facility (MRF), and Event Hall — positioned away from the main civic building to preserve the central plaza aesthetic.",
  },
  {
    label: "Floor Area Ratio",
    value: 0.26,
    unit: "FAR",
    icon: "BarChart3",
    color: "from-architect-700 to-architect-500",
    description: "FAR of 0.26 : 1 reflects the generous open space and civic plaza allocation — appropriate for a government precinct requiring public gathering areas and vehicular access.",
  },
];

// Elevation views — based on NGC building character
export interface ElevationView {
  id: string;
  label: string;
  description: string;
  annotations: { x: number; y: number; text: string }[];
}

export const elevationViews: ElevationView[] = [
  {
    id: "north",
    label: "North (National Highway) Elevation",
    description:
      "The primary public façade of the New Government Center faces the National Highway, establishing a strong civic presence for E.B. Magalona. A symmetrical composition with a central recessed main entry portal is flanked by the administrative wings on either side. The three-storey elevation steps down at the wings to reduce visual mass. Column grid references A–Q are expressed as vertical pilasters across the façade.",
    annotations: [
      { x: 18, y: 25, text: "Column grid A–Q — pilasters expressed on façade" },
      { x: 50, y: 18, text: "Central entry portal — 3-storey height, recessed" },
      { x: 78, y: 28, text: "3rd floor parapet — continuous horizontal band" },
      { x: 50, y: 80, text: "Ground level — main drop-off forecourt" },
    ],
  },
  {
    id: "south",
    label: "South (Rear) Elevation",
    description:
      "The south elevation provides service access, staff entries, and connections to the auxiliary Power House and MRF. The rear façade is more utilitarian in character — concrete masonry with punched window openings — while maintaining continuity with the main building's structural grid. Fire exit stairs are expressed as projecting elements on this elevation.",
    annotations: [
      { x: 22, y: 25, text: "Staff & service entry — ground level" },
      { x: 55, y: 20, text: "Fire exit stair — projected RC enclosure" },
      { x: 78, y: 35, text: "Punched window openings — offices & storage" },
      { x: 50, y: 78, text: "Rear service yard — Power House & MRF access" },
    ],
  },
  {
    id: "east",
    label: "East Side Elevation",
    description:
      "The eastern elevation frames the Public Services Wing — MSWDO, LCR, Agriculture, Engineering, HR, Records, and MENRO offices. Wide horizontal window bands on each floor provide natural daylight to the office workspaces. At ground level, a secondary public entry point serves the Integrated Services Hub (BIR, LTO, PhilHealth, Post Office).",
    annotations: [
      { x: 25, y: 28, text: "Horizontal window bands — offices, each floor" },
      { x: 62, y: 20, text: "BFP / PDEA / COA — 2nd floor wing windows" },
      { x: 50, y: 80, text: "Integrated Services Hub secondary entry" },
    ],
  },
  {
    id: "section",
    label: "Cross Section — Circular Lobby Void",
    description:
      "The section cut through the Grand Lobby circular void reveals how all three floors are connected vertically. The void rises from ground floor level through to a skylight above the roof, allowing natural light to penetrate deep into the building plan. The elevator core and open stair are positioned adjacent to the void. The second floor mezzanine ring around the void looks down to the main lobby below and up to the third floor above.",
    annotations: [
      { x: 40, y: 15, text: "Circular skylight — natural light to Grand Lobby" },
      { x: 62, y: 28, text: "3rd floor — Holding Cells, Legal Dept, ADR Room" },
      { x: 62, y: 48, text: "2nd floor — Courtroom, Library, DRRMO, COA" },
      { x: 40, y: 58, text: "Circular lobby void — connects all 3 floors" },
      { x: 62, y: 68, text: "Ground floor — Mayor's Office, Treasury, Services" },
      { x: 50, y: 84, text: "Slab-on-grade — RC footing system" },
    ],
  },
];

// Site development timeline — NGC, E.B. Magalona
export interface TimelinePhase {
  id: string;
  phase: string;
  title: string;
  duration: string;
  icon: string;
  description: string;
  deliverables: string[];
}

export const timelinePhases: TimelinePhase[] = [
  {
    id: "survey",
    phase: "Phase 01",
    title: "Site Survey & Legal Boundaries",
    duration: "2 weeks",
    icon: "ScanLine",
    description:
      "Licensed surveyor establishes all five boundary corners of the 3.7581-ha site at Brgy. Santo Niño, E.B. Magalona. Full metes and bounds: Line 1-2 S 5°1'48\"E 275.56m; Line 2-3 N 83°12'36\"W 61.69m; Line 3-4 N 70°1'12\"W 114.63m; Line 4-5 N 4°15'36\"E 221.21m; Line 5-1 N 85°28'48\"E 127.72m. The site is currently agricultural; rezoning endorsement to institutional zone initiated with MPDC.",
    deliverables: ["Metes & bounds survey plan", "Topographic survey", "MPDC rezoning endorsement"],
  },
  {
    id: "design",
    phase: "Phase 02",
    title: "Design Development — Sheets A01–A05",
    duration: "8 weeks",
    icon: "Shovel",
    description:
      "Full architectural design developed by Erica Mae D. Pancho under the supervision of Ar. Gary Peter L. Bello, UAP. Sheet set produced: A01 (General Info & Lot Data), A02 (Site Development Plan 1:500), A03 (Ground Floor Plan 1:200), A04 (Second Floor Plan 1:200), A05 (Third Floor Plan 1:200). Column grid A–Q by 1–12 coordinates all structural and architectural elements. Circular Grand Lobby void is the central design concept.",
    deliverables: ["Sheet A01: General Info & Lot Data", "Sheet A02: Site Dev Plan 1:500", "Sheets A03–A05: Three Floor Plans 1:200"],
  },
  {
    id: "structure",
    phase: "Phase 03",
    title: "Foundation & Structural Frame",
    duration: "6 weeks",
    icon: "Layers",
    description:
      "Site clearance and earthworks for the 3-storey reinforced concrete Government Center. Spread footings and tie beams poured at all column grid intersections (A–Q × 1–12). Ground floor slab-on-grade completed. RC columns and second-floor slab poured. Steel formwork for circular lobby void is critical structural element requiring engineer hold-point inspection before third-floor pour.",
    deliverables: ["Foundation completion cert", "Column grid inspection (A–Q × 1–12)", "RC frame structural sign-off"],
  },
  {
    id: "envelope",
    phase: "Phase 04",
    title: "Building Envelope & Enclosure",
    duration: "5 weeks",
    icon: "Home",
    description:
      "External walls, windows, roof, and building envelope installed across the three floors. The north main façade (National Highway frontage) receives the primary civic architectural treatment. Power House, MRF, and Event Hall auxiliary structures constructed in parallel. Site development works: parking lots, pedestrian paths, main drop-off area, and boundary fencing installed.",
    deliverables: ["External wall completion", "Roof waterproofing cert", "Auxiliary structures handover"],
  },
  {
    id: "fitout",
    phase: "Phase 05",
    title: "Interior Fit-out — All Three Floors",
    duration: "10 weeks",
    icon: "Paintbrush",
    description:
      "Complete interior fit-out of all government offices. Ground floor: Mayor's Office, Vice Mayor's Office, SB Secretary, Treasury, Accounting, Budget, Assessor's, MPDC, MSWDO, LCR, Agriculture, Engineering, HR, Records, MENRO, BIR, LTO, Post Office, PhilHealth, Business Permit & Licensing, Comcen, Electrical Room, Guard House. Second floor: Courtroom, Arraignment Room, Deliberation Room, Judge's Office, Witness Lounge, Stenographer's, Prosecutor's, Clerk of Court, PAO, Parole & Probation, COA, DILG, PDEA, PNP, BFP, Municipal Library, Function Hall, DRRMO, Tourism. Third floor: Holding Cells 1 & 2, Legal Aid Storage, ADR Room, Prosecution Center, Legal Dept, Farmers Association, Community Affairs.",
    deliverables: ["Office fit-out per floor cert", "Electrical & data installation cert", "Elevator commissioning cert"],
  },
  {
    id: "handover",
    phase: "Phase 06",
    title: "Completion & Government Occupancy",
    duration: "2 weeks",
    icon: "KeyRound",
    description:
      "Practical completion inspection by the Municipal Government of E.B. Magalona, Ar. Gary Peter L. Bello (UAP), and the Building Official. Defects noted and rectified within 14 days. Occupancy permit issued. As-built drawings (Sheets A01–A12+ full set per table of contents), operations manuals, and facility management documentation formally handed over to the Municipal Engineering Office.",
    deliverables: ["Occupancy Permit", "As-built drawings set (A01–A12+)", "Facility management manual"],
  },
];

// Architect process steps — Erica Mae D. Pancho, NGC Project
export interface ProcessStep {
  id: string;
  step: number;
  title: string;
  subtitle: string;
  icon: string;
  description: string;
  tools: string[];
  deliverables: string[];
  duration: string;
}

export const processsteps: ProcessStep[] = [
  {
    id: "brief",
    step: 1,
    title: "Government Brief & Site Analysis",
    subtitle: "Understanding the LGU program for E.B. Magalona",
    icon: "MessageSquare",
    description:
      "The design process began with consultation with the Local Government Unit of E.B. Magalona to define the full program for the New Government Center. The brief required consolidating all municipal government offices — from the Mayor's Office to judicial services and integrated national agencies (BIR, LTO, PhilHealth) — into a single, purpose-built civic complex on the 3.7581-ha site at Brgy. Santo Niño. Site analysis confirmed the National Highway frontage to the north and established the primary orientation of the building.",
    tools: ["LGU program consultation", "Site survey & metes and bounds verification", "Vicinity mapping", "National Highway access analysis"],
    deliverables: ["Project Brief", "Sheet A01: General Info & Lot Data", "Vicinity map & site analysis"],
    duration: "2 weeks",
  },
  {
    id: "concept",
    step: 2,
    title: "Concept Design",
    subtitle: "Circular lobby void as the civic anchor",
    icon: "Lightbulb",
    description:
      "The central design concept — a circular Grand Lobby void connecting all three floors — emerged from the need to create a legible, democratic public space within a complex government building. The circular form symbolises inclusivity and equality of access to public services. The two parallel wings (east and west) flanking the central lobby organise government offices into logical clusters: executive and financial services (west) and public services and judicial (east), guided by Ar. Gary Peter L. Bello, UAP.",
    tools: ["Hand sketching", "Bubble diagram spatial planning", "AutoCAD massing", "Column grid layout (A–Q × 1–12)"],
    deliverables: ["Concept design sketches", "Bubble diagram (room adjacency)", "Preliminary floor plan layout"],
    duration: "3 weeks",
  },
  {
    id: "design-dev",
    step: 3,
    title: "Design Development",
    subtitle: "Resolving the full 3-floor program",
    icon: "PenTool",
    description:
      "The approved concept was developed into a coordinated three-floor plan. Ground floor (Sheet A03): 20+ government offices including the Mayor's Office, Treasury, MPDC, MSWDO, LCR, and Integrated Services Hub (BIR, LTO, Post Office, PhilHealth). Second floor (Sheet A04): Judicial cluster (Courtroom, Judge's Office, Prosecutor's, PAO, Parole & Probation), government agencies (COA, DILG, PDEA, PNP, BFP), Municipal Library, Function Hall, and DRRMO. Third floor (Sheet A05): Holding Cells 1 & 2, Legal Department, ADR Room, Prosecution Center, Community Offices. PWD ramps, elevator, and stairs at all vertical circulation cores.",
    tools: ["AutoCAD full drafting — Scale 1:200", "Column grid coordination (A–Q × 1–12)", "UAP documentation standards", "Structural engineer coordination"],
    deliverables: ["Sheet A03: Ground Floor Plan 1:200", "Sheet A04: Second Floor Plan 1:200", "Sheet A05: Third Floor Plan 1:200"],
    duration: "5 weeks",
  },
  {
    id: "documentation",
    step: 4,
    title: "Construction Documents",
    subtitle: "Full sheet set A01–A12+",
    icon: "FileText",
    description:
      "The complete document set was produced under the advisory supervision of Ar. Gary Peter L. Bello, UAP. Architectural sheets A01–A12+ (per Table of Contents on A01) cover General Info, Site Development, three floor plans, elevations, sections, details, and schedules. Additional disciplines — Structural, Electrical, Sanitary, and Mechanical — are included in the full document set. Sheets submitted for building permit application to the Office of the Building Official, Enrique B. Magalona, Negros Occidental.",
    tools: ["AutoCAD full working drawings", "UAP sheet format compliance", "Title block: LCC Bacolod / Ar. Bello UAP", "Multi-discipline coordination"],
    deliverables: ["Sheet A01: General Info & Lot Data", "Sheet A02: Site Dev Plan (1:500)", "Sheets A03–A05: Floor Plans (1:200)", "Structural / Electrical / Sanitary / Mechanical sheets"],
    duration: "6–8 weeks",
  },
  {
    id: "permit",
    step: 5,
    title: "Building Permit Application",
    subtitle: "Submission to Building Official",
    icon: "ClipboardList",
    description:
      "The complete architectural and engineering document set was submitted to the Office of the Building Official of Enrique B. Magalona for building permit processing. Zoning clearance from MPDC required given the site's agricultural-to-institutional rezoning. Fire safety plans submitted to BFP for Fire Safety Evaluation Clearance. Accessibility compliance per BP 344 verified for PWD ramps and elevator provisions.",
    tools: ["Building permit application forms (NBC)", "Zoning clearance — MPDC", "Fire Safety Evaluation Clearance (BFP)", "BP 344 accessibility compliance check"],
    deliverables: ["Building Permit", "Zoning Clearance", "Fire Safety Evaluation Clearance"],
    duration: "4–8 weeks",
  },
  {
    id: "construction",
    step: 6,
    title: "Construction Supervision",
    subtitle: "On-site oversight — 3-storey RC building",
    icon: "HardHat",
    description:
      "Construction supervision by the architect covers all critical hold points for the 3-storey reinforced concrete Government Center: foundation and footing inspection, first-floor slab pour, column and second-floor slab, third-floor slab, roof structure, and building envelope. Special attention to the circular Grand Lobby void formwork and the elevator shaft construction. RFIs from the contractor are managed through a formal register.",
    tools: ["Site inspection reports", "RFI register", "Hold-point inspection schedule (foundation to roof)", "Progress photo documentation"],
    deliverables: ["Foundation inspection cert", "Each floor slab cert", "Structural completion sign-off", "Progress photo set"],
    duration: "Duration of build",
  },
  {
    id: "post-occ",
    step: 7,
    title: "Post-Occupancy & Evaluation",
    subtitle: "Government Centre performance review",
    icon: "Star",
    description:
      "Six to twelve months after the New Government Center opens to the public and staff, a Post-Occupancy Evaluation (POE) assesses visitor flow efficiency through the Grand Lobby and wing corridors, thermal comfort in the open-plan office floors, acoustic performance of the Courtroom and Holding Cells, and accessibility of PWD ramps and elevator. Feedback from LGU staff and public users informs future government infrastructure projects in Negros Occidental.",
    tools: ["POE questionnaire — LGU & public users", "Space utilisation observation", "Acoustic test — Courtroom", "Accessibility audit — BP 344"],
    deliverables: ["POE Report", "Space utilisation analysis", "Accessibility compliance report", "Recommendations for future civic projects"],
    duration: "6–12 months post-opening",
  },
];

// Specifications — New Government Center, E.B. Magalona
export interface SpecCategory {
  category: string;
  icon: string;
  items: { name: string; value: string }[];
}

export const specifications: SpecCategory[] = [
  {
    category: "Structure",
    icon: "Columns",
    items: [
      { name: "Foundation", value: "Reinforced concrete spread footings & tie beams at all column grid intersections (A–Q × 1–12)" },
      { name: "Ground Floor Slab", value: "RC slab-on-grade — thickness per structural engineer spec" },
      { name: "Structural System", value: "3-storey reinforced concrete frame — columns, beams, slabs at all three levels" },
      { name: "Circular Lobby Void", value: "Circular RC opening — rises from GF to roof skylight; formwork requires engineer hold-point" },
      { name: "Vertical Circulation", value: "RC stair enclosures + elevator shaft (lift core) — all floors accessible" },
      { name: "Wind / Seismic Zone", value: "Wind Zone III — NSCP 2015; Seismic Zone 4 — Negros Occidental" },
    ],
  },
  {
    category: "External Materials",
    icon: "Layers",
    items: [
      { name: "External Walls", value: "Reinforced concrete columns and beams with CHB (Concrete Hollow Block) infill, plastered & painted" },
      { name: "North Façade", value: "Civic architectural treatment — pilasters expressing column grid, main entry portal feature" },
      { name: "Windows", value: "Punched openings with aluminium frames; horizontal window bands per floor on side elevations" },
      { name: "Roof", value: "RC flat roof / low-slope roof with waterproofing membrane; parapet at all perimeters" },
      { name: "Entry Forecourt", value: "Concrete / interlocking pavers — main drop-off area along National Highway frontage" },
      { name: "Site Boundary", value: "Perimeter fencing; vehicular gates at parking lot entries" },
    ],
  },
  {
    category: "Interior Spaces",
    icon: "Sofa",
    items: [
      { name: "Grand Lobby", value: "Circular void — floor tile finish; reception counter; directional signage to all offices" },
      { name: "Government Offices", value: "Open-plan workstations; cubicle partitions where required; suspended ceiling, vinyl or tile floor" },
      { name: "Main Courtroom (2F)", value: "Formal judicial layout — raised bench, gallery seating, acoustic wall panels, sealed floor" },
      { name: "Holding Cells (3F)", value: "Reinforced masonry partition walls; steel-bar door frames; secure ventilation" },
      { name: "Municipal Library (2F)", value: "Open shelving, reading tables, study carrels; acoustic ceiling tiles" },
      { name: "Accessibility", value: "PWD ramps at all entries (BP 344); elevator serving all 3 floors; accessible toilet cubicles" },
    ],
  },
  {
    category: "Mechanical & Electrical",
    icon: "Zap",
    items: [
      { name: "Power Supply", value: "CENECO grid connection; Power House on-site for emergency generator backup" },
      { name: "HVAC", value: "Split-type air conditioning units per office; central exhaust for toilets and Holding Cells" },
      { name: "Communications", value: "Comcen (Communications Centre) on ground floor; structured data cabling throughout" },
      { name: "CCTV / Security", value: "CCTV network covering all floors, lobby, and site; Guard House at main vehicular entry" },
      { name: "Fire Protection", value: "Fire Safety Evaluation Clearance by BFP; fire extinguishers, hose reels, exit signage per RAFE" },
      { name: "Sanitary", value: "Male/Female toilets per floor; PWD-accessible cubicles; MRF (Materials Recovery Facility) on site" },
    ],
  },
];
