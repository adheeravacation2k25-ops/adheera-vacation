import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Heart } from 'lucide-react';
import { destinations } from '../../data';
import { SectionTitle } from '../ui/SectionTitle';
import { ScrollReveal } from '../ui/ScrollReveal';
import { StarRating } from '../ui/StarRating';
import { formatPrice } from '../../utils';
import { useState } from 'react';

const categories = ['All', 'Local Trips', 'International Trips', 'Honeymoon Packages', 'Adventure Tours', 'Family Tours', 'Luxury Vacations'];

export function PopularDestinations() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [favorites, setFavorites] = useState<number[]>([]);

  const filtered = activeCategory === 'All' 
    ? destinations 
    : destinations.filter(d => d.category === activeCategory);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  return (
    <section className="py-20 md:py-28 bg-gray-50 dark:bg-deep-blue">
      <div className="section-padding">
        <div className="container-custom">
          <SectionTitle
            title="Popular Destinations"
            subtitle="Discover handpicked destinations that promise extraordinary experiences and lasting memories"
          />

          {/* Category Filter */}
          <ScrollReveal delay={0.2}>
            <div className="flex flex-wrap justify-center gap-3 mt-10 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === cat
                      ? 'bg-ocean-500 text-white shadow-lg shadow-ocean-500/30'
                      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-ocean-50 dark:hover:bg-ocean-900/30'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Destinations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((dest, index) => (
              <ScrollReveal key={dest.id} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />

                    {/* Favorite Button */}
                    <button
                      onClick={() => toggleFavorite(dest.id)}
                      className="absolute top-3 right-3 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/40 transition-all"
                    >
                      <Heart 
                        size={18} 
                        className={favorites.includes(dest.id) ? 'fill-red-500 text-red-500' : 'text-white'} 
                      />
                    </button>

                    {/* Price Badge */}
                    <div className="absolute bottom-3 left-3 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-lg">
                      <span className="text-sm font-bold text-deep-blue">{formatPrice(dest.price)}</span>
                    </div>

                    {/* Type Badge */}
                    <div className="absolute top-3 left-3 px-3 py-1 bg-ocean-500/90 backdrop-blur-sm rounded-lg">
                      <span className="text-xs font-medium text-white">{dest.type}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm mb-2">
                      <MapPin size={14} />
                      <span>{dest.country}</span>
                    </div>
                    <h3 className="text-lg font-display font-bold text-deep-blue dark:text-white mb-2 group-hover:text-ocean-500 transition-colors">
                      {dest.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                      {dest.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <StarRating rating={dest.rating} size={14} />
                      <Link
                        to={`/destination/${dest.id}`}
                        className="flex items-center gap-1 text-ocean-500 hover:text-ocean-600 text-sm font-medium group/link"
                      >
                        <span>Explore</span>
                        <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
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
