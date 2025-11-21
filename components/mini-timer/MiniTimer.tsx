'use client';

import { useEffect, useState } from 'react';
import { Play, Pause, X } from 'lucide-react';
import { formatTime } from '@/lib/utils/formatTime';
import { TimerStatus } from '@/types/timer';
import { usePageVisibility } from '@/hooks/usePageVisibility';

interface MiniTimerProps {
  timeRemaining: number;
  status: TimerStatus;
  timerName: string;
  onToggle: () => void;
}

export function MiniTimer({ timeRemaining, status, timerName, onToggle }: MiniTimerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const isPageVisible = usePageVisibility();
  const isRunning = status === 'running';

  // Show mini timer when page is not visible and timer is running
  const shouldShow = !isPageVisible && isRunning;
  
  useEffect(() => {
    setIsVisible(shouldShow);
  }, [shouldShow]);

  // Update document title with timer
  useEffect(() => {
    if (isRunning) {
      document.title = `${formatTime(timeRemaining)} - ${timerName}`;
    } else {
      document.title = 'TimeMaster - Focus Timer Collection';
    }

    return () => {
      document.title = 'TimeMaster - Focus Timer Collection';
    };
  }, [timeRemaining, timerName, isRunning]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 min-w-[200px]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {timerName}
          </span>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            aria-label="Hide mini timer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold tabular-nums text-gray-900 dark:text-gray-100">
            {formatTime(timeRemaining)}
          </div>
          
          <button
            onClick={onToggle}
            className="ml-3 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors"
            aria-label={isRunning ? 'Pause timer' : 'Start timer'}
          >
            {isRunning ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}