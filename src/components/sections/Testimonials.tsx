import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { testimonials } from '../../data';
import { SectionTitle } from '../ui/SectionTitle';
import { ScrollReveal } from '../ui/ScrollReveal';

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-20 md:py-28 bg-gray-50 dark:bg-deep-blue">
      <div className="section-padding">
        <div className="container-custom">
          <SectionTitle
            title="What Travelers Say"
            subtitle="Real stories from our satisfied customers who experienced unforgettable journeys"
          />

          <ScrollReveal>
            <div className="relative max-w-4xl mx-auto mt-16">
              {/* Main Card */}
              <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-xl">
                {/* Quote Icon */}
                <div className="absolute -top-6 left-8 md:left-12 p-4 bg-ocean-500 rounded-2xl shadow-lg">
                  <Quote size={24} className="text-white" />
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={current}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Stars */}
                    <div className="flex gap-1 mb-6 pt-4">
                      {Array.from({ length: testimonials[current].rating }, (_, i) => (
                        <Star key={i} size={20} className="fill-sunset-400 text-sunset-400" />
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8 italic">
                      "{testimonials[current].text}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      <img
                        src={testimonials[current].avatar}
                        alt={testimonials[current].name}
                        className="w-14 h-14 rounded-full object-cover ring-4 ring-ocean-100 dark:ring-ocean-900"
                      />
                      <div>
                        <h4 className="font-semibold text-deep-blue dark:text-white">
                          {testimonials[current].name}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {testimonials[current].location}
                        </p>
                        <span className="text-xs text-ocean-500 font-medium">
                          {testimonials[current].package}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex gap-2">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                          i === current 
                            ? 'bg-ocean-500 w-8' 
                            : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={prev}
                      className="p-3 rounded-full border border-gray-200 dark:border-gray-600 hover:bg-ocean-50 dark:hover:bg-ocean-900/30 hover:border-ocean-300 transition-all"
                    >
                      <ChevronLeft size={20} className="text-gray-600 dark:text-gray-300" />
                    </button>
                    <button
                      onClick={next}
                      className="p-3 rounded-full border border-gray-200 dark:border-gray-600 hover:bg-ocean-50 dark:hover:bg-ocean-900/30 hover:border-ocean-300 transition-all"
                    >
                      <ChevronRight size={20} className="text-gray-600 dark:text-gray-300" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
