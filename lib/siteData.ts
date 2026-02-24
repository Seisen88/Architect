// Floor plan annotation data
export interface Annotation {
  id: string;
  x: number;       // % from left
  y: number;       // % from top
  label: string;
  shortLabel?: string;
  description: string;
  direction: "top" | "bottom" | "left" | "right";
  area?: string;   // e.g. "42 m²"
}

export const floorPlanAnnotations: Annotation[] = [
  {
    id: "living",
    x: 28,
    y: 42,
    label: "Living Room",
    shortLabel: "LR",
    description:
      "Open-plan living area designed for natural cross-ventilation. Double-height ceiling at 4.5 m creates visual spaciousness. South-facing glazing maximises winter solar gain while deep eaves prevent summer overheating.",
    direction: "bottom",
    area: "48 m²",
  },
  {
    id: "kitchen",
    x: 52,
    y: 38,
    label: "Kitchen & Dining",
    shortLabel: "KD",
    description:
      "Galley-style kitchen with island bench opens directly to dining and terrace. Ventilation shaft above cooking zone exhausts heat. Cabinetry runs 3.6 m to ceiling for maximal storage.",
    direction: "top",
    area: "32 m²",
  },
  {
    id: "master",
    x: 75,
    y: 28,
    label: "Master Bedroom",
    shortLabel: "MB",
    description:
      "Private north-facing suite with walk-in robe (WIR) and ensuite. Sliding bi-fold doors open to a private balcony. Acoustic insulation (Rw 50) separates from main living zone.",
    direction: "left",
    area: "26 m²",
  },
  {
    id: "study",
    x: 18,
    y: 22,
    label: "Study / Home Office",
    shortLabel: "ST",
    description:
      "Dedicated work-from-home room with built-in joinery, data conduit, and a north-east corner window to capture morning light. Sliding barn door provides acoustic privacy when required.",
    direction: "right",
    area: "14 m²",
  },
  {
    id: "terrace",
    x: 40,
    y: 72,
    label: "Outdoor Terrace",
    shortLabel: "OT",
    description:
      "Covered alfresco terrace with treated hardwood decking extends the living zone outdoors. Pergola with adjustable louvres provides climate control. Connected to kitchen/dining via stacker doors.",
    direction: "top",
    area: "22 m²",
  },
  {
    id: "garage",
    x: 78,
    y: 70,
    label: "Double Garage",
    shortLabel: "GR",
    description:
      "Double lock-up garage with 2.4 m clearance, EV charging conduit, and a rear entry into laundry/mudroom zone. Structural lintel spans 5.6 m for column-free interior.",
    direction: "left",
    area: "38 m²",
  },
  {
    id: "bathroom",
    x: 60,
    y: 60,
    label: "Main Bathroom",
    shortLabel: "BA",
    description:
      "Full-height porcelain tile wet room. Offset layout allows separate bath, frameless shower, and separate WC. Heated floor slab and heat-recovery ventilation fan.",
    direction: "right",
    area: "11 m²",
  },
];

// Site area data
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
    value: 650,
    unit: "m²",
    icon: "Maximize2",
    color: "from-amber-700 to-amber-500",
    description: "Corner allotment with 18 m street frontage and 36 m depth. All boundaries surveyed by licensed surveyor.",
  },
  {
    label: "Built-up Area (GFA)",
    value: 310,
    unit: "m²",
    icon: "Building2",
    color: "from-stone-600 to-stone-400",
    description: "Gross floor area across two levels including garage, covered terraces and roof overhangs.",
  },
  {
    label: "Open / Garden Area",
    value: 210,
    unit: "m²",
    icon: "Leaf",
    color: "from-emerald-800 to-emerald-600",
    description: "Soft landscaped areas including front garden, side passage garden bed and rear lawn.",
  },
  {
    label: "Impervious Paving",
    value: 96,
    unit: "m²",
    icon: "Grid3x3",
    color: "from-slate-600 to-slate-400",
    description: "Driveway, footpaths and terrace hardscape. Permeable pavers used throughout to meet council stormwater requirements.",
  },
  {
    label: "Green / Roof Garden",
    value: 34,
    unit: "m²",
    icon: "Sprout",
    color: "from-lime-700 to-lime-500",
    description: "Podium-level green roof above garage improves thermal performance and manages roof runoff on-site.",
  },
  {
    label: "Floor Area Ratio",
    value: 0.48,
    unit: "FAR",
    icon: "BarChart3",
    color: "from-architect-700 to-architect-500",
    description: "Floor area ratio of 0.48 : 1 — well within the 0.6 maximum stipulated by local planning controls.",
  },
];

