import type { languages } from "../i18n/ui";
import { getLocalesUrl, translate } from "../i18n/utils";

type RouteType = {
  href: string;
  isPlaceholder?: boolean; // if route is not a real one but needed to route childs ones
  childs?: string[];
};

const routes = [
  {
    href: "/",
    childs: ["#landing", "#about-me", "#skills", "#projects", "#contact"]
  },
  {
    href: "/library",
    isPlaceholder: true,
    childs: ["/music", "/shows"]
  }
] satisfies RouteType[];

export type RouteWithLabel = {
  href?: string;
  label: string;
  childs?: { href: string; label: string }[];
};

const locals = getLocalesUrl();

export function usePath(
  url: URL,
  lang: keyof typeof languages
): { routes: RouteWithLabel[]; path: string } {
  const { pages: t } = translate(lang);

  const localPath = locals.find((local) => local.locale === lang)?.url;

  const routesWithLang = routes.map((route) => ({
    href: !route.isPlaceholder ? localPath + route.href : undefined,
    label: t[route.href as keyof typeof t].label,
    childs: route.childs?.map((child) => {
      const childName = child.slice(1);
      return {
        href: localPath + route.href + child,
        label:
          t[route.href as keyof typeof t].childs?.find((c) => c.href === child)
            ?.label || childName.at(0)?.toUpperCase() + childName.slice(1)
      };
    })
  }));

  return { routes: routesWithLang, path: url.pathname + url.hash };
}
