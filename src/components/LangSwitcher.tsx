import { Popover } from "@base-ui/react";
import type { languages } from "../i18n/ui";
import PopoverContent from "./ui/PopoverContent";
import { useState } from "react";

interface LangSwitcherProps {
  actual: keyof typeof languages;
  localesUrls: { locale: keyof typeof languages; label: string; url: string }[];
}

export default function LangSwitcher({
  actual,
  localesUrls
}: LangSwitcherProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger className="transition-opacity duration-200 hover:cursor-pointer hover:opacity-70">
        <h3>{actual.toUpperCase()}</h3>
      </Popover.Trigger>
      <PopoverContent align="start" closeOnScroll={setOpen}>
        <div className="xxs:items-start flex flex-col items-center gap-1">
          {localesUrls.map((l) => (
            <a
              href={l.url}
              key={l.locale}
              className="mx-2 flex text-sm transition-opacity duration-200 hover:opacity-70"
              onClick={(e) =>
                l.url === window.location.pathname && e.preventDefault()
              }
            >
              <h3>{l.locale.toUpperCase()}</h3>
              <span className="xxs:flex hidden">
                <span className="mx-2">-</span>
                <span>{l.label}</span>
              </span>
            </a>
          ))}
        </div>
      </PopoverContent>
    </Popover.Root>
  );
}
