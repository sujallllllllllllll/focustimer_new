export type TimerType = 
  | 'pomodoro' 
  | '50-10' 
  | '60-10' 
  | '90-20' 
  | 'flowtime' 
  | 'custom' 
  | 'countdown' 
  | 'stopwatch';

export type TimerStatus = 'idle' | 'running' | 'paused' | 'completed';

export type SessionType = 'work' | 'break' | 'longBreak';

export interface TimerConfig {
  id: TimerType;
  name: string;
  workDuration: number; // in seconds
  breakDuration: number; // in seconds
  longBreakDuration?: number; // in seconds
  cyclesBeforeLongBreak?: number;
  autoStartBreak?: boolean;
  autoStartWork?: boolean;
}

export interface TimerState {
  timeRemaining: number; // in seconds
  status: TimerStatus;
  currentSession: SessionType;
  currentCycle: number;
  totalCycles: number;
  config: TimerConfig;
}

export interface TimerPreferences {
  soundEnabled: boolean;
  soundId: string;
  volume: number;
  notificationsEnabled: boolean;
  vibrationEnabled: boolean;
  theme: 'light' | 'dark' | 'system';
  displayStyle: 'circular' | 'linear';
  autoStartNextSession: boolean;
}

export interface StoredPreset {
  id: string;
  name: string;
  config: TimerConfig;
  createdAt: number;
}
