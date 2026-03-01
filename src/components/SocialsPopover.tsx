import SocialsIcon from "../icons/globe.svg?react";
import { Popover } from "@base-ui/react";
import PopoverContent from "./ui/PopoverContent";
import { useState } from "react";

export default function SocialsPopover() {
  const [open, setOpen] = useState(false);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger className="flex transition-opacity duration-200 hover:cursor-pointer hover:opacity-70">
        <SocialsIcon color="white" />
      </Popover.Trigger>
      <PopoverContent align="end" closeOnScroll={setOpen}>
        <div className="flex flex-col gap-2 font-mono">
          <a
            href="https://discordapp.com/users/384053588042711040"
            target="_blank"
            className="transition-opacity duration-200 hover:opacity-70"
          >
            Discord
          </a>
          <a
            href="https://github.com/Zigl3ur"
            target="_blank"
            className="transition-opacity duration-200 hover:opacity-70"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/eden-douru/"
            target="_blank"
            className="transition-opacity duration-200 hover:opacity-70"
          >
            LinkedIn
          </a>
        </div>
      </PopoverContent>
    </Popover.Root>
  );
}
