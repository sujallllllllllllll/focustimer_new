import { TimerConfig } from '@/types/timer';

export const TIMER_PRESETS: Record<string, TimerConfig> = {
  pomodoro: {
    id: 'pomodoro',
    name: 'Pomodoro Timer',
    workDuration: 25 * 60, // 25 minutes
    breakDuration: 5 * 60, // 5 minutes
    longBreakDuration: 15 * 60, // 15 minutes
    cyclesBeforeLongBreak: 4,
    autoStartBreak: false,
    autoStartWork: false,
  },
  '50-10': {
    id: '50-10',
    name: '50/10 Timer',
    workDuration: 50 * 60,
    breakDuration: 10 * 60,
    autoStartBreak: false,
    autoStartWork: false,
  },
  '60-10': {
    id: '60-10',
    name: '60/10 Timer',
    workDuration: 60 * 60,
    breakDuration: 10 * 60,
    autoStartBreak: false,
    autoStartWork: false,
  },
  '90-20': {
    id: '90-20',
    name: '90/20 Timer',
    workDuration: 90 * 60,
    breakDuration: 20 * 60,
    autoStartBreak: false,
    autoStartWork: false,
  },
  flowtime: {
    id: 'flowtime',
    name: 'Flowtime Timer',
    workDuration: 30 * 60, // Default, user adjusts
    breakDuration: 6 * 60, // Proportional (20% of work)
    autoStartBreak: false,
    autoStartWork: false,
  },
  custom: {
    id: 'custom',
    name: 'Custom Timer',
    workDuration: 25 * 60,
    breakDuration: 5 * 60,
    autoStartBreak: false,
    autoStartWork: false,
  },
  countdown: {
    id: 'countdown',
    name: 'Countdown Timer',
    workDuration: 10 * 60,
    breakDuration: 0,
    autoStartBreak: false,
    autoStartWork: false,
  },
  stopwatch: {
    id: 'stopwatch',
    name: 'Stopwatch',
    workDuration: 0,
    breakDuration: 0,
    autoStartBreak: false,
    autoStartWork: false,
  },
};
