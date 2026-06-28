import type { PropsWithChildren } from "react";
import CrossIcon from "../../icons/cross.svg?react";
import { cn } from "../../lib/cn";

export type AlertVariant = "success" | "error";

interface AlertProps {
  variant: AlertVariant;
  onClose?: () => void;
  className?: string;
}

type Styles = {
  div: string;
  button: string;
};

function style(variant: AlertVariant): Styles {
  switch (variant) {
    case "success":
      return {
        div: "border-success bg-success-muted/20 text-success",
        button: "hover:bg-success-muted/50"
      };
    case "error":
      return {
        div: "border-destructive bg-destructive-muted/20 text-destructive",
        button: "hover:bg-destructive-muted/50"
      };
  }
}

export default function Alert({
  variant,
  onClose,
  className,
  children
}: PropsWithChildren<AlertProps>) {
  const { div, button } = style(variant);

  return (
    <div
      className={cn(
        `inline-flex w-full items-center justify-between border p-2 text-sm ${div}`,
        className
      )}
    >
      {children}
      {onClose && (
        <button
          onClick={() => onClose()}
          className={`p-1 transition-colors duration-300 hover:cursor-pointer ${button}`}
        >
          <CrossIcon />
        </button>
      )}
    </div>
  );
}
