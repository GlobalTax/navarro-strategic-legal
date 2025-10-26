import React, { ReactNode } from "react";
import { ThemeProvider as InternalThemeProvider } from "@/contexts/ThemeContext";

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <InternalThemeProvider>
      {children}
    </InternalThemeProvider>
  );
}

