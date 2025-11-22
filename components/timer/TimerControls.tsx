'use client';

import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { TimerStatus } from '@/types/timer';

interface TimerControlsProps {
  status: TimerStatus;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onSkip: () => void;
  onPiP?: () => void;
}

export function TimerControls({
  status,
  onStart,
  onPause,
  onReset,
  onSkip,
  onPiP,
}: TimerControlsProps) {
  const isRunning = status === 'running';
  const isIdle = status === 'idle';

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
      {/* Primary Control - Start/Pause */}
      {isRunning ? (
        <Button
          onClick={onPause}
          size="lg"
          variant="primary"
          className="min-w-[120px] sm:min-w-[140px]"
          aria-label="Pause timer"
        >
          <Pause className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          Pause
        </Button>
      ) : (
        <Button
          onClick={onStart}
          size="lg"
          variant="primary"
          className="min-w-[120px] sm:min-w-[140px]"
          aria-label="Start timer"
        >
          <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          {isIdle ? 'Start' : 'Resume'}
        </Button>
      )}

      {/* Secondary Controls */}
      <Button
        onClick={onReset}
        size="lg"
        variant="secondary"
        aria-label="Reset timer"
        disabled={isIdle}
      >
        <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
        <span className="hidden sm:inline">Reset</span>
      </Button>

      <Button
        onClick={onSkip}
        size="lg"
        variant="secondary"
        aria-label="Skip to next session"
        disabled={isIdle}
      >
        <SkipForward className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
        <span className="hidden sm:inline">Skip</span>
      </Button>

      {onPiP && (
        <Button
          onClick={onPiP}
          size="lg"
          variant="outline"
          aria-label="Picture in Picture"
          className="hidden sm:flex"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 4a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V4zm2 0v12h12V4H4zm8 6a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-3z"/>
          </svg>
          Pcture-in-Picture
        </Button>
      )}
    </div>
  );
}

