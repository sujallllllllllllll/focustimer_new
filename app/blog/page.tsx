'use client';

import Link from 'next/link';
import { Clock, BookOpen, Tag } from 'lucide-react';
import { blogPosts } from '@/lib/blogData';

export default function BlogPage() {
    const categories = Array.from(new Set(blogPosts.map(post => post.category)));

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-purple-950/30"></div>
                <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-200/30 dark:bg-blue-500/10 rounded-full filter blur-3xl animate-blob"></div>
                <div className="absolute top-40 right-1/4 w-72 h-72 bg-purple-200/30 dark:bg-purple-500/10 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
            </div>

            <main className="container mx-auto px-4 py-12 relative">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                                Focus & Productivity Guides
                            </span>
                        </h1>
                        <div className="h-1 w-24 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                        <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Practical guides, tips, and strategies to help you master focus timers and boost your productivity.
                        </p>
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-3 mb-12">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all">
                            All Posts
                        </button>
                        {categories.map(category => (
                            <button
                                key={category}
                                className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Blog Posts Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {blogPosts.map((post) => (
                            <Link
                                key={post.slug}
                                href={`/blog/${post.slug}`}
                                className="group bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-800/50 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                            >
                                {/* Category Badge */}
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-full">
                                        {post.category}
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        {post.publishedAt}
                                    </span>
                                </div>

                                {/* Title */}
                                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {post.title}
                                </h2>

                                {/* Excerpt */}
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                                    {post.excerpt}
                                </p>

                                {/* Meta Info */}
                                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                        <Clock className="w-4 h-4" />
                                        <span>{post.readTime}</span>
                                    </div>
                                    <span className="text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:translate-x-1 transition-transform">
                                        Read more →
                                    </span>
                                </div>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {post.tags.slice(0, 3).map(tag => (
                                        <span
                                            key={tag}
                                            className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded"
                                        >
                                            <Tag className="w-3 h-3" />
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* CTA Section */}
                    <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl shadow-xl p-8 text-center text-white">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <BookOpen className="w-8 h-8" />
                            <h2 className="text-2xl sm:text-3xl font-bold">Ready to Start Focusing?</h2>
                        </div>
                        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                            Put these strategies into practice with our free focus timers. No signup required.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/pomodoro"
                                className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                Try Pomodoro Timer
                            </Link>
                            <Link
                                href="/custom-timer"
                                className="px-8 py-3 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-lg font-semibold hover:bg-white/20 transition-all"
                            >
                                Create Custom Timer
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
