// ============================================================
// REAL PROJECT DATA — from Canva design sheets
// Project 1: Interactive Library & Museum — Himamaylan City
// Project 2: New Government Center — E.B. Magalona
// ============================================================

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

// Floor plan annotations — Interactive Library & Museum (Himamaylan City)
export const floorPlanAnnotations: Annotation[] = [
  {
    id: "lobby",
    x: 18,
    y: 55,
    label: "Entrance Lobby",
    shortLabel: "EL",
    description:
      "Main public entry point to the Interactive Library & Museum. The entrance lobby acts as the transitional buffer between the exterior public plaza and the controlled interior zones. Security Check-In/Out stations are positioned immediately inside for visitor screening.",
    direction: "right",
    area: "—",
  },
  {
    id: "gallery",
    x: 38,
    y: 38,
    label: "Permanent Core Gallery",
    shortLabel: "PG",
    description:
      "The spine of the museum — a continuous permanent exhibition space showcasing Himamaylan City's cultural heritage and historical artifacts. High ceilings (minimum 4.5 m) accommodate large artifact displays and provide dramatic lighting opportunities.",
    direction: "bottom",
    area: "—",
  },
  {
    id: "interactive",
    x: 55,
    y: 32,
    label: "Interactive Zone",
    shortLabel: "IZ",
    description:
      "Hands-on interactive exhibit space designed for school groups and general visitors. Digital touchscreen kiosks, augmented reality stations, and participatory installations allow visitors to engage directly with content rather than observe passively.",
    direction: "bottom",
    area: "—",
  },
  {
    id: "auditorium",
    x: 74,
    y: 48,
    label: "Auditorium",
    shortLabel: "AU",
    description:
      "Large-capacity auditorium for lectures, film screenings, cultural performances, and community events. Tiered seating provides unobstructed sight lines. Acoustic wall panels and a raised stage with backstage service access are integrated into the design.",
    direction: "left",
    area: "—",
  },
  {
    id: "workshop",
    x: 28,
    y: 70,
    label: "Workshops",
    shortLabel: "WS",
    description:
      "Three specialist workshop studios: Wood Workshop (10×20 m), Metal Workshop (10×20 m), and Terracotta/Ceramics Workshop (9×20 m). Each is independently ventilated with dedicated tool storage, workbenches, and direct connection to the Artifact Storage & Conservation room.",
    direction: "top",
    area: "10×20 m each",
  },
  {
    id: "director",
    x: 62,
    y: 22,
    label: "Director General's Chamber",
    shortLabel: "DG",
    description:
      "Executive office for the Museum Director General. Sized at 5 m × 7 m (35 m²) with an adjacent waiting area. Private access connects to the Curator Office, Meeting Room, and Executive Staff Office. Positioned on the upper level to overlook the museum's central atrium.",
    direction: "bottom",
    area: "5×7 m",
  },
  {
    id: "exhibit-halls",
    x: 44,
    y: 65,
    label: "Exhibit Halls 1–4",
    shortLabel: "EH",
    description:
      "Four dedicated exhibit halls surrounding the Permanent Core Gallery. Each hall is independently programmable to host rotating special exhibitions, thematic displays, and travelling exhibition collections. Movable partition walls allow flexible spatial configurations.",
    direction: "top",
    area: "—",
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
    label: "Total Site Area",
    value: 37581,
    unit: "m²",
    icon: "Maximize2",
    color: "from-amber-700 to-amber-500",
    description: "3.7581 hectares located at Brgy. Santo Niño, E.B. Magalona, Negros Occidental. Corner site with access from National Highway and existing provincial road.",
  },
  {
    label: "Municipal Hall Footprint",
    value: 2850,
    unit: "m²",
    icon: "Building2",
    color: "from-stone-600 to-stone-400",
    description: "Central Municipal Hall — 3-storey structure housing all core government offices from the Assessor's Office to the Mayor's executive suite.",
  },
  {
    label: "Public Plaza & Open Space",
    value: 12400,
    unit: "m²",
    icon: "Leaf",
    color: "from-emerald-800 to-emerald-600",
    description: "Central public plaza with water features, fountain, seating areas, and landscaping. Serves as the civic heart of the Government Center complex.",
  },
  {
    label: "Parking (Staff & Public)",
    value: 4200,
    unit: "m²",
    icon: "Grid3x3",
    color: "from-slate-600 to-slate-400",
    description: "Dedicated parking zones for employees and public visitors. PWD-accessible spaces and ATM machine bays are integrated within the parking layout.",
  },
  {
    label: "SB Hall & Pavilions",
    value: 1680,
    unit: "m²",
    icon: "Sprout",
    color: "from-lime-700 to-lime-500",
    description: "Sangguniang Bayan Hall, Senior Citizen Centre, and SK Federation Pavilion — secondary civic buildings arranged around the main plaza.",
  },
  {
    label: "Floor Area Ratio",
    value: 0.23,
    unit: "FAR",
    icon: "BarChart3",
    color: "from-architect-700 to-architect-500",
    description: "Low FAR of 0.23 : 1 reflects the predominantly single-storey pavilion layout and generous open space allocation for a civic government precinct.",
  },
];

