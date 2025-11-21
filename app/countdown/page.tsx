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

export default function CountdownPage() {
  const { preferences, setPreferences } = useTimerStore();
  const [config, setConfig] = useState(TIMER_PRESETS.countdown);

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
      autoStartBreak: false,
      autoStartWork: false,
    },
    onSessionComplete: (session: SessionType) => {
      console.log(`Countdown completed`);
    },
  });

  const totalDuration = config.workDuration;
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
              Countdown Timer - Set Any Duration
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Simple countdown timer for any task or activity
            </p>
          </div>

          <TimerDisplay
            timeRemaining={timeRemaining}
            currentSession="work"
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
            breakDuration={0}
            onWorkDurationChange={(duration) =>
              setConfig({ ...config, workDuration: duration })
            }
            onBreakDurationChange={() => {}}
          />

          <article className="prose prose-lg dark:prose-invert mx-auto">
            <h2>Simple Countdown Timer</h2>
            <p>
              A versatile countdown timer for any activity. Set your desired duration 
              and get notified when time is up. Perfect for cooking, exercise, 
              meetings, or any time-bound activity.
            </p>
            <h3>Use Cases:</h3>
            <ul>
              <li>Cooking and baking timers</li>
              <li>Exercise and workout intervals</li>
              <li>Meeting and presentation timing</li>
              <li>Study sessions and breaks</li>
              <li>Meditation and mindfulness</li>
            </ul>
          </article>
        </div>
      </main>

      <MiniTimer
        timeRemaining={timeRemaining}
        status={status}
        timerName="Countdown"
        onToggle={handleToggle}
      />
      <PiPTimer timeRemaining={timeRemaining} status={status} timerName="Countdown" onToggle={handleToggle} />
    </div>
  );
}