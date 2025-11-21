'use client';

import { formatTime } from '@/lib/utils/formatTime';
import { SessionType } from '@/types/timer';

interface TimerDisplayProps {
  timeRemaining: number;
  currentSession: SessionType;
  displayStyle?: 'circular' | 'linear';
  progress: number; // 0-100
}

export function TimerDisplay({
  timeRemaining,
  currentSession,
  displayStyle = 'circular',
  progress,
}: TimerDisplayProps) {
  const sessionLabel = {
    work: 'Focus Time',
    break: 'Break Time',
    longBreak: 'Long Break',
  };

  const sessionClass = {
    work: 'session-work',
    break: 'session-break', 
    longBreak: 'session-longbreak'
  };

  return (
    <div className="timer-container flex flex-col items-center justify-center space-y-6 sm:space-y-8">
      {/* Session Label */}
      <div className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wide shadow-lg ${sessionClass[currentSession]}`}>
        {sessionLabel[currentSession]}
      </div>

      {/* Timer Display */}
      {displayStyle === 'circular' ? (
        <CircularTimer timeRemaining={timeRemaining} progress={progress} />
      ) : (
        <LinearTimer timeRemaining={timeRemaining} progress={progress} />
      )}
    </div>
  );
}

function CircularTimer({ timeRemaining, progress }: { timeRemaining: number; progress: number }) {
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const safeProgress = isNaN(progress) ? 0 : Math.max(0, Math.min(100, progress));
  const strokeDashoffset = circumference - (safeProgress / 100) * circumference;

  return (
    <div className="relative w-full max-w-[280px] mx-auto">
      <svg className="transform -rotate-90 w-full h-auto" viewBox="0 0 280 280">
        {/* Background circle */}
        <circle
          cx="140"
          cy="140"
          r={radius}
          stroke="currentColor"
          strokeWidth="12"
          fill="none"
          className="text-gray-200 dark:text-gray-700"
        />
        {/* Progress circle */}
        <circle
          cx="140"
          cy="140"
          r={radius}
          stroke="currentColor"
          strokeWidth="12"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="text-blue-500 dark:text-blue-400 progress-ring"
        />
      </svg>
      
      {/* Time text in center */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-4xl sm:text-5xl md:text-6xl font-bold tabular-nums text-gray-900 dark:text-gray-100">
          {formatTime(timeRemaining)}
        </div>
      </div>
    </div>
  );
}

function LinearTimer({ timeRemaining, progress }: { timeRemaining: number; progress: number }) {
  const safeProgress = isNaN(progress) ? 0 : Math.max(0, Math.min(100, progress));
  
  return (
    <div className="w-full max-w-md space-y-4 sm:space-y-6">
      {/* Time display */}
      <div className="text-5xl sm:text-6xl md:text-7xl font-bold tabular-nums text-center text-gray-900 dark:text-gray-100">
        {formatTime(timeRemaining)}
      </div>
      
      {/* Progress bar */}
      <div className="w-full h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 progress-bar rounded-full shadow-sm"
          style={{ width: `${safeProgress}%` }}
        />
      </div>
    </div>
  );
}
