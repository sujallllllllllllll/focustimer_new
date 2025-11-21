/**
 * Format seconds into MM:SS or HH:MM:SS format
 */
export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${pad(minutes)}:${pad(secs)}`;
  }

  return `${minutes}:${pad(secs)}`;
}

function pad(num: number): string {
  return num.toString().padStart(2, '0');
}

/**
 * Parse time string (MM:SS or HH:MM:SS) to seconds
 */
export function parseTime(timeString: string): number {
  const parts = timeString.split(':').map(Number);
  
  if (parts.length === 2) {
    const [minutes, seconds] = parts;
    return minutes * 60 + seconds;
  }
  
  if (parts.length === 3) {
    const [hours, minutes, seconds] = parts;
    return hours * 3600 + minutes * 60 + seconds;
  }
  
  return 0;
}