// Elevation tabs
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
      "The street façade balances privacy with street presence. A recessed entry portal with off-form concrete blade walls frames the approach. Vertical cedar battens screen the study window while admitting diffused light. The garage door sits flush with the facade plane.",
    annotations: [
      { x: 18, y: 28, text: "Cedar batten screen — 90×19 @ 20 mm gap" },
      { x: 50, y: 18, text: "Concrete blade wall — exposed aggregate finish" },
      { x: 78, y: 52, text: "Flush garage door — powder-coat aluminium" },
      { x: 50, y: 78, text: "Ground level RL 0.000" },
    ],
  },
  {
    id: "south",
    label: "South (Garden) Elevation",
    description:
      "The rear elevation is fully glazed at ground floor level, using 10 mm toughened low-e double-glazed units in aluminium frames. The upper floor cantilevers 1.2 m over the terrace to provide shade. Expressed steel columns carry the cantilever.",
    annotations: [
      { x: 22, y: 22, text: "1200 mm cantilevered slab — post-tensioned" },
      { x: 50, y: 40, text: "Full-height glazing — 3000 × 2700 stacker" },
      { x: 78, y: 30, text: "Exposed I-section steel column 150UB" },
      { x: 50, y: 72, text: "Hardwood deck RL -0.150" },
    ],
  },
  {
    id: "east",
    label: "East Side Elevation",
    description:
      "The east elevation mediates between the site boundary and the living spaces. A rendered masonry spine wall runs the full height and length, terminating the building and providing structural bracing. Slot windows to bathroom and laundry maintain privacy.",
    annotations: [
      { x: 20, y: 35, text: "200 mm AAC masonry spine wall" },
      { x: 62, y: 25, text: "Slot window 300×1200 — obscure glazing" },
      { x: 50, y: 78, text: "900 mm boundary setback" },
    ],
  },
  {
    id: "section",
    label: "Cross Section A–A",
    description:
      "The A–A section cuts through the living room and master bedroom, revealing the double-height void and the relationship between levels. The open-tread stair floats within the void, and the first-floor bridge connects bedroom wing to wet areas.",
    annotations: [
      { x: 30, y: 15, text: "Double-height void — 4500 mm ceiling" },
      { x: 55, y: 28, text: "Floating bridge — 12 mm plate glass balustrade" },
      { x: 30, y: 52, text: "Open-tread stair — 10 mm steel stringers" },
      { x: 70, y: 55, text: "Insulated slab-on-ground — 110 mm RC" },
      { x: 50, y: 82, text: "Engineered foundation beams" },
    ],
  },
];

