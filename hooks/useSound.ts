import { useCallback } from 'react';
import { useTimerStore } from '@/store/timerStore';

export function useSound() {
  const { preferences } = useTimerStore();

  const playSound = useCallback((soundId?: string) => {
    if (typeof window === 'undefined' || !preferences.soundEnabled) return;

    const soundFile = soundId || preferences.soundId || 'bell';
    
    try {
      const audio = new Audio(`/sounds/alerts/${soundFile}.mp3`);
      audio.volume = preferences.volume;
      audio.play().catch(() => {});
    } catch (error) {
      // Sound file not available
    }
  }, [preferences.soundEnabled, preferences.soundId, preferences.volume]);

  const previewSound = useCallback((soundId: string) => {
    if (typeof window === 'undefined') return;
    
    try {
      const audio = new Audio(`/sounds/alerts/${soundId}.mp3`);
      audio.volume = preferences.volume;
      audio.play().catch(() => {});
    } catch (error) {
      // Sound file not available
    }
  }, [preferences.volume]);

  return { playSound, previewSound };
}