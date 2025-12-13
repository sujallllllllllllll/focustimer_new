'use client';

export default function TermsPage() {
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
                                Terms of Service
                            </span>
                        </h1>
                        <div className="h-1 w-24 mx-auto bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                    </div>

                    {/* Last Updated Badge */}
                    <div className="flex justify-center mb-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-full border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                Last updated: December 13, 2025
                            </span>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-800/50 p-8 sm:p-10">
                        <div className="prose prose-lg dark:prose-invert max-w-none">

                            {/* Introduction */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold mb-4">
                                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                                        Agreement to Terms
                                    </span>
                                </h2>
                                <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                                    Welcome to FocusTimer! By accessing or using our website at focustimer.shop (the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Service.
                                </p>
                                <p className="text-gray-700 dark:text-gray-200 leading-relaxed mt-3">
                                    FocusTimer is a free web-based productivity timer application. These Terms apply to all visitors, users, and others who access or use the Service.
                                </p>
                            </div>

                            {/* Use of Service */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Use of Service</h2>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                                    FocusTimer provides productivity timer tools including Pomodoro timers, custom timers, and related features. You may use the Service for personal or professional productivity purposes.
                                </p>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not to:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mt-3">
                                    <li>Use the Service in any way that violates any applicable law or regulation</li>
                                    <li>Attempt to interfere with, compromise, or disrupt the Service or servers</li>
                                    <li>Use any automated system to access the Service in a manner that sends more requests than a human could reasonably produce</li>
                                    <li>Attempt to reverse engineer, decompile, or extract source code from the Service</li>
                                    <li>Remove, obscure, or alter any legal notices displayed in connection with the Service</li>
                                </ul>
                            </div>

                            {/* No Account Required */}
                            <div className="mb-8 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/10 border border-green-200/50 dark:border-green-800/50 rounded-xl p-6">
                                <h2 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-3">No Account Required</h2>
                                <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                                    FocusTimer does not require user accounts or registration. All timer preferences and settings are stored locally in your browser. We do not collect, store, or process any personal information about our users.
                                </p>
                            </div>

                            {/* Intellectual Property */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Intellectual Property</h2>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                                    The Service and its original content, features, and functionality are owned by FocusTimer and are protected by international copyright, trademark, and other intellectual property laws.
                                </p>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    Our trademarks, logos, and service marks displayed on the Service are our property. You may not use these marks without our prior written permission.
                                </p>
                            </div>

                            {/* Disclaimer of Warranties */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Disclaimer of Warranties</h2>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                                    The Service is provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, either express or implied. FocusTimer does not warrant that:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                                    <li>The Service will function uninterrupted, secure, or error-free</li>
                                    <li>Defects will be corrected</li>
                                    <li>The Service is free of viruses or other harmful components</li>
                                    <li>The results of using the Service will meet your requirements</li>
                                </ul>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-3">
                                    Your use of the Service is at your sole risk. We make no guarantees about the accuracy or reliability of any timer functions.
                                </p>
                            </div>

                            {/* Limitation of Liability */}
                            <div className="mb-8 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/10 border border-orange-200/50 dark:border-orange-800/50 rounded-xl p-6">
                                <h2 className="text-2xl font-bold text-orange-800 dark:text-orange-300 mb-3">Limitation of Liability</h2>
                                <p className="text-gray-700 dark:text-gray-200 leading-relaxed mb-3">
                                    To the maximum extent permitted by applicable law, FocusTimer shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-200">
                                    <li>Your access to or use of (or inability to access or use) the Service</li>
                                    <li>Any conduct or content of any third party on the Service</li>
                                    <li>Any content obtained from the Service</li>
                                    <li>Unauthorized access, use, or alteration of your transmissions or content</li>
                                </ul>
                            </div>

                            {/* Third-Party Services */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Third-Party Services</h2>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    The Service may contain links to third-party websites or services that are not owned or controlled by FocusTimer. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services. You acknowledge and agree that FocusTimer shall not be responsible or liable for any damage or loss caused by your use of any such content or services.
                                </p>
                            </div>

                            {/* Changes to Service */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Changes to Service</h2>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    We reserve the right to modify, suspend, or discontinue the Service (or any part thereof) at any time, with or without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuance of the Service.
                                </p>
                            </div>

                            {/* Changes to Terms */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Changes to Terms</h2>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    We reserve the right to update or modify these Terms at any time. When we do, we will revise the "Last updated" date at the top of this page. Your continued use of the Service after any such changes constitutes your acceptance of the new Terms. We encourage you to review these Terms periodically.
                                </p>
                            </div>

                            {/* Governing Law */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Governing Law</h2>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law provisions. Any disputes arising from these Terms or your use of the Service shall be resolved through good faith negotiation.
                                </p>
                            </div>

                            {/* Contact */}
                            <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">Contact Us</h2>
                                <p className="text-gray-700 dark:text-gray-300 mb-3">
                                    If you have any questions about these Terms, please contact us:
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

                            {/* Acceptance */}
                            <div className="mt-10 p-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-xl text-center text-white shadow-xl">
                                <h3 className="text-xl font-bold mb-2">By Using FocusTimer</h3>
                                <p className="text-blue-100">
                                    You acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
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
