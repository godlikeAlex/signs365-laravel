import { createContext, ReactNode, useContext, useState } from "react";
import ContactFormModal from "./ContactFormModal";

type ContactModalContextType = {
  open: (productSlug?: string) => void;
  close: () => void;
};

const ContactFormModalContext = createContext<ContactModalContextType>(null);

export function useContactModal() {
  const context = useContext(ContactFormModalContext);
  if (!context) {
    throw new Error(
      "useContactModal must be used within a ContactModalProvider"
    );
  }
  return context;
}

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState({
    isOpen: false,
    productSlug: null,
  });

  const open = (productSlug?: string) =>
    setState({ productSlug: productSlug ?? null, isOpen: true });
  const close = () => setState({ productSlug: null, isOpen: false });

  return (
    <ContactFormModalContext.Provider value={{ open, close }}>
      {children}
      <ContactFormModal
        isOpen={state.isOpen}
        close={close}
        productSLUG={state.productSlug}
      />
    </ContactFormModalContext.Provider>
  );
}
