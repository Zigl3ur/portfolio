import { useEffect, type ReactNode } from "react";
import type {
  PopoverPositionerProps,
  PopoverTriggerProps as BasePopoverTriggerProps
} from "@base-ui/react/popover";
import PlusIcon from "../../icons/plus.svg?react";
import { Popover } from "@base-ui/react";
import { cn } from "../../lib/cn";

interface PopoverTriggerProps extends BasePopoverTriggerProps {
  children: ReactNode;
  className?: string;
}

export function PopoverTrigger({
  children,
  className,
  ...props
}: PopoverTriggerProps) {
  return (
    <Popover.Trigger className={cn("group", className)} {...props}>
      <div className="hover:bg-gray/40 group-data-popup-open:bg-gray/80 active:bg-gray/60 active: h-full px-2 py-1 transition-colors duration-200 hover:cursor-pointer">
        {children}
      </div>
    </Popover.Trigger>
  );
}

interface PopoverContentProps extends PopoverPositionerProps {
  closeOnScroll?: (open: boolean) => void;
  children: ReactNode;
}

export function PopoverContent({
  closeOnScroll,
  children,
  ...props
}: PopoverContentProps) {
  useEffect(() => {
    if (!closeOnScroll) return;
    document.addEventListener("scroll", () => closeOnScroll(false));
    return () =>
      document.removeEventListener("scroll", () => closeOnScroll(false));
  }, []);

  return (
    <Popover.Portal>
      <Popover.Positioner positionMethod="fixed" {...props} className="mt-2">
        {/* Popover content */}
        <Popover.Popup className="bg-background border-gray relative origin-[--transform-origin] border border-dashed px-6 py-4 shadow-lg transition-all duration-150 data-ending-style:scale-98 data-ending-style:opacity-0 data-starting-style:scale-98 data-starting-style:opacity-0">
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
