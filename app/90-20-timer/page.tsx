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

export default function Timer9020Page() {
  const { preferences, setPreferences } = useTimerStore();
  const [config, setConfig] = useState(TIMER_PRESETS['90-20']);

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
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 dark:from-gray-900 dark:via-red-950 dark:to-gray-900"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-200 dark:bg-red-500 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-rose-200 dark:bg-rose-500 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-200 dark:bg-pink-500 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-6 sm:py-8 md:py-12 relative">
        <div className="max-w-4xl mx-auto space-y-8 sm:space-y-10 md:space-y-12">
          <div className="text-center space-y-2 sm:space-y-4 animate-fade-in">
            <div className="inline-block">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 dark:from-red-400 dark:via-rose-400 dark:to-pink-400 bg-clip-text text-transparent leading-tight">
                90/20 Timer
              </h1>
              <div className="h-1 w-24 sm:w-32 mx-auto bg-gradient-to-r from-red-500 to-rose-500 rounded-full mt-2"></div>
            </div>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 font-medium">
              Ultimate Deep Work
            </p>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              90 minutes of ultimate focus followed by 20-minute breaks
            </p>
          </div>

          <div className="text-center animate-fade-in animation-delay-200">
            <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-lg border border-red-200 dark:border-red-800/50 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
              <span className="text-xs sm:text-sm font-semibold text-red-900 dark:text-red-100 tracking-wide">
                Session {currentCycle}
              </span>
            </div>
          </div>

          <div className="animate-fade-in animation-delay-400">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-rose-400 dark:from-red-600 dark:to-rose-600 rounded-3xl blur-xl opacity-20"></div>
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
                <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-red-600 to-rose-600 dark:from-red-400 dark:to-rose-400 bg-clip-text text-transparent mb-4">
                  The Power of the 90/20 Rule
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  Based on ultradian rhythms, the 90/20 timer optimizes for your brain's natural energy cycles.
                  Most people can tackle a high-intensity task for about 90 minutes before performance drops.
                  The 20-minute break is crucial for fully recharging these energy stores.
                </p>

                <h3 className="text-xl sm:text-2xl font-semibold text-red-700 dark:text-red-300 mb-3">
                  How to Use It
                </h3>
                <ol className="space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                  <li><strong>Focus Phase (90 min):</strong> Eliminate all distractions. No phone, no email, no notifications. This is for your highest-value work.</li>
                  <li><strong>Recovery Phase (20 min):</strong> Step away completely. Walk, stretch, meditate, or have a snack. Do not switch to another screen.</li>
                </ol>
              </div>

              {/* Who It's For */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-semibold text-red-700 dark:text-red-300 mb-4">
                  Who Should Use the 90/20 Timer?
                </h3>
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
                    <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">Indie Makers</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Perfect for shipping features. 90 minutes is enough to plan, code, and test a significant chunk of functionality.
                    </p>
                  </div>
                  <div className="p-4 bg-rose-50 dark:bg-rose-900/20 rounded-xl">
                    <h4 className="font-semibold text-rose-900 dark:text-rose-100 mb-2">Academics</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Ideal for writing thesis chapters or analyzing complex datasets where context switching is costly.
                    </p>
                  </div>
                  <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-xl">
                    <h4 className="font-semibold text-pink-900 dark:text-pink-100 mb-2">Musicians & Artists</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Great for practice sessions or creative flow where you need time to warm up and get into the zone.
                    </p>
                  </div>
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
                    <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">Entrepreneurs</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Use it for strategic planning, pitch deck creation, or deep market research.
                    </p>
                  </div>
                </div>
              </div>

              {/* Example Schedule */}
              <div className="bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 rounded-2xl shadow-xl border border-red-200/50 dark:border-red-800/50 p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-semibold text-red-700 dark:text-red-300 mb-4">
                  Example Daily Flow: 2 Big Blocks
                </h3>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-20 font-semibold text-red-600 dark:text-red-400">9:00-10:30</span>
                    <div>
                      <p className="font-medium">Block 1: The "One Big Thing"</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Your most important project. No interruptions allowed.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-20 font-semibold text-rose-600 dark:text-rose-400">10:30-10:50</span>
                    <p className="italic text-sm">Break: Complete disconnection. Walk, coffee, no tech.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-20 font-semibold text-red-600 dark:text-red-400">10:50-12:20</span>
                    <div>
                      <p className="font-medium">Block 2: Secondary Project</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Deep work on your second priority or continuation of first.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-20 font-semibold text-rose-600 dark:text-rose-400">12:20-13:20</span>
                    <p className="italic text-sm">Lunch & Admin: After lunch, switch to checking emails/meetings.</p>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-semibold text-red-700 dark:text-red-300 mb-4">
                  Why It's Effective
                </h3>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 text-red-500 text-xl">✓</span>
                    <div>
                      <strong>Biological Alignment:</strong> Works with, not against, your body's natural energy cycles (BRAC - Basic Rest-Activity Cycle).
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 text-red-500 text-xl">✓</span>
                    <div>
                      <strong>Maximum Output:</strong> 90 minutes is long enough to produce a significant amount of work, often equivalent to 3-4 fragmented hours.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 text-red-500 text-xl">✓</span>
                    <div>
                      <strong>Guilt-Free Rest:</strong> The 20-minute break is earned and necessary, preventing burnout.
                    </div>
                  </li>
                </ul>
              </div>

              {/* FAQ Section */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-red-700 dark:text-red-300 mb-6">
                  90/20 Timer FAQ
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      Can I sustain this all day?
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      Likely not. Most high-performers maximize at 3 blocks (4.5 hours of deep work) per day. The rest of the day should be for lower-intensity tasks.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      What if I get distracted?
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      If you're interrupted briefly, pause the timer. If it's a long interruption, consider restarting the block later. Protect these 90 minutes fiercely.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      Is 20 minutes too long for a break?
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      No. After 90 minutes of intense focus, your brain needs substantial recovery to replenish glucose and neurotransmitters. 5 minutes isn't enough here.
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* Related Content */}
            <div className="max-w-4xl mx-auto mt-16 px-4 sm:px-0">
              <RelatedContent currentPath="/90-20-timer" tags={['90/20 timer', 'deep work', 'advanced']} />
            </div>
          </div>
        </div>
      </main>

      <MiniTimer timeRemaining={timeRemaining} status={status} timerName="90/20 Timer" onToggle={handleToggle} />
      <PiPTimer timeRemaining={timeRemaining} status={status} timerName="90/20 Timer" />

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
