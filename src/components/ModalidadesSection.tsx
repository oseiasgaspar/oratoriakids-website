import React from "react";
import { ArrowRight, Check, Home, Users } from "lucide-react";

export type ModalityOption = "Domicílio" | "Lista VIP Espaço";

interface ModalidadesSectionProps {
  onSelectModality: (modality: ModalityOption) => void;
}

export const ModalidadesSection: React.FC<ModalidadesSectionProps> = ({
  onSelectModality,
}) => {
  return (
    <section
      id="modalidades"
      className="bg-white text-[#161618] py-20 lg:py-24 border-t border-neutral-100"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 lg:mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#161618]/65 mb-3">
            Modalidades de Ensino · Luanda
          </p>
          <h2
            className="font-display font-extrabold tracking-tight text-[#161618] leading-tight text-balance mb-4"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
          >
            Começa na tranquilidade de casa, evolui para o palco.
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
            A jornada ORAKIDS acompanha o crescimento comunicativo da criança
            desde a base individual até às futuras dinâmicas em grupo.
          </p>
        </div>

        {/* 2-Column Balanced Modalities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Card 1: Active Highlight - Aulas ao Domicílio */}
          <article className="relative bg-[#161618] text-white rounded-xl p-7 sm:p-9 flex flex-col justify-between border border-[#161618]">
            {/* Top gold hairline bar */}
            <div
              className="absolute top-0 inset-x-7 h-[3px] bg-[#F5B800]"
              aria-hidden="true"
            />

            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="inline-block px-2.5 py-1 rounded-sm bg-[#F5B800] text-[#161618] text-[11px] font-extrabold uppercase tracking-[0.12em]">
                  DISPONÍVEL AGORA
                </span>
                <div className="w-10 h-10 rounded-lg bg-white/8 border border-white/15 flex items-center justify-center shrink-0">
                  <Home className="w-5 h-5 text-[#F5B800]" aria-hidden="true" />
                </div>
              </div>

              <h3 className="font-display font-extrabold text-2xl sm:text-[28px] text-white mb-3">
                Aulas ao Domicílio
              </h3>

              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed mb-7">
                Sessões individuais no conforto e segurança da casa da família em
                Luanda, adaptadas à idade, personalidade e rotina da criança.
              </p>

              <ul className="space-y-3.5 pt-6 border-t border-white/12 mb-8">
                {[
                  "Diagnóstico inicial gratuito do perfil comunicativo",
                  "Plano 100% personalizado entre os 6 e os 15 anos",
                  "Sem deslocações no trânsito de Luanda para os pais",
                  "Relatório de evolução e orientações práticas para a família",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-neutral-200">
                    <Check
                      className="w-4 h-4 text-[#F5B800] shrink-0 mt-0.5 stroke-[2.5]"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="button"
              onClick={() => onSelectModality("Domicílio")}
              className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-bold text-[#161618] bg-[#F5B800] hover:bg-[#ffca28] active:scale-[0.99] rounded-md transition-all duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Marcar Avaliação ao Domicílio</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
          </article>

          {/* Card 2: Upcoming - Espaço ORAKIDS */}
          <article className="bg-[#F6F6F8] text-[#161618] rounded-xl p-7 sm:p-9 flex flex-col justify-between border border-neutral-200">
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="inline-block px-2.5 py-1 rounded-sm bg-[#161618] text-white text-[11px] font-bold uppercase tracking-[0.12em]">
                  EM BREVE — LISTA VIP
                </span>
                <div className="w-10 h-10 rounded-lg bg-white border border-neutral-200 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-[#161618]" aria-hidden="true" />
                </div>
              </div>

              <h3 className="font-display font-extrabold text-2xl sm:text-[28px] text-[#161618] mb-3">
                Espaço ORAKIDS
              </h3>

              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed mb-7">
                Em breve, um espaço físico dedicado a pequenas turmas, clubes de
                debate infantil, simulações em palco e workshops práticos.
              </p>

              <ul className="space-y-3.5 pt-6 border-t border-neutral-200/80 mb-8">
                {[
                  "Turmas reduzidas agrupadas por faixa etária",
                  "Clube de debate infantil e jogos de improviso em equipa",
                  "Mini-palco equipado com microfone e gravação de ensaios",
                  "Acesso prioritário na abertura para inscritos na Lista VIP",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-neutral-700">
                    <Check
                      className="w-4 h-4 text-[#161618] shrink-0 mt-0.5 stroke-[2.5]"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="button"
              onClick={() => onSelectModality("Lista VIP Espaço")}
              className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-bold text-[#161618] bg-white border border-[#161618] hover:bg-[#161618] hover:text-white active:scale-[0.99] rounded-md transition-all duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B800]"
            >
              <span>Entrar na Lista Prioritária</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
          </article>
        </div>
      </div>
    </section>
  );
};
