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
import { MotionConfig, motion } from 'framer-motion';

export default function PomodoroPage() {
  const { preferences, setPreferences } = useTimerStore();
  const [config, setConfig] = useState(TIMER_PRESETS.pomodoro);

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
    currentSession === 'work'
      ? config.workDuration
      : currentSession === 'break'
      ? config.breakDuration
      : config.longBreakDuration || config.breakDuration;

  const progress = totalDuration > 0 ? ((totalDuration - timeRemaining) / totalDuration) * 100 : 0;

  const handleToggle = () => {
    if (status === 'running') {
      pause();
    } else {
      start();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950/20">
      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 sm:py-12 md:py-16">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Hero Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              Pomodoro Timer
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-medium">
              Master your focus with science-backed 25-minute work sessions
            </p>
          </motion.div>

          {/* Session Cycle Indicator - Elevated */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative px-8 py-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 dark:border-gray-700/50">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 animate-pulse"></div>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                  Cycle {currentCycle} of {config.cyclesBeforeLongBreak || 4}
                </span>
                {currentCycle >= (config.cyclesBeforeLongBreak || 4) && (
                  <span className="ml-2 text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full font-bold">
                    Long Break Soon!
                  </span>
                )}
              </div>
            </div>
          </motion.div>

          {/* Timer Display - Glass Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl -z-10"></div>
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 dark:border-gray-800/50 p-8 sm:p-12">
              <TimerDisplay
                timeRemaining={timeRemaining}
                currentSession={currentSession}
                displayStyle={preferences.displayStyle}
                progress={progress}
              />
            </div>
          </motion.div>

          {/* Timer Controls */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center"
          >
            <TimerControls
              status={status}
              onStart={start}
              onPause={pause}
              onReset={reset}
              onSkip={skip}
              onPiP={async () => {
                const video = document.querySelector('video');
                if (video && 'pictureInPictureEnabled' in document) {
                  try {
                    if (document.pictureInPictureElement) {
                      await document.exitPictureInPicture();
                    } else {
                      await video.play();
                      await new Promise(resolve => {
                        if (video.readyState >= 2) resolve(true);
                        else video.addEventListener('loadedmetadata', () => resolve(true), { once: true });
                      });
                      await video.requestPictureInPicture();
                    }
                  } catch (e) {
                    console.warn('PiP failed:', e);
                  }
                }
              }}
            />
          </motion.div>

          {/* Settings Panel - Collapsible Style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8">
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
          </motion.div>

          {/* Enhanced Info Section */}
          <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="prose prose-lg dark:prose-invert max-w-none"
          >
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-3xl p-8 sm:p-12 border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
              <h2 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                What is the Pomodoro Technique?
              </h2>
              <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                Developed by Francesco Cirillo in the late 1980s, the Pomodoro Technique is a proven time management method that uses focused work intervals (typically 25 minutes) followed by short breaks to maximize productivity and maintain mental clarity.
              </p>

              <div className="grid md:grid-cols-2 gap-8 mt-10">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How It Works</h3>
                  <ol className="space-y-3 text-gray-600 dark:text-gray-300">
                    <li className="flex items-start gap-3"><span className="font-bold text-blue-600">1.</span> Choose a task</li>
                    <li className="flex items-start gap-3"><span className="font-bold text-blue-600">2.</span> Set timer to 25 minutes</li>
                    <li className="flex items-start gap-3"><span className="font-bold text-blue-600">3.</span> Work until the timer rings</li>
                    <li className="flex items-start gap-3"><span className="font-bold text-blue-600">4.</span> Take a 5-minute break</li>
                    <li className="flex items-start gap-3"><span className="font-bold text-purple-600">5.</span> Every 4th break → 15–30 min long break</li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Proven Benefits</h3>
                  <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                    <li>✓ Sharper focus & fewer distractions</li>
                    <li>✓ Reduced burnout with regular breaks</li>
                    <li>✓ Better time estimation skills</li>
                    <li>✓ Increased daily output</li>
                    <li>✓ Greater sense of accomplishment</li>
                  </ul>
                </div>
              </div>

              <div className="mt-10 p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl border border-blue-200 dark:border-blue-800">
                <p className="text-center font-semibold text-gray-800 dark:text-gray-200">
                  💡 <strong>Pro Tip:</strong> Use breaks to stand up, stretch, hydrate, or step outside. Your brain will thank you.
                </p>
              </div>
            </div>
          </motion.article>
        </div>
      </main>

      {/* Floating Mini Timer & PiP */}
      <MiniTimer
        timeRemaining={timeRemaining}
        status={status}
        timerName="Pomodoro"
        onToggle={handleToggle}
      />

      <PiPTimer
        timeRemaining={timeRemaining}
        status={status}
        timerName="Pomodoro"
        onToggle={handleToggle}
      />
    </div>
  );
}