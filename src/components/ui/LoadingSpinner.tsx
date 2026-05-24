import { motion } from 'framer-motion';

export function LoadingSpinner({ size = 40, className = '' }: { size?: number; className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        className="rounded-full border-4 border-ocean-200 border-t-ocean-500"
        style={{ width: size, height: size }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-700 ${className}`}>
      <div className="h-48 rounded-t-2xl bg-gray-300 dark:bg-gray-600" />
      <div className="p-4 space-y-3">
        <div className="h-4 w-3/4 rounded bg-gray-300 dark:bg-gray-600" />
        <div className="h-3 w-1/2 rounded bg-gray-300 dark:bg-gray-600" />
        <div className="h-3 w-full rounded bg-gray-300 dark:bg-gray-600" />
      </div>
    </div>
  );
}
