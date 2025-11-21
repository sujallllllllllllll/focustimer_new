'use client';

import { useEffect, useRef, useState } from 'react';
import { formatTime } from '@/lib/utils/formatTime';
import { TimerStatus } from '@/types/timer';
import { usePageVisibility } from '@/hooks/usePageVisibility';

interface PiPTimerProps {
  timeRemaining: number;
  status: TimerStatus;
  timerName: string;
  onToggle: () => void;
}

export function PiPTimer({ timeRemaining, status, timerName }: PiPTimerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPiPActive, setIsPiPActive] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [showPiPPrompt, setShowPiPPrompt] = useState(false);
  const isPageVisible = usePageVisibility();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Ask user to enable PiP when tab loses visibility
  useEffect(() => {
    if (!isClient) return;

    if (!isPageVisible && status === 'running' && !isPiPActive) {
      setShowPiPPrompt(true);
    }
  }, [isClient, isPageVisible, status, isPiPActive]);

  // Main PiP setup
  useEffect(() => {
    if (!isClient) return;
    if (typeof document === 'undefined') return;
    if (!document.pictureInPictureEnabled) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 320;
    const height = 180;
    canvas.width = width;
    canvas.height = height;

    // Draw loop (1 frame per second)
    const draw = () => {
      ctx.fillStyle = '#1f2937';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 32px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(formatTime(timeRemaining), width / 2, 80);

      ctx.font = '16px sans-serif';
      ctx.fillText(timerName, width / 2, 110);

      ctx.fillText(status.toUpperCase(), width / 2, 140);

      if (video.srcObject && 'getVideoTracks' in video.srcObject) {
        const tracks = video.srcObject.getVideoTracks();
        const track = tracks[0];
        if (track && 'requestFrame' in track) {
          (track as any).requestFrame();
        }
      }
    };

    draw();
    const interval = setInterval(draw, 1000);

    // Create canvas → video stream
    if (!video.srcObject) {
      const stream = canvas.captureStream(30); // FIX: use real framerate
      video.srcObject = stream;
      video.muted = true;
      video.play().catch(() => {});
    }

    const handlePiPChange = () => {
      setIsPiPActive(document.pictureInPictureElement === video);
    };

    video.addEventListener('enterpictureinpicture', handlePiPChange);
    video.addEventListener('leavepictureinpicture', handlePiPChange);

    return () => {
      clearInterval(interval);
      video.removeEventListener('enterpictureinpicture', handlePiPChange);
      video.removeEventListener('leavepictureinpicture', handlePiPChange);
    };
  }, [timeRemaining, status, timerName, isClient]);

  // Toggle PiP
  const togglePiP = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else {
        await video.requestPictureInPicture();
      }
    } catch (err) {
      console.warn('PiP error:', err);
    }
  };

  if (!isClient || typeof document === 'undefined' || !document.pictureInPictureEnabled) {
    return null;
  }

  return (
    <>
      {/* PiP Permission Modal */}
      {showPiPPrompt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm mx-4">
            <h3 className="text-lg font-semibold mb-3">Enable Picture-in-Picture?</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Keep your timer visible while using other tabs.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  togglePiP();
                  setShowPiPPrompt(false);
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                Enable PiP
              </button>

              <button
                onClick={() => setShowPiPPrompt(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
              >
                Not Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* IMPORTANT: video must NOT be display:none */}
      <video
        ref={videoRef}
        style={{ width: 1, height: 1, opacity: 0, position: 'fixed', pointerEvents: 'none' }}
        muted
        playsInline
      />

      <canvas ref={canvasRef} className="hidden" />
    </>
  );
}
