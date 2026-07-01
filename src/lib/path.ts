import type { languages } from "../i18n/ui";
import { getLocalesUrl, translate } from "../i18n/utils";

type RouteChild =
  | string
  | {
      href: string;
      activeHrefs?: string[];
    };

type RouteType = {
  href: string;
  isPlaceholder?: boolean; // if route is not a real one but needed to route childs ones
  childs?: RouteChild[];
};

const routesList = [
  {
    href: "/",
    childs: [
      { href: "#landing", activeHrefs: ["/"] },
      "#about-me",
      "#skills",
      "#projects",
      "#contact"
    ]
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
  childs?: { href: string; label: string; activeHrefs?: string[] }[];
};

const locals = getLocalesUrl();

export function joinPath(localeUrl: string, path: string) {
  if (localeUrl && path.startsWith("/#")) return `${localeUrl}${path.slice(1)}`;

  return `${localeUrl}${path}`;
}

export function routes(
  url: URL,
  lang: keyof typeof languages
): { routesList: RouteWithLabel[] } {
  const { pages: t } = translate(lang);

  const localPath = locals.find((local) => local.locale === lang)?.url;

  const routesWithLang = routesList.map((route) => ({
    href: !route.isPlaceholder ? localPath + route.href : undefined,
    label: t[route.href as keyof typeof t].label,
    childs: route.childs?.map((child) => {
      const childHref = typeof child === "string" ? child : child.href;
      const childName = childHref.slice(1);
      return {
        href: joinPath(localPath || "", route.href + childHref),
        label:
          t[route.href as keyof typeof t].childs?.find(
            (c) => c.href === childHref
          )?.label || childName.at(0)?.toUpperCase() + childName.slice(1),
        activeHrefs:
          typeof child === "string"
            ? undefined
            : child.activeHrefs?.map((href) => localPath + href)
      };
    })
  }));

  return { routesList: routesWithLang };
}

export function getPathWithoutLocale(
  path: string,
  locale: keyof typeof languages
) {
  const localePrefix = `/${locale}`;

  if (path === localePrefix) return "/";

  if (
    path.startsWith(`${localePrefix}/`) ||
    path.startsWith(`${localePrefix}#`)
  ) {
    const pathWithoutLocale = path.slice(localePrefix.length);
    return pathWithoutLocale.startsWith("#")
      ? `/${pathWithoutLocale}`
      : pathWithoutLocale;
  }

  return path || "/";
}

export function isActivePath(
  href: string,
  currentPath: string,
  locale: keyof typeof languages,
  activeHrefs: string[] = []
) {
  const hrefWithoutLocale = getPathWithoutLocale(href, locale);
  const currentPathWithoutLocale = getPathWithoutLocale(currentPath, locale);

  return [
    hrefWithoutLocale,
    ...activeHrefs.map((href) => getPathWithoutLocale(href, locale))
  ].includes(currentPathWithoutLocale);
}
