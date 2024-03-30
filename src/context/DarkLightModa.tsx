import React, { createContext, useState, useContext } from 'react';
import { ReactNode } from 'react';
type DarkModeContextType = {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
  };

  const DarkModeContext = createContext<DarkModeContextType | null>(null);

export const DarkModeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
    return useContext(DarkModeContext);
  };