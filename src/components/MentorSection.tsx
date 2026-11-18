import React, { useState } from "react";
import { UserCheck, ArrowRight } from "lucide-react";
import arielTribunaImg from "../assets/ariel-tribuna.jpg";

interface MentorSectionProps {
  onBookMentorClick: () => void;
}

export const MentorSection: React.FC<MentorSectionProps> = ({
  onBookMentorClick,
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="mentor"
      className="bg-[#F6F6F8] text-[#161618] py-20 lg:py-24 border-t border-neutral-200/70"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Editorial Portrait Card — Official Ariel Gaspar Photo */}
          <div className="lg:col-span-5">
            <div className="relative bg-white p-4 sm:p-5 rounded-xl border border-[#161618]/15">
              {/* Geometric charcoal & yellow-gold editorial framing */}
              <div
                className="absolute -top-2.5 -left-2.5 w-16 h-16 border-t-4 border-l-4 border-[#F5B800] rounded-tl-xl pointer-events-none"
                aria-hidden="true"
              />
              <div
                className="absolute -bottom-2.5 -right-2.5 w-16 h-16 border-b-4 border-r-4 border-[#161618] rounded-br-xl pointer-events-none"
                aria-hidden="true"
              />

              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-[#161618] border border-[#161618]/10">
                {!imgError ? (
                  <img
                    src={arielTribunaImg}
                    alt="Ariel Gaspar a discursar numa tribuna — Fundador e Mentor da ORAKIDS em Luanda"
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover object-center"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-neutral-100">
                    <UserCheck className="w-12 h-12 text-[#161618] mb-3" />
                    <p className="font-display font-bold text-lg text-[#161618]">
                      Ariel Gaspar
                    </p>
                    <p className="text-xs text-neutral-500 mt-1">
                      Fundador · ORAKIDS
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3.5 border-t border-neutral-100 px-1 flex items-center justify-between gap-4">
                <div>
                  <p className="font-display font-extrabold text-base text-[#161618]">
                    Ariel Gaspar
                  </p>
                  <p className="text-xs text-neutral-600">
                    Mentor de Comunicação e Oratória Infantil
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-sm bg-[#161618] text-[#F5B800] text-[11px] font-bold tracking-wider uppercase whitespace-nowrap">
                  Luanda · AO
                </span>
              </div>
            </div>
          </div>

          {/* Mentor Biography & Mission */}
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#161618]/65 mb-3">
              O Mentor · Fundador da ORAKIDS
            </p>
            <h2
              className="font-display font-extrabold tracking-tight text-[#161618] leading-tight text-balance mb-6"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
            >
              Preparar a nova geração em Angola para falar sem medo e liderar desde cedo.
            </h2>

            <div className="space-y-4 text-base text-neutral-700 leading-relaxed mb-8">
              <p>
                Ariel Gaspar fundou a{" "}
                <strong className="font-semibold text-[#161618]">
                  ORAKIDS
                </strong>{" "}
                com uma convicção clara: saber comunicar com segurança não é um
                dom reservado a poucos — é uma competência prática que se
                constrói na infância e acompanha toda a vida.
              </p>
              <p>
                Através de um acompanhamento próximo e humano ao domicílio em
                Luanda, Ariel trabalha lado a lado com cada criança e
                pré-adolescente para transformar a timidez em presença,
                desbloquear a organização das ideias e cultivar uma postura
                natural diante da turma, dos professores e da família.
              </p>
              <p>
                Em vez de discursos decorados ou pressão excessiva, o seu método
                combina escuta activa, jogos de expressão, storytelling e
                desafios graduais que respeitam a identidade única de cada
                aluno.
              </p>
            </div>

            {/* Clean unboxed editorial proof metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 border-y border-neutral-200 mb-8">
              <div>
                <p className="font-display font-extrabold text-2xl text-[#161618] tabular-nums">
                  6–15 anos
                </p>
                <p className="text-xs sm:text-[13px] text-neutral-600 mt-1">
                  Adaptação pedagógica por fase de desenvolvimento
                </p>
              </div>
              <div>
                <p className="font-display font-extrabold text-2xl text-[#161618] tabular-nums">
                  11 Pilares
                </p>
                <p className="text-xs sm:text-[13px] text-neutral-600 mt-1">
                  De expressão facial à liderança e debate
                </p>
              </div>
              <div>
                <p className="font-display font-extrabold text-2xl text-[#161618]">
                  Luanda
                </p>
                <p className="text-xs sm:text-[13px] text-neutral-600 mt-1">
                  Atendimento directo no lar de cada família
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onBookMentorClick}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-bold text-[#161618] bg-[#F5B800] hover:bg-[#ffca28] active:scale-[0.98] rounded-md transition-all duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#161618]"
            >
              <span>Conversar com Ariel Gaspar</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
