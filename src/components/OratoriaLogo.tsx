import React from "react";
import logoOkImg from "../assets/logo-oratoria-ok.png";

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
      <div className={`inline-flex flex-col items-start select-none ${className}`}>
        <div className="flex flex-col items-center">
          <img
            src={logoOkImg}
            alt=""
            aria-hidden="true"
            className="h-14 w-auto object-contain mb-2.5"
          />
          <span className="font-display font-extrabold text-[26px] leading-none tracking-[0.08em] uppercase">
            <span className="text-white">ORA</span>
            <span className="text-[#F5B800]">KIDS</span>
          </span>
          <span className="mt-2 text-[10px] font-semibold tracking-[0.18em] text-neutral-200 uppercase whitespace-nowrap">
            COMUNICAÇÃO <span className="text-[#F5B800]">·</span> CONFIANÇA{" "}
            <span className="text-[#F5B800]">·</span> LIDERANÇA
          </span>
        </div>
      </div>
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
      <span className="font-display font-extrabold text-xl sm:text-[22px] leading-none tracking-[0.06em] uppercase">
        <span className="text-white">ORA</span>
        <span className="text-[#F5B800]">KIDS</span>
      </span>
    </span>
  );
};
