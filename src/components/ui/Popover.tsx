import { useEffect, type ReactNode } from "react";
import type {
  PopoverPositionerProps,
  PopoverTriggerProps as BasePopoverTriggerProps
} from "@base-ui/react/popover";
import PlusIcon from "../../icons/plus.svg?react";
import { Popover } from "@base-ui/react";
import { cn } from "../../lib/cn";
import ChevronDownIcon from "../../icons/chevron-down.svg?react";

interface PopoverTriggerProps extends BasePopoverTriggerProps {
  children: ReactNode;
  className?: string;
  indicator?: boolean;
}

export function PopoverTrigger({
  children,
  className,
  indicator,
  ...props
}: PopoverTriggerProps) {
  return (
    <Popover.Trigger
      className={cn(
        "hover:bg-gray/40 data-popup-open:bg-gray/80 active:bg-gray/60 group flex h-full items-center px-2 py-1 transition-colors duration-200 hover:cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
      {indicator && (
        <ChevronDownIcon className="ml-1 size-3 shrink-0 text-white/50 transition-transform duration-200 group-data-popup-open:-rotate-180" />
      )}
    </Popover.Trigger>
  );
}

export function PopoverTriggerSkeleton({
  children,
  indicator
}: Pick<PopoverTriggerProps, "children" | "indicator">) {
  return (
    <div className="flex h-full items-center px-2 py-1">
      {children}
      {indicator && (
        <ChevronDownIcon className="ml-1 size-3 shrink-0 text-white/50" />
      )}
    </div>
  );
}

interface PopoverContentProps extends PopoverPositionerProps {
  closeOnScroll?: (open: boolean) => void;
  children: ReactNode;
  portalContainer?: HTMLElement | null;
  sideOffset?: number;
  className?: string;
}

export function PopoverContent({
  closeOnScroll,
  children,
  className,
  portalContainer,
  ...props
}: PopoverContentProps) {
  useEffect(() => {
    if (!closeOnScroll) return;

    const handleScroll = () => closeOnScroll(false);
    document.addEventListener("scroll", handleScroll);

    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Popover.Portal container={portalContainer}>
      <Popover.Positioner
        sideOffset={props.sideOffset ?? 8}
        positionMethod="fixed"
        {...props}
      >
        {/* Popover content */}
        <Popover.Popup
          className={cn(
            "bg-background border-gray pointer-events-auto relative origin-[--transform-origin] border border-dashed px-5.5 py-4 shadow-lg transition-[opacity,transform] duration-150 data-ending-style:scale-98 data-ending-style:opacity-0 data-starting-style:scale-98 data-starting-style:opacity-0",
            className
          )}
        >
          <PlusIcon
            width={15}
            height={15}
            className="text-gray absolute top-0 left-0 mt-1 ml-1"
          />
          <PlusIcon
            width={15}
            height={15}
            className="text-gray absolute bottom-0 left-0 mb-1 ml-1"
          />
          <PlusIcon
            width={15}
            height={15}
            className="text-gray absolute top-0 right-0 mt-1 mr-1"
          />
          <PlusIcon
            width={15}
            height={15}
            className="text-gray absolute right-0 bottom-0 mr-1 mb-1"
          />
          {children}
        </Popover.Popup>
      </Popover.Positioner>
    </Popover.Portal>
  );
}
