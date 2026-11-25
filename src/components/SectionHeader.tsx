import { ReactNode } from 'react';
import TextReveal from './TextReveal';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  children?: ReactNode;
  /** Use "h1" for the main heading at the top of a page (one per page, for SEO). */
  as?: 'h1' | 'h2';
}

export default function SectionHeader({
  title,
  subtitle,
  centered = true,
  children,
  as: Heading = 'h2'
}: SectionHeaderProps) {
  const alignmentClass = centered ? 'text-center' : 'text-left';
  const containerClass = centered ? 'items-center' : 'items-start';

  return (
    <div className={`flex flex-col ${containerClass} mb-12`}>
      <Heading className={`text-4xl md:text-5xl font-bold text-neutral-900 mb-4 ${alignmentClass}`}>
        <TextReveal text={title} />
      </Heading>
      {subtitle && (
        <p className={`text-lg md:text-xl text-black-600 max-w-3xl ${alignmentClass}`}>
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
}
