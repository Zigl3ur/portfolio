import type { PropsWithChildren } from "react";
import { Dialog } from "@base-ui/react";
import type { LangProps, ProjectType } from "../types";
import DialogContent from "./ui/DialogContent";
import GithubLogo from "../icons/github-logo.svg?react";
import Carousel from "./ui/Carousel";

type ProjectDialogProps = PropsWithChildren<{
  project: ProjectType;
  t: LangProps<"projects">["t"];
}>;

export default function ProjectDialog({
  project,
  t,
  children
}: ProjectDialogProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger
        autoFocus={false}
        render={(props) => (
          <button {...props} type="button">
            {children}
          </button>
        )}
      />
      <DialogContent className="w-full max-w-4xl">
        <div className="flex flex-col gap-6">
          <h3 className="font-mono text-2xl font-semibold text-white">
            {project.name}
          </h3>

          {project.images && <Carousel images={project.images} />}

          <div className="space-y-2">
            <h3 className="text-foreground/50">README.md</h3>
            <p>{project.description}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="space-y-2">
              <h3 className="text-foreground/50">Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="border-gray text-foreground/70 border border-dashed px-1.5 py-1 font-mono text-xs"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <a
            className="bg-lime-bright text-gray hover:bg-lime-pale disabled:bg-muted mt-4 flex w-full items-center justify-center gap-2 p-2 text-sm font-semibold transition-colors duration-200 hover:cursor-pointer disabled:cursor-default"
            href={project.url}
            target="_blank"
          >
            <GithubLogo className="size-5.5" />
            {t.viewLabel}
          </a>
        </div>
      </DialogContent>
    </Dialog.Root>
  );
}
