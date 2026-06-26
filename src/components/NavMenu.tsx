import { Popover } from "@base-ui/react";
import { useState } from "react";
import { PopoverContent, PopoverTrigger } from "./ui/Popover";
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from "./ui/Tabs";
import type { RouteWithLabel } from "../hooks/usePath";
import type { getLocalesUrl } from "../i18n/utils";
import type { LangProps } from "../types";

interface NavMenuProps {
  path: string;
  routesList: RouteWithLabel[];
  langsList: ReturnType<typeof getLocalesUrl>;
  t: LangProps<"header">["t"];
}

export default function NavMenu({
  path,
  routesList,
  langsList,
  t
}: NavMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="bg-gray/20 border-gray size-9.5 border border-dashed p-1">
        <div className="flex h-full w-full flex-col justify-center gap-1">
          <span className="inline-block h-0.5 w-full bg-white/75" />
          <span className="inline-block h-0.5 w-full bg-white/75" />
          <span className="inline-block h-0.5 w-full bg-white/75" />
        </div>
      </PopoverTrigger>
      <PopoverContent align="start" closeOnScroll={setOpen}>
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
                className="font-mono text-sm transition-opacity duration-200 hover:opacity-70"
              >
                {l.locale.toUpperCase()} - {l.label}
              </a>
            ))}
          </TabsContent>
          <TabsContent value="pages" className="flex flex-col gap-4">
            {routesList.map((route) => (
              <div className="flex flex-col gap-2" key={route.label}>
                <a
                  href={route.href}
                  key={route.label}
                  className="font-mono transition-opacity duration-200 hover:opacity-70"
                >
                  {route.label}
                </a>

                {route.childs && (
                  <>
                    <span className="bg-gray/75 inline-block h-px w-full" />
                    <div className="ml-2 flex flex-col gap-1 text-sm">
                      {route.childs.map((child) => (
                        <a
                          href={child.href}
                          key={child.label}
                          className="transition-opacity duration-200 hover:opacity-70"
                        >
                          {child.href.includes("#") && "#"} {child.label}
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
