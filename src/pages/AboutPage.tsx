import { motion } from 'framer-motion';
import { Award, Globe, Heart, Target, Eye, TrendingUp } from 'lucide-react';
import { SectionTitle } from '../components/ui/SectionTitle';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { AnimatedCounter } from '../components/ui/AnimatedCounter';

export function AboutPage() {
  return (
    <main className="pt-20 min-h-screen bg-gray-50 dark:bg-deep-blue">
      {/* Hero */}
      <section className="py-20 md:py-28 bg-deep-blue relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="section-padding relative z-10">
          <div className="container-custom text-center">
            <SectionTitle
              title="About Adheera Vacation"
              subtitle="Crafting extraordinary travel experiences since 2022. Your journey to unforgettable memories begins with us."
              light
            />
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
                  alt="Our Team"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-ocean-500 text-white p-6 rounded-2xl shadow-xl">
                  <div className="text-3xl font-bold">2022</div>
                  <div className="text-sm opacity-90">Founded</div>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-deep-blue dark:text-white mb-6">
                  Our Story
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  Founded in 2022, Adheera Vacation began with a simple mission: to transform the way people experience travel. 
                  What started as a passionate vision has grown into one of India's most trusted luxury travel agencies.
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  We believe that travel is not just about visiting new places—it is about creating lasting memories, 
                  experiencing different cultures, and discovering oneself. Every journey we curate is designed with 
                  this philosophy in mind.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Globe, label: '500+ Destinations' },
                    { icon: Heart, label: '100+ Happy Travelers' },
                    { icon: Award, label: '3+ Years Strong' },
                    { icon: TrendingUp, label: '99% Satisfaction' },
                  ].map((stat, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                      <stat.icon size={20} className="text-ocean-500" />
                      <span className="font-semibold text-deep-blue dark:text-white text-sm">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white dark:bg-deep-blue-light">
        <div className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ScrollReveal>
                <div className="bg-ocean-50 dark:bg-ocean-900/20 rounded-2xl p-8 md:p-10">
                  <div className="p-3 bg-ocean-500 rounded-xl w-fit mb-6">
                    <Target size={28} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-deep-blue dark:text-white mb-4">Our Mission</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    To provide exceptional, personalized travel experiences that exceed expectations. 
                    We strive to make every journey a transformative experience, connecting travelers 
                    with the world's most beautiful destinations while ensuring comfort, safety, and unforgettable memories.
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.15}>
                <div className="bg-sunset-50 dark:bg-sunset-900/10 rounded-2xl p-8 md:p-10">
                  <div className="p-3 bg-sunset-500 rounded-xl w-fit mb-6">
                    <Eye size={28} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-deep-blue dark:text-white mb-4">Our Vision</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    To become the world's most trusted luxury travel partner, known for innovation, 
                    sustainability, and creating meaningful connections between people and places. 
                    We envision a world where travel enriches lives and fosters global understanding.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-ocean-500">
        <div className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { value: 500, suffix: '+', label: 'Destinations' },
                { value: 100, suffix: '+', label: 'Happy Travelers' },
                { value: 3, suffix: '+', label: 'Years of Excellence' },
              ].map((stat, i) => (
                <ScrollReveal key={stat.label} delay={i * 0.1}>
                  <motion.div whileHover={{ scale: 1.05 }} className="text-center">
                    <div className="text-4xl md:text-5xl font-display font-bold text-white mb-2">
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className="text-white/80">{stat.label}</p>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
