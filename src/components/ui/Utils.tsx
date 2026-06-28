import { cn } from "../../lib/cn";

export default function ActiveDot({ className }: { className?: string }) {
  return (
    <span className={cn("bg-lime-bright ml-2 size-1.5", className)}></span>
  );
}
