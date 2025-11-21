'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Square } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { formatTime } from '@/lib/utils/formatTime';

export default function StopwatchPage() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };
  const handleLap = () => {
    if (isRunning) {
      setLaps(prev => [time, ...prev]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Stopwatch - Track Your Time
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Precise time tracking with lap functionality
            </p>
          </div>

          {/* Stopwatch Display */}
          <div className="text-center">
            <div className="text-8xl font-bold tabular-nums text-gray-900 dark:text-gray-100 mb-8">
              {formatTime(time)}
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {isRunning ? (
              <Button
                onClick={handlePause}
                size="lg"
                variant="primary"
                className="min-w-[140px]"
              >
                <Pause className="w-5 h-5 mr-2" />
                Pause
              </Button>
            ) : (
              <Button
                onClick={handleStart}
                size="lg"
                variant="primary"
                className="min-w-[140px]"
              >
                <Play className="w-5 h-5 mr-2" />
                Start
              </Button>
            )}

            <Button
              onClick={handleLap}
              size="lg"
              variant="secondary"
              disabled={!isRunning}
            >
              <Square className="w-5 h-5 mr-2" />
              Lap
            </Button>

            <Button
              onClick={handleReset}
              size="lg"
              variant="secondary"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Reset
            </Button>
          </div>

          {/* Lap Times */}
          {laps.length > 0 && (
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Lap Times
              </h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {laps.map((lapTime, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 px-3 bg-white dark:bg-gray-700 rounded"
                  >
                    <span className="text-gray-600 dark:text-gray-400">
                      Lap {laps.length - index}
                    </span>
                    <span className="font-mono text-gray-900 dark:text-gray-100">
                      {formatTime(lapTime)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <article className="prose prose-lg dark:prose-invert mx-auto">
            <h2>Precision Stopwatch</h2>
            <p>
              A reliable stopwatch for timing activities, workouts, or any task 
              that requires precise time measurement. Use the lap feature to track 
              intervals and splits.
            </p>
            <h3>Perfect For:</h3>
            <ul>
              <li>Sports and fitness timing</li>
              <li>Cooking and recipe timing</li>
              <li>Work task duration tracking</li>
              <li>Study session measurement</li>
              <li>Meeting and presentation timing</li>
            </ul>
          </article>
        </div>
      </main>
    </div>
  );
}