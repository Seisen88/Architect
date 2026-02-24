export default function Footer() {
  return (
    <footer className="bg-stone-950 border-t border-stone-800 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand & Proponent */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 border border-architect-500/60 flex items-center justify-center rotate-45">
                <div className="w-3.5 h-3.5 bg-architect-500" />
              </div>
              <span className="font-serif text-lg tracking-widest text-architect-200" style={{ fontFamily: "'Playfair Display', serif" }}>
                ARCHI<span className="text-architect-500">DESIGN</span>
              </span>
            </div>

            <h3 className="font-serif text-base text-stone-200 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
              Erica Mae D. Pancho
            </h3>
            <p className="text-xs text-architect-600 uppercase tracking-widest mb-1">BS Architecture 5C</p>
            <p className="text-xs text-stone-600 uppercase tracking-widest mb-4">
              La Consolacion College Bacolod · School of Architecture, Fine Arts and Interior Design
            </p>

            <div className="border-l-2 border-architect-700 pl-3 mb-4">
              <p className="text-xs text-stone-600 uppercase tracking-widest">Subject Adviser</p>
              <p className="text-sm text-stone-400">Ar. Gary Peter L. Bello, UAP</p>
            </div>

            <p className="text-stone-500 text-sm leading-relaxed max-w-sm">
              Architectural design portfolio — New Government Center for the Municipality of
              Enrique B. Magalona, Negros Occidental. Total lot area: 37,581 sq.m. (3.7581 ha).
            </p>
          </div>

          {/* Drawing Sheets */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-stone-600 mb-4">Drawing Set</h4>
            <ul className="space-y-2.5">
              {[
                ["A 01 · General Info & Lot Data", "#hero"],
                ["A 02 · Site Development Plan (1:500)", "#site-dev"],
                ["A 03 · Ground Floor Plan (1:200)", "#floor-plan"],
                ["A 04 · Second Floor Plan (1:200)", "#floor-plan"],
                ["A 05 · Third Floor Plan (1:200)", "#floor-plan"],
                ["Elevation & Section Views", "#elevation"],
                ["Specifications", "#specifications"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="text-sm text-stone-500 hover:text-architect-400 transition-colors font-mono">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Project details */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-stone-600 mb-4">Project Details</h4>
            <ul className="space-y-4">
              <li>
                <span className="block text-[10px] uppercase tracking-widest text-stone-700 mb-0.5">Project</span>
                <span className="text-sm text-stone-400">New Government Center for E. B. Magalona</span>
              </li>
              <li>
                <span className="block text-[10px] uppercase tracking-widest text-stone-700 mb-0.5">Location</span>
                <span className="text-sm text-stone-400">Brgy. Santo Niño, Enrique B. Magalona<br />Negros Occidental</span>
              </li>
              <li>
                <span className="block text-[10px] uppercase tracking-widest text-stone-700 mb-0.5">Lot Area</span>
                <span className="text-sm text-stone-400">37,581 sq.m. · 3.7581 Hectares</span>
              </li>
              <li>
                <span className="block text-[10px] uppercase tracking-widest text-stone-700 mb-0.5">Building Floors</span>
                <span className="text-sm text-stone-400">3-Storey Reinforced Concrete</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-stone-700">
            © {new Date().getFullYear()} Erica Mae D. Pancho · BS Architecture · La Consolacion College Bacolod · AFAID
          </p>
          <div className="flex items-center gap-6 flex-wrap justify-center">
            {["UAP Standards", "NSCP 2015", "BP 344 Accessibility", "NBC Compliance"].map((badge) => (
              <span key={badge} className="text-[10px] uppercase tracking-wider text-stone-700 hover:text-stone-500 transition-colors cursor-default">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
