'use client';

import { useState, useEffect } from 'react';
import { Palette } from 'lucide-react';
import { PRESET_THEMES, applyTheme, loadSavedTheme, CustomTheme } from '@/lib/themes/customThemes';

export function ThemeCustomization() {
  const [selectedTheme, setSelectedTheme] = useState<CustomTheme>(PRESET_THEMES[0]);

  useEffect(() => {
    const loaded = loadSavedTheme();
    setSelectedTheme(loaded);
  }, []);

  const handleThemeChange = (theme: CustomTheme) => {
    setSelectedTheme(theme);
    applyTheme(theme);
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-2 mb-4">
        <Palette className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Theme Customization
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {PRESET_THEMES.map((theme) => (
          <button
            key={theme.id}
            onClick={() => handleThemeChange(theme)}
            className={`p-3 rounded-lg border transition 
              ${selectedTheme.id === theme.id
                ? 'border-blue-600 dark:border-blue-400'
                : 'border-gray-300 dark:border-gray-700'}`}
          >
            <div className="font-medium text-gray-900 dark:text-gray-100 mb-2">
              {theme.name}
            </div>

            <div className="flex gap-2">
              <span
                className="w-4 h-4 rounded"
                style={{ backgroundColor: theme.colors.primary }}
              />
              <span
                className="w-4 h-4 rounded"
                style={{ backgroundColor: theme.colors.secondary }}
              />
              <span
                className="w-4 h-4 rounded"
                style={{ backgroundColor: theme.colors.accent }}
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
