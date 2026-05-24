import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: number;
  className?: string;
}

export function StarRating({ rating, maxStars = 5, size = 16, className = '' }: StarRatingProps) {
  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      {Array.from({ length: maxStars }, (_, i) => (
        <Star
          key={i}
          size={size}
          className={i < Math.floor(rating) 
            ? "fill-sunset-400 text-sunset-400" 
            : i < rating 
              ? "fill-sunset-400/50 text-sunset-400" 
              : "fill-gray-200 text-gray-200"
          }
        />
      ))}
      <span className="ml-1 text-sm font-medium text-gray-600 dark:text-gray-300">{rating}</span>
    </div>
  );
}
