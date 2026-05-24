import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Search, Clock, MapPin, ArrowRight, Tag, Star, 
  ChevronDown, Grid3X3, List, Heart, X
} from 'lucide-react';
import { packages, categories } from '../data';
import { SectionTitle } from '../components/ui/SectionTitle';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { formatPrice } from '../utils';

export function PackagesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filtered = useMemo(() => {
    let result = [...packages];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.destinations.some(d => d.toLowerCase().includes(q))
      );
    }

    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    switch (sortBy) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'discount': result.sort((a, b) => b.discount - a.discount); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  return (
    <main className="pt-20 min-h-screen bg-gray-50 dark:bg-deep-blue">
      {/* Header */}
      <section className="py-16 md:py-20 bg-deep-blue relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1920&q=80" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="section-padding relative z-10">
          <div className="container-custom text-center">
            <SectionTitle
              title="Travel Packages"
              subtitle="Exclusive curated packages with unbeatable deals and premium inclusions"
              light
            />
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-20 z-30 bg-white dark:bg-gray-800 shadow-md">
        <div className="section-padding py-4">
          <div className="container-custom">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  placeholder="Search packages..."
                  className="w-full pl-12 pr-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-ocean-500 dark:text-white"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    <X size={16} />
                  </button>
                )}
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
                className="px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-ocean-500 dark:text-white"
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none px-4 py-3 pr-10 bg-gray-100 dark:bg-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-ocean-500 dark:text-white cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="discount">Biggest Discount</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
              </div>

              <div className="flex bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
                <button onClick={() => setViewMode('grid')} className={`p-2.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-gray-600 shadow-sm' : ''}`}>
                  <Grid3X3 size={18} className={viewMode === 'grid' ? 'text-ocean-500' : 'text-gray-400'} />
                </button>
                <button onClick={() => setViewMode('list')} className={`p-2.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white dark:bg-gray-600 shadow-sm' : ''}`}>
                  <List size={18} className={viewMode === 'list' ? 'text-ocean-500' : 'text-gray-400'} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="section-padding py-12">
        <div className="container-custom">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Showing <span className="font-semibold text-deep-blue dark:text-white">{filtered.length}</span> packages
          </p>

          {paginated.length === 0 ? (
            <div className="text-center py-20">
              <Search size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300">No packages found</h3>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'}>
              {paginated.map((pkg, index) => (
                <ScrollReveal key={pkg.id} delay={index * 0.1}>
                  {viewMode === 'grid' ? (
                    <motion.div whileHover={{ y: -10 }} className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700">
                      <div className="relative h-60 overflow-hidden">
                        <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-black/20" />
                        {pkg.discount > 0 && (
                          <div className="absolute top-4 left-4 px-3 py-1.5 bg-sunset-500 text-white rounded-lg flex items-center gap-1">
                            <Tag size={14} />
                            <span className="text-sm font-bold">{pkg.discount}% OFF</span>
                          </div>
                        )}
                        <div className="absolute top-4 right-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-lg flex items-center gap-1">
                          <Star size={14} className="fill-sunset-400 text-sunset-400" />
                          <span className="text-sm font-bold text-deep-blue">{pkg.rating}</span>
                        </div>
                        <div className="absolute bottom-4 left-4">
                          <span className="text-xs text-white/80 line-through">{formatPrice(pkg.originalPrice)}</span>
                          <div className="text-2xl font-bold text-white">{formatPrice(pkg.price)}</div>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-display font-bold text-deep-blue dark:text-white mb-2 group-hover:text-ocean-500 transition-colors">{pkg.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{pkg.description}</p>
                        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center gap-1"><Clock size={14} /><span>{pkg.duration}</span></div>
                          <div className="flex items-center gap-1"><MapPin size={14} /><span>{pkg.destinations.length} Destinations</span></div>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-5">
                          {pkg.destinations.slice(0, 3).map((d, i) => (
                            <span key={i} className="px-2.5 py-1 bg-ocean-50 dark:bg-ocean-900/30 text-ocean-600 dark:text-ocean-400 text-xs rounded-lg">{d}</span>
                          ))}
                        </div>
                        <Link to={`/booking/${pkg.id}`} className="flex items-center justify-center gap-2 w-full py-3 bg-ocean-500 hover:bg-ocean-600 text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-ocean-500/30 group/btn">
                          <span>Book Now</span>
                          <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div whileHover={{ x: 4 }} className="group flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700">
                      <div className="relative md:w-80 h-52 md:h-auto overflow-hidden shrink-0">
                        <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-black/20" />
                        {pkg.discount > 0 && (
                          <div className="absolute top-3 left-3 px-3 py-1 bg-sunset-500 text-white rounded-lg text-xs font-bold">{pkg.discount}% OFF</div>
                        )}
                      </div>
                      <div className="flex-1 p-6 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-1"><Star size={14} className="fill-sunset-400 text-sunset-400" /><span className="text-sm font-bold">{pkg.rating}</span></div>
                            <button onClick={() => toggleFavorite(pkg.id)}><Heart size={18} className={favorites.includes(pkg.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'} /></button>
                          </div>
                          <h3 className="text-xl font-display font-bold text-deep-blue dark:text-white mb-2 group-hover:text-ocean-500 transition-colors">{pkg.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{pkg.description}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {pkg.destinations.map((d, i) => (
                              <span key={i} className="px-2.5 py-1 bg-ocean-50 dark:bg-ocean-900/30 text-ocean-600 dark:text-ocean-400 text-xs rounded-lg">{d}</span>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                          <div>
                            <span className="text-sm text-gray-500 dark:text-gray-400 line-through">{formatPrice(pkg.originalPrice)}</span>
                            <div className="text-xl font-bold text-deep-blue dark:text-white">{formatPrice(pkg.price)}</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400"><Clock size={14} /><span>{pkg.duration}</span></div>
                            <Link to={`/booking/${pkg.id}`} className="flex items-center gap-2 px-5 py-2.5 bg-ocean-500 hover:bg-ocean-600 text-white text-sm font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-ocean-500/30">
                              <span>Book Now</span>
                              <ArrowRight size={14} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </ScrollReveal>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 disabled:opacity-50">Previous</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button key={page} onClick={() => setCurrentPage(page)} className={`w-10 h-10 rounded-xl font-medium transition-all ${currentPage === page ? 'bg-ocean-500 text-white shadow-lg shadow-ocean-500/30' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>{page}</button>
              ))}
              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 disabled:opacity-50">Next</button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
