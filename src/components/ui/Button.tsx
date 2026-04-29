import { forwardRef, type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md';
}

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:   'bg-blue-500 hover:bg-blue-600 text-white',
  secondary: 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300',
  danger:    'bg-red-500 hover:bg-red-600 text-white',
  ghost:     'bg-transparent hover:bg-gray-100 text-gray-500',
};

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-2 py-1 text-xs rounded',
  md: 'px-4 py-2 text-sm rounded-md',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', className = '', children, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      {...props}
      className={`inline-flex items-center gap-1 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </button>
  );
});
