import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject
} from "react";
import PlusIcon from "../../icons/plus.svg?react";

type PopoverContextType = {
  visible: boolean;
  triggerRef: RefObject<HTMLButtonElement | null>;
  setVisible: (value: boolean) => void;
};

const PopoverContext = createContext<PopoverContextType | undefined>(undefined);

function usePopover() {
  const context = useContext(PopoverContext);
  if (context === undefined) {
    throw new Error("usePopover must be used within a PopoverProvider");
  }
  return context;
}

export default function Popover({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <PopoverContext.Provider value={{ visible, setVisible, triggerRef }}>
      <div className="relative">{children}</div>
    </PopoverContext.Provider>
  );
}

function Trigger({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  const { visible, setVisible, triggerRef } = usePopover();

  return (
    <button
      ref={triggerRef}
      onClick={() => setVisible(!visible)}
      className={className}
    >
      {children}
    </button>
  );
}

function Content({
  children,
  position
}: {
  children: ReactNode;
  position: "left" | "right";
}) {
  const { visible, setVisible, triggerRef } = usePopover();
  const popoverRef = useRef<HTMLDivElement>(null);

  const shouldClose = (event: MouseEvent) => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.target as Node) &&
      triggerRef.current &&
      !triggerRef.current.contains(event.target as Node)
    ) {
      setVisible(false);
    }
  };

  const handleEscapeKey = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setVisible(false);
    }
  };

  const handleMouseLeave = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (visible) {
      popoverRef.current &&
        popoverRef.current.addEventListener("mouseleave", handleMouseLeave);
      document.addEventListener("mousedown", shouldClose);
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      popoverRef.current &&
        popoverRef.current.addEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mousedown", shouldClose);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [visible]);

  return (
    <div
      ref={popoverRef}
      className={`absolute top-full z-49 mt-1 ${visible ? "block" : "hidden"} ${position === "left" ? "left-0" : "right-0"}`}
    >
      {/* Popover content */}
      <div className="bg-background border-gray relative max-w-xs border border-dashed p-6 shadow-lg">
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
      </div>
    </div>
  );
}

export const PopoverTrigger = Trigger;
export const PopoverContent = Content;
