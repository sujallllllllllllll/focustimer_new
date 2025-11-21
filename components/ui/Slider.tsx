'use client';

import { InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
}

export function Slider({ min, max, step, value, onChange, className, ...props }: SliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="relative w-full">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={cn(
          'w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
          '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:cursor-pointer',
          '[&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-600 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer',
          className
        )}
        style={{
          background: `linear-gradient(to right, rgb(37, 99, 235) 0%, rgb(37, 99, 235) ${percentage}%, rgb(229, 231, 235) ${percentage}%, rgb(229, 231, 235) 100%)`,
        }}
        {...props}
      />
    </div>
  );
}
