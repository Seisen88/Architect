// ============================================================
// PROJECT DATA — PANCHO NGC PLANS.pdf (Sheets A01–A05)
// Project: New Government Center for E. B. Magalona
// Proponent: Erica Mae D. Pancho, BS Architecture 5C
// School: La Consolacion College Bacolod — AFAID
// Adviser: Ar. Gary Peter L. Bello, UAP
// Location: Brgy. Santo Niño, Enrique B. Magalona, Negros Occidental
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

// Ground Floor Plan annotations — Sheet A 03 (Scale 1:200)
export const floorPlanAnnotations: Annotation[] = [
  {
    id: "lobby",
    x: 50,
    y: 52,
    label: "Grand Lobby",
    shortLabel: "GL",
    description:
      "The Grand Lobby is the civic heart of the New Government Center — a dramatic circular void that visually and functionally connects the ground, second, and third floors. It acts as the primary orientation and wayfinding hub for visitors across all government services. Natural light penetrates from above through the circular skylight directly over this space.",
    direction: "top",
    area: "Circular void",
  },
  {
    id: "mayor",
    x: 18,
    y: 40,
    label: "Office of the Mayor",
    shortLabel: "OM",
    description:
      "The executive suite of the Local Chief Executive, positioned on the ground floor for direct public and civic access. The Office of the Mayor anchors the western administrative wing and is flanked by the Office of the Vice Mayor and the Sangguniang Bayan Secretary's office suite. Private conference facilities adjoin the executive area.",
    direction: "right",
    area: "Ground Floor West",
  },
  {
    id: "treasury",
    x: 20,
    y: 65,
    label: "Treasury & Accounting",
    shortLabel: "TA",
    description:
      "The Treasury Office and Accounting Office are grouped in the financial services cluster on the ground floor, allowing citizens to process payments and financial transactions in a single zone. Adjacent offices include the Budget Office, Assessor's Office, and MPDC — forming the complete financial and planning services corridor.",
    direction: "right",
    area: "Ground Floor SW",
  },
  {
    id: "public-services",
    x: 78,
    y: 38,
    label: "Public Services Wing",
    shortLabel: "PS",
    description:
      "The eastern wing of the ground floor houses integrated public services: MSWDO (Social Welfare & Development), Local Civil Registrar (LCR), Agriculture Office, Engineering Office, Human Resources, Records Room, and MENRO (Municipal Environment & Natural Resources Office). The wing is designed for high footfall with wide corridors and clear signage paths.",
    direction: "left",
    area: "Ground Floor East",
  },
  {
    id: "bir-lto",
    x: 75,
    y: 68,
    label: "Integrated Services Hub",
    shortLabel: "IS",
    description:
      "A dedicated Integrated Services Hub consolidates BIR (Bureau of Internal Revenue), LTO (Land Transportation Office), Post Office, and PhilHealth in a single accessible block within the Government Center. This one-stop-shop approach reduces the need for citizens to travel to multiple locations across town for government transactions.",
    direction: "left",
    area: "Ground Floor SE",
  },
  {
    id: "business-permit",
    x: 50,
    y: 80,
    label: "Business Permit & Licensing",
    shortLabel: "BP",
    description:
      "The Business Permit & Licensing Office is positioned at the south end with its own dedicated entry from the main drop-off area, providing direct access for business owners and entrepreneurs without requiring them to pass through the main administrative wings. Adjacent to the Guard House and front façade.",
    direction: "top",
    area: "Ground Floor South",
  },
  {
    id: "pwdramp",
    x: 34,
    y: 28,
    label: "PWD Ramps & Vertical Circulation",
    shortLabel: "VT",
    description:
      "Fully accessible PWD ramps, stairs, and an elevator (lift) provide vertical circulation between all three floors. The elevator core is positioned adjacent to the circular Grand Lobby void, ensuring accessibility for persons with disabilities to every government office in the building. Ramps comply with BP 344 (Accessibility Law of the Philippines).",
    direction: "bottom",
    area: "All levels",
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
