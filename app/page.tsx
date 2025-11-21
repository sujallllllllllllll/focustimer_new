'use client';

import Link from 'next/link';
import { Clock, Timer, Zap, Settings2, TrendingUp, Hourglass } from 'lucide-react';
import { StructuredData } from '@/components/seo/StructuredData';

export default function HomePage() {
  return (
    <>
      <StructuredData type="WebApplication" page="home" />
      <StructuredData type="BreadcrumbList" page="home" />

      <div className="min-h-screen relative overflow-hidden">
        {/* Subtle Animated Background */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-950/30"></div>
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-200/30 dark:bg-blue-500/10 rounded-full filter blur-3xl animate-blob"></div>
          <div className="absolute top-40 right-1/4 w-72 h-72 bg-purple-200/30 dark:bg-purple-500/10 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        </div>

        {/* Hero Section */}
        <section className="py-12 sm:py-16 md:py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4 sm:mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Focus Better
              </span>{' '}
              with TimeMaster
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-8 sm:mb-12 max-w-2xl mx-auto">
              Multiple productivity timers in one place. No signup, no tracking, completely free.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
              <Link
                href="/pomodoro"
                className="group px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Start with Pomodoro
              </Link>
              <Link
                href="#timers"
                className="px-6 sm:px-8 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg font-medium transition-all shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-700"
              >
                Explore All Timers
              </Link>
            </div>
          </div>
        </section>

        {/* Timer Cards */}
        <section id="timers" className="py-12 sm:py-16 px-4 bg-gradient-to-b from-gray-50/50 to-white/50 dark:from-gray-900/30 dark:to-transparent">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-8 sm:mb-12">
              Choose Your{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Focus Method
              </span>
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <TimerCard
                href="/pomodoro"
                icon={<Timer className="w-8 h-8" />}
                title="Pomodoro Timer"
                description="25 min work, 5 min break"
                badge="Most Popular"
                color="blue"
              />
              <TimerCard
                href="/50-10-timer"
                icon={<Clock className="w-8 h-8" />}
                title="50/10 Timer"
                description="Extended 50-minute focus sessions"
                color="purple"
              />
              <TimerCard
                href="/60-10-timer"
                icon={<Hourglass className="w-8 h-8" />}
                title="60/10 Timer"
                description="Hour-long deep work blocks"
                color="pink"
              />
              <TimerCard
                href="/90-20-timer"
                icon={<TrendingUp className="w-8 h-8" />}
                title="90/20 Timer"
                description="Ultimate deep work sessions"
                color="orange"
              />
              <TimerCard
                href="/flowtime"
                icon={<Zap className="w-8 h-8" />}
                title="Flowtime"
                description="Flexible, adaptive focus periods"
                color="teal"
              />
              <TimerCard
                href="/custom-timer"
                icon={<Settings2 className="w-8 h-8" />}
                title="Custom Timer"
                description="Create your perfect schedule"
                color="indigo"
              />
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-12 sm:py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-8 sm:mb-12">
              Why Choose{' '}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                TimeMaster?
              </span>
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

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 10s infinite ease-in-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </>
  );
}

function TimerCard({ href, icon, title, description, badge, color }: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
  color: 'blue' | 'purple' | 'pink' | 'orange' | 'teal' | 'indigo';
}) {
  const colorClasses: Record<string, string> = {
    blue: 'text-blue-600 dark:text-blue-400 group-hover:border-blue-500',
    purple: 'text-purple-600 dark:text-purple-400 group-hover:border-purple-500',
    pink: 'text-pink-600 dark:text-pink-400 group-hover:border-pink-500',
    orange: 'text-orange-600 dark:text-orange-400 group-hover:border-orange-500',
    teal: 'text-teal-600 dark:text-teal-400 group-hover:border-teal-500',
    indigo: 'text-indigo-600 dark:text-indigo-400 group-hover:border-indigo-500',
  };

  return (
    <Link
      href={href}
      className={`block p-5 sm:p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border-2 border-gray-200 dark:border-gray-700 ${colorClasses[color]} transition-all group shadow-md hover:shadow-xl transform hover:-translate-y-1`}
    >
      <div className="relative">
        {badge && (
          <span className="absolute -top-2 -right-2 px-2 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-medium rounded-full shadow-md">
            {badge}
          </span>
        )}
        <div className={`${colorClasses[color].split(' ')[0]} mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}>
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
    <div className="text-center p-6 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1">
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 sm:mb-3">
        {title}
      </h3>
      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
        {description}
      </p>
    </div>
  );
}