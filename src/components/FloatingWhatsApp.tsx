import React from "react";
import { MessageCircle } from "lucide-react";
import {
  DEFAULT_SITE_CONFIG,
  type SiteContactConfig,
} from "../config/siteConfig";

interface FloatingWhatsAppProps {
  config?: SiteContactConfig;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  config = DEFAULT_SITE_CONFIG,
}) => {
  const href = `https://wa.me/${config.whatsappDigits}?text=${encodeURIComponent(
    `Olá Ariel! Visitei o website da ${config.brandName} e gostaria de saber mais sobre as aulas ao domicílio em Luanda.`,
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com Ariel Gaspar no WhatsApp"
      className="fixed bottom-20 right-5 z-40 inline-flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#161618] text-white border-2 border-[#F5B800] shadow-lg hover:bg-[#F5B800] hover:text-[#161618] transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B800]"
    >
      <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
      <span className="hidden sm:inline text-xs font-bold tracking-wide whitespace-nowrap">
        WhatsApp
      </span>
    </a>
  );
};
