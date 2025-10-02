import Popover, { PopoverTrigger, PopoverContent } from "./ui/Popover";
import SocialsIcon from "../icons/globe.svg?react";
import GithubIcon from "../icons/github-logo.svg?react";
import LinkedInIcon from "../icons/linkedin-logo.svg?react";
import DiscordIcon from "../icons/discord-logo.svg?react";

export default function SocialsPopover() {
  return (
    <Popover>
      <PopoverTrigger className="flex transition-opacity duration-200 hover:cursor-pointer hover:opacity-70">
        <SocialsIcon color="white" />
      </PopoverTrigger>
      <PopoverContent position="right">
        <div className="flex flex-col items-center gap-2">
          <a
            href="https://discordapp.com/users/384053588042711040"
            target="_blank"
            aria-label="Discord"
            className="flex items-center gap-2 transition-opacity duration-200 hover:opacity-70"
          >
            <DiscordIcon width={20} height={20} className="flex-shrink-0" />
          </a>
          <a
            href="https://github.com/Zigl3ur"
            target="_blank"
            aria-label="GitHub"
            className="flex items-center gap-2 transition-opacity duration-200 hover:opacity-70"
          >
            <GithubIcon width={20} height={20} className="flex-shrink-0" />
          </a>
          <a
            href="https://www.linkedin.com/in/eden-douru/"
            target="_blank"
            aria-label="LinkedIn"
            className="flex items-center gap-2 transition-opacity duration-200 hover:opacity-70"
          >
            <LinkedInIcon width={20} height={20} className="flex-shrink-0" />
          </a>
        </div>
      </PopoverContent>
    </Popover>
  );
}
