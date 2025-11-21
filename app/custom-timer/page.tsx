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

export default function CustomTimerPage() {
  const { preferences, setPreferences } = useTimerStore();
  const [config, setConfig] = useState(TIMER_PRESETS.custom);

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
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Custom Timer - Your Perfect Schedule
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Create your ideal work and break intervals
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
              <span className="text-sm font-medium text-purple-900 dark:text-purple-100">
                Session {currentCycle}
              </span>
            </div>
          </div>

          <TimerDisplay
            timeRemaining={timeRemaining}
            currentSession={currentSession}
            displayStyle={preferences.displayStyle}
            progress={progress}
          />

          <TimerControls
            status={status}
            onStart={start}
            onPause={pause}
            onReset={reset}
            onSkip={skip}
            onPiP={async () => { const v = document.querySelector('video'); if (v && 'pictureInPictureEnabled' in document) { try { if (document.pictureInPictureElement) await document.exitPictureInPicture(); else { await v.play(); await new Promise(r => v.readyState >= 2 ? r(true) : v.addEventListener('loadedmetadata', () => r(true), { once: true })); await v.requestPictureInPicture(); } } catch (e) { console.warn('PiP failed:', e); } } }}
          />

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

          <article className="prose prose-lg dark:prose-invert mx-auto">
            <h2>Create Your Perfect Timer</h2>
            <p>
              Everyone works differently. Use the custom timer to find your optimal 
              work and break intervals. Experiment with different durations to 
              discover what works best for your productivity style.
            </p>
            <h3>Tips for Custom Intervals:</h3>
            <ul>
              <li>Start with shorter intervals and gradually increase</li>
              <li>Match break length to work intensity (harder work = longer breaks)</li>
              <li>Consider your natural attention span</li>
              <li>Adjust based on the type of work you're doing</li>
            </ul>
          </article>
        </div>
      </main>

      <MiniTimer
        timeRemaining={timeRemaining}
        status={status}
        timerName="Custom Timer"
        onToggle={handleToggle}
      />
      <PiPTimer timeRemaining={timeRemaining} status={status} timerName="Custom Timer" onToggle={handleToggle} />
    </div>
  );
}