'use client';

import { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, Calendar, User, ArrowLeft, Tag } from 'lucide-react';
import { blogPosts } from '@/lib/blogData';

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const post = blogPosts.find(p => p.slug === slug);

    if (!post) {
        notFound();
    }

    const relatedPosts = blogPosts
        .filter(p => p.category === post.category && p.slug !== post.slug)
        .slice(0, 3);

    return (
        <div className="min-h-screen relative overflow-hidden">
            <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-purple-950/30"></div>
                <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-200/30 dark:bg-blue-500/10 rounded-full filter blur-3xl animate-blob"></div>
                <div className="absolute top-40 right-1/4 w-72 h-72 bg-purple-200/30 dark:bg-purple-500/10 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
            </div>

            <main className="container mx-auto px-4 py-8 sm:py-12 relative">
                <div className="max-w-4xl mx-auto">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-8 transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span>Back to all guides</span>
                    </Link>

                    <article className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-800/50 p-8 sm:p-10 mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-semibold rounded-full">
                                {post.category}
                            </span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-gray-600 dark:text-gray-400 pb-6 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                <span>{post.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{post.readTime}</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-6">
                            {post.tags.map(tag => (
                                <span
                                    key={tag}
                                    className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                                >
                                    <Tag className="w-3 h-3" />
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </article>

                    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-800/50 p-8 sm:p-10 mb-8">
                        <div className="prose prose-lg dark:prose-invert max-w-none">
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                {post.content}
                            </p>
                        </div>
                    </div>

                    {relatedPosts.length > 0 && (
                        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl shadow-xl border border-blue-200/50 dark:border-blue-800/50 p-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Related Guides</h2>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {relatedPosts.map(relatedPost => (
                                    <Link
                                        key={relatedPost.slug}
                                        href={`/blog/${relatedPost.slug}`}
                                        className="block p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-lg transition-all hover:-translate-y-1"
                                    >
                                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
                                            {relatedPost.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                                            {relatedPost.excerpt}
                                        </p>
                                        <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                                            Read more →
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="mt-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl shadow-xl p-8 text-center text-white">
                        <h2 className="text-2xl font-bold mb-4">Ready to Put This Into Practice?</h2>
                        <p className="text-blue-100 mb-6">
                            Start using our free focus timers to implement these strategies today.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/pomodoro"
                                className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all shadow-lg"
                            >
                                Try Pomodoro Timer
                            </Link>
                            <Link
                                href="/blog"
                                className="px-8 py-3 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-lg font-semibold hover:bg-white/20 transition-all"
                            >
                                Read More Guides
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
