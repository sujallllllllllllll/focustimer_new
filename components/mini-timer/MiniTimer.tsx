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
    <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-2xl p-4 min-w-[220px] hover:shadow-3xl transition-all duration-300">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              {timerName}
            </span>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg p-1 transition-colors"
            aria-label="Hide mini timer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        {/* Time Display */}
        <div className="flex items-center justify-between">
          <div className="text-3xl font-bold tabular-nums bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            {formatTime(timeRemaining)}
          </div>
          
          <button
            onClick={onToggle}
            className="ml-3 p-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
            aria-label={isRunning ? 'Pause timer' : 'Start timer'}
          >
            {isRunning ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Progress indicator */}
        <div className="mt-3 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000"
            style={{ width: isRunning ? '100%' : '0%' }}
          ></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}