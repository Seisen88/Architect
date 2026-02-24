export default function Footer() {
  return (
    <footer className="bg-stone-950 border-t border-stone-800 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 border border-architect-500/60 flex items-center justify-center rotate-45">
                <div className="w-3.5 h-3.5 bg-architect-500" />
              </div>
              <span
                className="font-serif text-lg tracking-widest text-architect-200"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                ARCHI<span className="text-architect-500">STUDIOS</span>
              </span>
            </div>
            <p className="text-stone-500 text-sm leading-relaxed max-w-xs">
              A boutique architecture practice specialising in considered residential and
              commercial design — where every detail has a reason.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-stone-600 mb-4">Explore</h4>
            <ul className="space-y-2.5">
              {[
                ["Floor Plan", "#floor-plan"],
                ["Site Area", "#site-area"],
                ["Elevations", "#elevation"],
                ["Site Development", "#site-dev"],
                ["Architect Process", "#process"],
                ["Specifications", "#specifications"],
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

          {/* Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-stone-600 mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <span className="block text-[10px] uppercase tracking-widest text-stone-700 mb-0.5">Studio</span>
                <span className="text-sm text-stone-500">Level 4, 88 Collins Street<br />Melbourne VIC 3000</span>
              </li>
              <li>
                <span className="block text-[10px] uppercase tracking-widest text-stone-700 mb-0.5">Email</span>
                <a href="mailto:studio@archistudios.com" className="text-sm text-stone-500 hover:text-architect-400 transition-colors">
                  studio@archistudios.com
                </a>
              </li>
              <li>
                <span className="block text-[10px] uppercase tracking-widest text-stone-700 mb-0.5">Phone</span>
                <a href="tel:+61399991234" className="text-sm text-stone-500 hover:text-architect-400 transition-colors">
                  +61 3 9999 1234
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-stone-700">
            © {new Date().getFullYear()} ArchiStudios Pty Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Registered Architect", "RAIA Member", "Green Star Accredited"].map((badge) => (
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
