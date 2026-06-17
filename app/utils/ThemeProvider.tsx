"use client";

import { createContext, useContext, useState, useEffect, useMemo, ReactNode } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";

interface AppThemeContextValue {
  mode: "light" | "dark";
  toggleTheme: () => void;
}

const AppThemeContext = createContext<AppThemeContextValue>({
  mode: "light",
  toggleTheme: () => {},
});

export const useAppTheme = () => useContext(AppThemeContext);

const scrollbarStyles = (isDark: boolean) => ({
  "*": {
    scrollbarWidth: "thin" as const,
    scrollbarColor: `${isDark ? "#555" : "#c1c1c1"} transparent`,
  },
  "*::-webkit-scrollbar": {
    width: "4px",
    height: "4px",
  },
  "*::-webkit-scrollbar-track": {
    background: "transparent",
  },
  "*::-webkit-scrollbar-thumb": {
    backgroundColor: isDark ? "#555" : "#c1c1c1",
    borderRadius: "999px",
    border: `1px solid ${isDark ? "#444" : "#d0d0d0"}`,
  },
  "*::-webkit-scrollbar-thumb:hover": {
    backgroundColor: isDark ? "#777" : "#999",
  },
  "*::-webkit-scrollbar-corner": {
    background: "transparent",
  },
});

export const AppThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    document.documentElement.style.colorScheme = mode;
    document.documentElement.dataset.theme = mode;
  }, [mode]);

  const toggleTheme = () => setMode(prev => (prev === "light" ? "dark" : "light"));

  const theme = createTheme({ palette: { mode } });

  const contextValue = useMemo(() => ({ mode, toggleTheme }), [mode]);

  return (
    <AppThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles styles={scrollbarStyles(mode === "dark")} />
        {children}
      </ThemeProvider>
    </AppThemeContext.Provider>
  );
};
