import { useEffect, useState } from "react";

export interface SiteContactConfig {
  brandName: string;
  phoneDisplay: string;
  whatsappDigits: string;
  email: string;
  instagramHandle: string;
  instagramUrl: string;
  location: string;
}

export const DEFAULT_SITE_CONFIG: SiteContactConfig = {
  brandName: "ORAKIDS",
  phoneDisplay: "+244 936 192 874",
  whatsappDigits: "244936192874",
  email: "orakids@gmail.com",
  instagramHandle: "@orakids",
  instagramUrl: "https://instagram.com/orakids",
  location: "Luanda, Angola",
};

function parseCsvRows(csvText: string): Record<string, string> {
  const map: Record<string, string> = {};
  const lines = csvText.split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // Support both comma and semicolon CSV delimiters with quoted cells
    const match = trimmed.match(/^"?([^",;]+)"?\s*[,;]\s*"?([^"]*)"?$/);
    if (match) {
      const key = match[1].trim().toLowerCase();
      const value = match[2].trim();
      if (key && value) {
        map[key] = value;
      }
    }
  }

  return map;
}

export function useSiteConfig(): SiteContactConfig {
  const [config, setConfig] = useState<SiteContactConfig>(DEFAULT_SITE_CONFIG);

  useEffect(() => {
    const sheetCsvUrl = import.meta.env.VITE_GOOGLE_SHEET_CSV_URL as
      | string
      | undefined;

    if (!sheetCsvUrl) {
      return;
    }

    let cancelled = false;

    fetch(sheetCsvUrl)
      .then((res) => (res.ok ? res.text() : Promise.reject(new Error("Sheet unavailable"))))
      .then((csv) => {
        if (cancelled) return;
        const rows = parseCsvRows(csv);

        const rawPhone = rows["telefone"] || rows["whatsapp"] || rows["phone"];
        const digits = rawPhone ? rawPhone.replace(/\D/g, "") : "";
        const rawInstagram = rows["instagram"];
        const normalizedIgHandle = rawInstagram
          ? rawInstagram.startsWith("@")
            ? rawInstagram
            : `@${rawInstagram.replace(/^https?:\/\/(www\.)?instagram\.com\//i, "").replace(/\/$/, "")}`
          : DEFAULT_SITE_CONFIG.instagramHandle;

        const normalizedIgUrl = rawInstagram?.startsWith("http")
          ? rawInstagram
          : `https://instagram.com/${normalizedIgHandle.replace(/^@/, "")}`;

        setConfig({
          brandName: rows["marca"] || rows["brand"] || DEFAULT_SITE_CONFIG.brandName,
          phoneDisplay: rawPhone || DEFAULT_SITE_CONFIG.phoneDisplay,
          whatsappDigits: digits || DEFAULT_SITE_CONFIG.whatsappDigits,
          email: rows["email"] || DEFAULT_SITE_CONFIG.email,
          instagramHandle: normalizedIgHandle,
          instagramUrl: normalizedIgUrl,
          location: rows["localizacao"] || rows["localização"] || rows["location"] || DEFAULT_SITE_CONFIG.location,
        });
      })
      .catch(() => {
        // Keep reliable fallback defaults when offline or unconfigured
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return config;
}
