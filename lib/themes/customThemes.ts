export interface CustomTheme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
}

export const PRESET_THEMES: CustomTheme[] = [
  {
    id: 'default',
    name: 'Default Blue',
    colors: {
      primary: '#2563eb',
      secondary: '#3b82f6',
      accent: '#60a5fa',
      background: '#ffffff',
      text: '#1f2937',
    },
  },
  {
    id: 'forest',
    name: 'Forest Green',
    colors: {
      primary: '#059669',
      secondary: '#10b981',
      accent: '#34d399',
      background: '#ffffff',
      text: '#1f2937',
    },
  },
  {
    id: 'sunset',
    name: 'Sunset Orange',
    colors: {
      primary: '#ea580c',
      secondary: '#f97316',
      accent: '#fb923c',
      background: '#ffffff',
      text: '#1f2937',
    },
  },
  {
    id: 'purple',
    name: 'Royal Purple',
    colors: {
      primary: '#7c3aed',
      secondary: '#8b5cf6',
      accent: '#a78bfa',
      background: '#ffffff',
      text: '#1f2937',
    },
  },
  {
    id: 'ocean',
    name: 'Deep Ocean',
    colors: {
      primary: '#0891b2',
      secondary: '#06b6d4',
      accent: '#22d3ee',
      background: '#ffffff',
      text: '#1f2937',
    },
  },
];

export function applyTheme(theme: CustomTheme) {
  const root = document.documentElement;
  
  root.style.setProperty('--color-primary', theme.colors.primary);
  root.style.setProperty('--color-secondary', theme.colors.secondary);
  root.style.setProperty('--color-accent', theme.colors.accent);
  
  // Save to localStorage
  localStorage.setItem('focustimer-color-theme', theme.id);
}

export function loadSavedTheme(): CustomTheme {
  const savedId = localStorage.getItem('focustimer-color-theme');
  const theme = PRESET_THEMES.find(t => t.id === savedId) || PRESET_THEMES[0];
  applyTheme(theme);
  return theme;
}
