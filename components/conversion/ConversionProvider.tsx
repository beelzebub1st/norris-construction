"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type Modal = "none" | "contact" | "quiz";

type ConversionContextValue = {
  modal: Modal;
  openContact: () => void;
  openQuiz: () => void;
  close: () => void;
};

const ConversionContext = createContext<ConversionContextValue | null>(null);

export function ConversionProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<Modal>("none");

  const openContact = useCallback(() => setModal("contact"), []);
  const openQuiz = useCallback(() => setModal("quiz"), []);
  const close = useCallback(() => setModal("none"), []);

  const value = useMemo(
    () => ({ modal, openContact, openQuiz, close }),
    [modal, openContact, openQuiz, close],
  );

  return (
    <ConversionContext.Provider value={value}>
      {children}
    </ConversionContext.Provider>
  );
}

export function useConversion() {
  const ctx = useContext(ConversionContext);
  if (!ctx) {
    throw new Error("useConversion must be used within ConversionProvider");
  }
  return ctx;
}
