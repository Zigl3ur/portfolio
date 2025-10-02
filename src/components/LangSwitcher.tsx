import type { languages } from "../i18n/ui";
import Popover, { PopoverContent, PopoverTrigger } from "./ui/Popover";

interface LangSwitcherProps {
  actual: keyof typeof languages;
  localesUrls: { locale: keyof typeof languages; label: string; url: string }[];
}

export default function LangSwitcher({
  actual,
  localesUrls
}: LangSwitcherProps) {
  return (
    <Popover>
      <PopoverTrigger className="transition-opacity duration-200 hover:cursor-pointer hover:opacity-70">
        <h3>{actual.toUpperCase()}</h3>
      </PopoverTrigger>
      <PopoverContent>
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
    </Popover>
  );
}
