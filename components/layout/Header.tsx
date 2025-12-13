'use client';

import Link from 'next/link';
import Image from 'next/image';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-800/50 bg-gray-900/70 backdrop-blur-xl shadow-sm">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 pointer-events-none"></div>

      <div className="container mx-auto px-4 py-3 sm:py-4 relative">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group relative">
            <div className="relative h-10 sm:h-12">
              <div className="absolute inset-0 bg-blue-500 dark:bg-blue-400 blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-full"></div>
              <Image
                src="/logo.png"
                alt="FocusTimer"
                width={240}
                height={48}
                className="h-10 sm:h-12 w-auto group-hover:scale-105 transition-all duration-300 relative"
                priority
              />
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <Link
              href="/pomodoro"
              className="relative px-3 py-2 text-sm font-medium text-gray-400 hover:text-blue-400 transition-all duration-200 rounded-lg group"
            >
              <span className="relative z-10">Pomodoro</span>
              <div className="absolute inset-0 bg-blue-400/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-3/4 transition-all duration-300 rounded-full"></div>
            </Link>
            <Link
              href="/50-10-timer"
              className="relative px-3 py-2 text-sm font-medium text-gray-400 hover:text-purple-400 transition-all duration-200 rounded-lg group"
            >
              <span className="relative z-10">50/10</span>
              <div className="absolute inset-0 bg-purple-400/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-3/4 transition-all duration-300 rounded-full"></div>
            </Link>
            <Link
              href="/custom-timer"
              className="relative px-3 py-2 text-sm font-medium text-gray-400 hover:text-pink-400 transition-all duration-200 rounded-lg group"
            >
              <span className="relative z-10">Custom</span>
              <div className="absolute inset-0 bg-pink-400/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-red-500 group-hover:w-3/4 transition-all duration-300 rounded-full"></div>
            </Link>
            <Link
              href="/blog"
              className="relative px-3 py-2 text-sm font-medium text-gray-400 hover:text-indigo-400 transition-all duration-200 rounded-lg group"
            >
              <span className="relative z-10">Blog</span>
              <div className="absolute inset-0 bg-indigo-400/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-blue-500 group-hover:w-3/4 transition-all duration-300 rounded-full"></div>
            </Link>
            <Link
              href="/about"
              className="relative px-3 py-2 text-sm font-medium text-gray-400 hover:text-teal-400 transition-all duration-200 rounded-lg group"
            >
              <span className="relative z-10">About</span>
              <div className="absolute inset-0 bg-teal-400/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-green-500 group-hover:w-3/4 transition-all duration-300 rounded-full"></div>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}