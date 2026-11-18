import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { OratoriaLogo } from "./OratoriaLogo";

const NAV_LINKS = [
  { label: "Início", href: "#inicio" },
  { label: "Competências", href: "#competencias" },
  { label: "Modalidades", href: "#modalidades" },
  { label: "O Mentor", href: "#mentor" },
  { label: "Montar Plano", href: "#montar-plano" },
];

interface HeaderProps {
  onBookClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onBookClick }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#161618]/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 h-16 md:h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Lockup */}
        <a
          href="#inicio"
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B800] rounded-md"
          aria-label="Oratória Kids — Ir para o início"
        >
          <OratoriaLogo variant="header" />
        </a>

        {/* Zone 2: Clean Single-Line Navigation */}
        <nav
          aria-label="Navegação principal"
          className="hidden lg:flex items-center gap-7"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-neutral-300 hover:text-white transition-colors duration-150 whitespace-nowrap shrink-0 relative py-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#F5B800] hover:after:w-full after:transition-all after:duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B800] rounded-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#agendamento"
            onClick={(e) => {
              e.preventDefault();
              onBookClick();
            }}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-bold text-[#161618] bg-[#F5B800] hover:bg-[#ffca28] active:scale-[0.98] rounded-md transition-all duration-150 whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Agendar Aula
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-md text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B800]"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div
          id="mobile-navigation"
          className="lg:hidden bg-[#161618] border-t border-white/10 px-5 py-6"
        >
          <nav className="flex flex-col gap-3" aria-label="Menu móvel">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="py-2.5 px-3 text-base font-medium text-neutral-200 hover:text-[#F5B800] hover:bg-white/5 rounded-md transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 mt-2 border-t border-white/10">
              <a
                href="#agendamento"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileOpen(false);
                  onBookClick();
                }}
                className="w-full inline-flex items-center justify-center px-5 py-3 text-sm font-bold text-[#161618] bg-[#F5B800] hover:bg-[#ffca28] rounded-md transition-colors"
              >
                Agendar Aula
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
