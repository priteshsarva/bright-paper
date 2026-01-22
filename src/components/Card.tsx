import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

export default function Card({
  children,
  className = '',
  hover = false,
  padding = 'sm'
}: CardProps) {
  const paddingStyles = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const hoverStyle = hover ? 'hover:shadow-medium hover:-translate-y-1' : '';

  return (
    <div className={`rounded-lg shadow-soft transition-all duration-300 ${paddingStyles[padding]} ${hoverStyle} ${className}`}>
      {children}
    </div>
  );
}
