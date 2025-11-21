export interface AmbientSound {
  id: string;
  name: string;
  file: string;
  icon: string;
}

export const AMBIENT_SOUNDS: AmbientSound[] = [
  { id: 'none', name: 'None', file: '', icon: '🔇' },
  { id: 'rain', name: 'Rain', file: '/sounds/ambient/rain.mp3', icon: '🌧️' },
  { id: 'ocean', name: 'Ocean Waves', file: '/sounds/ambient/ocean.mp3', icon: '🌊' },
  { id: 'forest', name: 'Forest', file: '/sounds/ambient/forest.mp3', icon: '🌲' },
  { id: 'cafe', name: 'Coffee Shop', file: '/sounds/ambient/cafe.mp3', icon: '☕' },
  { id: 'fireplace', name: 'Fireplace', file: '/sounds/ambient/fireplace.mp3', icon: '🔥' },
  { id: 'whitenoise', name: 'White Noise', file: '/sounds/ambient/whitenoise.mp3', icon: '📻' },
];

export class AmbientSoundPlayer {
  private audio: HTMLAudioElement | null = null;
  private currentSound: string = 'none';
  private volume: number = 0.5;

  play(soundId: string) {
    this.stop();

    const sound = AMBIENT_SOUNDS.find(s => s.id === soundId);
    if (!sound || sound.id === 'none') return;

    this.audio = new Audio(sound.file);
    this.audio.loop = true;
    this.audio.volume = this.volume;
    this.audio.play().catch(err => {
      console.error('Failed to play ambient sound:', err);
    });

    this.currentSound = soundId;
  }

  stop() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio = null;
    }
    this.currentSound = 'none';
  }

  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
    if (this.audio) {
      this.audio.volume = this.volume;
    }
  }

  getCurrentSound(): string {
    return this.currentSound;
  }

  getVolume(): number {
    return this.volume;
  }
}

export const ambientPlayer = new AmbientSoundPlayer();
