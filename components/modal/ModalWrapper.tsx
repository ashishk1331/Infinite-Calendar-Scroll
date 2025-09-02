import {
  createContext,
  type PropsWithChildren,
  type ReactNode,
  useState,
  useContext,
} from "react";

interface ModalData {
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalData | null>(null);

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("ModalContext is missing a provider.");
  return ctx;
}

export default function ModalWrapper({ children }: PropsWithChildren) {
  const [modal, setModal] = useState<ReactNode | null>(null);

  function openModal(content: ReactNode) {
    setModal(content);
  }

  function closeModal() {
    setModal(null);
  }

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/25 backdrop-blur-sm p-12"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {modal}
          </div>
        </div>
      )}
      {children}
    </ModalContext.Provider>
  );
}
