import { Popover } from "@base-ui/react";
import type { languages } from "../i18n/ui";
import { PopoverContent, PopoverTrigger } from "./ui/Popover";
import { useState } from "react";

interface LangSwitcherProps {
  actual: keyof typeof languages;
  localesUrls: { locale: keyof typeof languages; label: string; url: string }[];
  path: string;
}

export default function LangSwitcher({
  actual,
  localesUrls,
  path
}: LangSwitcherProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <h3 className="font-mono text-sm">{actual.toUpperCase()}</h3>
      </PopoverTrigger>
      <PopoverContent align="start" closeOnScroll={setOpen} alignOffset={-5}>
        <div className="xxs:items-start flex flex-col items-center gap-1">
          {localesUrls.map((l) => (
            <a
              href={l.url + path}
              key={l.locale}
              className="flex items-center justify-between text-sm transition-opacity duration-200 hover:opacity-70"
            >
              <span className="inline-flex items-center gap-1">
                <h3>{l.locale.toUpperCase()}</h3>
                <span className="mx-1">-</span>
                <span>{l.label}</span>
              </span>
              {l.locale === actual && (
                <span className="bg-lime-bright ml-2 size-1.5"></span>
              )}
            </a>
          ))}
        </div>
      </PopoverContent>
    </Popover.Root>
  );
}
