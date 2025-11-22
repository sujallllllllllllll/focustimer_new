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

export default function Timer5010Page() {
  const { preferences, setPreferences } = useTimerStore();
  const [config, setConfig] = useState(TIMER_PRESETS['50-10']);

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
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-green-950 dark:to-gray-900"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-200 dark:bg-green-500 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-200 dark:bg-emerald-500 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-teal-200 dark:bg-teal-500 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-6 sm:py-8 md:py-12 relative">
        <div className="max-w-4xl mx-auto space-y-8 sm:space-y-10 md:space-y-12">
          <div className="text-center space-y-2 sm:space-y-4 animate-fade-in">
            <div className="inline-block">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 dark:from-green-400 dark:via-emerald-400 dark:to-teal-400 bg-clip-text text-transparent leading-tight">
                50/10 Timer
              </h1>
              <div className="h-1 w-24 sm:w-32 mx-auto bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mt-2"></div>
            </div>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 font-medium">
              Extended Focus Sessions
            </p>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              50 minutes of focused work followed by 10-minute breaks
            </p>
          </div>

          <div className="text-center animate-fade-in animation-delay-200">
            <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-lg border border-green-200 dark:border-green-800/50 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs sm:text-sm font-semibold text-green-900 dark:text-green-100 tracking-wide">
                Session {currentCycle}
              </span>
            </div>
          </div>

          <div className="animate-fade-in animation-delay-400">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 dark:from-green-600 dark:to-emerald-600 rounded-3xl blur-xl opacity-20"></div>
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
            <article className="prose prose-base sm:prose-lg mx-auto px-4 sm:px-0 space-y-8">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent mb-4">
                  Free 50/10 Timer Online - Extended Focus Sessions
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  This free online 50/10 timer is perfect for deep work sessions requiring extended concentration. 
                  Work for 50 minutes with 10-minute breaks - ideal for complex tasks and creative projects.
                </p>

                <h3 className="text-xl sm:text-2xl font-semibold text-green-700 dark:text-green-300 mb-3">
                  How to Use the 50/10 Deep Work Timer
                </h3>
                <ol className="space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                  <li><strong>Step 1:</strong> Set up your workspace and eliminate distractions</li>
                  <li><strong>Step 2:</strong> Click "Start" to begin your 50-minute deep work session</li>
                  <li><strong>Step 3:</strong> Focus on one complex task for the full 50 minutes</li>
                  <li><strong>Step 4:</strong> Take a 10-minute break when the timer ends</li>
                  <li><strong>Step 5:</strong> Repeat cycles based on your energy levels</li>
                </ol>

                <h3 className="text-xl sm:text-2xl font-semibold text-green-700 dark:text-green-300 mb-3">
                  Perfect for Extended Focus Work
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                  <li>✓ Complex problem-solving and analysis</li>
                  <li>✓ Creative work and design projects</li>
                  <li>✓ Research and academic writing</li>
                  <li>✓ Programming and software development</li>
                  <li>✓ Content creation and editing</li>
                  <li>✓ Strategic planning and brainstorming</li>
                </ul>
              </div>

              {/* FAQ Section */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-green-700 dark:text-green-300 mb-6">
                  50/10 Timer FAQ
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      Why use 50/10 instead of 25/5 Pomodoro?
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      The 50/10 timer is better for deep work requiring extended concentration. While Pomodoro's 
                      25 minutes work for quick tasks, 50 minutes allow you to enter flow state for complex work.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      Is 50 minutes too long for focus sessions?
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      Not for deep work! Research shows that it takes 15-20 minutes to reach peak concentration. 
                      The 50-minute sessions maximize your time in this focused state.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      What should I do during 10-minute breaks?
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      Step away from your workspace, stretch, hydrate, or take a short walk. Avoid screens 
                      and social media to give your brain a proper rest before the next session.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      How many 50/10 cycles should I do per day?
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      Most people can handle 3-4 cycles (2.5-3.5 hours of deep work) per day. Start with 
                      2 cycles and gradually increase based on your energy and focus capacity.
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </main>

      <MiniTimer timeRemaining={timeRemaining} status={status} timerName="50/10 Timer" onToggle={handleToggle} />
      <PiPTimer timeRemaining={timeRemaining} status={status} timerName="50/10 Timer" />

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
