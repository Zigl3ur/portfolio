import { type PropsWithChildren } from "react";
import PlusIcon from "../../icons/plus.svg?react";
import CrossIcon from "../../icons/cross.svg?react";
import { Dialog } from "@base-ui/react";
import { twMerge } from "tailwind-merge";

type DialogContentProps = PropsWithChildren<{
  className?: string;
}>;

export default function DialogContent({
  children,
  className
}: DialogContentProps) {
  return (
    <Dialog.Portal>
      <Dialog.Backdrop className="fixed inset-0 min-h-dvh bg-black opacity-70 transition-all duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-[-webkit-touch-callout:none]:absolute" />

      <Dialog.Popup
        initialFocus={false}
        className={twMerge(
          "bg-background border-gray fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 overflow-hidden border border-dashed text-sm shadow-lg transition-all duration-150 data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0",
          className
        )}
      >
        <div className="relative max-h-[calc(100dvh-2rem)] sm:max-h-[90dvh]">
          <PlusIcon
            width={15}
            height={15}
            className="text-gray pointer-events-none absolute top-0 left-0 z-10 mt-1 ml-1"
          />
          <PlusIcon
            width={15}
            height={15}
            className="text-gray pointer-events-none absolute bottom-0 left-0 z-10 mb-1 ml-1"
          />
          <PlusIcon
            width={15}
            height={15}
            className="text-gray pointer-events-none absolute right-0 bottom-0 z-10 mr-1 mb-1"
          />

          <Dialog.Close className="hover:bg-gray active:bg-gray/80 focus-visible:ring-gray absolute top-0 right-0 z-10 mt-1 mr-1 p-0.5 focus-visible:ring-2 focus-visible:outline-none">
            <CrossIcon width={15} height={15} className="text-white" />
          </Dialog.Close>

          <div className="max-h-[calc(100dvh-2rem)] overflow-y-auto overscroll-contain p-6 sm:max-h-[90dvh]">
            {children}
          </div>
        </div>
      </Dialog.Popup>
    </Dialog.Portal>
  );
}
