'use client';

import { useState, useEffect } from 'react';
import { timerHistory } from '@/lib/storage/timerHistory';
import { formatTime } from '@/lib/utils/formatTime';
import { Clock, CheckCircle } from 'lucide-react';

export function TimerStatsPanel() {
  const [stats, setStats] = useState<{sessions: number; focusTime: number} | null>(null);
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'total'>('today');

  useEffect(() => {
    const statsData = timerHistory.getStats();
    setStats(statsData[timeRange]);
  }, [timeRange]);

  if (!stats) return null;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Your Statistics
        </h2>
        
        <div className="flex gap-2">
          {(['today', 'week', 'total'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                timeRange === range
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <StatCard
          icon={<CheckCircle className="w-6 h-6 text-green-500" />}
          label="Sessions"
          value={stats.sessions}
        />
        
        <StatCard
          icon={<Clock className="w-6 h-6 text-blue-500" />}
          label="Focus Time"
          value={formatTime(stats.focusTime)}
        />
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        {icon}
      </div>
      <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
        {value}
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400">
        {label}
      </div>
    </div>
  );
}
