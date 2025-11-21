'use client';

import { SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
}

export function Select({ options, value, onChange, className, ...props }: SelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        'w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg',
        'text-gray-900 dark:text-gray-100',
        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
        'cursor-pointer',
        className
      )}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
