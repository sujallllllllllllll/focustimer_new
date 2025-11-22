'use client';

import { useEffect, useRef, useState } from 'react';
import { formatTime } from '@/lib/utils/formatTime';
import { TimerStatus } from '@/types/timer';
import { usePageVisibility } from '@/hooks/usePageVisibility';

interface PiPTimerProps {
  timeRemaining: number;
  status: TimerStatus;
  timerName: string;
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

  // Main PiP setup with enhanced drawing
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

    // Draw loop with enhanced visuals
    const draw = () => {
      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#1e293b');
      gradient.addColorStop(1, '#0f172a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Subtle accent line at top
      const accentGradient = ctx.createLinearGradient(0, 0, width, 0);
      accentGradient.addColorStop(0, '#3b82f6');
      accentGradient.addColorStop(0.5, '#8b5cf6');
      accentGradient.addColorStop(1, '#ec4899');
      ctx.fillStyle = accentGradient;
      ctx.fillRect(0, 0, width, 3);

      // Timer name
      ctx.fillStyle = '#94a3b8';
      ctx.font = '14px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(timerName, width / 2, 35);

      // Main time display with glow effect
      ctx.shadowColor = status === 'running' ? '#3b82f6' : '#94a3b8';
      ctx.shadowBlur = 20;
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 48px system-ui, -apple-system, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(formatTime(timeRemaining), width / 2, 100);
      
      // Reset shadow
      ctx.shadowBlur = 0;

      // Status indicator
      const statusColor = status === 'running' ? '#10b981' : status === 'paused' ? '#f59e0b' : '#6b7280';
      ctx.fillStyle = statusColor;
      ctx.beginPath();
      ctx.arc(width / 2 - 40, 130, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#cbd5e1';
      ctx.font = '12px system-ui, -apple-system, sans-serif';
      ctx.fillText(status.toUpperCase(), width / 2, 135);

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
      const stream = canvas.captureStream(30);
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
      {/* Enhanced PiP Permission Modal */}
      {showPiPPrompt && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg rounded-2xl p-6 max-w-sm mx-4 shadow-2xl border border-gray-200/50 dark:border-gray-700/50 animate-scale-in">
            <div className="text-center mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-3">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Enable Picture-in-Picture?
              </h3>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-center leading-relaxed">
              Keep your timer visible while using other tabs or applications.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  togglePiP();
                  setShowPiPPrompt(false);
                }}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-3 rounded-xl font-medium transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Enable PiP
              </button>

              <button
                onClick={() => setShowPiPPrompt(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-3 rounded-xl font-medium transition-all"
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

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
}