// Elevation tabs — Interactive Library & Museum
export interface ElevationView {
  id: string;
  label: string;
  description: string;
  annotations: { x: number; y: number; text: string }[];
}

export const elevationViews: ElevationView[] = [
  {
    id: "north",
    label: "North (Street) Elevation",
    description:
      "The northern street façade presents the primary public identity of the Interactive Library and Museum. Horizontal and vertical timber slats/fins form a geometric screen envelope, referencing traditional Filipino weaving patterns. The recessed main entry portal draws visitors inward beneath a dramatic canopy overhang. Structural dimensions: key footprint segment 42.61 m along this frontage.",
    annotations: [
      { x: 20, y: 26, text: "Timber screen fins — horizontal & vertical, geometric pattern" },
      { x: 50, y: 16, text: "Cantilevered entry canopy — 42.61m frontage span" },
      { x: 75, y: 38, text: "Security Check-In entry portal — recessed 3.0m" },
      { x: 50, y: 78, text: "Ground Level — public plaza pavement" },
    ],
  },
  {
    id: "south",
    label: "South (Garden) Elevation",
    description:
      "The south elevation opens toward the landscape and workshop courtyard. Floor-to-ceiling glazing runs the full length of the workshop wing, allowing natural light to flood the craft studios. The Terracotta (9×20 m), Wood (10×20 m), and Metal (10×20 m) workshops are expressed as distinct volumes on this elevation, each with dedicated ventilation louvres above the clerestory line.",
    annotations: [
      { x: 20, y: 22, text: "Wood Workshop volume — 10×20m, clerestory louvres" },
      { x: 48, y: 22, text: "Metal Workshop volume — 10×20m" },
      { x: 72, y: 22, text: "Terracotta Workshop — 9×20m" },
      { x: 50, y: 72, text: "Workshop courtyard — secure artifact handling yard" },
    ],
  },
  {
    id: "east",
    label: "East Side Elevation",
    description:
      "The eastern elevation mediates between the auditorium wing and the library stack. The auditorium's full height is expressed here as a solid masonry volume — acoustically isolated and windowless — contrasting with the transparent, light-filled library section beside it. A secondary entry for performers and staff is located at the base of the auditorium wall.",
    annotations: [
      { x: 25, y: 32, text: "Auditorium solid volume — acoustic masonry wall ~8m high" },
      { x: 62, y: 28, text: "Digital Archives / Tech Library — large glazed panel" },
      { x: 50, y: 78, text: "Performer & staff secondary entry" },
    ],
  },
  {
    id: "section",
    label: "Cross Section A–A (Museum)",
    description:
      "Section A–A cuts longitudinally through the Permanent Core Gallery and the Interactive Zone, revealing a dramatic double-height interior volume. A mezzanine bridge above the gallery at 4.5 m provides elevated viewing angles of large-scale exhibits. The structural system uses exposed steel frames with timber secondary framing referencing the building's overall craft-material theme.",
    annotations: [
      { x: 28, y: 18, text: "Double-height gallery void — min 6.0m clear" },
      { x: 56, y: 28, text: "Mezzanine bridge — 4.5m above gallery floor" },
      { x: 28, y: 55, text: "Permanent Core Gallery floor level ±0.000" },
      { x: 72, y: 52, text: "Interactive Zone — split-level 1.2m step" },
      { x: 50, y: 82, text: "Slab-on-grade foundation" },
    ],
  },
];

