import type { PropsWithChildren } from "react";
import CrossIcon from "../../icons/cross.svg?react";

export type AlertVariant = "success" | "error";

interface AlertProps {
  variant: AlertVariant;
  onClose: () => void;
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
  children
}: PropsWithChildren<AlertProps>) {
  const { div, button } = style(variant);

  return (
    <div
      className={`inline-flex w-full items-center justify-between rounded-md border p-2 text-sm ${div}`}
    >
      {children}
      <button
        onClick={() => onClose()}
        className={`rounded-md p-1 transition-colors duration-300 hover:cursor-pointer ${button}`}
      >
        <CrossIcon />
      </button>
    </div>
  );
}
