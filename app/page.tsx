import Link from 'next/link';
import { Clock, Timer, Zap, Settings2, TrendingUp, Hourglass } from 'lucide-react';
import { StructuredData } from '@/components/seo/StructuredData';

export default function HomePage() {
  return (
    <>
      <StructuredData type="WebApplication" page="home" />
      <StructuredData type="BreadcrumbList" page="home" />

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="py-12 sm:py-16 md:py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4 sm:mb-6 leading-tight">
              Focus Better with TimeMaster
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-8 sm:mb-12 max-w-2xl mx-auto">
              Multiple productivity timers in one place. No signup, no tracking, completely free.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
              <Link
                href="/pomodoro"
                className="px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-medium transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Start with Pomodoro
              </Link>
              <Link
                href="#timers"
                className="px-6 sm:px-8 py-3 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg font-medium transition-all"
              >
                Explore All Timers
              </Link>
            </div>
          </div>
        </section>

        {/* Timer Cards */}
        <section id="timers" className="py-12 sm:py-16 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900/50 dark:to-transparent">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-8 sm:mb-12">
              Choose Your Focus Method
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <TimerCard
                href="/pomodoro"
                icon={<Timer className="w-8 h-8" />}
                title="Pomodoro Timer"
                description="25 min work, 5 min break"
                badge="Most Popular"
              />
              <TimerCard
                href="/50-10-timer"
                icon={<Clock className="w-8 h-8" />}
                title="50/10 Timer"
                description="Extended 50-minute focus sessions"
              />
              <TimerCard
                href="/60-10-timer"
                icon={<Hourglass className="w-8 h-8" />}
                title="60/10 Timer"
                description="Hour-long deep work blocks"
              />
              <TimerCard
                href="/90-20-timer"
                icon={<TrendingUp className="w-8 h-8" />}
                title="90/20 Timer"
                description="Ultimate deep work sessions"
              />
              <TimerCard
                href="/flowtime"
                icon={<Zap className="w-8 h-8" />}
                title="Flowtime"
                description="Flexible, adaptive focus periods"
              />
              <TimerCard
                href="/custom-timer"
                icon={<Settings2 className="w-8 h-8" />}
                title="Custom Timer"
                description="Create your perfect schedule"
              />
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-12 sm:py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-8 sm:mb-12">
              Why Choose TimeMaster?
            </h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <FeatureCard
                title="Privacy First"
                description="No tracking, no accounts, no data collection. Everything stays on your device."
              />
              <FeatureCard
                title="Works Offline"
                description="Continues running even when your tab is inactive. Never miss a notification."
              />
              <FeatureCard
                title="Fully Customizable"
                description="Adjust durations, sounds, themes, and more. Make it yours."
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

function TimerCard({ href, icon, title, description, badge }: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
}) {
  return (
    <Link
      href={href}
      className="block p-5 sm:p-6 bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all group shadow-sm hover:shadow-lg transform hover:-translate-y-1"
    >
      <div className="relative">
        {badge && (
          <span className="absolute -top-2 -right-2 px-2 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-medium rounded-full shadow-md">
            {badge}
          </span>
        )}
        <div className="text-blue-600 dark:text-blue-400 mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          {title}
        </h3>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </div>
    </Link>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="text-center p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 sm:mb-3">
        {title}
      </h3>
      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
        {description}
      </p>
    </div>
  );
}
