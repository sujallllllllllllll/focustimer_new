'use client';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="relative border-t border-gray-200/50 dark:border-gray-800/50 mt-auto overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-950/30 dark:to-purple-950/30"></div>
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-blue-200 dark:bg-blue-500 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-200 dark:bg-purple-500 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:py-12 relative">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Timers Section */}
          <div className="group">
            <div className="inline-block mb-3 sm:mb-4">
              <h3 className="font-bold text-gray-900 dark:text-gray-100 text-sm sm:text-base bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Timers
              </h3>
              <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"></div>
            </div>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/pomodoro"
                  className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-all duration-200 inline-flex items-center gap-2 group/link"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-0 group-hover/link:opacity-100 transition-opacity duration-200"></span>
                  <span className="group-hover/link:translate-x-1 transition-transform duration-200">Pomodoro Timer</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/50-10-timer"
                  className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-all duration-200 inline-flex items-center gap-2 group/link"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-0 group-hover/link:opacity-100 transition-opacity duration-200"></span>
                  <span className="group-hover/link:translate-x-1 transition-transform duration-200">50/10 Timer</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/custom-timer"
                  className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-all duration-200 inline-flex items-center gap-2 group/link"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-0 group-hover/link:opacity-100 transition-opacity duration-200"></span>
                  <span className="group-hover/link:translate-x-1 transition-transform duration-200">Custom Timer</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools Section */}
          <div className="group">
            <div className="inline-block mb-3 sm:mb-4">
              <h3 className="font-bold text-gray-900 dark:text-gray-100 text-sm sm:text-base bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                Tools
              </h3>
              <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300"></div>
            </div>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/countdown"
                  className="text-sm text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 transition-all duration-200 inline-flex items-center gap-2 group/link"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 opacity-0 group-hover/link:opacity-100 transition-opacity duration-200"></span>
                  <span className="group-hover/link:translate-x-1 transition-transform duration-200">Countdown Timer</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/stopwatch"
                  className="text-sm text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 transition-all duration-200 inline-flex items-center gap-2 group/link"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 opacity-0 group-hover/link:opacity-100 transition-opacity duration-200"></span>
                  <span className="group-hover/link:translate-x-1 transition-transform duration-200">Stopwatch</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div className="group">
            <div className="inline-block mb-3 sm:mb-4">
              <h3 className="font-bold text-gray-900 dark:text-gray-100 text-sm sm:text-base bg-gradient-to-r from-pink-600 to-red-600 dark:from-pink-400 dark:to-red-400 bg-clip-text text-transparent">
                Legal
              </h3>
              <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-pink-500 to-red-500 rounded-full transition-all duration-300"></div>
            </div>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-gray-600 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-400 transition-all duration-200 inline-flex items-center gap-2 group/link"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-500 opacity-0 group-hover/link:opacity-100 transition-opacity duration-200"></span>
                  <span className="group-hover/link:translate-x-1 transition-transform duration-200">Privacy Policy</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="relative mt-8 pt-6 sm:pt-8">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>
          
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"></div>
              <p className="text-sm font-medium bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-300 dark:to-gray-100 bg-clip-text text-transparent">
                © 2025 FocusTimer
              </p>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              Focus Better with FocusTimer — Every Minute Counts
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -20px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 10px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </footer>
  );
}