// Site development timeline — New Government Center
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
    title: "Site Survey & Metes and Bounds",
    duration: "2 weeks",
    icon: "ScanLine",
    description:
      "Licensed surveyor establishes all boundary corners for the 3.7581-ha site at Brgy. Santo Niño. Technical boundary description: Line 1-2 S 5°1'48\" E 275.56m; Line 2-3 N 83°12'36\" W 61.69m; Line 3-4 N 70°1'12\" W 114.63m; Line 4-5 N 4°15'36\" E 221.21m; Line 5-1 N 85°28'48\" E 127.72m. Geotechnical analysis confirms Silay Sandy Loam classification with 0–3% slope (level to nearly level).",
    deliverables: ["Metes & bounds survey", "Topographic plan (0–3% slope)", "Geotech report — Silay Sandy Loam"],
  },
  {
    id: "hazard",
    phase: "Phase 02",
    title: "Hazard & Risk Assessment",
    duration: "3 weeks",
    icon: "Shovel",
    description:
      "Comprehensive site hazard mapping carried out in compliance with CLUP requirements. Liquefaction susceptibility: High and Low zones identified. Flood susceptibility: Low to Moderate. Landslide risk: Generally low (0–3% slope). Site rezoning from agricultural to GI-Z (General Institutional Zone) initiated with Municipal Planning Office and endorsed in new CLUP.",
    deliverables: ["Liquefaction susceptibility map", "Flood risk assessment", "GI-Z rezoning endorsement"],
  },
  {
    id: "structure",
    phase: "Phase 03",
    title: "Structural & Infrastructure Works",
    duration: "6 weeks",
    icon: "Layers",
    description:
      "Earthworks and foundation construction for the Municipal Hall (3-storey) and SB Hall. National Highway access improved; internal road network within the Government Center laid out. High-power transmission line relocation coordinated with local utility. Water supply (Level 3 piped system) and telecommunications infrastructure roughed in.",
    deliverables: ["Foundation completion cert", "Road network layout", "Utility relocation clearance"],
  },
  {
    id: "envelope",
    phase: "Phase 04",
    title: "Building Envelope — Municipal Hall",
    duration: "5 weeks",
    icon: "Home",
    description:
      "Municipal Hall structure enclosed: reinforced concrete frame, roof waterproofing, and external cladding installed. Facade designed to reflect civic character with colonnaded ground-floor arcade providing shade for public queuing. PWD access ramps at all public entry points. Major office wings for Assessor, Treasurer, Local Civil Registrar, and Waterworks roughed in.",
    deliverables: ["Structural completion cert", "Waterproofing inspection", "PWD access compliance check"],
  },
  {
    id: "fitout",
    phase: "Phase 05",
    title: "Interior Fit-out & Public Space",
    duration: "10 weeks",
    icon: "Paintbrush",
    description:
      "All government office interiors fitted out across three floors. Ground: Main Lobby, Assessor's Office, Treasurer's Office, Local Civil Registrar, Waterworks Office. Second: HR Management, Municipal Planning, Budget Office, Marañon Hall (multi-purpose function hall). Third: Accounting Office, Radio Room. Public Plaza landscaping, water feature/fountain, seating areas, and ATM bays completed in parallel.",
    deliverables: ["Office completion certs per floor", "Electrical & data fit-out cert", "Plaza & landscape handover"],
  },
  {
    id: "handover",
    phase: "Phase 06",
    title: "Completion & Government Occupancy",
    duration: "2 weeks",
    icon: "KeyRound",
    description:
      "Practical completion inspection with Municipal Government officials. All defects identified and rectified within 14 days. Occupancy permit issued by Building Official. As-built drawings, operations manuals, and facility management documentation handed over to the Municipal Engineering Office. Senior Citizen Centre and SK Federation Pavilion commissioned simultaneously.",
    deliverables: ["Occupancy permit", "As-built drawings set", "Facility management manual"],
  },
];

