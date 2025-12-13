'use client';
export default function PrivacyPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950/30"></div>
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-200/30 dark:bg-blue-500/10 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-1/4 w-72 h-72 bg-indigo-200/30 dark:bg-indigo-500/10 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <main className="container mx-auto px-4 py-12 relative">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                Privacy Policy
              </span>
            </h1>
            <div className="h-1 w-24 mx-auto bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
          </div>

          {/* Last Updated Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-full border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Last updated: {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-800/50 p-8 sm:p-10">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                    Our Commitment to Privacy
                  </span>
                </h2>
                <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                  FocusTimer is built with privacy as a core principle. We believe your
                  productivity data should remain private and under your control.
                </p>
              </div>

              <div className="mb-8 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/10 border border-green-200/50 dark:border-green-800/50 rounded-xl p-6">
                <h2 className="text-2xl font-bold mb-4 text-green-800 dark:text-green-300">
                  Data We Don't Collect
                </h2>
                <ul className="space-y-2 list-none pl-0">
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
                    <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-green-500 text-white font-bold text-xs">✓</span>
                    <span>Personal information (name, email, phone number)</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
                    <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-green-500 text-white font-bold text-xs">✓</span>
                    <span>Timer usage patterns or statistics</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
                    <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-green-500 text-white font-bold text-xs">✓</span>
                    <span>IP addresses or location data</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
                    <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-green-500 text-white font-bold text-xs">✓</span>
                    <span>Browser fingerprints or tracking data</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
                    <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-green-500 text-white font-bold text-xs">✓</span>
                    <span>Any data that could identify you personally</span>
                  </li>
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Local Storage Only</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  All your preferences and settings are stored locally in your browser using
                  localStorage. This data never leaves your device and is not transmitted to
                  our servers or any third parties.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Analytics and Advertising</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  To help us understand how FocusTimer is being used and to support the free service,
                  we use the following third-party services:
                </p>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/10 border border-blue-200/50 dark:border-blue-800/50 rounded-xl p-6">
                    <h3 className="text-lg font-bold mb-3 text-blue-900 dark:text-blue-100">
                      Google Analytics
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                      We use Google Analytics to understand basic usage patterns such as page views,
                      session duration, and geographic location (country/city level only). This helps
                      us improve the service.
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-xs">
                      Google Analytics may use cookies to collect this data. You can opt out using
                      browser extensions or privacy settings.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/10 border border-purple-200/50 dark:border-purple-800/50 rounded-xl p-6">
                    <h3 className="text-lg font-bold mb-3 text-purple-900 dark:text-purple-100">
                      Google AdSense
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                      We display advertisements through Google AdSense to keep FocusTimer free for
                      everyone. AdSense may use cookies and collect data for personalized advertising.
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-xs">
                      You can manage ad personalization in your Google account settings or use ad
                      blockers if you prefer.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/10 border border-green-200/50 dark:border-green-800/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <h2 className="text-xl font-bold mb-3">
                    <span className="bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
                      What We Don't Track
                    </span>
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 text-base">
                    We never collect your personal information, timer usage details, or individual
                    productivity data. Your actual timer sessions and preferences stay private on your device.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/10 border border-orange-200/50 dark:border-orange-800/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <h2 className="text-xl font-bold mb-3">
                    <span className="bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent">
                      Cookies Used
                    </span>
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 text-base">
                    Cookies are only used by Google Analytics and AdSense for analytics and advertising.
                    We do not set any first-party tracking cookies ourselves.
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Third-Party Services</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  FocusTimer is a client-side application that runs entirely in your browser.
                  We do not integrate with third-party services that could access your data.
                </p>
              </div>



              <div className="border-t border-gray-200 dark:border-gray-700 pt-8 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">Changes to This Policy</h2>
                  <p className="text-gray-700 dark:text-gray-300">
                    If we make changes to this privacy policy, we will update the date at the
                    top of this page. Since we don't collect contact information, we cannot
                    notify users directly of changes.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">Contact</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    If you have questions about this privacy policy, you can contact us at:
                  </p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <span className="text-blue-600 dark:text-blue-400 font-medium">Email:</span>
                    <a
                      href="mailto:presencematic@gmail.com"
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
                    >
                      presencematic@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="mt-10 p-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-xl text-center text-white shadow-xl">
                <h3 className="text-xl font-bold mb-2">You Are in Full Control</h3>
                <p className="text-blue-100">
                  No servers. No tracking. No compromises.<br />
                  Just a clean, private, and powerful productivity tool.
                </p>
              </div>
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