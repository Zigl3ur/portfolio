import {
  Checkbox as BaseCheckbox,
  type CheckboxRootProps
} from "@base-ui/react/checkbox";

interface CheckboxProps extends CheckboxRootProps {
  children?: React.ReactNode;
}

export default function Checkbox({ children, ...props }: CheckboxProps) {
  const disabled = !!props.disabled;

  return (
    <label
      className={`text-foreground inline-flex items-center gap-2 text-sm font-normal ${
        disabled ? "opacity-40" : ""
      }`}
    >
      <BaseCheckbox.Root
        className="border-lime-bright bg-background text-lime-bright hover:border-lime-pale hover:bg-muted focus-visible:outline-lime-bright data-checked:border-lime-bright data-checked:bg-lime-bright data-checked:text-background disabled:border-muted disabled:bg-muted flex size-4 shrink-0 items-center justify-center rounded-none border transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2"
        {...props}
      >
        <BaseCheckbox.Indicator className="flex data-unchecked:hidden">
          <CheckIcon />
        </BaseCheckbox.Indicator>
      </BaseCheckbox.Root>

      <span className="select-none">{children}</span>
    </label>
  );
}

function CheckIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      {...props}
      style={{ display: "block", ...props.style }}
    >
      <path d="m2.5 8.5 4 4 7-9" />
    </svg>
  );
}
