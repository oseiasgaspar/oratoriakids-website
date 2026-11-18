import React, { useState } from "react";
import { ShieldCheck, MessageSquareQuote, Trophy, Check, ChevronDown } from "lucide-react";

interface Pillar {
  title: string;
  practiceNote: string;
}

interface CurriculumModule {
  code: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  pillars: Pillar[];
}

const MODULES: CurriculumModule[] = [
  {
    code: "Módulo 01",
    title: "Autoconfiança & Expressão",
    subtitle: "Construção da segurança emocional e presença física antes mesmo da primeira palavra.",
    icon: ShieldCheck,
    pillars: [
      {
        title: "Controle da timidez e do nervosismo",
        practiceNote:
          "Técnicas simples de respiração diafragmática e dessensibilização progressiva para transformar o receio em tranquilidade.",
      },
      {
        title: "Contacto visual e postura segura",
        practiceNote:
          "Treino prático de alinhamento corporal, base firme e ligação visual natural com quem ouve.",
      },
      {
        title: "Expressão corporal e facial natural",
        practiceNote:
          "Jogos de expressão para que os gestos e o rosto reforcem a mensagem sem rigidez nem exagero.",
      },
    ],
  },
  {
    code: "Módulo 02",
    title: "Clareza & Narrativa",
    subtitle: "Organização lógica do pensamento para falar com fluidez em qualquer contexto.",
    icon: MessageSquareQuote,
    pillars: [
      {
        title: "Falar com clareza e organizar ideias",
        practiceNote:
          "Estruturas simples (início, meio e conclusão) aliadas a exercícios de dicção, ritmo e projecção vocal.",
      },
      {
        title: "Arte de contar histórias (Storytelling)",
        practiceNote:
          "Criação de narrativas cativantes que prendem a atenção de colegas, familiares e professores.",
      },
      {
        title: "Comunicação assertiva com colegas e professores",
        practiceNote:
          "Saber pedir ajuda, expor dúvidas em sala de aula e defender o próprio ponto de vista com respeito.",
      },
    ],
  },
  {
    code: "Módulo 03",
    title: "Protagonismo & Liderança",
    subtitle: "Autonomia avançada para liderar equipas, responder sob pressão e brilhar em palco.",
    icon: Trophy,
    pillars: [
      {
        title: "Apresentações escolares de alto impacto",
        practiceNote:
          "Preparação completa para exposições orais, feiras de ciências e leitura em voz alta diante da turma.",
      },
      {
        title: "Pensamento rápido e capacidade de responder perguntas",
        practiceNote:
          "Dinâmicas de improviso que treinam a mente para organizar respostas claras em segundos.",
      },
      {
        title: "Argumentação e pequenos debates",
        practiceNote:
          "Aprender a construir argumentos sólidos, ouvir com atenção e rebater ideias com elegância.",
      },
      {
        title: "Simulações de entrevistas e apresentações",
        practiceNote:
          "Ensaios realistas com microfone, gravação comentada e correcção construtiva passo a passo.",
      },
      {
        title: "Liderança e confiança",
        practiceNote:
          "Postura de iniciativa, coordenação de grupos escolares e comunicação inspiradora no dia-a-dia.",
      },
    ],
  },
];

export const CompetenciasSection: React.FC = () => {
  const [expandedPillar, setExpandedPillar] = useState<string | null>(
    "Módulo 01-0",
  );

  const togglePillar = (key: string) => {
    setExpandedPillar((prev) => (prev === key ? null : key));
  };

  return (
    <section
      id="competencias"
      className="bg-[#F6F6F8] text-[#161618] py-20 lg:py-24"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 lg:mb-14">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#161618]/65 mb-3">
              Competências Desenvolvidas · Plano Curricular
            </p>
            <h2
              className="font-display font-extrabold tracking-tight text-[#161618] leading-tight text-balance"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
            >
              Os 11 pilares da comunicação infantil em 3 módulos progressivos.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-neutral-600 max-w-md leading-relaxed">
            Cada sessão combina técnica vocal, expressão corporal e prática real.
            Clique em qualquer pilar abaixo para ver como é trabalhado em aula.
          </p>
        </div>

        {/* 3 Modules Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-7 items-stretch">
          {MODULES.map((mod) => {
            const Icon = mod.icon;
            return (
              <article
                key={mod.code}
                className="bg-white border border-neutral-200/90 rounded-xl p-6 sm:p-7 flex flex-col justify-between transition-colors duration-200 hover:border-[#161618]/30"
              >
                <div>
                  {/* Module Header */}
                  <div className="flex items-center justify-between gap-4 pb-5 mb-5 border-b border-neutral-100">
                    <div>
                      <span className="block text-xs font-bold uppercase tracking-[0.12em] text-[#b38600] tabular-nums mb-1">
                        {mod.code}
                      </span>
                      <h3 className="font-display font-extrabold text-xl text-[#161618] leading-snug">
                        {mod.title}
                      </h3>
                    </div>
                    <div className="w-11 h-11 rounded-lg bg-[#161618] flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-[#F5B800]" />
                    </div>
                  </div>

                  <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                    {mod.subtitle}
                  </p>

                  {/* Pillars List */}
                  <ul className="divide-y divide-neutral-100">
                    {mod.pillars.map((pillar, idx) => {
                      const key = `${mod.code}-${idx}`;
                      const isOpen = expandedPillar === key;
                      return (
                        <li key={pillar.title} className="py-3 first:pt-0 last:pb-0">
                          <button
                            type="button"
                            onClick={() => togglePillar(key)}
                            aria-expanded={isOpen}
                            className="w-full text-left flex items-start justify-between gap-3 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B800] rounded-sm"
                          >
                            <span className="flex items-start gap-2.5">
                              <span className="w-5 h-5 rounded-sm bg-[#F5B800]/20 text-[#161618] flex items-center justify-center shrink-0 mt-0.5">
                                <Check className="w-3.5 h-3.5 stroke-[2.5]" aria-hidden="true" />
                              </span>
                              <span className="text-sm font-semibold text-[#161618] group-hover:text-black leading-snug">
                                {pillar.title}
                              </span>
                            </span>
                            <ChevronDown
                              className={`w-4 h-4 text-neutral-400 shrink-0 mt-1 transition-transform duration-150 ${
                                isOpen ? "rotate-180 text-[#161618]" : ""
                              }`}
                              aria-hidden="true"
                            />
                          </button>
                          {isOpen && (
                            <p className="mt-2 pl-7 text-xs sm:text-[13px] text-neutral-600 leading-relaxed">
                              {pillar.practiceNote}
                            </p>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Subtle Module Count Footer */}
                <div className="pt-5 mt-6 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500 tabular-nums">
                  <span>Competências do módulo</span>
                  <span className="font-bold text-[#161618]">
                    {mod.pillars.length} pilares práticos
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
