import { useEffect, useState } from "react";
import {
  getPathWithoutLocale,
  isActivePath,
  joinPath,
  type RouteWithLabel
} from "../lib/path";
import type { languages } from "../i18n/ui";
import type { LangProps } from "../types";
import {
  NavigationMenuContent,
  NavigationMenuList,
  NavigationMenuPortal,
  NavigationMenuRoot,
  NavigationMenuTrigger,
  NavigationMenuItem,
  NavigationMenuIndicator,
  NavigationMenuLink
} from "./ui/NavigationMenu";
import ActiveDot from "./ui/Utils";
import type { getLocalesUrl } from "../i18n/utils";
import { PopoverTrigger } from "./ui/Popover";
import { PopoverContent } from "./ui/Popover";
import { TabsTrigger, TabsContent, TabsRoot, TabsList } from "./ui/Tabs";
import { Popover } from "@base-ui/react";
import ChevronDownIcon from "../icons/chevron-down.svg?react";

interface RouteNavDropdownProps {
  routes: NonNullable<RouteWithLabel[]>;
  t: LangProps<"pages">["t"];
  locale: keyof typeof languages;
  langs: { locale: keyof typeof languages; label: string; url: string }[];
  path: string;
  className?: string;
}

export function MenuNavigatorDesktop({
  routes,
  t,
  locale,
  langs,
  path
}: RouteNavDropdownProps) {
  const actualPath = window.location.pathname + window.location.hash;
  const pathWithoutLocale = getPathWithoutLocale(actualPath, locale);
  const pagePathWithoutLocale = getPathWithoutLocale(path, locale);

  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setValue(null);
    document.addEventListener("scroll", handleScroll);

    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <NavigationMenuRoot value={value} onValueChange={setValue}>
      <NavigationMenuList>
        <NavigationMenuItem value="lang">
          <NavigationMenuTrigger className="font-mono text-sm">
            {locale.toUpperCase()}
          </NavigationMenuTrigger>
          <NavigationMenuContent className="flex flex-col gap-1">
            {langs.map((l) => (
              <NavigationMenuLink
                active={l.locale === locale}
                closeOnClick
                href={joinPath(l.url, pathWithoutLocale)}
                key={l.locale}
                className="group flex items-center justify-between text-sm transition-opacity duration-200 hover:opacity-70"
              >
                <span className="inline-flex items-center gap-1">
                  <h3>{l.locale.toUpperCase()}</h3>
                  <span className="mx-1">-</span>
                  <span>{l.label}</span>
                </span>
                <ActiveDot className="opacity-0 group-data-active:opacity-100" />
              </NavigationMenuLink>
            ))}
          </NavigationMenuContent>
        </NavigationMenuItem>

        <span className="border-gray h-6 w-px border border-dashed"></span>

        {routes.map((route) => {
          const pathT = t[pagePathWithoutLocale as keyof typeof t];

          return (
            <NavigationMenuItem
              key={route.href ?? route.label}
              className="font-mono text-sm"
            >
              {route.childs ? (
                <>
                  <NavigationMenuTrigger>
                    {pathT?.childs?.find((c) => c.href === route.href)?.label ||
                      route.label.at(0)?.toUpperCase() + route.label.slice(1)}
                    {route.childs && <NavigationMenuIndicator />}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="flex flex-col gap-1">
                    {route.childs?.map((child) => (
                      <NavigationMenuLink
                        active={isActivePath(child.href, actualPath, locale)}
                        closeOnClick
                        href={child.href}
                        key={child.href}
                        className="group flex items-center justify-between text-sm transition-opacity duration-200 hover:opacity-70"
                      >
                        {pathT?.childs?.find((c) => c.href === child.href)
                          ?.label ||
                          child.label.at(0)?.toUpperCase() +
                            child.label.slice(1)}
                        <ActiveDot className="opacity-0 group-data-active:opacity-100" />
                      </NavigationMenuLink>
                    ))}
                  </NavigationMenuContent>
                </>
              ) : (
                <NavigationMenuLink
                  href={route.href}
                  active={isActivePath(
                    route.href || pathWithoutLocale,
                    actualPath,
                    locale
                  )}
                >
                  {pathT?.label ||
                    route.label.at(0)?.toUpperCase() + route.label.slice(1)}
                </NavigationMenuLink>
              )}
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
      <NavigationMenuPortal
        align="start"
        alignOffset={value === "lang" ? -5 : 0}
      />
    </NavigationMenuRoot>
  );
}

interface MenuNavigatorDesktopSkeletonProps {
  local: keyof typeof languages;
  routes: RouteWithLabel[];
}

export function MenuNavigatorDesktopSkeleton({
  local,
  routes
}: MenuNavigatorDesktopSkeletonProps) {
  const triggerStyle =
    "flex h-full items-center px-2 py-1 font-mono text-sm select-none";

  return (
    <div className="flex items-center gap-1">
      <div className={triggerStyle}>{local.toUpperCase()}</div>

      <span className="border-gray h-6 w-px border border-dashed"></span>

      {routes.map((route, index) => (
        <div key={index} className={triggerStyle}>
          <span className="text-sm">{route.label}</span>
          {route.childs && (
            <ChevronDownIcon className="ml-1 size-3 shrink-0 text-white/50" />
          )}
        </div>
      ))}
    </div>
  );
}

interface NavMenuProps {
  routes: RouteWithLabel[];
  langs: ReturnType<typeof getLocalesUrl>;
  locale: keyof typeof languages;
  t: LangProps<"header">["t"];
}

export function MenuNavigatorMobile({
  routes,
  locale,
  langs,
  t
}: NavMenuProps) {
  const [open, setOpen] = useState(false);

  const path = window.location.pathname + window.location.hash;
  const pathWithoutLocale = getPathWithoutLocale(path, locale);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <div className="bg-gray/20 border-gray size-9.5 border border-dashed p-1">
        <PopoverTrigger className="block h-full w-full">
          <div className="flex h-full w-full flex-col justify-center gap-1">
            <span className="inline-block h-0.5 w-full bg-white/75" />
            <span className="inline-block h-0.5 w-full bg-white/75" />
            <span className="inline-block h-0.5 w-full bg-white/75" />
          </div>
        </PopoverTrigger>
      </div>
      <PopoverContent align="start" closeOnScroll={setOpen} alignOffset={-5}>
        <TabsRoot className="w-42 max-w-[calc(100vw-4rem)]">
          <TabsList>
            <TabsTrigger value="pages">{t.menu.pages}</TabsTrigger>
            <TabsTrigger value="lang">{t.menu.lang}</TabsTrigger>
          </TabsList>
          <TabsContent value="lang" className="flex flex-col gap-2">
            {langs.map((l) => (
              <a
                href={joinPath(l.url, pathWithoutLocale)}
                key={l.locale}
                data-active={l.locale === locale || undefined}
                className="group flex items-center justify-between text-sm transition-opacity duration-200 hover:opacity-70"
              >
                <span>
                  {l.locale.toUpperCase()} - {l.label}
                </span>
                <ActiveDot className="opacity-0 group-data-active:opacity-100" />
              </a>
            ))}
          </TabsContent>
          <TabsContent value="pages" className="flex flex-col gap-2">
            {routes.map((route) => (
              <div className="flex flex-col gap-2" key={route.label}>
                {route.href ? (
                  <a
                    href={route.href}
                    key={route.label}
                    data-active={
                      isActivePath(route.href, path, locale) || undefined
                    }
                    className="group flex items-center justify-between font-mono transition-opacity duration-200 hover:opacity-70"
                  >
                    {route.label}
                    <ActiveDot className="opacity-0 group-data-active:opacity-100" />
                  </a>
                ) : (
                  <div className="flex flex-col gap-1 text-sm">
                    <span className="font-mono">{route.label}</span>
                    <div className="ml-2 flex flex-col gap-1 text-sm">
                      {route.childs?.map((child) => (
                        <a
                          href={child.href}
                          key={child.label}
                          data-active={
                            isActivePath(child.href, path, locale) || undefined
                          }
                          className="group flex items-center justify-between transition-opacity duration-200 hover:opacity-70"
                        >
                          {child.label}
                          <ActiveDot className="opacity-0 group-data-active:opacity-100" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </TabsContent>
        </TabsRoot>
      </PopoverContent>
    </Popover.Root>
  );
}

export function MenuNavigatorMobileSkeleton() {
  return (
    <div className="bg-gray/20 border-gray size-9.5 border border-dashed p-1">
      <div className="flex h-full items-center px-2 py-1">
        <div className="flex h-full w-full flex-col justify-center gap-1">
          <span className="inline-block h-0.5 w-full bg-white/75" />
          <span className="inline-block h-0.5 w-full bg-white/75" />
          <span className="inline-block h-0.5 w-full bg-white/75" />
        </div>
      </div>
    </div>
  );
}
