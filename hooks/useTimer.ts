import { useState, useEffect, useRef, useCallback } from 'react';
import { TimerConfig, TimerStatus, SessionType } from '@/types/timer';
import { useNotification } from './useNotification';
import { useSound } from './useSound';

interface UseTimerOptions {
  config: TimerConfig;
  onSessionComplete?: (session: SessionType) => void;
  onCycleComplete?: () => void;
}

export function useTimer({ config, onSessionComplete, onCycleComplete }: UseTimerOptions) {
  const [timeRemaining, setTimeRemaining] = useState(config.workDuration);
  const [status, setStatus] = useState<TimerStatus>('idle');
  const [currentSession, setCurrentSession] = useState<SessionType>('work');
  const [currentCycle, setCurrentCycle] = useState(1);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const { showNotification } = useNotification();
  const { playSound } = useSound();

  const getCurrentDuration = () => {
    return currentSession === 'work' 
      ? config.workDuration 
      : currentSession === 'break'
      ? config.breakDuration
      : config.longBreakDuration || config.breakDuration;
  };

  const start = useCallback(() => {
    if (status === 'running') return;
    
    const duration = getCurrentDuration();
    startTimeRef.current = Date.now() - (status === 'paused' ? (duration - timeRemaining) * 1000 : 0);
    
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const remaining = Math.max(0, duration - Math.floor(elapsed / 1000));
      
      setTimeRemaining(remaining);
      
      if (remaining <= 0) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setStatus('completed');
        playSound();
        showNotification(config.name, currentSession === 'work' ? 'Time for a break!' : 'Break is over!');
        onSessionComplete?.(currentSession);
      }
    }, 100);
    
    setStatus('running');
  }, [status, timeRemaining, currentSession, config, playSound, showNotification, onSessionComplete]);

  const pause = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setStatus('paused');
  }, []);

  const reset = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setStatus('idle');
    setCurrentCycle(1);
    setCurrentSession('work');
    setTimeRemaining(config.workDuration);
  }, [config.workDuration]);

  const skip = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    setTimeRemaining(0);
    setStatus('completed');
    playSound();
    
    const message = currentSession === 'work' ? 'Time for a break!' : 'Break is over!';
    showNotification(config.name, message);
    onSessionComplete?.(currentSession);
    
    // Auto-advance to next session after skip
    setTimeout(() => {
      if (currentSession === 'work') {
        const shouldLongBreak = config.cyclesBeforeLongBreak && currentCycle % config.cyclesBeforeLongBreak === 0;
        setCurrentSession(shouldLongBreak ? 'longBreak' : 'break');
      } else {
        if (currentSession === 'longBreak') {
          onCycleComplete?.();
        }
        setCurrentCycle(prev => prev + 1);
        setCurrentSession('work');
      }
      setStatus('idle');
    }, 1000);
  }, [currentSession, currentCycle, config, playSound, showNotification, onSessionComplete, onCycleComplete]);

  // Update time remaining when config changes
  useEffect(() => {
    if (status === 'idle') {
      setTimeRemaining(getCurrentDuration());
    }
  }, [config, currentSession, status]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    timeRemaining,
    status,
    currentSession,
    currentCycle,
    start,
    pause,
    reset,
    skip,
  };
}