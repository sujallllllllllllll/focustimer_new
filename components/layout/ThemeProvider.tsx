'use client';

import { useEffect } from 'react';
import { useTimerStore } from '@/store/timerStore';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { loadFromStorage } = useTimerStore();

  useEffect(() => {
    loadFromStorage();
    // Force dark mode
    document.documentElement.classList.add('dark');
  }, []);

  return <>{children}</>;
}