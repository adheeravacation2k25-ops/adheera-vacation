import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Check, Sparkles } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80"
          alt="Beach"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-deep-blue/80" />
      </div>

      <div className="section-padding relative z-10">
        <div className="container-custom">
          <ScrollReveal>
            <div className="max-w-2xl mx-auto text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex p-4 bg-ocean-500/20 rounded-2xl mb-6"
              >
                <Sparkles size={32} className="text-ocean-400" />
              </motion.div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4">
                Get Travel Inspiration
              </h2>
              <p className="text-lg text-white/70 mb-8">
                Subscribe to our newsletter for exclusive deals, destination guides, and travel tips delivered straight to your inbox.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-ocean-400 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={subscribed}
                  className={`flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    subscribed
                      ? 'bg-green-500 text-white'
                      : 'bg-ocean-500 hover:bg-ocean-600 text-white hover:shadow-lg hover:shadow-ocean-500/30'
                  }`}
                >
                  {subscribed ? (
                    <>
                      <Check size={18} />
                      <span>Subscribed!</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Subscribe</span>
                    </>
                  )}
                </button>
              </form>

              <p className="text-sm text-white/40 mt-4">
                No spam, unsubscribe anytime. We respect your privacy.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
