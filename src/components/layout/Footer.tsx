import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Compass, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube, ArrowRight 
} from 'lucide-react';

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'Explore Destinations', path: '/explore' },
  { name: 'Travel Packages', path: '/packages' },
  { name: 'About Us', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

const destinations = [
  { name: 'Maldives', path: '/explore' },
  { name: 'Switzerland', path: '/explore' },
  { name: 'Japan', path: '/explore' },
  { name: 'Bali', path: '/explore' },
  { name: 'Rajasthan', path: '/explore' },
];

export function Footer() {
  return (
    <footer className="bg-deep-blue dark:bg-black text-white">
      {/* Main Footer */}
      <div className="section-padding py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-ocean-500 rounded-xl">
                  <Compass size={24} className="text-white" />
                </div>
                <div>
                  <span className="text-xl font-display font-bold">Adheera</span>
                  <span className="block text-xs tracking-widest uppercase text-ocean-400">Vacation</span>
                </div>
              </Link>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                Crafting unforgettable travel experiences since 2022. Your journey to extraordinary destinations begins here.
              </p>
              <div className="flex gap-3">
                {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="p-2.5 bg-white/10 rounded-lg hover:bg-ocean-500 transition-colors"
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-white/60 hover:text-ocean-400 transition-colors text-sm flex items-center gap-2 group"
                    >
                      <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular Destinations */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Destinations</h4>
              <ul className="space-y-3">
                {destinations.map((dest, i) => (
                  <li key={i}>
                    <Link
                      to={dest.path}
                      className="text-white/60 hover:text-ocean-400 transition-colors text-sm flex items-center gap-2 group"
                    >
                      <MapPin size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      {dest.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-ocean-400 mt-0.5 shrink-0" />
                  <span className="text-white/60 text-sm">
                    1/116 Vijayalakshmi Plaza, SBI First Floor,<br />
                    Gajjalnaicken Patty, Salem - 636201
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-ocean-400 shrink-0" />
                  <span className="text-white/60 text-sm">8870929690</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-ocean-400 shrink-0" />
                  <span className="text-white/60 text-sm">adheeravacation2k25@gmail.com</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="section-padding py-6 border-t border-white/10">
        <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © 2025 Adheera Vacation. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-white/40 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/40 hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-white/40 hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
