import { cn } from "../../lib/cn";

export default function Skeleton({ className }: { className?: string }) {
  return <div className={cn("bg-muted animate-pulse", className)} />;
}
