/**
 * High-precision timer engine that compensates for drift
 * Uses Date.now() comparison instead of relying on setInterval accuracy
 */

export class TimerEngine {
  private intervalId: NodeJS.Timeout | null = null;
  private startTime: number = 0;
  private pausedTime: number = 0;
  private duration: number = 0;
  private onTick: (remaining: number) => void;
  private onComplete: () => void;
  private isRunning: boolean = false;

  constructor(
    duration: number, // in seconds
    onTick: (remaining: number) => void,
    onComplete: () => void
  ) {
    this.duration = duration;
    this.onTick = onTick;
    this.onComplete = onComplete;
  }

  start(): void {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.startTime = Date.now() - (this.pausedTime || 0);
    
    this.intervalId = setInterval(() => {
      this.tick();
    }, 100); // Update every 100ms for smooth UI
    
    this.tick(); // Immediate first tick
  }

  pause(): void {
    if (!this.isRunning) return;
    
    this.isRunning = false;
    this.pausedTime = Date.now() - this.startTime;
    
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  reset(): void {
    this.pause();
    this.pausedTime = 0;
    this.startTime = 0;
    this.onTick(this.duration);
  }

  private tick(): void {
    const elapsed = Date.now() - this.startTime;
    const remaining = Math.max(0, this.duration * 1000 - elapsed);
    
    const remainingSeconds = Math.ceil(remaining / 1000);
    
    this.onTick(remainingSeconds);
    
    if (remainingSeconds <= 0) {
      this.pause();
      this.onComplete();
    }
  }

  destroy(): void {
    this.pause();
  }

  getIsRunning(): boolean {
    return this.isRunning;
  }
}
