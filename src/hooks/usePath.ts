import type { languages } from "../i18n/ui";
import { getLocalesUrl, translate } from "../i18n/utils";

type RouteType = {
  href: string;
  sections?: string[];
};

const routes = [
  { href: "/", sections: ["#about-me", "#skills", "#projects", "#contact"] },
  { href: "/library" }
] as RouteType[];

export type RouteWithLabel = {
  href: string;
  label: string;
  sections?: { href: string; label: string }[];
};

const locals = getLocalesUrl();

export function usePath(
  url: URL,
  lang: keyof typeof languages
): { routes: RouteWithLabel[]; path: string } {
  const { pages: t } = translate(lang);

  const path = url.pathname.replace(`/${lang}`, "") || "/";
  const localPath = locals.find((local) => local.locale === lang)?.url;

  const routesWithLang = routes.map((route) => ({
    href: localPath + route.href,
    label: t[route.href as keyof typeof t].label,
    sections: route.sections?.map((section) => {
      const sectionName = section.split("#")[1];

      return {
        href: localPath + route.href + section,
        label:
          t[route.href as keyof typeof t].sections?.find(
            (s) => s.id === sectionName
          )?.label || sectionName.at(0)?.toUpperCase() + sectionName.slice(1)
      };
    })
  }));

  return { routes: routesWithLang, path };
}
