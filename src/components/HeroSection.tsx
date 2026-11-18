import React, { useState } from "react";
import { ArrowRight, Sparkles, Home, BookOpenCheck, Award } from "lucide-react";
import arielTeachingImg from "../assets/ariel-teaching.jpg";

interface HeroSectionProps {
  onBookHomeClick: () => void;
}

const HIGHLIGHTS = [
  {
    icon: Home,
    title: "100% Personalizado ao Domicílio",
    detail: "Sessões adaptadas ao ritmo, idade e personalidade de cada aluno em Luanda.",
  },
  {
    icon: BookOpenCheck,
    title: "Metodologia Prática e Lúdica",
    detail: "Dinâmicas activas sem teoria aborrecida: aprender a falar falando.",
  },
  {
    icon: Award,
    title: "Preparação Escolar e Social",
    detail: "Segurança real para trabalhos de grupo, leituras e apresentações.",
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onBookHomeClick }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="inicio"
      className="relative bg-[#161618] text-white overflow-hidden"
    >
      {/* Subtle geometric 3-dot architectural motif echoing the logo */}
      <div
        className="pointer-events-none absolute top-14 right-10 hidden xl:flex items-center gap-2.5 opacity-80"
        aria-hidden="true"
      >
        <span className="w-2 h-2 rounded-full bg-[#F5B800]" />
        <span className="w-2 h-2 rounded-full bg-[#F5B800]/65" />
        <span className="w-2 h-2 rounded-full bg-[#F5B800]/35" />
      </div>

      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 pt-12 pb-12 lg:pt-20 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Content Column */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <p className="text-xs sm:text-[13px] font-semibold tracking-[0.14em] uppercase text-[#F5B800] mb-5">
              COMUNICAÇÃO · CONFIANÇA · LIDERANÇA | LUANDA, ANGOLA
            </p>

            <h1
              className="font-display font-extrabold tracking-tight text-white leading-[1.07] text-balance mb-6"
              style={{ fontSize: "clamp(2.25rem, 4.1vw, 3.65rem)" }}
            >
              Formamos crianças que falam com clareza, postura e liderança.
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl mb-8">
              Acompanhamento personalizado de comunicação e oratória ao domicílio
              com Ariel Gaspar. Ajudamos o seu filho a vencer a timidez e a
              destacar-se na escola e na vida.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                type="button"
                onClick={onBookHomeClick}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-bold text-[#161618] bg-[#F5B800] hover:bg-[#ffca28] active:scale-[0.98] rounded-md transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>Agendar Aula ao Domicílio</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>

              <a
                href="#desafio-ia"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-semibold text-white border border-white/35 hover:border-[#F5B800] hover:text-[#F5B800] rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B800]"
              >
                <Sparkles className="w-4 h-4 shrink-0 text-[#F5B800]" />
                <span>Experimentar Desafio IA</span>
              </a>
            </div>
          </div>

          {/* Right Editorial Photography Column — Ariel Gaspar Mentoring */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden border border-white/15 bg-[#1B1B1E]">
              {/* Geometric gold corner accent */}
              <div
                className="absolute top-0 right-0 z-10 w-16 h-1.5 bg-[#F5B800]"
                aria-hidden="true"
              />
              <div
                className="absolute top-0 right-0 z-10 w-1.5 h-16 bg-[#F5B800]"
                aria-hidden="true"
              />

              {!imgError ? (
                <img
                  src={arielTeachingImg}
                  alt="Ariel Gaspar a orientar uma criança numa sessão prática de oratória e dicção ao domicílio"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#1F1F23] to-[#161618]">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F5B800]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F5B800]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F5B800]" />
                  </div>
                  <p className="font-display font-bold text-lg text-white">
                    Ariel Gaspar · Mentor
                  </p>
                  <p className="text-sm text-neutral-400 mt-1">
                    Oratória Kids · Luanda, Angola
                  </p>
                </div>
              )}

              {/* Subtle bottom scrim caption */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#161618]/90 via-[#161618]/45 to-transparent px-5 pt-10 pb-3.5">
                <p className="text-xs font-semibold text-[#F5B800] tracking-wide">
                  Ariel Gaspar · Acompanhamento ao Domicílio
                </p>
                <p className="text-xs text-neutral-200 mt-0.5">
                  Sessões individuais em casa · Dos 6 aos 15 anos em Luanda
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-width 3-highlight bar below hero split */}
      <div className="border-t border-white/10 bg-[#1B1B1E]">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {HIGHLIGHTS.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-md bg-[#F5B800]/12 border border-[#F5B800]/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-[#F5B800]" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-sm sm:text-[15px] text-white">
                      {item.title}
                    </h2>
                    <p className="text-xs sm:text-[13px] text-neutral-400 leading-relaxed mt-1">
                      {item.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
