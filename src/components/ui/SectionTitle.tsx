import { motion } from 'framer-motion';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  className?: string;
}

export function SectionTitle({ title, subtitle, centered = true, light = false, className = '' }: SectionTitleProps) {
  return (
    <div className={`${centered ? 'text-center' : ''} ${className}`}>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: centered ? '80px' : '60px' }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`h-1 rounded-full mb-4 ${centered ? 'mx-auto' : ''} ${light ? 'bg-sunset-400' : 'bg-ocean-500'}`}
      />
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 ${light ? 'text-white' : 'text-deep-blue dark:text-white'}`}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`text-lg max-w-2xl ${centered ? 'mx-auto' : ''} ${light ? 'text-white/80' : 'text-gray-600 dark:text-gray-300'}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
