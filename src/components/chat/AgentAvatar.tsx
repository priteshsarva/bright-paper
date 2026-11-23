import { useId } from 'react';

interface AgentAvatarProps {
  className?: string;
  /** Show the green "online" dot in the bottom-right corner. */
  online?: boolean;
  /** Pulse the online dot (used on the launcher to draw the eye). */
  pulse?: boolean;
}

/** Flat illustrated support-agent avatar used across the chat widget. */
export default function AgentAvatar({ className = 'w-10 h-10', online = false, pulse = false }: AgentAvatarProps) {
  const clipId = useId();

  return (
    <span className={`relative inline-block flex-shrink-0 ${className}`}>
      <svg viewBox="0 0 64 64" className="block h-full w-full rounded-full" aria-hidden="true">
        <defs>
          <clipPath id={clipId}>
            <circle cx="32" cy="32" r="32" />
          </clipPath>
        </defs>
        <g clipPath={`url(#${clipId})`}>
          <circle cx="32" cy="32" r="32" fill="#E4E7EC" />
          {/* hair (back) */}
          <path d="M16 31C16 17 23 10 32 10s16 7 16 21v19c0 4-3 6-7 6H23c-4 0-7-2-7-6Z" fill="#5A3825" />
          {/* top */}
          <path d="M9 64c0-12 10-18 23-18s23 6 23 18Z" fill="#8E44AD" />
          {/* neck + neckline */}
          <rect x="28" y="37" width="8" height="11" rx="3" fill="#E9B48F" />
          <path d="M27 46h10l-5 6Z" fill="#F2C4A0" />
          {/* face */}
          <ellipse cx="32" cy="29" rx="10" ry="12" fill="#F6CDAA" />
          {/* fringe with a side part */}
          <path d="M21.5 29C21 17 27 13 33 13c7 0 11 5 11 13-4-4-9-6-14-7-3 3-6 6-8.5 10Z" fill="#5A3825" />
        </g>
      </svg>

      {online && (
        <span className="absolute bottom-0 right-0 flex h-[28%] w-[28%] min-h-2.5 min-w-2.5">
          {pulse && <span className="absolute inset-0 rounded-full bg-green-400 opacity-75 animate-ping" />}
          <span className="relative h-full w-full rounded-full bg-green-500 ring-2 ring-white" />
        </span>
      )}
    </span>
  );
}
