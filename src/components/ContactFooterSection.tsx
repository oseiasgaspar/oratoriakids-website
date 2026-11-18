import React, { useState } from "react";
import {
  Phone,
  Mail,
  Instagram,
  MapPin,
  Send,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";
import { OratoriaLogo } from "./OratoriaLogo";
import type { ModalityOption } from "./ModalidadesSection";

interface ContactFooterSectionProps {
  selectedModality: ModalityOption;
  onModalityChange: (modality: ModalityOption) => void;
}

const LUANDA_ZONES = [
  "Talatona",
  "Miramar",
  "Maianga",
  "Alvalade",
  "Kilamba",
  "Nova Vida",
];

export const ContactFooterSection: React.FC<ContactFooterSectionProps> = ({
  selectedModality,
  onModalityChange,
}) => {
  const [guardianName, setGuardianName] = useState("");
  const [childInfo, setChildInfo] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [submittedWhatsAppUrl, setSubmittedWhatsAppUrl] = useState<string | null>(
    null,
  );
  const [submittedMessage, setSubmittedMessage] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const gName = guardianName.trim();
    const cInfo = childInfo.trim();
    const zone = neighborhood.trim();

    if (gName.length < 2) {
      setFormError("Por favor, indique o nome do encarregado de educação.");
      return;
    }
    if (cInfo.length < 2) {
      setFormError("Por favor, indique o nome e a idade da criança.");
      return;
    }
    if (zone.length < 2) {
      setFormError("Por favor, indique a zona ou bairro em Luanda.");
      return;
    }

    const modalityText =
      selectedModality === "Domicílio"
        ? "Aulas ao Domicílio"
        : "Espaço Oratória Kids (Lista VIP)";

    const message = `Olá Ariel Gaspar! Gostaria de solicitar um agendamento na Oratória Kids.\n\n• Encarregado(a): ${gName}\n• Criança e Idade: ${cInfo}\n• Zona/Bairro em Luanda: ${zone}\n• Modalidade pretendida: ${modalityText}`;
    const whatsappUrl = `https://wa.me/244936192874?text=${encodeURIComponent(
      message,
    )}`;

    setSubmittedMessage(message);
    setSubmittedWhatsAppUrl(whatsappUrl);

    // Safe programmatic navigation link for new tab
    const anchor = document.createElement("a");
    anchor.href = whatsappUrl;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const handleCopyMessage = async () => {
    if (!submittedMessage) return;
    try {
      await navigator.clipboard.writeText(submittedMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback ignored silently if clipboard API is restricted
    }
  };

  return (
    <footer className="bg-white text-[#161618]">
      {/* Exact 5px straight horizontal yellow-gold transition rule (no curves) */}
      <div className="h-[5px] w-full bg-[#F5B800]" />

      {/* Main Contact & Quick Booking Section */}
      <div
        id="agendamento"
        className="max-w-[1200px] mx-auto px-5 sm:px-8 py-20 lg:py-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left: Headline & Official Contacts */}
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#161618]/65 mb-3">
              Contacto & Agendamento · Luanda
            </p>
            <h2
              className="font-display font-extrabold tracking-tight text-[#161618] leading-tight text-balance mb-5"
              style={{ fontSize: "clamp(2rem, 3.4vw, 2.75rem)" }}
            >
              Prepare a voz do futuro!
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed mb-9">
              Dê o primeiro passo hoje. Preencha o formulário ao lado ou fale
              directamente connosco por WhatsApp para marcar a avaliação inicial
              ao domicílio em Luanda.
            </p>

            <div className="space-y-4 pt-6 border-t border-neutral-200">
              <a
                href="https://wa.me/244936192874"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group py-1.5"
              >
                <span className="w-10 h-10 rounded-md bg-[#F6F6F8] border border-neutral-200 group-hover:border-[#F5B800] group-hover:bg-[#F5B800] flex items-center justify-center transition-colors shrink-0">
                  <Phone className="w-4 h-4 text-[#161618]" aria-hidden="true" />
                </span>
                <div>
                  <span className="block text-xs text-neutral-500">
                    WhatsApp / Telefone
                  </span>
                  <span className="font-display font-bold text-base text-[#161618] tabular-nums group-hover:underline">
                    +244 936 192 874
                  </span>
                </div>
              </a>

              <a
                href="mailto:oratoriakids@gmail.com"
                className="flex items-center gap-4 group py-1.5"
              >
                <span className="w-10 h-10 rounded-md bg-[#F6F6F8] border border-neutral-200 group-hover:border-[#F5B800] group-hover:bg-[#F5B800] flex items-center justify-center transition-colors shrink-0">
                  <Mail className="w-4 h-4 text-[#161618]" aria-hidden="true" />
                </span>
                <div>
                  <span className="block text-xs text-neutral-500">Email</span>
                  <span className="font-display font-bold text-base text-[#161618] group-hover:underline">
                    oratoriakids@gmail.com
                  </span>
                </div>
              </a>

              <a
                href="https://instagram.com/oratoriakids"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group py-1.5"
              >
                <span className="w-10 h-10 rounded-md bg-[#F6F6F8] border border-neutral-200 group-hover:border-[#F5B800] group-hover:bg-[#F5B800] flex items-center justify-center transition-colors shrink-0">
                  <Instagram
                    className="w-4 h-4 text-[#161618]"
                    aria-hidden="true"
                  />
                </span>
                <div>
                  <span className="block text-xs text-neutral-500">
                    Instagram
                  </span>
                  <span className="font-display font-bold text-base text-[#161618] group-hover:underline">
                    @oratoriakids
                  </span>
                </div>
              </a>

              <div className="flex items-center gap-4 py-1.5">
                <span className="w-10 h-10 rounded-md bg-[#F6F6F8] border border-neutral-200 flex items-center justify-center shrink-0">
                  <MapPin
                    className="w-4 h-4 text-[#161618]"
                    aria-hidden="true"
                  />
                </span>
                <div>
                  <span className="block text-xs text-neutral-500">
                    Localização
                  </span>
                  <span className="font-display font-bold text-base text-[#161618]">
                    Luanda, Angola
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Quick Scheduling Form */}
          <div className="lg:col-span-7 bg-[#F6F6F8] border border-neutral-200 rounded-xl p-6 sm:p-9">
            <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[#161618] mb-2">
              Agendamento Rápido
            </h3>
            <p className="text-sm text-neutral-600 mb-6">
              Envie os dados básicos para receber confirmação de horários
              disponíveis na sua zona.
            </p>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div>
                <label
                  htmlFor="guardian-name"
                  className="block text-xs font-bold uppercase tracking-[0.08em] text-[#161618] mb-2"
                >
                  Nome do Encarregado
                </label>
                <input
                  id="guardian-name"
                  type="text"
                  value={guardianName}
                  onChange={(e) => setGuardianName(e.target.value)}
                  placeholder="Ex: Maria Manuel"
                  required
                  className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-md text-sm text-[#161618] placeholder:text-neutral-400 focus:outline-none focus:border-[#161618] focus:ring-2 focus:ring-[#F5B800]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="child-info"
                    className="block text-xs font-bold uppercase tracking-[0.08em] text-[#161618] mb-2"
                  >
                    Nome e Idade da Criança
                  </label>
                  <input
                    id="child-info"
                    type="text"
                    value={childInfo}
                    onChange={(e) => setChildInfo(e.target.value)}
                    placeholder="Ex: Lucas, 10 anos"
                    required
                    className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-md text-sm text-[#161618] placeholder:text-neutral-400 focus:outline-none focus:border-[#161618] focus:ring-2 focus:ring-[#F5B800]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="luanda-zone"
                    className="block text-xs font-bold uppercase tracking-[0.08em] text-[#161618] mb-2"
                  >
                    Zona / Bairro em Luanda
                  </label>
                  <input
                    id="luanda-zone"
                    type="text"
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    placeholder="Ex: Talatona, Miramar, Maianga..."
                    required
                    className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-md text-sm text-[#161618] placeholder:text-neutral-400 focus:outline-none focus:border-[#161618] focus:ring-2 focus:ring-[#F5B800]"
                  />
                </div>
              </div>

              {/* Quick neighborhood selectors */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-neutral-500 mr-1">
                  Sugestões:
                </span>
                {LUANDA_ZONES.map((zone) => (
                  <button
                    key={zone}
                    type="button"
                    onClick={() => setNeighborhood(zone)}
                    className={`px-2.5 py-1 text-xs font-medium rounded-sm border transition-colors cursor-pointer ${
                      neighborhood === zone
                        ? "bg-[#161618] text-white border-[#161618]"
                        : "bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400"
                    }`}
                  >
                    {zone}
                  </button>
                ))}
              </div>

              {/* Modality Toggle */}
              <div>
                <span className="block text-xs font-bold uppercase tracking-[0.08em] text-[#161618] mb-2">
                  Modalidade
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(["Domicílio", "Lista VIP Espaço"] as ModalityOption[]).map(
                    (option) => {
                      const active = selectedModality === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => onModalityChange(option)}
                          className={`px-4 py-3 rounded-md text-sm font-bold text-left border transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B800] ${
                            active
                              ? "bg-[#161618] text-white border-[#161618]"
                              : "bg-white text-[#161618] border-neutral-300 hover:border-[#161618]"
                          }`}
                        >
                          {option === "Domicílio"
                            ? "Aulas ao Domicílio"
                            : "Lista VIP Espaço"}
                        </button>
                      );
                    },
                  )}
                </div>
              </div>

              {formError && (
                <p
                  role="alert"
                  className="text-xs sm:text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-md px-4 py-2.5"
                >
                  {formError}
                </p>
              )}

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 text-sm sm:text-base font-bold text-[#161618] bg-[#F5B800] hover:bg-[#ffca28] active:scale-[0.99] rounded-md transition-all duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#161618]"
              >
                <Send className="w-4 h-4 shrink-0" />
                <span>Enviar Agendamento para WhatsApp</span>
              </button>
            </form>

            {submittedWhatsAppUrl && (
              <div className="mt-6 bg-white border border-neutral-200 rounded-lg p-5">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-[#161618]">
                      Pedido preparado para envio!
                    </p>
                    <p className="text-xs text-neutral-600 mt-1">
                      Se a janela do WhatsApp não abriu automaticamente, utilize
                      o botão abaixo ou copie a mensagem formatada.
                    </p>
                    <div className="flex flex-wrap items-center gap-3 mt-3">
                      <a
                        href={submittedWhatsAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-[#161618] bg-[#F5B800] hover:bg-[#ffca28] rounded-md transition-colors"
                      >
                        <span>Abrir WhatsApp (+244 936 192 874)</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        type="button"
                        onClick={handleCopyMessage}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#161618] border border-neutral-300 hover:border-[#161618] rounded-md transition-colors cursor-pointer"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-700" />
                            <span>Copiado</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copiar Mensagem</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Dark Footer Bar */}
      <div className="bg-[#161618] text-white border-t border-white/10">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <OratoriaLogo variant="footer" />
            <p className="text-xs text-neutral-400">
              Luanda, Angola
            </p>
          </div>

          <nav
            aria-label="Links do rodapé"
            className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-neutral-300"
          >
            <a href="#inicio" className="hover:text-[#F5B800] transition-colors">
              Início
            </a>
            <a
              href="#competencias"
              className="hover:text-[#F5B800] transition-colors"
            >
              Competências
            </a>
            <a
              href="#modalidades"
              className="hover:text-[#F5B800] transition-colors"
            >
              Modalidades
            </a>
            <a href="#mentor" className="hover:text-[#F5B800] transition-colors">
              O Mentor
            </a>
            <a
              href="#montar-plano"
              className="hover:text-[#F5B800] transition-colors"
            >
              Montar Plano
            </a>
          </nav>

          <p className="text-xs text-neutral-400">
            © {new Date().getFullYear()} Oratória Kids. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
