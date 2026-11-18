import React from "react";
import logoOkImg from "../assets/logo-oratoria-ok.png";
import logoWordmarkImg from "../assets/logo-oratoria-wordmark.png";
import logoFullImg from "../assets/logo-oratoria-full.png";

interface OratoriaLogoProps {
  variant?: "header" | "footer";
  className?: string;
}

export const OratoriaLogo: React.FC<OratoriaLogoProps> = ({
  variant = "header",
  className = "",
}) => {
  if (variant === "footer") {
    return (
      <span className={`inline-flex items-center select-none ${className}`}>
        <img
          src={logoFullImg}
          alt="Oratória Kids — Comunicação · Confiança · Liderança"
          className="h-24 w-auto object-contain"
        />
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-3 select-none whitespace-nowrap shrink-0 ${className}`}
    >
      <img
        src={logoOkImg}
        alt=""
        aria-hidden="true"
        className="h-9 sm:h-10 w-auto object-contain shrink-0"
      />
      <img
        src={logoWordmarkImg}
        alt="Oratória Kids"
        className="h-4 sm:h-[18px] w-auto object-contain shrink-0"
      />
    </span>
  );
};
