import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';
import { blogPosts } from '../../data';
import { SectionTitle } from '../ui/SectionTitle';
import { ScrollReveal } from '../ui/ScrollReveal';

export function BlogPreview() {
  return (
    <section className="py-20 md:py-28 bg-white dark:bg-deep-blue-light">
      <div className="section-padding">
        <div className="container-custom">
          <SectionTitle
            title="Travel Insights"
            subtitle="Expert tips, destination guides, and travel inspiration from our team"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {blogPosts.map((post, index) => (
              <ScrollReveal key={post.id} delay={index * 0.15}>
                <motion.article
                  whileHover={{ y: -8 }}
                  className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700"
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-ocean-500 text-white text-xs font-medium rounded-lg">
                      {post.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-display font-bold text-deep-blue dark:text-white mb-2 group-hover:text-ocean-500 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <User size={14} className="text-ocean-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{post.author}</span>
                      </div>
                      <span className="flex items-center gap-1 text-ocean-500 text-sm font-medium group-hover:gap-2 transition-all">
                        Read More
                        <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </motion.article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
