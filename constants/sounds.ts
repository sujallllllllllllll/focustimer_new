export const ALERT_SOUNDS = [
  { id: 'bell', name: 'Bell', file: 'bell.mp3' },
  { id: 'chime', name: 'Chime', file: 'chime.mp3' },
  { id: 'ding', name: 'Ding', file: 'ding.mp3' },
  { id: 'gentle', name: 'Gentle', file: 'gentle.mp3' },
] as const;

export type AlertSoundId = typeof ALERT_SOUNDS[number]['id'];