// Site development timeline
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
    title: "Site Survey & Analysis",
    duration: "2 weeks",
    icon: "ScanLine",
    description:
      "Licensed surveyor pegs all boundaries and establishes levels. Geotechnical report confirms soil classification (Class M shrinkable clay). Existing services located and marked — sewer, water, gas, power.",
    deliverables: ["Survey plan", "Geotech report", "Services diagram"],
  },
  {
    id: "earthworks",
    phase: "Phase 02",
    title: "Earthworks & Foundation",
    duration: "3 weeks",
    icon: "Shovel",
    description:
      "Site cleared, topsoil stripped and stockpiled for reuse. Excavation to 500 mm for pad and strip footings in accordance with geotechnical recommendations. Waffle-pod slab system poured monolithically with edge beams.",
    deliverables: ["Cut/fill volumes", "Footing inspection cert", "Slab pour record"],
  },
  {
    id: "structure",
    phase: "Phase 03",
    title: "Structural Frame",
    duration: "5 weeks",
    icon: "Layers",
    description:
      "Structural steel columns and beams erected and bolted. First floor formwork and RC slab poured. Roof framing — LVL ridge beam with engineered timber rafters. Engineer inspection at key hold points.",
    deliverables: ["Steel connection drawings", "Concrete test reports", "Structural sign-off"],
  },
  {
    id: "envelope",
    phase: "Phase 04",
    title: "Building Envelope",
    duration: "4 weeks",
    icon: "Home",
    description:
      "External cladding, windows, and roof sheeting installed to weatherproof the building. AAC masonry walls laid; Colorbond standing-seam roof installed; aluminium window frames glazed with low-e double glazing.",
    deliverables: ["Waterproofing cert", "Window compliance", "Thermal envelope report"],
  },
  {
    id: "fitout",
    phase: "Phase 05",
    title: "Interior Fit-out",
    duration: "8 weeks",
    icon: "Paintbrush",
    description:
      "Internal walls (75mm steel stud + plasterboard), wet area waterproofing, mechanical rough-in, electrical rough-in, and insulation. Followed by plasterboard, joinery installation, tiling, painting, and fixture installation.",
    deliverables: ["Waterproof inspection", "Electrical rough-in cert", "Joinery sign-off"],
  },
  {
    id: "handover",
    phase: "Phase 06",
    title: "Completion & Handover",
    duration: "2 weeks",
    icon: "KeyRound",
    description:
      "Practical completion inspection with client. Defects list issued and rectified within 14 days. Occupancy permit issued by council. As-built drawings, operation manuals, and warranties handed over to client.",
    deliverables: ["Occupancy permit", "As-built drawings", "Defects clearance cert"],
  },
];

// Architect process steps
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
    title: "Client Brief",
    subtitle: "Understanding needs, budget & site",
    icon: "MessageSquare",
    description:
      "The process begins with an in-depth briefing session. The architect listens to the client's lifestyle, functional needs, aesthetic preferences, budget constraints, and timeline aspirations. Site visits are conducted to understand context, orientation, views, and neighbourhood character.",
    tools: ["Interview questionnaire", "Site analysis checklist", "Budget template"],
    deliverables: ["Project Brief document", "Site analysis report", "Fee proposal"],
    duration: "1–2 weeks",
  },
  {
    id: "concept",
    step: 2,
    title: "Concept Design",
    subtitle: "Exploring spatial ideas",
    icon: "Lightbulb",
    description:
      "Architectural concept is developed through sketches, massing models, and precedent imagery. Multiple spatial arrangements are explored before settling on a preferred option. Key decisions around orientation, circulation, and spatial hierarchy are made.",
    tools: ["Hand sketching", "Physical massing models", "SketchUp", "Mood boards"],
    deliverables: ["Concept sketch set", "Site plan option", "3D massing model"],
    duration: "2–3 weeks",
  },
  {
    id: "design-dev",
    step: 3,
    title: "Design Development",
    subtitle: "Refining plans, elevations & details",
    icon: "PenTool",
    description:
      "The approved concept is developed into coordinated architectural drawings. Floor plans are refined to 1:100 scale; elevations and sections defined. Structural, services and landscape consultants are engaged. Materials and finishes palette is resolved.",
    tools: ["Revit / ArchiCAD", "Enscape (render)", "Material boards", "Consultant coordination"],
    deliverables: ["Design Development drawings", "3D renders", "Materials schedule"],
    duration: "4–6 weeks",
  },
  {
    id: "documentation",
    step: 4,
    title: "Construction Documents",
    subtitle: "Detailed drawings for permit & build",
    icon: "FileText",
    description:
      "Full working drawing set is produced covering all trades — architectural, structural, hydraulic, electrical, mechanical and landscaping. Specifications written for all materials and workmanship standards. Documents lodged for Development Approval (DA) and Building Permit.",
    tools: ["Revit full model", "Specification writer", "NCC compliance check", "Consultant drawings coordination"],
    deliverables: ["Full working drawing set", "Specifications", "DA & BP approval"],
    duration: "6–10 weeks",
  },
  {
    id: "procurement",
    step: 5,
    title: "Tender & Procurement",
    subtitle: "Selecting the right builder",
    icon: "ClipboardList",
    description:
      "Tender documents are issued to a short-listed panel of builders. The architect prepares schedules of rates, reviews tender submissions, and provides a tender report recommending a preferred contractor based on price, programme and capacity. Contract is executed.",
    tools: ["Tender schedule", "Cost comparison matrix", "Contract admin"],
    deliverables: ["Tender report", "Signed contract", "Programme of works"],
    duration: "4–6 weeks",
  },
  {
    id: "construction",
    step: 6,
    title: "Construction Administration",
    subtitle: "On-site oversight to ensure quality",
    icon: "HardHat",
    description:
      "The architect conducts regular site inspections, responds to Requests for Information (RFIs), issues instruction for variations, and certifies progress claims. Hold-point inspections ensure work complies with drawings and specifications before being concealed.",
    tools: ["Site inspection reports", "RFI register", "Progress claim certifications", "Defects schedule"],
    deliverables: ["Inspection reports", "RFI log", "Variation orders", "Progress certificates"],
    duration: "Duration of build",
  },
  {
    id: "post-occ",
    step: 7,
    title: "Post-Occupancy",
    subtitle: "Review, learn, and refine",
    icon: "Star",
    description:
      "6–12 months after occupation, the architect conducts a Post-Occupancy Evaluation (POE). Thermal comfort, energy performance, and user satisfaction are assessed against the original design intent. Lessons learned feed into future projects.",
    tools: ["POE questionnaire", "Energy monitoring data", "Thermal imaging"],
    deliverables: ["POE report", "Energy performance summary", "Defects warranty review"],
    duration: "6–12 months post-handover",
  },
];

