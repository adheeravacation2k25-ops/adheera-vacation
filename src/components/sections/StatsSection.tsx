import { motion } from 'framer-motion';
import { Globe, Users, Award } from 'lucide-react';
import { AnimatedCounter } from '../ui/AnimatedCounter';
import { ScrollReveal } from '../ui/ScrollReveal';

const stats = [
  { icon: Globe, value: 500, suffix: '+', label: 'Destinations' },
  { icon: Users, value: 100, suffix: '+', label: 'Happy Travelers' },
  { icon: Award, value: 3, suffix: '+', label: 'Years of Excellence' },
];

export function StatsSection() {
  return (
    <section className="py-16 md:py-20 bg-ocean-500 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '30px 30px'
        }} />
      </div>

      <div className="section-padding relative z-10">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <ScrollReveal key={stat.label} delay={index * 0.15}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <div className="inline-flex p-4 bg-white/20 rounded-2xl mb-4">
                    <stat.icon size={32} className="text-white" />
                  </div>
                  <div className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-2">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-white/80 text-sm md:text-base">{stat.label}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
