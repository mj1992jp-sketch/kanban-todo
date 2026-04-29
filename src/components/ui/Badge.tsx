interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'overdue' | 'count';
}

const variantClasses: Record<NonNullable<BadgeProps['variant']>, string> = {
  default: 'bg-gray-100 text-gray-600',
  overdue: 'bg-red-100 text-red-600',
  count:   'bg-white/80 text-gray-600',
};

export function Badge({ children, variant = 'default' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${variantClasses[variant]}`}>
      {children}
    </span>
  );
}
