import React, { useState } from 'react';
import { Flame } from 'lucide-react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = '',
  fallbackSrc,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (hasError || !src) {
    if (fallbackSrc && !hasError) {
      return (
        <img
          src={fallbackSrc}
          alt={alt || 'Food image'}
          className={className}
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          {...props}
        />
      );
    }

    return (
      <div
        className={`bg-gradient-to-br from-[#1c1c1c] to-[#0c0c0c] flex flex-col items-center justify-center p-4 text-center ${className}`}
      >
        <div className="w-10 h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center mb-2 text-[#F5B800]">
          <Flame className="w-5 h-5 animate-pulse" />
        </div>
        <span className="text-xs font-medium text-stone-300 line-clamp-1">{alt || 'Ember & Craft Food'}</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-[#1e1e1e] animate-pulse flex items-center justify-center">
          <Flame className="w-6 h-6 text-[#F5B800]/40" />
        </div>
      )}
      <img
        src={src}
        alt={alt || 'Food image'}
        className={`w-full h-full object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        onError={() => setHasError(true)}
        {...props}
      />
    </div>
  );
};
