'use client';

import { useState, useEffect } from 'react';
import { Volume2 } from 'lucide-react';
import { AMBIENT_SOUNDS, ambientPlayer } from '@/lib/audio/ambientSounds';
import { Slider } from '@/components/ui/Slider';

export function AmbientSoundSettings() {
  const [selectedSound, setSelectedSound] = useState('none');
  const [volume, setVolume] = useState(50);

  useEffect(() => {
    // Load saved preferences
    const saved = localStorage.getItem('focustimer-ambient');
    if (saved) {
      const { sound, vol } = JSON.parse(saved);
      setSelectedSound(sound || 'none');
      setVolume(vol || 50);
    }
  }, []);

  const handleSoundChange = (soundId: string) => {
    setSelectedSound(soundId);
    
    if (soundId === 'none') {
      ambientPlayer.stop();
    } else {
      ambientPlayer.play(soundId);
    }

    savePreferences(soundId, volume);
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    ambientPlayer.setVolume(newVolume / 100);
    savePreferences(selectedSound, newVolume);
  };

  const savePreferences = (sound: string, vol: number) => {
    localStorage.setItem('focustimer-ambient', JSON.stringify({ sound, vol }));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
        <Volume2 className="w-5 h-5" />
        Ambient Background Sounds
      </h3>

      {/* Sound Selection */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {AMBIENT_SOUNDS.map((sound) => (
          <button
            key={sound.id}
            onClick={() => handleSoundChange(sound.id)}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedSound === sound.id
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <div className="text-3xl mb-2">{sound.icon}</div>
            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {sound.name}
            </div>
          </button>
        ))}
      </div>

      {/* Volume Control */}
      {selectedSound !== 'none' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Volume: {volume}%
          </label>
          <Slider
            min={0}
            max={100}
            step={5}
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>
      )}

      <p className="text-sm text-gray-600 dark:text-gray-400">
        Background sounds can help you focus. They will play continuously during your timer sessions.
      </p>
    </div>
  );
}
