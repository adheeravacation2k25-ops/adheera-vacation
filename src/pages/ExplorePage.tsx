import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Search, Grid3X3, List, SlidersHorizontal, 
  MapPin, ArrowRight, X, ChevronDown, Heart
} from 'lucide-react';
import { destinations, categories, countries } from '../data';
import { SectionTitle } from '../components/ui/SectionTitle';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { StarRating } from '../components/ui/StarRating';
import { formatPrice } from '../utils';

export function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCountry, setSelectedCountry] = useState('All Countries');
  const [selectedType, setSelectedType] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [minRating, setMinRating] = useState(0);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState<number[]>([]);
  const itemsPerPage = 6;

  const filtered = useMemo(() => {
    let result = destinations;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(d => 
        d.title.toLowerCase().includes(q) ||
        d.country.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== 'All') {
      result = result.filter(d => d.category === selectedCategory);
    }

    if (selectedCountry !== 'All Countries') {
      result = result.filter(d => d.country === selectedCountry);
    }

    if (selectedType !== 'All') {
      result = result.filter(d => d.type === selectedType);
    }

    result = result.filter(d => d.price >= priceRange[0] && d.price <= priceRange[1]);
    result = result.filter(d => d.rating >= minRating);

    switch (sortBy) {
      case 'price-low': result = [...result].sort((a, b) => a.price - b.price); break;
      case 'price-high': result = [...result].sort((a, b) => b.price - a.price); break;
      case 'rating': result = [...result].sort((a, b) => b.rating - a.rating); break;
      case 'reviews': result = [...result].sort((a, b) => b.reviews - a.reviews); break;
    }

    return result;
  }, [searchQuery, selectedCategory, selectedCountry, selectedType, priceRange, minRating, sortBy]);

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
          <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="section-padding relative z-10">
          <div className="container-custom text-center">
            <SectionTitle
              title="Explore Destinations"
              subtitle="Discover your next adventure from our curated collection of extraordinary places"
              light
            />
          </div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="sticky top-20 z-30 bg-white dark:bg-gray-800 shadow-md">
        <div className="section-padding py-4">
          <div className="container-custom">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  placeholder="Search destinations, countries..."
                  className="w-full pl-12 pr-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-ocean-500 dark:text-white"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${
                  showFilters ? 'bg-ocean-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}
              >
                <SlidersHorizontal size={18} />
                <span>Filters</span>
              </button>

              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none px-4 py-3 pr-10 bg-gray-100 dark:bg-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-ocean-500 dark:text-white cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="reviews">Most Reviewed</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
              </div>

              {/* View Toggle */}
              <div className="flex bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-gray-600 shadow-sm' : ''}`}
                >
                  <Grid3X3 size={18} className={viewMode === 'grid' ? 'text-ocean-500' : 'text-gray-400'} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white dark:bg-gray-600 shadow-sm' : ''}`}
                >
                  <List size={18} className={viewMode === 'list' ? 'text-ocean-500' : 'text-gray-400'} />
                </button>
              </div>
            </div>

            {/* Expanded Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                    {/* Category */}
                    <div>
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 block">Category</label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
                        className="w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-ocean-500 dark:text-white"
                      >
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>

                    {/* Country */}
                    <div>
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 block">Country</label>
                      <select
                        value={selectedCountry}
                        onChange={(e) => { setSelectedCountry(e.target.value); setCurrentPage(1); }}
                        className="w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-ocean-500 dark:text-white"
                      >
                        {countries.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>

                    {/* Trip Type */}
                    <div>
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 block">Trip Type</label>
                      <select
                        value={selectedType}
                        onChange={(e) => { setSelectedType(e.target.value); setCurrentPage(1); }}
                        className="w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-ocean-500 dark:text-white"
                      >
                        <option value="All">All Types</option>
                        <option value="Local">Local</option>
                        <option value="International">International</option>
                      </select>
                    </div>

                    {/* Rating */}
                    <div>
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 block">Min Rating</label>
                      <select
                        value={minRating}
                        onChange={(e) => { setMinRating(Number(e.target.value)); setCurrentPage(1); }}
                        className="w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-ocean-500 dark:text-white"
                      >
                        <option value={0}>Any Rating</option>
                        <option value={4.5}>4.5+ Stars</option>
                        <option value={4.7}>4.7+ Stars</option>
                        <option value={4.8}>4.8+ Stars</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="section-padding py-12">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600 dark:text-gray-400">
              Showing <span className="font-semibold text-deep-blue dark:text-white">{filtered.length}</span> destinations
            </p>
          </div>

          {paginated.length === 0 ? (
            <div className="text-center py-20">
              <Search size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">No destinations found</h3>
              <p className="text-gray-500 dark:text-gray-400">Try adjusting your filters or search query</p>
            </div>
          ) : (
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
              : 'space-y-6'
            }>
              {paginated.map((dest, index) => (
                <ScrollReveal key={dest.id} delay={index * 0.1}>
                  {viewMode === 'grid' ? (
                    <motion.div
                      whileHover={{ y: -8 }}
                      className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                    >
                      <div className="relative h-56 overflow-hidden">
                        <img src={dest.image} alt={dest.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                        <button onClick={() => toggleFavorite(dest.id)} className="absolute top-3 right-3 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/40 transition-all">
                          <Heart size={18} className={favorites.includes(dest.id) ? 'fill-red-500 text-red-500' : 'text-white'} />
                        </button>
                        <div className="absolute bottom-3 left-3 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-lg">
                          <span className="text-sm font-bold text-deep-blue">{formatPrice(dest.price)}</span>
                        </div>
                        <div className="absolute top-3 left-3 px-3 py-1 bg-ocean-500/90 backdrop-blur-sm rounded-lg">
                          <span className="text-xs font-medium text-white">{dest.type}</span>
                        </div>
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm mb-2">
                          <MapPin size={14} />
                          <span>{dest.country}</span>
                        </div>
                        <h3 className="text-lg font-display font-bold text-deep-blue dark:text-white mb-2 group-hover:text-ocean-500 transition-colors">{dest.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">{dest.description}</p>
                        <div className="flex items-center justify-between">
                          <StarRating rating={dest.rating} size={14} />
                          <Link to={`/destination/${dest.id}`} className="flex items-center gap-1 text-ocean-500 hover:text-ocean-600 text-sm font-medium group/link">
                            <span>Explore</span>
                            <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      whileHover={{ x: 4 }}
                      className="group flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                    >
                      <div className="relative md:w-72 h-48 md:h-auto overflow-hidden shrink-0">
                        <img src={dest.image} alt={dest.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-black/20" />
                        <div className="absolute top-3 left-3 px-3 py-1 bg-ocean-500/90 rounded-lg">
                          <span className="text-xs font-medium text-white">{dest.type}</span>
                        </div>
                      </div>
                      <div className="flex-1 p-6 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm">
                              <MapPin size={14} />
                              <span>{dest.country}</span>
                            </div>
                            <button onClick={() => toggleFavorite(dest.id)}>
                              <Heart size={18} className={favorites.includes(dest.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
                            </button>
                          </div>
                          <h3 className="text-xl font-display font-bold text-deep-blue dark:text-white mb-2 group-hover:text-ocean-500 transition-colors">{dest.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{dest.description}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {dest.highlights.slice(0, 3).map((h, i) => (
                              <span key={i} className="px-2.5 py-1 bg-ocean-50 dark:bg-ocean-900/30 text-ocean-600 dark:text-ocean-400 text-xs rounded-lg">{h}</span>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                          <div className="flex items-center gap-4">
                            <StarRating rating={dest.rating} size={14} />
                            <span className="text-lg font-bold text-deep-blue dark:text-white">{formatPrice(dest.price)}</span>
                          </div>
                          <Link to={`/destination/${dest.id}`} className="flex items-center gap-2 px-5 py-2.5 bg-ocean-500 hover:bg-ocean-600 text-white text-sm font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-ocean-500/30">
                            <span>View Details</span>
                            <ArrowRight size={14} />
                          </Link>
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
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 disabled:opacity-50 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-xl font-medium transition-all ${
                    currentPage === page
                      ? 'bg-ocean-500 text-white shadow-lg shadow-ocean-500/30'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 disabled:opacity-50 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
