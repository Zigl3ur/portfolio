import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode
} from "react";

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
        className="bg-background border-gray relative max-w-xs border border-dashed p-6 shadow-lg"
      >
        <button
          className="hover:bg-gray absolute top-0.5 right-0.5 flex h-5 w-5 items-center justify-center rounded-sm"
          onClick={() => shouldShow(false)}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
              fill="currentColor"
            />
          </svg>
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
}

Modal.Trigger = Trigger;
Modal.Content = Content;
