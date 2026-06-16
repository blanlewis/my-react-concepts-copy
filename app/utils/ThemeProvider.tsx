"use client";

import { createContext, useContext, useState, useEffect, useMemo, ReactNode } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

interface AppThemeContextValue {
  mode: "light" | "dark";
  toggleTheme: () => void;
}

const AppThemeContext = createContext<AppThemeContextValue>({
  mode: "light",
  toggleTheme: () => {},
});

export const useAppTheme = () => useContext(AppThemeContext);

export const AppThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    document.documentElement.style.colorScheme = mode;
  }, [mode]);

  const toggleTheme = () => setMode(prev => (prev === "light" ? "dark" : "light"));

  const theme = createTheme({ palette: { mode } });

  const contextValue = useMemo(() => ({ mode, toggleTheme }), [mode]);

  return (
    <AppThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppThemeContext.Provider>
  );
};
