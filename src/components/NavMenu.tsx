import { Popover } from "@base-ui/react";
import { useState } from "react";
import { PopoverContent, PopoverTrigger } from "./ui/Popover";
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from "./ui/Tabs";
import type { RouteWithLabel } from "../hooks/usePath";
import type { getLocalesUrl } from "../i18n/utils";
import type { LangProps } from "../types";
import type { languages } from "../i18n/ui";

interface NavMenuProps {
  routesList: RouteWithLabel[];
  langsList: ReturnType<typeof getLocalesUrl>;
  currentLang: keyof typeof languages;
  t: LangProps<"header">["t"];
}

export default function NavMenu({
  routesList,
  currentLang,
  langsList,
  t
}: NavMenuProps) {
  const [open, setOpen] = useState(false);

  const path = window.location.pathname + window.location.hash;

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
            {langsList.map((l) => (
              <a
                href={l.url + path}
                key={l.locale}
                className="flex items-center justify-between text-sm transition-opacity duration-200 hover:opacity-70"
              >
                <span>
                  {l.locale.toUpperCase()} - {l.label}
                </span>
                {l.locale === currentLang && (
                  <span className="bg-lime-bright ml-2 size-1.5"></span>
                )}
              </a>
            ))}
          </TabsContent>
          <TabsContent value="pages" className="flex flex-col gap-4">
            {routesList.map((route) => (
              <div className="flex flex-col gap-2" key={route.label}>
                {route.href ? (
                  <a
                    href={route.href}
                    key={route.label}
                    className="flex items-center justify-between font-mono transition-opacity duration-200 hover:opacity-70"
                  >
                    {route.label}
                    {route.href === path && (
                      <span className="bg-lime-bright ml-2 size-1.5"></span>
                    )}
                  </a>
                ) : (
                  <span className="font-mono">{route.label}</span>
                )}

                {route.childs && (
                  <>
                    <span className="bg-gray/75 inline-block h-px w-full" />
                    <div className="ml-2 flex flex-col gap-1 text-sm">
                      {route.childs.map((child) => (
                        <a
                          href={child.href}
                          key={child.label}
                          className="flex items-center justify-between transition-opacity duration-200 hover:opacity-70"
                        >
                          {child.label}
                          {child.href === path && (
                            <span className="bg-lime-bright ml-2 size-1.5"></span>
                          )}
                        </a>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </TabsContent>
        </TabsRoot>
      </PopoverContent>
    </Popover.Root>
  );
}

export function NavMenuSkeleton() {
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
