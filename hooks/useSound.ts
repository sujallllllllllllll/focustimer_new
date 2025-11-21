import { useCallback } from 'react';
import { useTimerStore } from '@/store/timerStore';

export function useSound() {
  const { preferences } = useTimerStore();

  const playSound = useCallback((soundId?: string) => {
    if (typeof window === 'undefined' || !preferences.soundEnabled) return;

    const soundFile = soundId || preferences.soundId || 'bell';
    
    try {
      const audio = new Audio(`/sounds/alerts/${soundFile}.mp3`);
      audio.volume = 0.7;
      audio.play().catch((error) => {
        console.warn('Failed to play sound:', error);
      });
    } catch (error) {
      console.warn('Sound not available:', error);
    }
  }, [preferences.soundEnabled, preferences.soundId]);

  return { playSound };
}