'use client';

import Link from 'next/link';
import { Clock, Heart, Shield, Zap, Users, Target } from 'lucide-react';
import type { Metadata } from 'next';

export default function AboutPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-purple-950/30"></div>
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-200/30 dark:bg-blue-500/10 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-1/4 w-72 h-72 bg-purple-200/30 dark:bg-purple-500/10 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <main className="container mx-auto px-4 py-12 relative">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                About FocusTimer
              </span>
            </h1>
            <div className="h-1 w-24 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Every minute counts. We built FocusTimer to help you make the most of yours.
            </p>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {/* Mission Section */}
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-800/50 p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Our Mission</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                FocusTimer was created with a simple but powerful goal: to provide a completely free, privacy-first productivity tool that actually helps people focus. In a world full of distracting apps and services that track your every move, we wanted to build something different—something that respects your time, your privacy, and your need for deep, uninterrupted work.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Whether you're a student preparing for exams, a developer debugging complex code, a writer crafting your next article, or an indie maker building your dream project, FocusTimer is designed to help you achieve your best work. We believe that everyone deserves access to powerful productivity tools without sacrificing their privacy or paying subscription fees.
              </p>
            </div>

            {/* Who It's For */}
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-800/50 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Who FocusTimer Is For</h2>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Students</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Master your study sessions with proven techniques like Pomodoro and 50/10 timers. Perfect for exam prep, essay writing, and long study marathons.
                  </p>
                </div>
                
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                  <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">Developers</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Tackle complex coding challenges with deep work sessions. Use Flowtime for debugging or 90/20 blocks for feature development.
                  </p>
                </div>
                
                <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-xl border border-pink-200 dark:border-pink-800">
                  <h3 className="font-semibold text-pink-900 dark:text-pink-100 mb-2">Knowledge Workers</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Stay focused during meetings, writing, research, and analysis. Customize timers to match your workflow perfectly.
                  </p>
                </div>
                
                <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
                  <h3 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">Indie Makers</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Ship features faster with time-boxed work sessions. Balance building, marketing, and customer support effectively.
                  </p>
                </div>
              </div>
            </div>

            {/* Core Values */}
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-800/50 p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">What Makes Us Different</h2>
              
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="inline-flex p-3 bg-green-100 dark:bg-green-900/30 rounded-xl mb-3">
                    <Shield className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Privacy First</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    No accounts, no tracking, no data collection. Your productivity data stays on your device, always.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="inline-flex p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl mb-3">
                    <Zap className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Lightning Fast</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Built with modern web technologies for instant loading and smooth performance, even offline.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="inline-flex p-3 bg-pink-100 dark:bg-pink-900/30 rounded-xl mb-3">
                    <Heart className="w-8 h-8 text-pink-600 dark:text-pink-400" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Always Free</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    No premium tiers, no paywalls, no hidden costs. Full access to all features, forever.
                  </p>
                </div>
              </div>
            </div>

            {/* Story Section */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl shadow-xl border border-blue-200/50 dark:border-blue-800/50 p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Our Story</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                FocusTimer started as a personal project when I found myself frustrated with existing productivity timers. They were either bloated with unnecessary features, required accounts and subscriptions, or worse—tracked my every move to sell my data to advertisers.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                As a developer who values both productivity and privacy, I decided to build the timer I wished existed. Something clean, fast, and respectful of users. What started as a simple Pomodoro timer quickly evolved into a comprehensive suite of focus tools, each designed for different work styles and preferences.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Today, FocusTimer serves thousands of users worldwide—students cramming for finals, developers shipping features, writers meeting deadlines, and makers building their dreams. Every piece of feedback helps us improve, and every user who finds value in our tool motivates us to keep it free and open for everyone.
              </p>
            </div>

            {/* Technology */}
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-800/50 p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Built with Modern Technology</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                FocusTimer is built using cutting-edge web technologies to ensure the best possible experience. We use Next.js 16 for blazing-fast performance, React 19 for smooth interactions, and Tailwind CSS for a beautiful, responsive design that works perfectly on any device.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                The entire application runs client-side in your browser, which means your timer sessions continue even when you're offline or switch tabs. We leverage browser APIs like Picture-in-Picture mode, desktop notifications, and local storage to provide a native app-like experience without requiring any downloads or installations.
              </p>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl shadow-xl p-8 text-center text-white">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Focus Better?</h2>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Join thousands of students, developers, and knowledge workers who trust FocusTimer to help them achieve their best work every day.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/pomodoro"
                  className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Start with Pomodoro
                </Link>
                <Link
                  href="/blog"
                  className="px-8 py-3 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-lg font-semibold hover:bg-white/20 transition-all"
                >
                  Read Our Guides
                </Link>
              </div>
            </div>

            {/* Contact */}
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
              <p className="text-gray-600 dark:text-gray-400 mb-2">Have questions or feedback?</p>
              <Link
                href="/contact"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
              >
                Get in touch with us →
              </Link>
            </div>
          </div>
        </div>
      </main>

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
    </div>
  );
}
