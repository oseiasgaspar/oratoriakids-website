import React, { useState } from "react";
import {
  Sparkles,
  Clock,
  HelpCircle,
  MessageCircle,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

const AGE_GROUPS = ["6 a 8 anos", "9 a 11 anos", "12 a 15 anos"] as const;
const GOALS = [
  "Vencer a timidez",
  "Apresentação escolar",
  "Contar histórias",
  "Pensamento rápido/Debate",
] as const;

interface GeneratedChallenge {
  title: string;
  theme: string;
  duration: string;
  steps: string[];
  tips: string[];
  surpriseQuestion: string;
}

export const ChallengeGeneratorSection: React.FC = () => {
  const [ageGroup, setAgeGroup] = useState<string>(AGE_GROUPS[1]);
  const [goal, setGoal] = useState<string>(GOALS[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [challenge, setChallenge] = useState<GeneratedChallenge | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/challenge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ageGroup, goal }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Não foi possível gerar o exercício neste momento. Tente novamente.",
        );
      }

      setChallenge(data as GeneratedChallenge);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Erro de ligação ao gerar o desafio. Por favor, tente novamente.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const buildWhatsAppLink = () => {
    const baseText = challenge
      ? `Olá Ariel! Acabámos de experimentar o Desafio IA da Oratória Kids em casa.\n\n• Faixa etária: ${ageGroup}\n• Objectivo: ${goal}\n• Desafio praticado: "${challenge.title}"\n\nGostaria de agendar uma aula de avaliação ao domicílio em Luanda.`
      : `Olá Ariel! Gostaria de agendar uma aula de Oratória Kids (${ageGroup} · ${goal}).`;
    return `https://wa.me/244936192874?text=${encodeURIComponent(baseText)}`;
  };

  return (
    <section
      id="desafio-ia"
      className="bg-[#161618] text-white py-20 lg:py-24"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#F5B800] mb-3">
            Ferramenta Interactiva · Prática em Família
          </p>
          <h2
            className="font-display font-extrabold tracking-tight text-white leading-tight text-balance mb-4"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
          >
            Gerador de Desafios de Oratória em Família
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
            Escolha a idade do seu filho e o objectivo que quer trabalhar hoje.
            Em segundos, criamos um exercício divertido de 5 minutos para
            praticarem juntos na sala de estar.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Configuration Panel */}
          <div className="lg:col-span-5 bg-[#1E1E22] border border-white/12 rounded-xl p-6 sm:p-8">
            <div className="space-y-7">
              {/* Age Group Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.12em] text-neutral-300 mb-3">
                  1. Faixa Etária
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {AGE_GROUPS.map((item) => {
                    const active = ageGroup === item;
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setAgeGroup(item)}
                        className={`px-3 py-2.5 rounded-md text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer whitespace-nowrap text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B800] ${
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

              {/* Goal Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.12em] text-neutral-300 mb-3">
                  2. Objectivo Principal
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {GOALS.map((item) => {
                    const active = goal === item;
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setGoal(item)}
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

              {/* Generate CTA */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 text-sm sm:text-base font-bold text-[#161618] bg-[#F5B800] hover:bg-[#ffca28] disabled:opacity-65 disabled:cursor-wait rounded-md transition-all duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin shrink-0" />
                      <span>A preparar exercício personalizado...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 shrink-0" />
                      <span>
                        {challenge
                          ? "Gerar Novo Desafio"
                          : "Gerar Desafio de 5 Minutos"}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Result Card */}
          <div className="lg:col-span-7">
            {error && (
              <div
                role="alert"
                className="bg-[#231919] border border-red-400/40 rounded-xl p-6 sm:p-8 text-white"
              >
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-display font-bold text-lg text-white">
                      Não foi possível gerar o desafio
                    </h3>
                    <p className="text-sm text-neutral-300 mt-1.5 leading-relaxed">
                      {error}
                    </p>
                    <button
                      type="button"
                      onClick={handleGenerate}
                      className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-[#161618] bg-[#F5B800] hover:bg-[#ffca28] rounded-md transition-colors cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Tentar novamente</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {!error && !challenge && !loading && (
              <div className="bg-[#1E1E22] border border-dashed border-white/20 rounded-xl p-8 sm:p-10 flex flex-col justify-center min-h-[340px]">
                <div className="flex items-center gap-2 mb-4" aria-hidden="true">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F5B800]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F5B800]/65" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F5B800]/35" />
                </div>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-3">
                  O exercício da sua família aparece aqui
                </h3>
                <p className="text-sm sm:text-base text-neutral-400 leading-relaxed max-w-lg mb-6">
                  Selecione ao lado a faixa etária ({ageGroup}) e o objectivo ({goal}) e clique em{" "}
                  <strong className="text-white font-semibold">
                    “Gerar Desafio de 5 Minutos”
                  </strong>{" "}
                  para receber na hora um tema criativo, 3 dicas de postura e voz e uma pergunta-surpresa.
                </p>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-neutral-400">
                  <span>1 Tema Criativo</span>
                  <span aria-hidden="true">·</span>
                  <span>3 Dicas de Postura e Voz</span>
                  <span aria-hidden="true">·</span>
                  <span>1 Pergunta-Surpresa</span>
                </div>
              </div>
            )}

            {!error && loading && (
              <div
                aria-busy="true"
                className="bg-[#1E1E22] border border-white/15 rounded-xl p-8 sm:p-10 min-h-[340px] flex flex-col justify-center"
              >
                <div className="flex items-center gap-3 text-[#F5B800] mb-4">
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span className="text-sm font-bold uppercase tracking-wider">
                    A criar desafio para {ageGroup}
                  </span>
                </div>
                <div className="space-y-3 animate-pulse">
                  <div className="h-6 bg-white/10 rounded w-2/3" />
                  <div className="h-4 bg-white/10 rounded w-full" />
                  <div className="h-4 bg-white/10 rounded w-5/6" />
                  <div className="h-24 bg-white/5 rounded mt-4" />
                </div>
              </div>
            )}

            {!error && !loading && challenge && (
              <div className="bg-white text-[#161618] rounded-xl p-6 sm:p-9 border border-white">
                {/* Result Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-6 border-b border-neutral-200">
                  <div className="flex items-center gap-2 text-xs font-semibold text-neutral-600">
                    <span>{ageGroup}</span>
                    <span aria-hidden="true">·</span>
                    <span>{goal}</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#161618] bg-[#F5B800]/25 px-2.5 py-1 rounded-sm tabular-nums">
                    <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{challenge.duration}</span>
                  </div>
                </div>

                <h3 className="font-display font-extrabold text-2xl text-[#161618] mb-3">
                  {challenge.title}
                </h3>
                <p className="text-sm sm:text-base text-neutral-700 leading-relaxed mb-7">
                  {challenge.theme}
                </p>

                {/* Steps & Tips Split */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-7">
                  <div>
                    <h4 className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#161618] mb-3">
                      Como praticar em casa
                    </h4>
                    <ol className="space-y-2.5">
                      {challenge.steps.map((step, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-sm text-neutral-700 leading-relaxed"
                        >
                          <span className="font-display font-extrabold text-xs text-[#161618] bg-[#F5B800] w-5 h-5 rounded-sm flex items-center justify-center shrink-0 mt-0.5 tabular-nums">
                            {i + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div>
                    <h4 className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#161618] mb-3">
                      3 Dicas de Postura e Voz
                    </h4>
                    <ul className="space-y-2.5">
                      {challenge.tips.map((tip, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-sm text-neutral-700 leading-relaxed"
                        >
                          <CheckCircle2
                            className="w-4 h-4 text-[#161618] shrink-0 mt-1"
                            aria-hidden="true"
                          />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Surprise Question */}
                <div className="bg-[#F6F6F8] border border-neutral-200 rounded-lg p-4 sm:p-5 mb-7">
                  <div className="flex items-start gap-3">
                    <HelpCircle
                      className="w-5 h-5 text-[#161618] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#161618] mb-1">
                        Pergunta-Surpresa (Improviso)
                      </p>
                      <p className="text-sm sm:text-base font-semibold text-[#161618] leading-snug">
                        “{challenge.surpriseQuestion}”
                      </p>
                    </div>
                  </div>
                </div>

                {/* Result Actions */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <a
                    href={buildWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-bold text-[#161618] bg-[#F5B800] hover:bg-[#ffca28] rounded-md transition-colors whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#161618]"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" />
                    <span>Agendar Aula com Ariel</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleGenerate}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-[#161618] border border-neutral-300 hover:border-[#161618] rounded-md transition-colors whitespace-nowrap cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#161618]"
                  >
                    <RefreshCw className="w-4 h-4 shrink-0" />
                    <span>Gerar Outro</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
