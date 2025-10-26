import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';

export type Theme = 'light' | 'dark' | 'system';

type ResolvedTheme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'system';
    return (localStorage.getItem('theme') as Theme) || 'system';
  });

  const resolvedTheme = useMemo<ResolvedTheme>(() => {
    return theme === 'system' ? getSystemTheme() : theme;
  }, [theme]);

  // Apply class to <html>
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    if (resolvedTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [resolvedTheme]);

  // Persist preference
  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('theme', theme);
  }, [theme]);

  // React to system changes when in system mode
  useEffect(() => {
    if (theme !== 'system' || typeof window === 'undefined') return;
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      const root = document.documentElement;
      if (mql.matches) root.classList.add('dark');
      else root.classList.remove('dark');
    };
    mql.addEventListener?.('change', handler);
    return () => mql.removeEventListener?.('change', handler);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