// Specifications
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
      { name: "Foundation", value: "Waffle-pod slab on ground, Class M" },
      { name: "Ground Floor", value: "110 mm RC slab, F'c 32 MPa" },
      { name: "First Floor", value: "100 mm RC slab, post-tensioned" },
      { name: "Columns", value: "150 UB structural steel, hot-dip galvanised" },
      { name: "Roof Framing", value: "LVL ridge beam, 200×63 LVL rafters @ 600 c/c" },
      { name: "Wind Classification", value: "N2 (AS 4055)" },
    ],
  },
  {
    category: "External Materials",
    icon: "Layers",
    items: [
      { name: "Facade", value: "Off-form concrete + render + cedar battens" },
      { name: "Roof Cladding", value: "Colorbond® Ultra standing seam, 'Surfmist'" },
      { name: "Windows", value: "Aluminium double-glazed, low-e, Uw ≤ 2.0" },
      { name: "External Doors", value: "Thermally broken aluminium frames" },
      { name: "Terrace Decking", value: "Spotted gum 90×19, oiled finish" },
      { name: "Driveway", value: "Permeable concrete pavers, charcoal" },
    ],
  },
  {
    category: "Interior",
    icon: "Sofa",
    items: [
      { name: "Internal Walls", value: "75 mm steel stud + 13 mm plasterboard" },
      { name: "Ceiling Height GF", value: "4.5 m void / 2.7 m general" },
      { name: "Flooring (Living)", value: "European oak engineered timber 190 mm wide" },
      { name: "Flooring (Wet Areas)", value: "600×600 porcelain tile, Rectified" },
      { name: "Kitchen Benchtop", value: "20 mm Calacatta marble engineered stone" },
      { name: "Stair", value: "Open-tread spotted gum on 12 mm steel stringers" },
    ],
  },
  {
    category: "Mechanical & Electrical",
    icon: "Zap",
    items: [
      { name: "HVAC", value: "Ducted reverse-cycle air conditioning + zoning" },
      { name: "Hot Water", value: "Heat pump HWS, 300 L — 4.5 Star" },
      { name: "Solar PV", value: "10 kW rooftop PV array, 13.5 kWh battery" },
      { name: "EV Charging", value: "7 kW Type 2 EVSE in garage" },
      { name: "Lighting", value: "LED throughout, DALI dimming in living zones" },
      { name: "Home Automation", value: "KNX bus system — lighting, blinds, HVAC" },
    ],
  },
];
