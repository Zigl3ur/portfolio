import { type ReactNode } from "react";
import PlusIcon from "../../icons/plus.svg?react";
import CrossIcon from "../../icons/cross.svg?react";
import { Dialog } from "@base-ui/react";

export default function DialogContent({ children }: { children: ReactNode }) {
  return (
    <Dialog.Portal>
      <Dialog.Backdrop className="fixed inset-0 min-h-dvh bg-black opacity-70 transition-all duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-[-webkit-touch-callout:none]:absolute" />
      <Dialog.Popup className="bg-background border-gray fixed top-1/2 left-1/2 -mt-8 w-60 -translate-x-1/2 -translate-y-1/2 border border-dashed p-6 text-center text-sm shadow-lg transition-all duration-150 data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0">
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
          className="text-gray absolute right-0 bottom-0 mr-1 mb-1"
        />
        <Dialog.Close className="hover:bg-gray active:bg-gray/80 focus:ring-gray absolute top-0 right-0 mt-1 mr-1 rounded-sm p-0.5 focus:ring-2 focus:outline-none">
          <CrossIcon width={15} height={15} className="text-white" />
        </Dialog.Close>
        {children}
      </Dialog.Popup>
    </Dialog.Portal>
  );
}
