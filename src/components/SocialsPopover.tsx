import { Popover } from "@base-ui/react";
import { PopoverContent, PopoverTrigger } from "./ui/Popover";
import { useState } from "react";
import type { LangProps } from "../types";

export default function SocialsPopover({ t }: LangProps<"header">) {
  const [open, setOpen] = useState(false);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <div className="bg-gray/20 border-gray border border-dashed p-1">
        <PopoverTrigger className="font-mono text-sm">
          {t.socials}
        </PopoverTrigger>
      </div>
      <PopoverContent align="end" alignOffset={-5} closeOnScroll={setOpen}>
        <div className="flex flex-col gap-2 font-mono">
          <a
            href="https://discordapp.com/users/384053588042711040"
            target="_blank"
            className="text-sm transition-opacity duration-200 hover:opacity-70"
          >
            Discord
          </a>
          <a
            href="https://github.com/Zigl3ur"
            target="_blank"
            className="text-sm transition-opacity duration-200 hover:opacity-70"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/eden-douru/"
            target="_blank"
            className="text-sm transition-opacity duration-200 hover:opacity-70"
          >
            LinkedIn
          </a>
        </div>
      </PopoverContent>
    </Popover.Root>
  );
}
