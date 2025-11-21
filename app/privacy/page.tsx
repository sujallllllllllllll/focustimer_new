'use client';

import { motion } from 'framer-motion';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950/20">
      <main className="container mx-auto px-4 py-12 sm:py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          {/* Hero Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              Privacy Policy
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-gray-400 font-medium">
              Your data stays yours — always.
            </p>
          </motion.div>

          {/* Last Updated Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-full border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>
          </motion.div>

          {/* Main Content Card - Glassmorphism */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="prose prose-lg dark:prose-invert max-w-none"
          >
            <div className="bg-white/70 dark:bg-gray-900/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/40 dark:border-gray-800/60 p-8 sm:p-12 md:p-16">
              <section className="space-y-10">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                    <span className="text-blue-600 dark:text-blue-400">Our Commitment to Privacy</span>
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                    TimeMaster is built with <strong>privacy as a core principle</strong>. We believe your productivity data should remain private and under your control — no exceptions.
                  </p>
                </div>

                <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-2xl p-6">
                  <h2 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-4">
                    Data We Don't Collect
                  </h2>
                  <ul className="space-y-3 text-gray-700 dark:text-gray-200 text-lg">
                    <li className="flex items-center gap-3"><span className="text-green-600">✓</span> Personal information (name, email, phone number)</li>
                    <li className="flex items-center gap-3"><span className="text-green-600">✓</span> Timer usage patterns or statistics</li>
                    <li className="flex items-center gap-3"><span className="text-green-600">✓</span> IP addresses or location data</li>
                    <li className="flex items-center gap-3"><span className="text-green-600">✓</span> Browser fingerprints or tracking data</li>
                    <li className="flex items-center gap-3"><span className="text-green-600">✓</span> Any data that could identify you personally</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Local Storage Only</h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    All your preferences and settings are stored <strong>locally in your browser</strong> using localStorage. This data never leaves your device and is not transmitted to our servers or any third parties.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-800">
                    <h2 className="text-xl font-bold text-purple-800 dark:text-purple-300 mb-3">No Analytics or Tracking</h2>
                    <p className="text-gray-700 dark:text-gray-300">
                      We do not use Google Analytics, Facebook Pixel, or any tracking services. Your behavior is never monitored.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/30 dark:to-amber-900/20 rounded-2xl p-6 border border-orange-200 dark:border-orange-800">
                    <h2 className="text-xl font-bold text-orange-800 dark:text-amber-300 mb-3">No Cookies</h2>
                    <p className="text-gray-700 dark:text-gray-300">
                      No tracking cookies. Only essential local storage for saving your preferences — nothing more.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Third-Party Services</h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    TimeMaster is a fully client-side application. We do not integrate with any external services that could access your data.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/20 rounded-2xl p-6 border border-indigo-200 dark:border-indigo-800">
                  <h2 className="text-2xl font-bold text-indigo-800 dark:text-indigo-300 mb-4">Open Source & Transparent</h2>
                  <p className="text-gray-700 dark:text-gray-300">
                    Our commitment to privacy is verifiable. The entire codebase is open source — you can review every line to confirm we respect your privacy exactly as promised.
                  </p>
                </div>

                <div className="space-y-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Changes to This Policy</h2>
                    <p className="text-gray-700 dark:text-gray-300">
                      If we update this policy, the "Last updated" date will change. Since we don’t collect contact info, we rely on this page as the source of truth.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Contact</h2>
                    <p className="text-gray-700 dark:text-gray-300">
                      Questions? Reach out via our <a href="https://github.com/your-repo" className="text-blue-600 dark:text-blue-400 underline font-medium">GitHub repository</a> or public channels.
                    </p>
                  </div>
                </div>

                {/* Final Trust Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mt-12 p-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl text-center text-white shadow-2xl"
                >
                  <h3 className="text-2xl font-bold mb-3">You Are in Full Control</h3>
                  <p className="text-blue-100 text-lg">
                    No servers. No tracking. No compromises.<br />
                    Just a clean, private, and powerful productivity tool.
                  </p>
                </motion.div>
              </section>
            </div>
          </motion.article>
        </div>
      </main>
    </div>
  );
}