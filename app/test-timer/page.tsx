'use client';

import { useState } from 'react';
import { useTimer } from '@/hooks/useTimer';
import { Button } from '@/components/ui/Button';

export default function TestTimer() {
  const [duration, setDuration] = useState(5);

  const config = {
    id: 'custom' as const,
    name: 'Test Timer',
    workDuration: duration,
    breakDuration: 3,
    autoStartBreak: false,
    autoStartWork: false,
  };

  const { timeRemaining, status, start, pause, reset } = useTimer({
    config,
    onSessionComplete: () => console.log('Timer completed!'),
  });

  const handleDurationChange = (newDuration: number) => {
    setDuration(newDuration);
    reset(); // Reset timer when duration changes
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-8">Timer Test</h1>
      
      <div className="text-8xl font-bold mb-8 tabular-nums">
        {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
      </div>
      
      <div className="mb-4">Status: <span className="font-bold">{status}</span></div>
      
      <div className="flex gap-4 mb-8">
        <Button onClick={start} disabled={status === 'running'}>Start</Button>
        <Button onClick={pause} disabled={status !== 'running'}>Pause</Button>
        <Button onClick={reset}>Reset</Button>
      </div>
      
      <div className="flex gap-2 items-center">
        <label>Duration (seconds):</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => handleDurationChange(Number(e.target.value))}
          className="border rounded px-2 py-1"
          min="1"
          max="60"
        />
      </div>
    </div>
  );
}