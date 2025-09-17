import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode
} from "react";
import CrossIcon from "../../icons/cross.svg?react";
import PlusIcon from "../../icons/plus.svg?react";

type ModalContextType = {
  show: boolean;
  shouldShow: (value: boolean) => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}

export default function Modal({ children }: { children: ReactNode }) {
  const [show, setShow] = useState(false);

  return (
    <ModalContext.Provider value={{ show, shouldShow: setShow }}>
      {children}
    </ModalContext.Provider>
  );
}

function Trigger({ children }: { children: ReactNode }) {
  const { shouldShow } = useModal();

  return <span onClick={() => shouldShow(true)}>{children}</span>;
}

function Content({ children }: { children: ReactNode }) {
  const { show, shouldShow } = useModal();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const shouldClose = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        shouldShow(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        shouldShow(false);
      }
    };

    if (show) {
      document.addEventListener("mousedown", shouldClose);
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("mousedown", shouldClose);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [shouldShow, show]);

  return (
    <div
      className={`fixed inset-0 z-50 backdrop-blur-sm ${
        show ? "flex" : "hidden"
      } items-center justify-center`}
    >
      {/* modal content */}
      <div
        ref={modalRef}
        className="bg-background border-gray relative mx-4 max-w-xs border border-dashed p-6 shadow-lg"
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
          className="text-gray absolute right-0 bottom-0 mr-1 mb-1"
        />
        <button
          className="hover:bg-gray absolute top-0.5 right-0.5 flex h-5 w-5 items-center justify-center rounded-sm"
          onClick={() => shouldShow(false)}
        >
          <CrossIcon />
        </button>
        {children}
      </div>
    </div>
  );
}

Modal.Trigger = Trigger;
Modal.Content = Content;