// Architect process steps — Karl Angelo G. Sumog-oy, BS Architecture 5C
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
    title: "Client Brief & Site Analysis",
    subtitle: "Understanding the Himamaylan City program",
    icon: "MessageSquare",
    description:
      "The design process began with an in-depth consultation with the Local Government Unit (LGU) of Himamaylan City to define the program requirements for the Interactive Library & Museum. Site visits to Brgy. Santo Niño, Himamaylan City established the building's orientation relative to prevailing Amihan (NE) and Habagat (SW) winds and the position of the National Highway frontage. Climate analysis confirmed high solar exposure at midday — informing the timber screen fin strategy on the north façade.",
    tools: ["LGU program consultation", "Wind & solar analysis", "Site photography", "Vicinity mapping at 1:15,000"],
    deliverables: ["Project Brief", "Vicinity Map (1:15,000 MTS)", "Site Analysis Report"],
    duration: "1–2 weeks",
  },
  {
    id: "concept",
    step: 2,
    title: "Concept Design",
    subtitle: "Geometric envelope inspired by Filipino craft",
    icon: "Lightbulb",
    description:
      "The architectural concept draws from traditional Filipino weaving and craft traditions — expressed through a complex geometric envelope of horizontal and vertical timber slats and fins. The slightly twisted, angular building form creates a dynamic composition visible from the National Highway. The interlocking museum and library volumes are organised around a central public atrium, reflecting the dual program of the building.",
    tools: ["Hand sketching", "Physical massing models", "SketchUp massing", "Precedent research — Filipino craft traditions"],
    deliverables: ["Concept sketch set", "3D massing model", "Design intent narrative"],
    duration: "2–3 weeks",
  },
  {
    id: "design-dev",
    step: 3,
    title: "Design Development",
    subtitle: "Coordinating floor plans across all levels",
    icon: "PenTool",
    description:
      "The approved concept was developed into coordinated architectural drawings across three levels. Ground floor: Entrance Lobby, Security, Permanent Core Gallery, Interactive Zone, Museum Shop, Special Exhibit Zone, and Auditorium. Upper levels: Group Study Rooms, Digital Archives, Tech Library, Reference/Quiet Zone, and administrative offices. Wood (10×20m), Metal (10×20m), and Terracotta (9×20m) workshops positioned in a dedicated craft wing. Director General's Chamber (5×7m) placed on the upper level with views over the central atrium.",
    tools: ["AutoCAD / Revit", "Enscape render", "Materials board", "Structural consultant coordination"],
    deliverables: ["Floor plans Ground–3rd (A-03 to A-06)", "Roof plan", "3D renders", "Materials schedule"],
    duration: "4–6 weeks",
  },
  {
    id: "documentation",
    step: 4,
    title: "Construction Documents",
    subtitle: "Sheet set A-01 to A-07",
    icon: "FileText",
    description:
      "The full working drawing set (Sheet A-01 to A-07) was produced covering: A-01 Perspective & Vicinity Map, A-02 Site Development Plan (1:500 MTS), A-03 Detailed Floor Plan Zones, A-04 Ground Floor Plan, A-05 Second Floor Plan, A-06 Third Floor Plan, A-07 Structural Conceptualization. Technical metes and bounds description was formally lodged with the Municipal Planning Office. All sheets comply with UAP and AAIF documentation standards.",
    tools: ["AutoCAD full drafting", "Sheet layout (A-01 to A-07)", "Specification writing", "UAP standards compliance"],
    deliverables: ["Sheet A-01: Perspective & Vicinity Map", "Sheet A-02: Site Dev Plan 1:500", "Sheets A-03–A-06: Floor Plans", "Sheet A-07: Structural Conceptualization"],
    duration: "6–8 weeks",
  },
  {
    id: "procurement",
    step: 5,
    title: "Permit Application & Review",
    subtitle: "LGU & Building Office approvals",
    icon: "ClipboardList",
    description:
      "Complete document set submitted to the Himamaylan City Building Official for Building Permit application. Zoning clearance secured from the Municipal Planning & Development Office. Environmental compliance certificate (ECC) applied for through DENR-EMB. Structural plan review by licensed structural engineer (PRC-accredited). BFAD and fire safety clearances coordinated.",
    tools: ["Building permit application forms", "Zoning clearance", "ECC application", "BFAD coordination"],
    deliverables: ["Building Permit", "Zoning Clearance", "Fire Safety Inspection Certificate"],
    duration: "4–8 weeks",
  },
  {
    id: "construction",
    step: 6,
    title: "Construction Supervision",
    subtitle: "Site oversight — key hold points",
    icon: "HardHat",
    description:
      "The architect (Karl Angelo G. Sumog-oy) conducted regular site inspections at key construction hold points: foundation pour, structural frame inspection, roofing, and envelope closure. Requests for Information (RFIs) from the contractor were responded to within 48 hours. The structural conceptualisation (Sheet A-07) — featuring a bridge-like steel frame system reflecting the building's angular form — was closely monitored during erection.",
    tools: ["Site inspection reports", "RFI register", "Hold-point inspection schedule", "Progress photo documentation"],
    deliverables: ["Hold-point inspection certs", "RFI log", "Variation register", "Progress photo set"],
    duration: "Duration of construction",
  },
  {
    id: "post-occ",
    step: 7,
    title: "Post-Occupancy Evaluation",
    subtitle: "Measuring design intent vs. reality",
    icon: "Star",
    description:
      "Six to twelve months after the museum's opening, a Post-Occupancy Evaluation (POE) assesses whether visitor flows, thermal comfort, acoustic performance (especially in the Auditorium), and light levels in the gallery spaces match the original design intent. Community feedback from Himamaylan City LGU and museum visitors is collated and reported to inform future civic cultural facilities.",
    tools: ["POE questionnaire — LGU & visitors", "Illuminance measurements (gallery)", "Acoustic measurement (auditorium)", "Thermal comfort survey"],
    deliverables: ["POE Report", "Acoustic & lighting performance summary", "Recommendations for similar civic projects"],
    duration: "6–12 months post-opening",
  },
];

