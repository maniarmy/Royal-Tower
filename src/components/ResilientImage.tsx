import { useState } from 'react';
import { Building2 } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  loading?: 'eager' | 'lazy';
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackTitle = 'Royal Tower Mohali',
  loading = 'lazy',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#0F295C] via-[#173B82] to-[#081838] text-white p-6 text-center ${className}`}
      >
        <Building2 className="w-10 h-10 text-[#E2BA5A] mb-3" strokeWidth={1.5} />
        <span className="font-serif text-base font-semibold tracking-tight text-white">
          {fallbackTitle}
        </span>
        <span className="text-xs text-slate-300 mt-1">Mohali, Punjab</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
