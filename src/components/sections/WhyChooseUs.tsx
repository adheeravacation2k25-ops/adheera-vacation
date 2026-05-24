import { motion } from 'framer-motion';
import { 
  BadgeCheck, Headphones, MapPin, Settings, Shield, Crown 
} from 'lucide-react';
import { SectionTitle } from '../ui/SectionTitle';
import { ScrollReveal } from '../ui/ScrollReveal';

const features = [
  {
    icon: BadgeCheck,
    title: 'Best Price Guarantee',
    description: "We match any comparable quote. Book with confidence knowing you are getting the best deal on premium travel experiences.",
    color: 'bg-ocean-500',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: "Our dedicated team is available round the clock to assist you anywhere in the world, ensuring peace of mind.",
    color: 'bg-sunset-500',
  },
  {
    icon: MapPin,
    title: 'Trusted Travel Guides',
    description: "Expert local guides with deep knowledge of destinations ensure authentic and enriching experiences.",
    color: 'bg-emerald-500',
  },
  {
    icon: Settings,
    title: 'Custom Packages',
    description: "Tailor every aspect of your trip. We design journeys that match your unique preferences and travel style.",
    color: 'bg-purple-500',
  },
  {
    icon: Shield,
    title: 'Secure Booking',
    description: "Bank-level encryption and secure payment gateways protect your transactions and personal information.",
    color: 'bg-rose-500',
  },
  {
    icon: Crown,
    title: 'Premium Experiences',
    description: "Access exclusive experiences, private tours, and VIP treatment at the world's top destinations.",
    color: 'bg-amber-500',
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 md:py-28 bg-deep-blue dark:bg-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="section-padding relative z-10">
        <div className="container-custom">
          <SectionTitle
            title="Why Choose Us"
            subtitle="We go above and beyond to ensure every journey is exceptional"
            light
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {features.map((feature, index) => (
              <ScrollReveal key={feature.title} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-500"
                >
                  <div className={`inline-flex p-4 rounded-xl ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon size={28} className="text-white" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
