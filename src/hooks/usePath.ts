import type { languages } from "../i18n/ui";
import { getLocalesUrl, translate } from "../i18n/utils";

type RouteType = {
  href: string;
  childs?: string[];
};

const routes = [
  { href: "/", childs: ["#about-me", "#skills", "#projects", "#contact"] },
  { href: "/library", childs: ["/music", "/shows"] }
] satisfies RouteType[];

export type RouteWithLabel = {
  href: string;
  label: string;
  childs?: { href: string; label: string }[];
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
    childs: route.childs?.map((child) => {
      const childName = child.slice(1);

      return {
        href: localPath + route.href + child,
        label:
          t[route.href as keyof typeof t].childs?.find(
            (c) => c.id === childName
          )?.label || childName.at(0)?.toUpperCase() + childName.slice(1)
      };
    })
  }));

  return { routes: routesWithLang, path };
}
