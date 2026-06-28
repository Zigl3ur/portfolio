import { useState, type PropsWithChildren } from "react";
import type { RouteWithLabel } from "../hooks/usePath";
import type { LangProps } from "../types";
import { Popover } from "@base-ui/react/popover";
import { PopoverContent, PopoverTrigger } from "./ui/Popover";
import ActiveDot from "./ui/Utils";

interface RouteNavDropdownProps extends PropsWithChildren {
  routeChilds: NonNullable<RouteWithLabel["childs"]>;
  t: LangProps<"pages">["t"];
  className?: string;
}

export default function RouteNavDropdown({
  routeChilds,
  t,
  children
}: RouteNavDropdownProps) {
  const [open, setOpen] = useState(false);

  const path = window.location.pathname + window.location.hash;

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <PopoverTrigger indicator openOnHover>
        {children}
      </PopoverTrigger>
      <PopoverContent
        align="start"
        closeOnScroll={setOpen}
        className="min-w-(--anchor-width)"
      >
        <div className="flex flex-col gap-1">
          {routeChilds.map((child) => {
            const pathT = t[path as keyof typeof t];

            return (
              <a
                href={child.href}
                key={child.href}
                className="flex items-center justify-between text-sm transition-opacity duration-200 hover:opacity-70"
              >
                {pathT?.childs?.find((c) => c.href === child.href)?.label ||
                  child.label.at(0)?.toUpperCase() + child.label.slice(1)}
                {child.href === path && <ActiveDot />}
              </a>
            );
          })}
        </div>
      </PopoverContent>
    </Popover.Root>
  );
}
