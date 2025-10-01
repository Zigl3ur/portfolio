import { ui, defaultLang, type uiLangSchema, languages } from "./ui";

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in languages) return lang as keyof typeof languages;
  return defaultLang;
}

export function getLocalesUrl() {
  const locales = Object.keys(languages) as (keyof typeof languages)[];

  return locales.map((l) => {
    return {
      locale: l,
      label: languages[l],
      url: defaultLang === l ? "/" : `/${l}/`
    };
  });
}

export function translate(lang: keyof typeof languages) {
  return ui[lang] as uiLangSchema;
}
