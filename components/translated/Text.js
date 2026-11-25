"use client";
import { useLanguage } from "@/context/LanguageContext";
import { pick, translateText } from "@/lib/i18nData";

export function useLocalized() {
  const { lang, t } = useLanguage();

  const localize = (value) => {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      return pick(value, lang);
    }
    if (typeof value === "string") return translateText(value, lang);
    return value;
  };

  return { lang, t, localize };
}

export default function Text({ k, value, children }) {
  const { t, localize } = useLocalized();

  if (k) return <>{t(k)}</>;
  if (value != null) return <>{localize(value)}</>;
  return <>{localize(children)}</>;
}
