import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, MapPin, ArrowRight, Tag, Star } from 'lucide-react';
import { packages } from '../../data';
import { SectionTitle } from '../ui/SectionTitle';
import { ScrollReveal } from '../ui/ScrollReveal';
import { formatPrice } from '../../utils';

export function FeaturedPackages() {
  return (
    <section className="py-20 md:py-28 bg-white dark:bg-deep-blue-light">
      <div className="section-padding">
        <div className="container-custom">
          <SectionTitle
            title="Featured Packages"
            subtitle="Handcrafted travel packages with exclusive deals and premium inclusions"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {packages.map((pkg, index) => (
              <ScrollReveal key={pkg.id} delay={index * 0.15}>
                <motion.div
                  whileHover={{ y: -10 }}
                  className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700"
                >
                  {/* Image */}
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />

                    {/* Discount Badge */}
                    {pkg.discount > 0 && (
                      <div className="absolute top-4 left-4 px-3 py-1.5 bg-sunset-500 text-white rounded-lg flex items-center gap-1">
                        <Tag size={14} />
                        <span className="text-sm font-bold">{pkg.discount}% OFF</span>
                      </div>
                    )}

                    {/* Rating */}
                    <div className="absolute top-4 right-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-lg flex items-center gap-1">
                      <Star size={14} className="fill-sunset-400 text-sunset-400" />
                      <span className="text-sm font-bold text-deep-blue">{pkg.rating}</span>
                    </div>

                    {/* Price Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                      <div>
                        <span className="text-xs text-white/80 line-through">{formatPrice(pkg.originalPrice)}</span>
                        <div className="text-2xl font-bold text-white">{formatPrice(pkg.price)}</div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-display font-bold text-deep-blue dark:text-white mb-2 group-hover:text-ocean-500 transition-colors">
                      {pkg.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {pkg.description}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{pkg.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        <span>{pkg.destinations.length} Destinations</span>
                      </div>
                    </div>

                    {/* Destinations Tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {pkg.destinations.slice(0, 3).map((dest, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 bg-ocean-50 dark:bg-ocean-900/30 text-ocean-600 dark:text-ocean-400 text-xs rounded-lg"
                        >
                          {dest}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <Link
                      to={`/booking/${pkg.id}`}
                      className="flex items-center justify-center gap-2 w-full py-3 bg-ocean-500 hover:bg-ocean-600 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-ocean-500/30 group/btn"
                    >
                      <span>Book Now</span>
                      <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
