'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Square } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { PiPTimer } from '@/components/mini-timer/PiPTimer';
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

  const handleToggle = () => {
    if (isRunning) {
      handlePause();
    } else {
      handleStart();
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-gray-900 dark:via-slate-950 dark:to-gray-900"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-slate-200 dark:bg-slate-500 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gray-200 dark:bg-gray-500 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-zinc-200 dark:bg-zinc-500 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-6 sm:py-8 md:py-12 relative">
        <div className="max-w-4xl mx-auto space-y-8 sm:space-y-10 md:space-y-12">
          <div className="text-center space-y-2 sm:space-y-4 animate-fade-in">
            <div className="inline-block">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-600 via-gray-600 to-zinc-600 dark:from-slate-400 dark:via-gray-400 dark:to-zinc-400 bg-clip-text text-transparent leading-tight">
                Stopwatch
              </h1>
              <div className="h-1 w-24 sm:w-32 mx-auto bg-gradient-to-r from-slate-500 to-gray-500 rounded-full mt-2"></div>
            </div>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 font-medium">
              Track Your Time
            </p>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Precise time tracking with lap functionality
            </p>
          </div>

          <div className="animate-fade-in animation-delay-400">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-400 to-gray-400 dark:from-slate-600 dark:to-gray-600 rounded-3xl blur-xl opacity-20"></div>
              <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 hover:shadow-3xl transition-all duration-500">
                <div className="text-center">
                  <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tabular-nums text-gray-900 dark:text-gray-100">
                    {formatTime(time)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="animate-fade-in animation-delay-600">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {isRunning ? (
                <Button onClick={handlePause} size="lg" variant="primary" className="min-w-[120px] sm:min-w-[140px]">
                  <Pause className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Pause
                </Button>
              ) : (
                <Button onClick={handleStart} size="lg" variant="primary" className="min-w-[120px] sm:min-w-[140px]">
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Start
                </Button>
              )}

              <Button onClick={handleLap} size="lg" variant="secondary" disabled={!isRunning}>
                <Square className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                <span className="hidden sm:inline">Lap</span>
              </Button>

              <Button onClick={handleReset} size="lg" variant="secondary">
                <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                <span className="hidden sm:inline">Reset</span>
              </Button>

              <Button
                onClick={async () => { const v = document.querySelector('video'); if (v && 'pictureInPictureEnabled' in document) { try { if (document.pictureInPictureElement) await document.exitPictureInPicture(); else { await v.play(); await new Promise(r => v.readyState >= 2 ? r(true) : v.addEventListener('loadedmetadata', () => r(true), { once: true })); await v.requestPictureInPicture(); } } catch (e) { console.warn('PiP failed:', e); } } }}
                size="lg"
                variant="outline"
                className="hidden sm:flex"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 4a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V4zm2 0v12h12V4H4zm8 6a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-3z"/>
                </svg>
                PiP
              </Button>
            </div>
          </div>

          {laps.length > 0 && (
            <div className="animate-fade-in animation-delay-800">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Lap Times
                </h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {laps.map((lapTime, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2 px-3 bg-white dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600"
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
            </div>
          )}

          <div className="animate-fade-in animation-delay-1000">
            <article className="prose prose-base sm:prose-lg mx-auto px-4 sm:px-0">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-slate-600 to-gray-600 dark:from-slate-400 dark:to-gray-400 bg-clip-text text-transparent mb-4">
                  Precision Stopwatch
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  A reliable stopwatch for timing activities, workouts, or any task 
                  that requires precise time measurement. Use the lap feature to track 
                  intervals and splits.
                </p>
                <h3 className="text-xl sm:text-2xl font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  Perfect For:
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Sports and fitness timing</li>
                  <li>Cooking and recipe timing</li>
                  <li>Work task duration tracking</li>
                  <li>Study session measurement</li>
                  <li>Meeting and presentation timing</li>
                </ul>
              </div>
            </article>
          </div>
        </div>
      </main>

      <PiPTimer timeRemaining={time} status={isRunning ? 'running' : 'idle'} timerName="Stopwatch" onToggle={handleToggle} />

      <style jsx>{`
        @keyframes blob { 0%, 100% { transform: translate(0px, 0px) scale(1); } 33% { transform: translate(30px, -50px) scale(1.1); } 66% { transform: translate(-20px, 20px) scale(0.9); } }
        @keyframes fade-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-blob { animation: blob 7s infinite; }
        .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
        .animation-delay-200 { animation-delay: 0.2s; opacity: 0; }
        .animation-delay-400 { animation-delay: 0.4s; opacity: 0; }
        .animation-delay-600 { animation-delay: 0.6s; opacity: 0; }
        .animation-delay-800 { animation-delay: 0.8s; opacity: 0; }
        .animation-delay-1000 { animation-delay: 1s; opacity: 0; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
}