// Specifications — based on real project context (Library & Museum)
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
      { name: "Foundation", value: "Reinforced concrete spread footings on Silay Sandy Loam (0–3% slope)" },
      { name: "Ground Floor Slab", value: "150 mm RC slab-on-grade, F'c 28 MPa" },
      { name: "Structural Frame", value: "Reinforced concrete columns & beams; exposed steel secondary frame (A-07)" },
      { name: "Roof Structure", value: "Steel space frame over Gallery & Auditorium; timber purlins over workshop wing" },
      { name: "Mezzanine", value: "Structural steel mezzanine bridge at +4.5m — gallery viewing deck" },
      { name: "Wind Zone", value: "Wind Zone III — Negros Occidental typhoon corridor (NSCP 2015)" },
    ],
  },
  {
    category: "External Materials",
    icon: "Layers",
    items: [
      { name: "Facade Screen", value: "Horizontal & vertical hardwood slat fins — geometric pattern, treated against termites" },
      { name: "Main Walls", value: "Off-form reinforced concrete + CHB infill panels, painted finish" },
      { name: "Roof Cladding", value: "Long-span pre-painted Rib-type steel sheet on steel purlins" },
      { name: "Glazing", value: "Reflective glass curtain wall — Gallery & Library; aluminium frame" },
      { name: "Workshop Louvres", value: "Aluminium fixed louvres — full width above workshop clerestory" },
      { name: "Entry Canopy", value: "Steel tube space frame with polycarbonate sheeting — 42.61m frontage" },
    ],
  },
  {
    category: "Interior Spaces",
    icon: "Sofa",
    items: [
      { name: "Gallery Ceiling Height", value: "Min 6.0m clear double-height — Permanent Core Gallery" },
      { name: "Auditorium Seating", value: "Tiered fixed seating, upholstered; acoustic wall panels; raised stage" },
      { name: "Workshops", value: "Wood 10×20m · Metal 10×20m · Terracotta 9×20m — epoxy floor, industrial fixtures" },
      { name: "Director's Office", value: "5×7m (35 m²) — timber veneer joinery, acoustic partition walls" },
      { name: "Library Flooring", value: "Anti-static raised floor tiles — Digital Archives & Tech Library" },
      { name: "Gallery Lighting", value: "Track-mounted adjustable LED spotlights, 3000K, 1000 lux on exhibits" },
    ],
  },
  {
    category: "Mechanical & Electrical",
    icon: "Zap",
    items: [
      { name: "HVAC — Gallery", value: "Central air-handling units; humidity control 50–55% RH for artifact preservation" },
      { name: "HVAC — Workshops", value: "Industrial exhaust fans with fresh-air supply — Wood & Metal workshops" },
      { name: "Power Supply", value: "CENECO grid connection; standby generator 250 kVA for critical systems" },
      { name: "Fire Protection", value: "Automatic sprinkler system — galleries & library; FM-200 suppression — archival room" },
      { name: "Security", value: "CCTV, IT/CCTV Room, Security Monitoring Room, Security Locker" },
      { name: "Accessibility", value: "PWD ramps at all public entries, accessible toilet cubicles, tactile ground surface indicators" },
    ],
  },
];
