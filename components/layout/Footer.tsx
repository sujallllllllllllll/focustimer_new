import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 mt-auto">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4 text-sm sm:text-base">
              Timers
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/pomodoro"
                  className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                >
                  Pomodoro Timer
                </Link>
              </li>
              <li>
                <Link
                  href="/50-10-timer"
                  className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                >
                  50/10 Timer
                </Link>
              </li>
              <li>
                <Link
                  href="/custom-timer"
                  className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                >
                  Custom Timer
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4 text-sm sm:text-base">
              Tools
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/countdown"
                  className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                >
                  Countdown Timer
                </Link>
              </li>
              <li>
                <Link
                  href="/stopwatch"
                  className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                >
                  Stopwatch
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4 text-sm sm:text-base">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-6 sm:pt-8 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © 2024 TimeMaster. Free productivity timers for everyone.
          </p>
        </div>
      </div>
    </footer>
  );
}