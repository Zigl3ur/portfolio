import { useState, type PropsWithChildren } from "react";
import type { RouteWithLabel } from "../hooks/usePath";
import type { LangProps } from "../types";
import { Popover } from "@base-ui/react/popover";
import { PopoverContent, PopoverTrigger } from "./ui/Popover";

interface RouteNavDropdownProps extends PropsWithChildren {
  path: string;
  routeChilds: NonNullable<RouteWithLabel["childs"]>;
  t: LangProps<"pages">["t"];
  className?: string;
}

export default function RouteNavDropdown({
  path,
  routeChilds,
  t,
  children
}: RouteNavDropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <PopoverTrigger indicator>{children}</PopoverTrigger>
      <PopoverContent align="start" closeOnScroll={setOpen}>
        {routeChilds.map((child) => {
          const pathT = t[path as keyof typeof t];

          return (
            <a
              href={child.href}
              key={child.href}
              className="mx-2 flex text-sm transition-opacity duration-200 hover:opacity-70"
            >
              {pathT.childs?.find((c) => c.href === child.href)?.label ||
                child.label.at(0)?.toUpperCase() + child.label.slice(1)}
            </a>
          );
        })}
      </PopoverContent>
    </Popover.Root>
  );
}
