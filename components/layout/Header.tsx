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


  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/50 dark:border-gray-800/50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl shadow-lg">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 dark:from-blue-500/10 dark:via-purple-500/10 dark:to-pink-500/10 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 py-3 sm:py-4 relative">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group relative">
            <div className="relative">
              {/* Glow effect behind icon */}
              <div className="absolute inset-0 bg-blue-500 dark:bg-blue-400 rounded-full blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              <Timer className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 relative" />
            </div>
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent group-hover:opacity-80 transition-opacity duration-300">
              TimeMaster
            </span>
            {/* Animated underline */}
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300 rounded-full"></div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <Link
              href="/pomodoro"
              className="relative px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-all duration-200 rounded-lg group"
            >
              <span className="relative z-10">Pomodoro</span>
              <div className="absolute inset-0 bg-blue-500/10 dark:bg-blue-400/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-3/4 transition-all duration-300 rounded-full"></div>
            </Link>
            <Link
              href="/50-10-timer"
              className="relative px-3 py-2 text-sm font-medium text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 transition-all duration-200 rounded-lg group"
            >
              <span className="relative z-10">50/10</span>
              <div className="absolute inset-0 bg-purple-500/10 dark:bg-purple-400/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-3/4 transition-all duration-300 rounded-full"></div>
            </Link>
            <Link
              href="/custom-timer"
              className="relative px-3 py-2 text-sm font-medium text-gray-600 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-400 transition-all duration-200 rounded-lg group"
            >
              <span className="relative z-10">Custom</span>
              <div className="absolute inset-0 bg-pink-500/10 dark:bg-pink-400/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-red-500 group-hover:w-3/4 transition-all duration-300 rounded-full"></div>
            </Link>
          </nav>

         
        
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }
      `}</style>
    </header>
  );
}