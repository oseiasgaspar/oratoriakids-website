import React, { useMemo, useState } from "react";
import {
  Check,
  Copy,
  MessageCircle,
  SlidersHorizontal,
} from "lucide-react";

import {
  DEFAULT_SITE_CONFIG,
  type SiteContactConfig,
} from "../config/siteConfig";

interface PlanConfiguratorSectionProps {
  config?: SiteContactConfig;
}

const AGE_GROUPS = ["6 a 8 anos", "9 a 11 anos", "12 a 15 anos"] as const;

const OBJECTIVES = [
  "Vencer a timidez",
  "Apresentações escolares",
  "Falar com clareza",
  "Postura e expressão",
  "Contar histórias",
  "Liderança e debates",
] as const;

const MODALITIES = [
  "Aulas ao Domicílio (Luanda)",
  "Lista de Espera — Espaço Físico (Em Breve)",
] as const;

export const PlanConfiguratorSection: React.FC<PlanConfiguratorSectionProps> = ({
  config = DEFAULT_SITE_CONFIG,
}) => {
  const [ageGroup, setAgeGroup] = useState<string>(AGE_GROUPS[1]);
  const [selectedObjectives, setSelectedObjectives] = useState<string[]>([
    "Vencer a timidez",
    "Apresentações escolares",
  ]);
  const [modality, setModality] = useState<string>(MODALITIES[0]);
  const [guardianName, setGuardianName] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [copied, setCopied] = useState(false);

  const toggleObjective = (objective: string) => {
    setSelectedObjectives((prev) =>
      prev.includes(objective)
        ? prev.filter((item) => item !== objective)
        : [...prev, objective],
    );
  };

  const generatedMessage = useMemo(() => {
    const objectivesText =
      selectedObjectives.length > 0
        ? selectedObjectives.join(", ")
        : "Avaliação inicial para definir prioridades";

    const lines = [
      `Olá Ariel Gaspar! Gostaria de agendar uma aula diagnóstica da ${config.brandName}.`,
      `• Idade da criança: ${ageGroup}`,
      `• Objectivos: ${objectivesText}`,
      `• Modalidade: ${modality}`,
    ];

    const namePart = guardianName.trim();
    const zonePart = neighborhood.trim();
    if (namePart || zonePart) {
      const combined = [namePart, zonePart].filter(Boolean).join(" · ");
      lines.push(`• Encarregado / Zona: ${combined}`);
    }

    return lines.join("\n");
  }, [ageGroup, selectedObjectives, modality, guardianName, neighborhood, config.brandName]);

  const whatsappUrl = useMemo(
    () =>
      `https://wa.me/${config.whatsappDigits}?text=${encodeURIComponent(generatedMessage)}`,
    [generatedMessage, config.whatsappDigits],
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard fallback ignored silently if blocked by browser permissions
    }
  };

  return (
    <section
      id="montar-plano"
      className="bg-[#161618] text-white py-20 lg:py-24"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#F5B800] mb-3">
            SIMULADOR DE AULAS · PERSONALIZADO
          </p>
          <h2
            className="font-display font-extrabold tracking-tight text-white leading-tight text-balance mb-4"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
          >
            Monte o Treino de Oratória Ideal
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
            Seleccione o perfil e os objectivos do seu filho. Geramos
            automaticamente a mensagem pronta para enviar ao mentor Ariel Gaspar
            pelo WhatsApp.
          </p>
        </div>

        {/* 2-Column Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Configurator Choices */}
          <div className="lg:col-span-7 bg-[#1E1E22] border border-white/12 rounded-xl p-6 sm:p-8 space-y-7">
            {/* 1. Faixa Etária */}
            <div>
              <span className="block text-xs font-bold uppercase tracking-[0.12em] text-neutral-300 mb-3">
                1. Faixa Etária
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {AGE_GROUPS.map((item) => {
                  const active = ageGroup === item;
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setAgeGroup(item)}
                      aria-pressed={active}
                      className={`px-4 py-3 rounded-md text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer whitespace-nowrap text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B800] ${
                        active
                          ? "bg-[#F5B800] text-[#161618] font-bold"
                          : "bg-[#161618] text-neutral-300 border border-white/15 hover:border-white/35 hover:text-white"
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Objectivos Principais (Multi-select) */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="block text-xs font-bold uppercase tracking-[0.12em] text-neutral-300">
                  2. Objectivos Principais
                </span>
                <span className="text-[11px] text-neutral-400">
                  Seleccione um ou vários
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {OBJECTIVES.map((item) => {
                  const active = selectedObjectives.includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleObjective(item)}
                      aria-pressed={active}
                      className={`px-4 py-3 rounded-md text-xs sm:text-sm font-semibold text-left flex items-center justify-between gap-3 transition-all duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B800] ${
                        active
                          ? "bg-[#F5B800] text-[#161618] font-bold"
                          : "bg-[#161618] text-neutral-300 border border-white/15 hover:border-white/35 hover:text-white"
                      }`}
                    >
                      <span>{item}</span>
                      <span
                        className={`w-4 h-4 rounded-sm flex items-center justify-center shrink-0 border ${
                          active
                            ? "bg-[#161618] border-[#161618] text-[#F5B800]"
                            : "border-white/25"
                        }`}
                        aria-hidden="true"
                      >
                        {active && <Check className="w-3 h-3 stroke-[3]" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Modalidade Pretendida */}
            <div>
              <span className="block text-xs font-bold uppercase tracking-[0.12em] text-neutral-300 mb-3">
                3. Modalidade Pretendida
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {MODALITIES.map((item) => {
                  const active = modality === item;
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setModality(item)}
                      aria-pressed={active}
                      className={`px-4 py-3 rounded-md text-xs sm:text-sm font-semibold text-left transition-all duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B800] ${
                        active
                          ? "bg-[#F5B800] text-[#161618] font-bold"
                          : "bg-[#161618] text-neutral-300 border border-white/15 hover:border-white/35 hover:text-white"
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Campos de texto opcionais */}
            <div className="pt-2 border-t border-white/10">
              <span className="block text-xs font-bold uppercase tracking-[0.12em] text-neutral-300 mb-3">
                4. Dados Opcionais do Encarregado
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="plan-guardian"
                    className="block text-xs text-neutral-400 mb-1.5"
                  >
                    Nome do Encarregado
                  </label>
                  <input
                    id="plan-guardian"
                    type="text"
                    value={guardianName}
                    onChange={(e) => setGuardianName(e.target.value)}
                    placeholder="Ex: Maria Manuel"
                    className="w-full px-3.5 py-2.5 bg-[#161618] border border-white/15 rounded-md text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#F5B800] focus:ring-1 focus:ring-[#F5B800]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="plan-neighborhood"
                    className="block text-xs text-neutral-400 mb-1.5"
                  >
                    Bairro / Zona em Luanda
                  </label>
                  <input
                    id="plan-neighborhood"
                    type="text"
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    placeholder="Ex: Talatona, Kilamba, Maianga..."
                    className="w-full px-3.5 py-2.5 bg-[#161618] border border-white/15 rounded-md text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#F5B800] focus:ring-1 focus:ring-[#F5B800]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Message Preview & WhatsApp Action */}
          <div className="lg:col-span-5 bg-[#1E1E22] border border-white/15 rounded-xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-3 pb-4 mb-5 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-md bg-[#F5B800]/15 border border-[#F5B800]/30 flex items-center justify-center shrink-0">
                    <SlidersHorizontal
                      className="w-4 h-4 text-[#F5B800]"
                      aria-hidden="true"
                    />
                  </span>
                  <div>
                    <h3 className="font-display font-bold text-base text-white">
                      Pré-visualização do Pedido
                    </h3>
                    <p className="text-xs text-neutral-400">
                      Actualizada em tempo real
                    </p>
                  </div>
                </div>
              </div>

              {/* Message Preview Box */}
              <div className="bg-[#161618] border border-white/12 rounded-lg p-5 mb-6">
                <pre className="font-sans text-sm text-neutral-200 whitespace-pre-wrap leading-relaxed break-words">
                  {generatedMessage}
                </pre>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-4 text-sm font-bold text-[#161618] bg-[#F5B800] hover:bg-[#ffca28] active:scale-[0.99] rounded-md transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Enviar Pedido no WhatsApp ({config.phoneDisplay})</span>
              </a>

              <button
                type="button"
                onClick={handleCopy}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold text-neutral-300 hover:text-white border border-white/15 hover:border-white/35 rounded-md transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B800]"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-[#F5B800]" aria-hidden="true" />
                    <span className="text-[#F5B800]">
                      Texto da Mensagem Copiado!
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" aria-hidden="true" />
                    <span>Copiar Texto da Mensagem</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
