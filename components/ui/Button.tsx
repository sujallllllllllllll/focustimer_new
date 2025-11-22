'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  as?: 'button' | 'span';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', as = 'button', ...props }, ref) => {
    const Component = as;
    
    return (
      <Component
        className={cn(
          'btn inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
          {
            'btn-primary': variant === 'primary',
            'btn-secondary': variant === 'secondary',
            'border-2 border-[#E2E8F0] bg-transparent hover:bg-[#F1F5F9] hover:border-[#CBD5E1] dark:border-gray-600 dark:hover:bg-gray-800 text-transparent hover:text-[#1E293B] dark:text-gray-300 dark:hover:text-gray-300': variant === 'outline',
            'bg-transparent hover:bg-[#F1F5F9] dark:hover:bg-gray-800 text-transparent hover:text-[#1E293B] dark:text-gray-300 dark:hover:text-gray-300': variant === 'ghost',
            'bg-[#EF4444] text-white hover:bg-[#DC2626] shadow-md hover:shadow-lg': variant === 'danger',
          },
          {
            'text-sm px-3 py-1.5 min-h-[36px]': size === 'sm',
            'text-base px-4 py-2 min-h-[44px]': size === 'md',
            'text-base sm:text-lg px-5 sm:px-6 py-2.5 sm:py-3 min-h-[48px] sm:min-h-[52px]': size === 'lg',
          },
          className
        )}
        ref={as === 'button' ? ref : undefined}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';