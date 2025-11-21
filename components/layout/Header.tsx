'use client';

import Link from 'next/link';
import { Timer, Moon, Sun, Monitor } from 'lucide-react';
import { useTimerStore } from '@/store/timerStore';
import { Button } from '@/components/ui/Button';

export function Header() {
  const { preferences, setPreferences } = useTimerStore();

  const toggleTheme = () => {
    const themes = ['light', 'dark', 'system'] as const;
    const currentIndex = themes.indexOf(preferences.theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setPreferences({ theme: nextTheme });
  };

  const ThemeIcon = {
    light: Sun,
    dark: Moon,
    system: Monitor,
  }[preferences.theme];

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <Timer className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
            <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
              TimeMaster
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <Link
              href="/pomodoro"
              className="text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
            >
              Pomodoro
            </Link>
            <Link
              href="/50-10-timer"
              className="text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
            >
              50/10
            </Link>
            <Link
              href="/custom-timer"
              className="text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
            >
              Custom
            </Link>
          </nav>

          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ThemeIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}