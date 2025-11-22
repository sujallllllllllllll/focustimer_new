import { create } from 'zustand';
import { TimerPreferences, TimerConfig } from '@/types/timer';

interface TimerStore {
  preferences: TimerPreferences;
  currentConfig: TimerConfig | null;
  setPreferences: (preferences: Partial<TimerPreferences>) => void;
  setCurrentConfig: (config: TimerConfig) => void;
  loadFromStorage: () => void;
  saveToStorage: () => void;
}

const defaultPreferences: TimerPreferences = {
  soundEnabled: true,
  soundId: 'bell',
  volume: 0.7,
  notificationsEnabled: true,
  vibrationEnabled: true,
  theme: 'system',
  displayStyle: 'circular',
  autoStartNextSession: false,
};

export const useTimerStore = create<TimerStore>((set, get) => ({
  preferences: defaultPreferences,
  currentConfig: null,

  setPreferences: (newPreferences) => {
    set((state) => ({
      preferences: { ...state.preferences, ...newPreferences },
    }));
    get().saveToStorage();
  },

  setCurrentConfig: (config) => {
    set({ currentConfig: config });
  },

  loadFromStorage: () => {
    if (typeof window === 'undefined') return;

    try {
      const stored = localStorage.getItem('timemaster-preferences');
      if (stored) {
        const preferences = JSON.parse(stored);
        set({ preferences: { ...defaultPreferences, ...preferences } });
      }
    } catch (error) {
      console.error('Failed to load preferences:', error);
    }
  },

  saveToStorage: () => {
    if (typeof window === 'undefined') return;

    try {
      const { preferences } = get();
      localStorage.setItem('timemaster-preferences', JSON.stringify(preferences));
    } catch (error) {
      console.error('Failed to save preferences:', error);
    }
  },
}));
