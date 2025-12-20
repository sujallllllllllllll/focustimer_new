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
import { RelatedContent } from '@/components/timer/RelatedContent';

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
            <article className="prose prose-base sm:prose-lg mx-auto px-4 sm:px-0 space-y-8">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent mb-4">
                  Using the 60/10 Timer for Maximum Focus
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  The 60/10 technique provides full hour-long focus sessions, ideal for
                  deep work that requires sustained concentration and flow state. By working for 60 minutes
                  and resting for 10, you align your effort with standard hourly blocks while maintaining
                  energy throughout the day.
                </p>

                <h3 className="text-xl sm:text-2xl font-semibold text-orange-700 dark:text-orange-300 mb-3">
                  How It Works
                </h3>
                <ol className="space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                  <li><strong>Step 1:</strong> Prepare your task list for the next hour</li>
                  <li><strong>Step 2:</strong> Start the 60-minute timer and eliminate all distractions</li>
                  <li><strong>Step 3:</strong> Work continuously until the timer rings</li>
                  <li><strong>Step 4:</strong> Take a complete 10-minute break away from screens</li>
                </ol>
              </div>

              {/* Who It's For */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-semibold text-orange-700 dark:text-orange-300 mb-4">
                  Who Should Use the 60/10 Timer?
                </h3>
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
                    <h4 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">Advanced Students</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Ideal for graduate students or those tackling complex subjects where 25 or 50 minutes isn't enough to grasp the material.
                    </p>
                  </div>
                  <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
                    <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">Senior Developers</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Perfect for architectural planning, system design, and solving difficult bugs that require holding complex mental models.
                    </p>
                  </div>
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                    <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">Writers</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Great for drafting chapters or long-form content where you need to stay in the narrative flow for extended periods.
                    </p>
                  </div>
                  <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
                    <h4 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">Data Analysts</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Excellent for deep data exploration and reporting tasks that require uninterrupted concentration.
                    </p>
                  </div>
                </div>
              </div>

              {/* Example Schedule */}
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-2xl shadow-xl border border-orange-200/50 dark:border-orange-800/50 p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-semibold text-orange-700 dark:text-orange-300 mb-4">
                  Example Morning Block: 3 Hours
                </h3>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-20 font-semibold text-orange-600 dark:text-orange-400">9:00-10:00</span>
                    <div>
                      <p className="font-medium">Session 1: Deep Work - Core Task</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Tackle your most difficult task of the day while fresh</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-20 font-semibold text-amber-600 dark:text-amber-400">10:00-10:10</span>
                    <p className="italic text-sm">Break: Stretch, water, no phone</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-20 font-semibold text-orange-600 dark:text-orange-400">10:10-11:10</span>
                    <div>
                      <p className="font-medium">Session 2: Secondary Focus</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Continue main task or switch to second priority</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-20 font-semibold text-amber-600 dark:text-amber-400">11:10-11:20</span>
                    <p className="italic text-sm">Break: Light movement, fresh air</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-20 font-semibold text-orange-600 dark:text-orange-400">11:20-12:20</span>
                    <div>
                      <p className="font-medium">Session 3: Wrap Up & Admin</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Processing email, planning next day, meetings prep</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-semibold text-orange-700 dark:text-orange-300 mb-4">
                  Why 60 Minutes?
                </h3>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 text-orange-500 text-xl">✓</span>
                    <div>
                      <strong>Maximizes Flow:</strong> It takes time to get into the zone. A 60-minute block ensures you spend at least 40-45 minutes in a highly productive flow state.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 text-orange-500 text-xl">✓</span>
                    <div>
                      <strong>Aligns with Meetings:</strong> Since most calendars run on hourly blocks, this timer fits perfectly into gaps between meetings.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 text-orange-500 text-xl">✓</span>
                    <div>
                      <strong>Training for Endurance:</strong> Regularly working in hour-long bursts improves your mental stamina and ability to focus for longer periods.
                    </div>
                  </li>
                </ul>
              </div>

              {/* FAQ Section */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-orange-700 dark:text-orange-300 mb-6">
                  60/10 Timer FAQ
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      Is 60 minutes too long to focus?
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      For beginners, yes. Start with Pomodoro (25/5). But for experienced knowledge workers, 60 minutes is often optimal for getting meaningful work done without constant interruptions.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      How is this different from 50/10?
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      The extra 10 minutes might seem small, but it aligns perfectly with hour-long calendar slots. It allows for a slightly deeper immersion before the break.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      Can I check email during the 60 minutes?
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      No. The power of this timer comes from 60 minutes of <em>uninterrupted</em> focus. Save email and communications for a separate block or check them during the break if absolutely necessary (though not recommended).
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* Related Content */}
            <div className="max-w-4xl mx-auto mt-16 px-4 sm:px-0">
              <RelatedContent currentPath="/60-10-timer" tags={['60/10 timer', 'deep work', 'focus']} />
            </div>
          </div>
        </div>
      </main>

      <MiniTimer timeRemaining={timeRemaining} status={status} timerName="60/10 Timer" onToggle={handleToggle} />
      <PiPTimer timeRemaining={timeRemaining} status={status} timerName="60/10 Timer" />

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
