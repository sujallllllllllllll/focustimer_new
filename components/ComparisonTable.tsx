'use client';

import Link from 'next/link';
import { Timer, Clock, Hourglass, TrendingUp, Zap, Settings2 } from 'lucide-react';

const timerData = [
  {
    name: 'Pomodoro',
    href: '/pomodoro',
    icon: <Timer className="w-5 h-5" />,
    work: '25 min',
    break: '5 min',
    bestFor: 'General productivity',
    difficulty: 'Beginner',
    focusType: 'Short bursts',
    popular: true,
    color: 'blue'
  },
  {
    name: '50/10',
    href: '/50-10-timer',
    icon: <Clock className="w-5 h-5" />,
    work: '50 min',
    break: '10 min',
    bestFor: 'Deep work tasks',
    difficulty: 'Intermediate',
    focusType: 'Extended focus',
    color: 'green'
  },
  {
    name: '60/10',
    href: '/60-10-timer',
    icon: <Hourglass className="w-5 h-5" />,
    work: '60 min',
    break: '10 min',
    bestFor: 'Complex projects',
    difficulty: 'Intermediate',
    focusType: 'Deep focus',
    color: 'orange'
  },
  {
    name: '90/20',
    href: '/90-20-timer',
    icon: <TrendingUp className="w-5 h-5" />,
    work: '90 min',
    break: '20 min',
    bestFor: 'Creative work',
    difficulty: 'Advanced',
    focusType: 'Flow state',
    color: 'red'
  },
  {
    name: 'Flowtime',
    href: '/flowtime',
    icon: <Zap className="w-5 h-5" />,
    work: 'Flexible',
    break: 'Proportional',
    bestFor: 'Variable tasks',
    difficulty: 'Advanced',
    focusType: 'Natural rhythm',
    color: 'teal'
  },
  {
    name: 'Custom',
    href: '/custom-timer',
    icon: <Settings2 className="w-5 h-5" />,
    work: 'Your choice',
    break: 'Your choice',
    bestFor: 'Personal needs',
    difficulty: 'Any',
    focusType: 'Customizable',
    color: 'purple'
  }
];

export function ComparisonTable() {
  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 overflow-hidden">
      <h3 className="text-xl sm:text-2xl font-bold text-center text-gray-900 dark:text-gray-100 mb-6">
        Compare All Timers
      </h3>
      
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 px-2 text-sm font-semibold text-gray-900 dark:text-gray-100">Timer</th>
              <th className="text-center py-3 px-2 text-sm font-semibold text-gray-900 dark:text-gray-100">Work</th>
              <th className="text-center py-3 px-2 text-sm font-semibold text-gray-900 dark:text-gray-100">Break</th>
              <th className="text-center py-3 px-2 text-sm font-semibold text-gray-900 dark:text-gray-100">Best For</th>
              <th className="text-center py-3 px-2 text-sm font-semibold text-gray-900 dark:text-gray-100">Level</th>
              <th className="text-center py-3 px-2 text-sm font-semibold text-gray-900 dark:text-gray-100">Action</th>
            </tr>
          </thead>
          <tbody>
            {timerData.map((timer, index) => (
              <tr key={timer.name} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors">
                <td className="py-4 px-2">
                  <div className="flex items-center gap-3">
                    <div className={`text-${timer.color}-600 dark:text-${timer.color}-400`}>
                      {timer.icon}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
                        {timer.name}
                        {timer.popular && (
                          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-full">
                            Popular
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-2 text-center text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {timer.work}
                </td>
                <td className="py-4 px-2 text-center text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {timer.break}
                </td>
                <td className="py-4 px-2 text-center text-sm text-gray-600 dark:text-gray-400">
                  {timer.bestFor}
                </td>
                <td className="py-4 px-2 text-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    timer.difficulty === 'Beginner' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' :
                    timer.difficulty === 'Intermediate' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200' :
                    timer.difficulty === 'Advanced' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200' :
                    'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                  }`}>
                    {timer.difficulty}
                  </span>
                </td>
                <td className="py-4 px-2 text-center">
                  <Link
                    href={timer.href}
                    className={`inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-lg transition-colors bg-${timer.color}-100 dark:bg-${timer.color}-900/30 text-${timer.color}-800 dark:text-${timer.color}-200 hover:bg-${timer.color}-200 dark:hover:bg-${timer.color}-900/50`}
                  >
                    Try It
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}