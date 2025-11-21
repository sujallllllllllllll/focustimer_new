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
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              60/10 Timer - Hour-Long Deep Work
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              60 minutes of deep focus followed by 10-minute breaks
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/30 rounded-full">
              <span className="text-sm font-medium text-orange-900 dark:text-orange-100">
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
            <h2>About the 60/10 Timer</h2>
            <p>
              The 60/10 technique provides full hour-long focus sessions, ideal for 
              deep work that requires sustained concentration and flow state. The 
              10-minute breaks help maintain energy throughout the day.
            </p>
            <h3>Perfect For:</h3>
            <ul>
              <li>Complex programming tasks</li>
              <li>Academic research and writing</li>
              <li>Strategic planning and analysis</li>
              <li>Creative projects requiring deep focus</li>
            </ul>
          </article>
        </div>
      </main>

      <MiniTimer
        timeRemaining={timeRemaining}
        status={status}
        timerName="60/10 Timer"
        onToggle={handleToggle}
      />
      
      <PiPTimer
        timeRemaining={timeRemaining}
        status={status}
        timerName="60/10 Timer"
        onToggle={handleToggle}
      />
    </div>
  );
}