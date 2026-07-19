"use client";
import { useLanguage } from "./context";
import { getTranslation, type TranslationKey, type Locale } from "./translations";

export function useTranslation() {
  const { locale } = useLanguage();
  
  const t = (key: TranslationKey): string => {
    return getTranslation(locale as Locale, key);
  };

  return { t, locale };
}
