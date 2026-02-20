import { Button } from "@dex/ui";

const navLinks = ["Features", "Rooms", "Pricing", "Blog"];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-dark/80 backdrop-blur-md border-b border-white/5">
      <nav className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 h-[76px] flex items-center gap-0">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 shrink-0">
          <span className="w-7 h-7 rounded-lg bg-purple flex items-center justify-center font-display font-bold text-[13px] text-white shrink-0">
            D
          </span>
          <span className="font-display font-bold text-xl text-white">
            Dex&apos;s Playbook
          </span>
        </a>

        {/* Nav links */}
        <ul className="hidden md:flex items-center gap-9 flex-1 justify-center">
          {navLinks.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className="text-[15px] font-body text-secondary hover:text-white transition-colors duration-150"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA row */}
        <div className="flex items-center gap-4 ml-auto shrink-0">
          <a
            href="#"
            className="hidden sm:block text-[15px] font-body text-secondary hover:text-white transition-colors duration-150"
          >
            Log in
          </a>
          <Button variant="primary" size="sm" href="#">
            Get Started
          </Button>
        </div>
      </nav>
    </header>
  );
}
