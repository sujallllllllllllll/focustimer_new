'use client';

import Link from 'next/link';
import { Clock, BookOpen, ArrowRight } from 'lucide-react';
import { blogPosts, BlogPost } from '@/lib/blogData';

interface RelatedContentProps {
    currentPath: string;
    tags?: string[];
    category?: string;
}

const TIMERS = [
    { name: 'Pomodoro', path: '/pomodoro', description: '25/5 intervals for productivity', tags: ['pomodoro', 'beginners'] },
    { name: '50/10 Timer', path: '/50-10-timer', description: 'Deep work sessions', tags: ['50/10 timer', 'deep work'] },
    { name: '60/10 Timer', path: '/60-10-timer', description: 'Hour-long focus blocks', tags: ['60/10 timer', 'students'] },
    { name: '90/20 Timer', path: '/90-20-timer', description: 'Ultradian rhythm cycles', tags: ['90/20 timer', 'advanced'] },
    { name: 'Flowtime', path: '/flowtime', description: 'Flexible focus tracking', tags: ['flowtime', 'flexible'] },
    { name: 'Custom', path: '/custom-timer', description: 'Create your own rhythm', tags: ['custom', 'advanced'] },
    { name: 'Countdown', path: '/countdown', description: 'Simple countdown for any task', tags: ['countdown', 'timer'] },
    { name: 'Stopwatch', path: '/stopwatch', description: 'Track elapsed time', tags: ['stopwatch', 'timer'] },
];

export function RelatedContent({ currentPath, tags = [] }: RelatedContentProps) {
    // Find related timers (exclude current)
    const relatedTimers = TIMERS
        .filter(t => t.path !== currentPath)
        .slice(0, 6); // Show top 6

    // Find related blog posts based on tags
    const relatedGuides = blogPosts
        .filter(post => {
            // Match if any tag overlaps
            return post.tags.some(tag => tags.includes(tag)) ||
                post.title.toLowerCase().includes(tags[0]?.toLowerCase() || '');
        })
        .slice(0, 3);

    return (
        <div className="space-y-12">
            {/* Related Timers */}
            <section className="animate-fade-in">
                <div className="flex items-center gap-3 mb-6">
                    <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        Other Focus Techniques
                    </h2>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {relatedTimers.map((timer) => (
                        <Link
                            key={timer.path}
                            href={timer.path}
                            className="group p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all hover:-translate-y-1"
                        >
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {timer.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {timer.description}
                            </p>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Related Guides */}
            {relatedGuides.length > 0 && (
                <section className="animate-fade-in animation-delay-200">
                    <div className="flex items-center gap-3 mb-6">
                        <BookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            Helpful Guides
                        </h2>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {relatedGuides.map((post) => (
                            <Link
                                key={post.slug}
                                href={`/blog/${post.slug}`}
                                className="group flex flex-col h-full bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1"
                            >
                                <div className="p-5 flex flex-col flex-grow">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded">
                                            {post.category}
                                        </span>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                            {post.readTime}
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4 flex-grow">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center overflow-hidden text-sm font-medium text-blue-600 dark:text-blue-400 mt-auto">
                                        Read guide <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
