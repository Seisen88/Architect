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
              <span
                className="font-serif text-lg tracking-widest text-architect-200"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                ARCHI<span className="text-architect-500">DESIGN</span>
              </span>
            </div>
            <h3 className="font-serif text-base text-stone-300 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
              Karl Angelo G. Sumog-oy
            </h3>
            <p className="text-xs text-architect-600 uppercase tracking-widest mb-3">
              BS Architecture 5C · LCC Bacolod · AFAID
            </p>
            <p className="text-stone-500 text-sm leading-relaxed max-w-xs">
              Architecture and design portfolio showcasing the Interactive Library &amp; Museum (Himamaylan City) and the New Government Center (E.B. Magalona, Negros Occidental).
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-stone-600 mb-4">Drawings</h4>
            <ul className="space-y-2.5">
              {[
                ["Sheet A-01 · Perspective & Vicinity", "#hero"],
                ["Sheet A-02 · Site Dev Plan", "#site-dev"],
                ["Sheet A-03/04 · Floor Plans", "#floor-plan"],
                ["Sheet A-05/06 · Upper Floors", "#floor-plan"],
                ["Sheet A-07 · Structural", "#specifications"],
                ["Elevation Views", "#elevation"],
              ].map(([label, href]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-sm text-stone-500 hover:text-architect-400 transition-colors underline-anim"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-stone-600 mb-4">Projects</h4>
            <ul className="space-y-4">
              <li>
                <span className="block text-[10px] uppercase tracking-widest text-stone-700 mb-0.5">Project 01</span>
                <span className="text-sm text-stone-400">Interactive Library &amp; Museum</span>
                <span className="block text-xs text-stone-600">Himamaylan City, Negros Occidental</span>
              </li>
              <li>
                <span className="block text-[10px] uppercase tracking-widest text-stone-700 mb-0.5">Project 02</span>
                <span className="text-sm text-stone-400">New Government Center</span>
                <span className="block text-xs text-stone-600">Brgy. Santo Niño, E.B. Magalona · 3.7581 ha</span>
              </li>
              <li>
                <span className="block text-[10px] uppercase tracking-widest text-stone-700 mb-0.5">School</span>
                <span className="text-xs text-stone-500">La Consolacion College Bacolod<br />Architecture, Fine Arts and Interior Design</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-stone-700">
            © {new Date().getFullYear()} Karl Angelo G. Sumog-oy · BS Architecture · La Consolacion College Bacolod
          </p>
          <div className="flex items-center gap-6 flex-wrap justify-center">
            {["AFAID · Registered", "UAP Standards", "NSCP 2015"].map((badge) => (
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
