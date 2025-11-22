'use client';

import { useState } from 'react';
import { Settings, Volume2, VolumeX, Bell, BellOff, Play } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { TimerPreferences } from '@/types/timer';
import { useNotification } from '@/hooks/useNotification';
import { useSound } from '@/hooks/useSound';
import { ALERT_SOUNDS } from '@/constants/sounds';

interface TimerSettingsProps {
  preferences: TimerPreferences;
  onPreferencesChange: (preferences: Partial<TimerPreferences>) => void;
  workDuration: number;
  breakDuration: number;
  onWorkDurationChange: (duration: number) => void;
  onBreakDurationChange: (duration: number) => void;
}

export function TimerSettings({
  preferences,
  onPreferencesChange,
  workDuration,
  breakDuration,
  onWorkDurationChange,
  onBreakDurationChange,
}: TimerSettingsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { requestPermission } = useNotification();
  const { previewSound } = useSound();

  const handleNotificationToggle = async () => {
    if (!preferences.notificationsEnabled) {
      const granted = await requestPermission();
      if (granted) {
        onPreferencesChange({ notificationsEnabled: true });
      }
    } else {
      onPreferencesChange({ notificationsEnabled: false });
    }
  };

  if (!isOpen) {
    return (
      <div className="text-center">
        <Button
          variant="outline"
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2"
        >
          <Settings className="w-4 h-4" />
          Settings
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#F1F5F9] to-white dark:from-gray-800/50 dark:to-gray-900/50 rounded-xl p-4 sm:p-6 space-y-6 border border-[#E2E8F0] dark:border-gray-700 shadow-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-base sm:text-lg font-semibold text-[#1E293B] dark:text-gray-100">
          Timer Settings
        </h3>
        <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
          Close
        </Button>
      </div>

      {/* Duration Settings */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#475569] dark:text-gray-300 mb-2">
            Work Duration (minutes)
          </label>
          <input
            type="number"
            min="1"
            max="120"
            value={Math.round(workDuration / 60) || 25}
            onChange={(e) => onWorkDurationChange((parseInt(e.target.value) || 25) * 60)}
            className="w-full px-3 py-2 border border-[#E2E8F0] dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-[#1E293B] dark:text-gray-100 focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#475569] dark:text-gray-300 mb-2">
            Break Duration (minutes)
          </label>
          <input
            type="number"
            min="1"
            max="60"
            value={Math.round(breakDuration / 60) || 5}
            onChange={(e) => onBreakDurationChange((parseInt(e.target.value) || 5) * 60)}
            className="w-full px-3 py-2 border border-[#E2E8F0] dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-[#1E293B] dark:text-gray-100 focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Preferences */}
      <div className="space-y-3">
        <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-[#E2E8F0] dark:border-gray-700 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {preferences.soundEnabled ? (
                <Volume2 className="w-5 h-5 text-[#3B82F6] dark:text-blue-400" />
              ) : (
                <VolumeX className="w-5 h-5 text-[#64748B]" />
              )}
              <span className="text-sm sm:text-base text-[#1E293B] dark:text-gray-100">Sound Alerts</span>
            </div>
            <Button
              variant={preferences.soundEnabled ? 'primary' : 'outline'}
              size="sm"
              onClick={() => onPreferencesChange({ soundEnabled: !preferences.soundEnabled })}
            >
              {preferences.soundEnabled ? 'On' : 'Off'}
            </Button>
          </div>
          
          {preferences.soundEnabled && (
            <>
              <div>
                <label className="block text-sm font-medium text-[#475569] dark:text-gray-300 mb-2">
                  Sound Type
                </label>
                <div className="flex gap-2">
                  <select
                    value={preferences.soundId}
                    onChange={(e) => onPreferencesChange({ soundId: e.target.value })}
                    className="flex-1 px-3 py-2 border border-[#E2E8F0] dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-[#1E293B] dark:text-gray-100"
                  >
                    {ALERT_SOUNDS.map((sound) => (
                      <option key={sound.id} value={sound.id}>
                        {sound.name}
                      </option>
                    ))}
                  </select>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => previewSound(preferences.soundId)}
                    className="px-3"
                  >
                    <Play className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#475569] dark:text-gray-300 mb-2">
                  Volume: {Math.round(preferences.volume * 100)}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={preferences.volume}
                  onChange={(e) => onPreferencesChange({ volume: parseFloat(e.target.value) })}
                  className="w-full h-2 bg-[#E2E8F0] dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </>
          )}
        </div>

        <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-[#E2E8F0] dark:border-gray-700">
          <div className="flex items-center gap-2">
            {preferences.notificationsEnabled ? (
              <Bell className="w-5 h-5 text-[#3B82F6] dark:text-blue-400" />
            ) : (
              <BellOff className="w-5 h-5 text-[#64748B]" />
            )}
            <span className="text-sm sm:text-base text-[#1E293B] dark:text-gray-100">Notifications</span>
          </div>
          <Button
            variant={preferences.notificationsEnabled ? 'primary' : 'outline'}
            size="sm"
            onClick={handleNotificationToggle}
          >
            {preferences.notificationsEnabled ? 'On' : 'Off'}
          </Button>
        </div>

        <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-[#E2E8F0] dark:border-gray-700">
          <span className="text-sm sm:text-base text-[#1E293B] dark:text-gray-100">Auto-start Next</span>
          <Button
            variant={preferences.autoStartNextSession ? 'primary' : 'outline'}
            size="sm"
            onClick={() => onPreferencesChange({ autoStartNextSession: !preferences.autoStartNextSession })}
          >
            {preferences.autoStartNextSession ? 'On' : 'Off'}
          </Button>
        </div>

        <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-[#E2E8F0] dark:border-gray-700">
          <span className="text-sm sm:text-base text-[#1E293B] dark:text-gray-100">Display Style</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPreferencesChange({ 
              displayStyle: preferences.displayStyle === 'circular' ? 'linear' : 'circular' 
            })}
          >
            {preferences.displayStyle === 'circular' ? 'Circular' : 'Linear'}
          </Button>
        </div>
      </div>
    </div>
  );
}