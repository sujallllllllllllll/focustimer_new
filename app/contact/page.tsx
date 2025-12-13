'use client';

import { Mail, MessageSquare, Send } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950/30"></div>
                <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-200/30 dark:bg-blue-500/10 rounded-full filter blur-3xl animate-blob"></div>
                <div className="absolute top-40 right-1/4 w-72 h-72 bg-indigo-200/30 dark:bg-indigo-500/10 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
            </div>

            <main className="container mx-auto px-4 py-12 relative">
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                                Get in Touch
                            </span>
                        </h1>
                        <div className="h-1 w-24 mx-auto bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                        <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
                            We'd love to hear from you! Whether you have questions, feedback, or just want to say hello.
                        </p>
                    </div>

                    {/* Contact Cards */}
                    <div className="grid sm:grid-cols-2 gap-6 mb-12">
                        {/* Email Card */}
                        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-800/50 p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                                    <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Email Us</h2>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                                For general inquiries, feedback, or support questions.
                            </p>
                            <a
                                href="mailto:presencematic@gmail.com"
                                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors group"
                            >
                                <span>presencematic@gmail.com</span>
                                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>

                        {/* Feedback Card */}
                        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-800/50 p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                                    <MessageSquare className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Feedback</h2>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                Your feedback helps us improve FocusTimer for everyone. Share your thoughts, feature requests, or bug reports.
                            </p>
                        </div>
                    </div>

                    {/* Main Contact Section */}
                    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-800/50 p-8 sm:p-10">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">What You Can Reach Out About</h2>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold text-xs mt-0.5">
                                    ✓
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Technical Issues</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Experiencing bugs or technical problems? Let us know the details and we'll investigate.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-purple-500 text-white font-bold text-xs mt-0.5">
                                    ✓
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Feature Requests</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Have an idea for a new timer type or feature? We're always looking to improve based on user needs.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-pink-500 text-white font-bold text-xs mt-0.5">
                                    ✓
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">General Questions</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Questions about how to use FocusTimer or which timer is best for your workflow? We're here to help.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-orange-500 text-white font-bold text-xs mt-0.5">
                                    ✓
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Partnerships & Collaborations</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Interested in collaborating or integrating FocusTimer? Let's discuss possibilities.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Response Time */}
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
                            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Response Time</h3>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                We typically respond to emails within 24-48 hours during business days. For urgent technical issues, please include "URGENT" in your subject line.
                            </p>
                        </div>
                    </div>

                    {/* FAQ Link */}
                    <div className="mt-8 text-center p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                        <p className="text-gray-700 dark:text-gray-300 mb-2">
                            Looking for quick answers? Check out our guides and timer-specific FAQs.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
                            <a
                                href="/blog"
                                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
                            >
                                Browse Guides
                            </a>
                            <a
                                href="/pomodoro"
                                className="px-6 py-2 bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 border-2 border-purple-600 dark:border-purple-400 rounded-lg font-medium hover:bg-purple-50 dark:hover:bg-gray-700 transition-colors"
                            >
                                View Timer FAQs
                            </a>
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
