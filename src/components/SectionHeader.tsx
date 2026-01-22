import { ReactNode } from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  children?: ReactNode;
}

export default function SectionHeader({
  title,
  subtitle,
  centered = true,
  children
}: SectionHeaderProps) {
  const alignmentClass = centered ? 'text-center' : 'text-left';
  const containerClass = centered ? 'items-center' : 'items-start';

  return (
    <div className={`flex flex-col ${containerClass} mb-12`}>
      <h2 className={`text-4xl md:text-5xl font-bold text-neutral-900 mb-4 ${alignmentClass}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg md:text-xl text-black-600 max-w-3xl ${alignmentClass}`}>
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
}
