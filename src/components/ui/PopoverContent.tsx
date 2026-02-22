import { useEffect, type ReactNode } from "react";
import type { PopoverPositionerProps } from "@base-ui/react/popover";
import PlusIcon from "../../icons/plus.svg?react";
import { Popover } from "@base-ui/react";

export default function PopoverContent({
  closeOnScroll,
  children,
  align = "center",
  side = "bottom"
}: {
  closeOnScroll?: (open: boolean) => void;
  children: ReactNode;
  side?: PopoverPositionerProps["side"];
  align?: PopoverPositionerProps["align"];
}) {
  useEffect(() => {
    if (!closeOnScroll) return;
    document.addEventListener("scroll", () => closeOnScroll(false));
    return () =>
      document.removeEventListener("scroll", () => closeOnScroll(false));
  }, []);

  return (
    <Popover.Portal>
      <Popover.Positioner
        positionMethod="fixed"
        align={align}
        side={side}
        className="mt-2"
      >
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
