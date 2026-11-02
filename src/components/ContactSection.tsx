import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, Heart } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dogName: '',
    dogBreed: '',
    subject: 'General Question',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-[#FAF7F2] border-t border-[#EADBCC]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Contact details & Location */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A2672E]">
              <Mail className="w-4 h-4 text-[#A2672E]" />
              <span>Get in Touch</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold text-[#2C2723] tracking-tight">
              Contact Pupcake Adelaide
            </h2>

            <p className="text-stone-600 text-sm md:text-base leading-relaxed">
              Have questions about your doodle’s sensitive stomach? Planning a park paw-ty or need a rush next-day delivery in Adelaide? We'd love to chat with fellow pet parents.
            </p>

            <div className="space-y-4 pt-4 text-xs sm:text-sm text-stone-700">
              <div className="flex items-start gap-3.5 bg-white p-4 rounded-2xl border border-stone-200">
                <MapPin className="w-5 h-5 text-[#A2672E] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#2C2723] block">Studio Kitchen & Pickup</span>
                  <span className="text-stone-600 text-xs">88 O’Connell Street, North Adelaide SA 5006</span>
                  <span className="text-[11px] text-stone-400 block mt-0.5">Free onsite pet-friendly collection parking</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 bg-white p-4 rounded-2xl border border-stone-200">
                <Phone className="w-5 h-5 text-[#2D5A43] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#2C2723] block">Call or Text the Bakers</span>
                  <span className="text-stone-600 text-xs">(08) 8234 PUPP · 0412 890 234</span>
                  <span className="text-[11px] text-stone-400 block mt-0.5">Fast SMS answers for pup allergy questions</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 bg-white p-4 rounded-2xl border border-stone-200">
                <Mail className="w-5 h-5 text-[#A2672E] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#2C2723] block">Email Us</span>
                  <span className="text-stone-600 text-xs">hello@pupcakeadelaide.com.au</span>
                  <span className="text-[11px] text-stone-400 block mt-0.5">We reply within 2 business hours</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 bg-white p-4 rounded-2xl border border-stone-200">
                <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#2C2723] block">Baking & Delivery Hours</span>
                  <span className="text-stone-600 text-xs">Mon – Sat: 7:30 AM – 5:00 PM</span>
                  <span className="text-stone-600 text-xs block">Sun: 8:00 AM – 1:30 PM (Weekend Delivery)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact & Inquiry Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-[#EDE5D8] shadow-sm">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#2C2723]">Thank you for reaching out!</h3>
                <p className="text-sm text-stone-600 max-w-md mx-auto">
                  We received your message regarding {formData.dogName || 'your pup'} and our Adelaide baking team will respond via phone or email shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-[#2C2723]">Send Us a Message</h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Ask about custom recipes, catering for Adelaide park dog meetups, or rush orders.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Chloe Adams"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-[#A2672E] text-stone-900 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. chloe@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-[#A2672E] text-stone-900 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0412 345 678"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-[#A2672E] text-stone-900 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Dog’s Name
                    </label>
                    <input
                      type="text"
                      value={formData.dogName}
                      onChange={(e) => setFormData({ ...formData, dogName: e.target.value })}
                      placeholder="e.g. Barnaby"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-[#A2672E] text-stone-900 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Dog Breed
                    </label>
                    <input
                      type="text"
                      value={formData.dogBreed}
                      onChange={(e) => setFormData({ ...formData, dogBreed: e.target.value })}
                      placeholder="e.g. Cavoodle"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-[#A2672E] text-stone-900 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-[#A2672E] text-stone-900 text-sm bg-white"
                  >
                    <option value="General Question">General Question</option>
                    <option value="Rush 24h Cake Order">Rush 24h Cake Order</option>
                    <option value="Doggy Paw-ty / Group Catering">Doggy Paw-ty / Group Catering</option>
                    <option value="Severe Allergy Consultation">Severe Allergy Consultation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Your Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your celebration date, Adelaide suburb, and any questions you have..."
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-[#A2672E] text-stone-900 text-sm"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#A2672E] hover:bg-[#8D5724] text-white text-sm font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Inquiry to Adelaide Bakers</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
