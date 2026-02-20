const links = {
  Product:  ["Features", "Rooms", "Pricing", "Changelog"],
  Company:  ["About", "Blog", "Careers", "Contact"],
  Legal:    ["Privacy", "Terms", "Security", "Cookies"],
};

export default function Footer() {
  return (
    <footer className="bg-dark-deep">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pt-16 pb-10">
        {/* Top row */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-0 md:justify-between">
          {/* Brand */}
          <div className="max-w-xs flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-purple flex items-center justify-center font-display font-bold text-[13px] text-white shrink-0">
                D
              </span>
              <span className="font-display font-bold text-xl text-white">
                Dex&apos;s Playbook
              </span>
            </div>
            <p className="text-sm font-body text-subtle leading-relaxed">
              The infinite canvas where ideas come alive. Built for creative
              teams, curious minds, and playful collaborators.
            </p>
          </div>

          {/* Link columns */}
          <div className="flex flex-wrap gap-12 md:gap-16">
            {Object.entries(links).map(([group, items]) => (
              <div key={group} className="flex flex-col gap-4">
                <span className="text-[13px] font-semibold font-body text-white uppercase tracking-wide">
                  {group}
                </span>
                <ul className="flex flex-col gap-2">
                  {items.map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-sm font-body text-subtle hover:text-secondary transition-colors duration-150"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-[13px] font-body text-subtle">
            © 2025 Dex&apos;s Playbook. All rights reserved.
          </p>
          <p className="text-[13px] font-body text-subtle">
            Made with ☕ and creativity
          </p>
        </div>
      </div>
    </footer>
  );
}
