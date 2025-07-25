"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface DocsContextType {
  activeSection: string;
  setActiveSection: (section: string) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const DocsContext = createContext<DocsContextType | undefined>(undefined);

interface DocsProviderProps {
  children: ReactNode;
}

export function DocsProvider({ children }: DocsProviderProps) {
  const [activeSection, setActiveSection] = useState<string>("introduction");
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <DocsContext.Provider value={{ activeSection, setActiveSection, darkMode, toggleDarkMode }}>
      {children}
    </DocsContext.Provider>
  );
}

export function useDocs() {
  const context = useContext(DocsContext);
  if (context === undefined) {
    throw new Error("useDocs must be used within a DocsProvider");
  }
  return context;
}