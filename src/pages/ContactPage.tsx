import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, Phone, Mail, Clock, Send, Check,
  Facebook, Instagram, Twitter, Youtube
} from 'lucide-react';
import { SectionTitle } from '../components/ui/SectionTitle';
import { ScrollReveal } from '../components/ui/ScrollReveal';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <main className="pt-20 min-h-screen bg-gray-50 dark:bg-deep-blue">
      {/* Hero */}
      <section className="py-16 md:py-20 bg-deep-blue relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&q=80" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="section-padding relative z-10">
          <div className="container-custom text-center">
            <SectionTitle
              title="Get in Touch"
              subtitle="Have questions? We would love to hear from you. Reach out and let's plan your next adventure."
              light
            />
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="section-padding -mt-10 relative z-10">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: MapPin, title: 'Visit Us', lines: ['1/116 Vijayalakshmi Plaza', 'SBI First Floor, Gajjalnaicken Patty.'] },
              { icon: Phone, title: 'Call Us', lines: ['8870929690', 'Mon-Sat, 9am-8pm'] },
              { icon: Mail, title: 'Email Us', lines: ['adheeravacation2k25@gmail.com', 'We reply within 24 hours'] },
            ].map((card, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 text-center"
                >
                  <div className="inline-flex p-3 bg-ocean-50 dark:bg-ocean-900/30 rounded-xl mb-4">
                    <card.icon size={24} className="text-ocean-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-deep-blue dark:text-white mb-3">{card.title}</h3>
                  {card.lines.map((line, j) => (
                    <p key={j} className="text-sm text-gray-600 dark:text-gray-400">{line}</p>
                  ))}
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Form & Map */}
      <section className="section-padding py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <ScrollReveal>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
                <h2 className="text-2xl font-display font-bold text-deep-blue dark:text-white mb-6">
                  Send Us a Message
                </h2>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check size={32} className="text-green-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-deep-blue dark:text-white mb-2">Message Sent!</h3>
                    <p className="text-gray-600 dark:text-gray-400">We will get back to you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-ocean-500 dark:text-white"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-ocean-500 dark:text-white"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-ocean-500 dark:text-white"
                          placeholder="8870929690"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                        <input
                          type="text"
                          required
                          value={formData.subject}
                          onChange={(e) => setFormData({...formData, subject: e.target.value})}
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-ocean-500 dark:text-white"
                          placeholder="Booking Inquiry"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                      <textarea
                        rows={5}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-ocean-500 dark:text-white resize-none"
                        placeholder="Tell us about your travel plans..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="flex items-center justify-center gap-2 w-full py-4 bg-ocean-500 hover:bg-ocean-600 text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-ocean-500/30"
                    >
                      <Send size={18} />
                      <span>Send Message</span>
                    </button>
                  </form>
                )}
              </div>
            </ScrollReveal>

            {/* Map & Social */}
            <ScrollReveal delay={0.2}>
              <div className="space-y-6">
                {/* Map Placeholder */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-100 dark:border-gray-700">
                  <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center w-full">
                    <img
                      src="/src/images/Adheera-logo.png"
                      alt="Adheera Vacation Logo"
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>

                {/* Social Links */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-deep-blue dark:text-white mb-4">Follow Us</h3>
                  <div className="flex gap-3">
                    {[
                      { icon: Facebook, label: 'Facebook' },
                      { icon: Instagram, label: 'Instagram' },
                      { icon: Twitter, label: 'Twitter' },
                      { icon: Youtube, label: 'YouTube' },
                    ].map((social, i) => (
                      <motion.a
                        key={i}
                        href="#"
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="flex-1 flex flex-col items-center gap-2 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-ocean-50 dark:hover:bg-ocean-900/30 transition-colors"
                      >
                        <social.icon size={24} className="text-ocean-500" />
                        <span className="text-xs text-gray-600 dark:text-gray-400">{social.label}</span>
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Working Hours */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock size={20} className="text-ocean-500" />
                    <h3 className="text-lg font-semibold text-deep-blue dark:text-white">Working Hours</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Monday - Friday</span>
                      <span className="font-medium text-deep-blue dark:text-white">9:00 AM - 8:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Saturday</span>
                      <span className="font-medium text-deep-blue dark:text-white">10:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Sunday</span>
                      <span className="font-medium text-deep-blue dark:text-white">Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
}
