import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Star, Clock, Check, ChevronRight, ChevronLeft,
  Calendar, Users, Hotel, ArrowRight, Heart, Share2, Map, Phone, Mail
} from 'lucide-react';
import { destinations } from '../data';
import { StarRating } from '../components/ui/StarRating';
import { formatPrice } from '../utils';

export function DestinationDetailPage() {
  const params = useParams();
  const id = Number(params.id);
  const destination = destinations.find(d => d.id === id);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'itinerary' | 'reviews'>('overview');
  const [isFavorite, setIsFavorite] = useState(false);

  if (!destination) {
    return (
      <main className="pt-32 min-h-screen flex items-center justify-center bg-gray-50 dark:bg-deep-blue">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-600 dark:text-gray-300 mb-4">Destination not found</h2>
          <Link to="/explore" className="text-ocean-500 hover:underline font-medium">Back to Explore</Link>
        </div>
      </main>
    );
  }

  const nextImage = () => setActiveImage((prev) => (prev + 1) % destination.gallery.length);
  const prevImage = () => setActiveImage((prev) => (prev - 1 + destination.gallery.length) % destination.gallery.length);

  return (
    <main className="pt-20 min-h-screen bg-gray-50 dark:bg-deep-blue">
      {/* Hero Gallery */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeImage}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            src={destination.gallery[activeImage]}
            alt={destination.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/40" />

        {/* Gallery Navigation */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {destination.gallery.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeImage ? 'bg-white w-8' : 'bg-white/50'}`}
            />
          ))}
        </div>

        <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/40 transition-all">
          <ChevronLeft size={24} className="text-white" />
        </button>
        <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/40 transition-all">
          <ChevronRight size={24} className="text-white" />
        </button>

        {/* Title Overlay */}
        <div className="absolute bottom-20 left-0 right-0 section-padding">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 text-white/80 mb-3">
                <MapPin size={18} />
                <span className="text-lg">{destination.country}</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4">
                {destination.title}
              </h1>
              <div className="flex items-center gap-4">
                <StarRating rating={destination.rating} size={18} />
                <span className="text-white/80">({destination.reviews} reviews)</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Tabs */}
              <div className="flex gap-2 mb-8 bg-white dark:bg-gray-800 p-2 rounded-xl shadow-sm">
                {(['overview', 'itinerary', 'reviews'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-3 px-4 rounded-lg font-medium text-sm transition-all capitalize ${
                      activeTab === tab
                        ? 'bg-ocean-500 text-white shadow-md'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                {activeTab === 'overview' && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-8"
                  >
                    {/* Description */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-sm">
                      <h2 className="text-2xl font-display font-bold text-deep-blue dark:text-white mb-4">About This Destination</h2>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{destination.description}</p>
                    </div>

                    {/* Highlights */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-sm">
                      <h2 className="text-2xl font-display font-bold text-deep-blue dark:text-white mb-6">Trip Highlights</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {destination.highlights.map((highlight, i) => (
                          <div key={i} className="flex items-center gap-3 p-3 bg-ocean-50 dark:bg-ocean-900/20 rounded-xl">
                            <div className="p-2 bg-ocean-500 rounded-lg">
                              <Check size={16} className="text-white" />
                            </div>
                            <span className="text-gray-700 dark:text-gray-300 font-medium">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Included Services */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-sm">
                      <h2 className="text-2xl font-display font-bold text-deep-blue dark:text-white mb-6">What's Included</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {destination.included.map((item, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <div className="p-1.5 bg-green-100 dark:bg-green-900/30 rounded-lg">
                              <Check size={14} className="text-green-600" />
                            </div>
                            <span className="text-gray-600 dark:text-gray-300">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Hotel Info */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-sm">
                      <h2 className="text-2xl font-display font-bold text-deep-blue dark:text-white mb-6">Accommodation</h2>
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-ocean-50 dark:bg-ocean-900/20 rounded-xl">
                          <Hotel size={24} className="text-ocean-500" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-deep-blue dark:text-white">{destination.hotel.name}</h3>
                          <div className="flex gap-1 my-2">
                            {Array.from({ length: destination.hotel.stars }).map((_, i) => (
                              <Star key={i} size={16} className="fill-sunset-400 text-sunset-400" />
                            ))}
                          </div>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {destination.hotel.amenities.map((amenity, i) => (
                              <span key={i} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm rounded-lg">{amenity}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'itinerary' && (
                  <motion.div
                    key="itinerary"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-sm"
                  >
                    <h2 className="text-2xl font-display font-bold text-deep-blue dark:text-white mb-6">Day-by-Day Itinerary</h2>
                    <div className="space-y-6">
                      {destination.itinerary.map((day, i) => (
                        <div key={i} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-ocean-500 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                              {day.day}
                            </div>
                            {i < destination.itinerary.length - 1 && (
                              <div className="w-0.5 flex-1 bg-ocean-200 dark:bg-ocean-800 my-2" />
                            )}
                          </div>
                          <div className="pb-6">
                            <h3 className="text-lg font-semibold text-deep-blue dark:text-white mb-1">{day.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{day.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'reviews' && (
                  <motion.div
                    key="reviews"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-sm"
                  >
                    <h2 className="text-2xl font-display font-bold text-deep-blue dark:text-white mb-6">Traveler Reviews</h2>
                    <div className="flex items-center gap-4 mb-8 p-4 bg-ocean-50 dark:bg-ocean-900/20 rounded-xl">
                      <div className="text-4xl font-bold text-ocean-500">{destination.rating}</div>
                      <div>
                        <StarRating rating={destination.rating} size={20} />
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Based on {destination.reviews} reviews</p>
                      </div>
                    </div>
                    <div className="space-y-6">
                      {[
                        { name: "Sarah Johnson", rating: 5, date: "May 2026", text: "Absolutely incredible experience! The attention to detail and service quality exceeded all expectations." },
                        { name: "Michael Chen", rating: 5, date: "April 2026", text: "Perfect honeymoon destination. Everything was meticulously planned and the local guide was amazing." },
                        { name: "Priya Patel", rating: 4, date: "March 2026", text: "Great value for money. The hotel was luxurious and the activities were well organized." },
                      ].map((review, i) => (
                        <div key={i} className="border-b border-gray-100 dark:border-gray-700 pb-6 last:border-0">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-ocean-100 dark:bg-ocean-900/30 rounded-full flex items-center justify-center text-ocean-600 font-bold">
                                {review.name[0]}
                              </div>
                              <div>
                                <h4 className="font-semibold text-deep-blue dark:text-white">{review.name}</h4>
                                <p className="text-xs text-gray-500">{review.date}</p>
                              </div>
                            </div>
                            <StarRating rating={review.rating} size={14} />
                          </div>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">{review.text}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-6">
                {/* Booking Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Starting from</span>
                    <div className="flex gap-2">
                      <button onClick={() => setIsFavorite(!isFavorite)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <Heart size={20} className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
                      </button>
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <Share2 size={20} className="text-gray-400" />
                      </button>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-deep-blue dark:text-white mb-1">
                    {formatPrice(destination.price)}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">per person</p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                      <Clock size={16} className="text-ocean-500" />
                      <span>{destination.duration}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                      <Users size={16} className="text-ocean-500" />
                      <span>2-12 Travelers</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                      <Calendar size={16} className="text-ocean-500" />
                      <span>Flexible Dates</span>
                    </div>
                  </div>

                  <Link
                    to={`/booking/${destination.id}`}
                    className="flex items-center justify-center gap-2 w-full py-4 bg-ocean-500 hover:bg-ocean-600 text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-ocean-500/30"
                  >
                    <span>Book This Trip</span>
                    <ArrowRight size={18} />
                  </Link>

                  <p className="text-xs text-center text-gray-400 mt-4">
                    Free cancellation up to 30 days before departure
                  </p>
                </div>

                {/* Contact Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                  <h3 className="font-semibold text-deep-blue dark:text-white mb-4">Need Help?</h3>
                  <div className="space-y-3">
                    <a href="tel:+919876543210" className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-ocean-50 dark:hover:bg-ocean-900/20 transition-colors">
                      <Phone size={18} className="text-ocean-500" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">8870929690</span>
                    </a>
                    <a href="mailto:hello@aadheravacation.com" className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-ocean-50 dark:hover:bg-ocean-900/20 transition-colors">
                      <Mail size={18} className="text-ocean-500" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">adheeravacation2k25@gmail.com</span>
                    </a>
                  </div>
                </div>

                {/* Map Placeholder */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                  <h3 className="font-semibold text-deep-blue dark:text-white mb-4">Location</h3>
                  <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <Map size={32} className="mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">{destination.country}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
