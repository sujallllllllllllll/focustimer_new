'use client';

import { useState } from 'react';
import { TimerDisplay } from '@/components/timer/TimerDisplay';
import { TimerControls } from '@/components/timer/TimerControls';
import { TimerSettings } from '@/components/timer/TimerSettings';
import { MiniTimer } from '@/components/mini-timer/MiniTimer';
import { PiPTimer } from '@/components/mini-timer/PiPTimer';
import { useTimer } from '@/hooks/useTimer';
import { useTimerStore } from '@/store/timerStore';
import { TIMER_PRESETS } from '@/constants/timerConfigs';
import { SessionType } from '@/types/timer';

export default function FlowtimePage() {
  const { preferences, setPreferences } = useTimerStore();
  const [config, setConfig] = useState(TIMER_PRESETS.flowtime);

  const {
    timeRemaining,
    status,
    currentSession,
    currentCycle,
    start,
    pause,
    reset,
    skip,
  } = useTimer({
    config: {
      ...config,
      autoStartBreak: preferences.autoStartNextSession,
      autoStartWork: preferences.autoStartNextSession,
    },
    onSessionComplete: (_session: SessionType) => {
      // Session completed
    },
  });

  const totalDuration =
    currentSession === 'work' ? config.workDuration : config.breakDuration;
  const progress = totalDuration > 0 ? ((totalDuration - timeRemaining) / totalDuration) * 100 : 0;

  const handleToggle = () => {
    if (status === 'running') {
      pause();
    } else {
      start();
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 dark:from-gray-900 dark:via-teal-950 dark:to-gray-900"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-200 dark:bg-teal-500 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-200 dark:bg-cyan-500 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-200 dark:bg-blue-500 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-12 relative">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header Section */}
          <div className="text-center space-y-4 animate-fade-in">
            <div className="inline-block">
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 dark:from-teal-400 dark:via-cyan-400 dark:to-blue-400 bg-clip-text text-transparent mb-4 leading-tight">
                Flowtime
              </h1>
              <div className="h-1 w-32 mx-auto bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full"></div>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300 font-medium">
              Flexible Focus Sessions
            </p>
            <p className="text-base text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Adaptive timing that follows your natural flow state
            </p>
          </div>

          {/* Cycle Counter */}
          <div className="text-center animate-fade-in animation-delay-200">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-lg border border-teal-200 dark:border-teal-800/50 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></div>
              <span className="text-sm font-semibold text-teal-900 dark:text-teal-100 tracking-wide">
                Flow Session {currentCycle}
              </span>
            </div>
          </div>

          {/* Timer Display - Enhanced Container */}
          <div className="animate-fade-in animation-delay-400">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-400 dark:from-teal-600 dark:to-cyan-600 rounded-3xl blur-xl opacity-20"></div>
              <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 hover:shadow-3xl transition-all duration-500">
                <TimerDisplay
                  timeRemaining={timeRemaining}
                  currentSession={currentSession}
                  displayStyle={preferences.displayStyle}
                  progress={progress}
                />
              </div>
            </div>
          </div>

          {/* Timer Controls - Enhanced */}
          <div className="animate-fade-in animation-delay-600">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6">
              <TimerControls
                status={status}
                onStart={start}
                onPause={pause}
                onReset={reset}
                onSkip={skip}
onPiP={() => { const video = document.querySelector('video'); if (video && 'pictureInPictureEnabled' in document) { if (document.pictureInPictureElement) { document.exitPictureInPicture(); } else { video.requestPictureInPicture().catch(console.warn); } } }}
              />
            </div>
          </div>

          {/* Timer Settings - Enhanced */}
          <div className="animate-fade-in animation-delay-800">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6">
              <TimerSettings
                preferences={preferences}
                onPreferencesChange={setPreferences}
                workDuration={config.workDuration}
                breakDuration={config.breakDuration}
                onWorkDurationChange={(duration) =>
                  setConfig({ ...config, workDuration: duration })
                }
                onBreakDurationChange={(duration) =>
                  setConfig({ ...config, breakDuration: duration })
                }
              />
            </div>
          </div>

          {/* Information Section - Enhanced */}
          <div className="animate-fade-in animation-delay-1000">
            <article className="prose prose-lg dark:prose-invert mx-auto bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
                What is Flowtime?
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Flowtime is a flexible productivity technique that adapts to your natural 
                work rhythm. Unlike rigid timers, you work for as long as you feel focused, 
                then take proportional breaks (typically 20% of your work time).
              </p>
              <h3 className="text-2xl font-semibold text-teal-700 dark:text-teal-300 mt-6">
                How to Use Flowtime:
              </h3>
              <ol className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="pl-2">Start working when you feel ready</li>
                <li className="pl-2">Continue until you naturally feel the need for a break</li>
                <li className="pl-2">Take a break proportional to your work time</li>
                <li className="pl-2">Repeat the cycle based on your energy levels</li>
              </ol>
              <h3 className="text-2xl font-semibold text-teal-700 dark:text-teal-300 mt-6">
                Benefits:
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="pl-2">Respects your natural attention span</li>
                <li className="pl-2">Prevents interruption during flow states</li>
                <li className="pl-2">Reduces anxiety about time constraints</li>
                <li className="pl-2">Adapts to different types of work</li>
              </ul>
            </article>
          </div>
        </div>
      </main>

      <MiniTimer
        timeRemaining={timeRemaining}
        status={status}
        timerName="Flowtime"
        onToggle={handleToggle}
      />
      <PiPTimer timeRemaining={timeRemaining} status={status} timerName="Flowtime" />

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
        }
        .animation-delay-600 {
          animation-delay: 0.6s;
          opacity: 0;
        }
        .animation-delay-800 {
          animation-delay: 0.8s;
          opacity: 0;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
          opacity: 0;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
