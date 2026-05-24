import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, Users, Check, ArrowLeft, Shield,
  Clock, Star, MapPin
} from 'lucide-react';
import { destinations, packages } from '../data';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { formatPrice } from '../utils';
import { sendBookingEmails } from "../services/emailjs";

export function BookingPage() {
  const params = useParams();
  const [bookingReference, setBookingReference] = useState('');
  const id = Number(params.id);
  const allItems = [...destinations, ...packages];
  const item = allItems.find(d => d.id === id);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    travelDate: '',
    travelers: 2,
    specialRequests: '',
    agreeTerms: false,

  });

  const handleBooking = async () => {

  if (!item) return;

  const referenceId =
    `AV-${Date.now().toString().slice(-8)}`;

  const bookingData = {

    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    phone: formData.phone,

    travelDate: formData.travelDate,
    travelers: formData.travelers,
    specialRequests: formData.specialRequests,

    packageName: item.title,

    duration:
      'duration' in item
        ? item.duration
        : "Custom Trip",

    packagePrice: price,

    totalAmount: totalPrice,

    bookingRef: referenceId,

  };

  const response =
    await sendBookingEmails(bookingData);

  if (response.success) {

    setBookingReference(referenceId);

    setStep(3);

  }

};

  if (!item) {
    return (
      <main className="pt-32 min-h-screen flex items-center justify-center bg-gray-50 dark:bg-deep-blue">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-600 dark:text-gray-300 mb-4">Package not found</h2>
          <Link to="/packages" className="text-ocean-500 hover:underline font-medium">Back to Packages</Link>
        </div>
      </main>
    );
  }

  const price = 'price' in item ? item.price : 0;
  const totalPrice = price * formData.travelers;

  const handleSubmit = async (e: React.FormEvent) => {

  e.preventDefault();

  // Step 1 → Step 2
  if (step === 1) {

    setStep(2);
    return;

  }

  // Step 2 → Send Email + Confirm Booking
  if (step === 2) {

    await handleBooking();

  }

};

  return (
    <main className="pt-20 min-h-screen bg-gray-50 dark:bg-deep-blue">
      {/* Header */}
      <section className="py-12 bg-deep-blue">
        <div className="section-padding">
          <div className="container-custom">
            <Link to={`/destination/${item.id}`} className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors">
              <ArrowLeft size={18} />
              <span>Back to Details</span>
            </Link>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
              Book Your Trip
            </h1>
            <p className="text-white/70">Complete your booking for {item?.title}</p>
          </div>
        </div>
      </section>

      {/* Progress Steps */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="section-padding py-6">
          <div className="container-custom">
            <div className="flex items-center justify-center max-w-2xl mx-auto">
              {[
                { num: 1, label: 'Details' },
                { num: 2, label: 'Review' },
                { num: 3, label: 'Confirm' },
              ].map((s, i) => (
                <div key={s.num} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                      step >= s.num
                        ? 'bg-ocean-500 text-white shadow-lg shadow-ocean-500/30'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                    }`}>
                      {step > s.num ? <Check size={18} /> : s.num}
                    </div>
                    <span className={`text-xs mt-2 font-medium ${step >= s.num ? 'text-ocean-500' : 'text-gray-400'}`}>{s.label}</span>
                  </div>
                  {i < 2 && (
                    <div className={`w-24 md:w-32 h-0.5 mx-2 ${step > s.num ? 'bg-ocean-500' : 'bg-gray-200 dark:bg-gray-700'}`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <section className="section-padding py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Form */}
            <div className="lg:col-span-2">
              <ScrollReveal>
                <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-700">
                  {step === 1 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                      <h2 className="text-2xl font-display font-bold text-deep-blue dark:text-white mb-6">Traveler Information</h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">First Name</label>
                          <input
                            type="text"
                            required
                            value={formData.firstName}
                            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-ocean-500 dark:text-white"
                            placeholder="John"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
                          <input
                            type="text"
                            required
                            value={formData.lastName}
                            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-ocean-500 dark:text-white"
                            placeholder="Doe"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</label>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-ocean-500 dark:text-white"
                            placeholder="+91 98765 43210"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Travel Date</label>
                          <div className="relative">
                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                              type="date"
                              required
                              value={formData.travelDate}
                              onChange={(e) => setFormData({...formData, travelDate: e.target.value})}
                              className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-ocean-500 dark:text-white"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Number of Travelers</label>
                          <div className="relative">
                            <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                              type="number"
                              min={1}
                              max={20}
                              value={formData.travelers}
                              onChange={(e) => setFormData({...formData, travelers: Number(e.target.value)})}
                              className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-ocean-500 dark:text-white"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Special Requests</label>
                        <textarea
                          rows={3}
                          value={formData.specialRequests}
                          onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-ocean-500 dark:text-white resize-none"
                          placeholder="Any dietary requirements, accessibility needs, or special occasions..."
                        />
                      </div>

                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          id="terms"
                          required
                          checked={formData.agreeTerms}
                          onChange={(e) => setFormData({...formData, agreeTerms: e.target.checked})}
                          className="mt-1 w-5 h-5 rounded border-gray-300 text-ocean-500 focus:ring-ocean-500"
                        />
                        <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-400">
                          I agree to the <a href="#" className="text-ocean-500 hover:underline">Terms & Conditions</a> and <a href="#" className="text-ocean-500 hover:underline">Privacy Policy</a>
                        </label>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                      <h2 className="text-2xl font-display font-bold text-deep-blue dark:text-white mb-6">Review Your Booking</h2>

                      <div className="bg-ocean-50 dark:bg-ocean-900/20 rounded-xl p-6">
                        <h3 className="font-semibold text-deep-blue dark:text-white mb-4">Trip Summary</h3>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Destination</span>
                            <span className="font-medium text-deep-blue dark:text-white">{item?.title}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Duration</span>
                            <span className="font-medium text-deep-blue dark:text-white">{'duration' in item ? item.duration : 'N/A'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Travel Date</span>
                            <span className="font-medium text-deep-blue dark:text-white">{formData.travelDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Travelers</span>
                            <span className="font-medium text-deep-blue dark:text-white">{formData.travelers} persons</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                        <h3 className="font-semibold text-deep-blue dark:text-white mb-4">Traveler Details</h3>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Name</span>
                            <span className="font-medium text-deep-blue dark:text-white">{formData.firstName} {formData.lastName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Email</span>
                            <span className="font-medium text-deep-blue dark:text-white">{formData.email}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Phone</span>
                            <span className="font-medium text-deep-blue dark:text-white">{formData.phone}</span>
                          </div>
                        </div>
                      </div>

                      {formData.specialRequests && (
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                          <h3 className="font-semibold text-deep-blue dark:text-white mb-2">Special Requests</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{formData.specialRequests}</p>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                      <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check size={40} className="text-green-500" />
                      </div>
                      <h2 className="text-3xl font-display font-bold text-deep-blue dark:text-white mb-4">
                        Booking Confirmed!
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto mb-8">
                        Thank you for booking with Aadhera Vacation. We've sent a confirmation email to {formData.email} with all the details.
                      </p>
                      <div className="bg-ocean-50 dark:bg-ocean-900/20 rounded-xl p-6 max-w-md mx-auto mb-8">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Booking Reference</p>
                        <p className="text-2xl font-bold text-ocean-500">{bookingReference}</p>
                      </div>
                      <Link to="/" className="inline-flex items-center gap-2 px-8 py-3 bg-ocean-500 hover:bg-ocean-600 text-white font-semibold rounded-xl transition-all">
                        Back to Home
                      </Link>
                    </motion.div>
                  )}

                  {step < 3 && (
                    <div className="flex gap-4 pt-6 border-t border-gray-100 dark:border-gray-700">
                      {step > 1 && (
                        <button
                          type="button"
                          onClick={() => setStep(step - 1)}
                          className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                        >
                          Back
                        </button>
                      )}
                      <button
                        type="submit"
                        className="flex-1 flex items-center justify-center gap-2 py-3 bg-ocean-500 hover:bg-ocean-600 text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-ocean-500/30"
                      >
                        <span>{step === 2 ? 'Confirm Booking' : 'Continue'}</span>
                      </button>
                    </div>
                  )}
                </form>
              </ScrollReveal>
            </div>

            {/* Sidebar Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <ScrollReveal>
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                    <div className="relative h-40 rounded-xl overflow-hidden mb-4">
                      <img src={item.image} alt={item?.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/30" />
                      <div className="absolute bottom-3 left-3">
                        <h3 className="text-white font-semibold">{item?.title}</h3>
                        <div className="flex items-center gap-1 text-white/80 text-sm">
                          <MapPin size={14} />
                          <span>{'country' in item ? item.country : (item as any).destinations?.[0]}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      {'duration' in item && (
                        <div className="flex items-center gap-3 text-sm">
                          <Clock size={16} className="text-ocean-500" />
                          <span className="text-gray-600 dark:text-gray-300">{item.duration}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-3 text-sm">
                        <Users size={16} className="text-ocean-500" />
                        <span className="text-gray-600 dark:text-gray-300">{formData.travelers} Travelers</span>
                      </div>
                      {'rating' in item && (
                        <div className="flex items-center gap-3 text-sm">
                          <Star size={16} className="text-sunset-400 fill-sunset-400" />
                          <span className="text-gray-600 dark:text-gray-300">{item.rating} Rating</span>
                        </div>
                      )}
                    </div>

                    <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600 dark:text-gray-400">Price per person</span>
                        <span className="font-medium text-deep-blue dark:text-white">{formatPrice(price)}</span>
                      </div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-600 dark:text-gray-400">Travelers</span>
                        <span className="font-medium text-deep-blue dark:text-white">x {formData.travelers}</span>
                      </div>
                      <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700">
                        <span className="font-semibold text-deep-blue dark:text-white">Total</span>
                        <span className="text-2xl font-bold text-ocean-500">{formatPrice(totalPrice)}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-6 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                      <Shield size={16} className="text-green-500 shrink-0" />
                      <span className="text-xs text-green-700 dark:text-green-400">Secure booking with free cancellation up to 30 days</span>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
