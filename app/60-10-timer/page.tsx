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

export default function Timer6010Page() {
  const { preferences, setPreferences } = useTimerStore();
  const [config, setConfig] = useState(TIMER_PRESETS['60-10']);

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
    onSessionComplete: (session: SessionType) => {
      console.log(`${session} session completed`);
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
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-orange-950 dark:to-gray-900"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-200 dark:bg-orange-500 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-200 dark:bg-amber-500 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-yellow-200 dark:bg-yellow-500 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-6 sm:py-8 md:py-12 relative">
        <div className="max-w-4xl mx-auto space-y-8 sm:space-y-10 md:space-y-12">
          <div className="text-center space-y-2 sm:space-y-4 animate-fade-in">
            <div className="inline-block">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 dark:from-orange-400 dark:via-amber-400 dark:to-yellow-400 bg-clip-text text-transparent leading-tight">
                60/10 Timer
              </h1>
              <div className="h-1 w-24 sm:w-32 mx-auto bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mt-2"></div>
            </div>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 font-medium">
              Hour-Long Deep Work
            </p>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              60 minutes of deep focus followed by 10-minute breaks
            </p>
          </div>

          <div className="text-center animate-fade-in animation-delay-200">
            <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-lg border border-orange-200 dark:border-orange-800/50 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
              <span className="text-xs sm:text-sm font-semibold text-orange-900 dark:text-orange-100 tracking-wide">
                Session {currentCycle}
              </span>
            </div>
          </div>

          <div className="animate-fade-in animation-delay-400">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 dark:from-orange-600 dark:to-amber-600 rounded-3xl blur-xl opacity-20"></div>
              <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 hover:shadow-3xl transition-all duration-500">
                <TimerDisplay
                  timeRemaining={timeRemaining}
                  currentSession={currentSession}
                  displayStyle={preferences.displayStyle}
                  progress={progress}
                />
              </div>
            </div>
          </div>

          <div className="animate-fade-in animation-delay-600">
            <TimerControls
              status={status}
              onStart={start}
              onPause={pause}
              onReset={reset}
              onSkip={skip}
              onPiP={async () => { const v = document.querySelector('video'); if (v && 'pictureInPictureEnabled' in document) { try { if (document.pictureInPictureElement) await document.exitPictureInPicture(); else { await v.play(); await new Promise(r => v.readyState >= 2 ? r(true) : v.addEventListener('loadedmetadata', () => r(true), { once: true })); await v.requestPictureInPicture(); } } catch (e) { console.warn('PiP failed:', e); } } }}
            />
          </div>

          <div className="animate-fade-in animation-delay-800">
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

          <div className="animate-fade-in animation-delay-1000">
            <article className="prose prose-base sm:prose-lg mx-auto px-4 sm:px-0">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent mb-4">
                  About the 60/10 Timer
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  The 60/10 technique provides full hour-long focus sessions, ideal for 
                  deep work that requires sustained concentration and flow state. The 
                  10-minute breaks help maintain energy throughout the day.
                </p>
                <h3 className="text-xl sm:text-2xl font-semibold text-orange-700 dark:text-orange-300 mb-3">
                  Perfect For:
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Complex programming tasks</li>
                  <li>Academic research and writing</li>
                  <li>Strategic planning and analysis</li>
                  <li>Creative projects requiring deep focus</li>
                </ul>
              </div>
            </article>
          </div>
        </div>
      </main>

      <MiniTimer timeRemaining={timeRemaining} status={status} timerName="60/10 Timer" onToggle={handleToggle} />
      <PiPTimer timeRemaining={timeRemaining} status={status} timerName="60/10 Timer" onToggle={handleToggle} />

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
