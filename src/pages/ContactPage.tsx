import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  Instagram, 
  Facebook, 
  Twitter, 
  Music, 
  ShieldCheck, 
  Sparkles,
  Navigation
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useApp();

  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      showToast('Thank you! Your message has been sent to our café team.', 'success');
      setForm({ name: '', email: '', subject: 'General Inquiry', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 600);
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#4A6B53]">
          Connect with Us
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#2C1810]">
          Get in Touch & Find Us
        </h1>
        <p className="text-sm sm:text-base text-[#6B5749]">
          Have questions regarding catering, private terrace gatherings, or bean subscriptions? Send us a message or visit us in Indiranagar.
        </p>
      </div>

      {/* Demo Notice Disclaimer Badge */}
      <div className="bg-[#FAF4ED] border border-[#EDE4DC] rounded-2xl p-3.5 flex items-center justify-center gap-2 text-xs text-[#7C6656] text-center max-w-2xl mx-auto">
        <ShieldCheck className="w-4 h-4 text-[#4A6B53] shrink-0" />
        <span>
          <strong>Notice:</strong> This is a demo café website showcase. All contact info and booking records are stored in browser localStorage.
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Contact Info & Hours Cards */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Info Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE4DC] shadow-xs space-y-6">
            <h3 className="font-serif text-xl font-bold text-[#2C1810] border-b border-[#F2ECE6] pb-3">
              Brew & Bloom Flagship
            </h3>

            <div className="space-y-4 text-sm text-[#5A483E]">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#FAF4ED] text-[#3D2314] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#7C6656]">Café Address</h4>
                  <p className="text-xs sm:text-sm font-medium text-[#2C1810] mt-0.5">
                    42 Bloom Heritage Boulevard, 12th Main Road, Indiranagar, Bengaluru, Karnataka 560038
                  </p>
                  <span className="text-[11px] text-[#4A6B53] font-medium block mt-1">
                    Landmark: Near 100 Feet Road junction, opposite Bonsai Park
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#FAF4ED] text-[#3D2314] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#7C6656]">Phone & WhatsApp</h4>
                  <p className="text-xs sm:text-sm font-medium text-[#2C1810] mt-0.5">
                    +91 80 4567 8900
                  </p>
                  <p className="text-[11px] text-[#7C6656]">Customer Desk: +91 98765 43210</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#FAF4ED] text-[#3D2314] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#7C6656]">Email Inquiries</h4>
                  <p className="text-xs sm:text-sm font-medium text-[#2C1810] mt-0.5">
                    hello@brewandbloom.cafe
                  </p>
                  <p className="text-[11px] text-[#7C6656]">Events: bookings@brewandbloom.cafe</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#EAF2EC] text-[#4A6B53] flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#4A6B53]">Opening Hours</h4>
                  <p className="text-xs font-medium text-[#2C1810] mt-0.5">
                    <strong>Monday – Friday:</strong> 7:30 AM – 10:30 PM
                  </p>
                  <p className="text-xs font-medium text-[#2C1810]">
                    <strong>Saturday – Sunday:</strong> 8:00 AM – 11:30 PM
                  </p>
                  <span className="text-[11px] text-[#8C7667] block mt-0.5">
                    Kitchen closes 30 minutes before café closing.
                  </span>
                </div>
              </div>
            </div>

            {/* Social Follow */}
            <div className="pt-4 border-t border-[#F2ECE6]">
              <h4 className="text-xs font-semibold text-[#7C6656] uppercase tracking-wider mb-2.5">
                Follow our Community
              </h4>
              <div className="flex items-center gap-2.5">
                {[
                  { name: 'Instagram', icon: <Instagram className="w-4 h-4" />, handle: '@brewandbloom.cafe' },
                  { name: 'Facebook', icon: <Facebook className="w-4 h-4" />, handle: '/brewandbloom' },
                  { name: 'Twitter', icon: <Twitter className="w-4 h-4" />, handle: '@brewandbloom' },
                  { name: 'Spotify', icon: <Music className="w-4 h-4" />, handle: 'Café Chill Playlist' }
                ].map((item) => (
                  <button
                    key={item.name}
                    onClick={() => alert(`Connect with us on ${item.name}: ${item.handle}`)}
                    className="p-2.5 rounded-xl bg-[#FAF4ED] hover:bg-[#3D2314] text-[#3D2314] hover:text-white transition-all"
                    title={item.name}
                  >
                    {item.icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Contact Form & Maps Placeholder */}
        <div className="lg:col-span-7 space-y-6">
          {/* Contact Form */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EDE4DC] shadow-xs space-y-6">
            <h3 className="font-serif text-2xl font-bold text-[#2C1810]">
              Send Us a Note
            </h3>

            {submitted && (
              <div className="p-4 rounded-xl bg-[#EAF2EC] border border-[#B6D6BF] text-[#2C1810] flex items-center gap-3 text-sm animate-fadeIn">
                <CheckCircle2 className="w-5 h-5 text-[#4A6B53] shrink-0" />
                <span>Your message has been received! Our café concierge will respond within 24 hours.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#2C1810] block mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Aditi Rao"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#D9CFC7] text-sm text-[#2C1810] focus:outline-none focus:border-[#3D2314]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#2C1810] block mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="aditi@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#D9CFC7] text-sm text-[#2C1810] focus:outline-none focus:border-[#3D2314]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#2C1810] block mb-1">
                  Subject / Inquiry Type
                </label>
                <select
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#D9CFC7] text-sm text-[#2C1810] focus:outline-none focus:border-[#3D2314]"
                >
                  <option value="General Inquiry">General Café Inquiry</option>
                  <option value="Private Gathering & Terrace Booking">Private Gathering & Terrace Booking</option>
                  <option value="Coffee Roastery & Wholesale">Coffee Roastery & Wholesale</option>
                  <option value="Feedback / Compliment">Feedback / Compliment</option>
                  <option value="Acoustic Music & Workshop Proposal">Acoustic Music & Workshop Proposal</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#2C1810] block mb-1">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="How can we assist you?"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#D9CFC7] text-sm text-[#2C1810] focus:outline-none focus:border-[#3D2314]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#3D2314] hover:bg-[#25150B] disabled:bg-stone-400 text-[#FAF7F2] text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 text-[#E6C9A8]" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Stylized Google Maps Card Placeholder */}
          <div className="bg-white rounded-3xl p-6 border border-[#EDE4DC] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-serif text-lg font-bold text-[#2C1810] flex items-center gap-2">
                <Navigation className="w-4 h-4 text-[#4A6B53]" />
                <span>Map Location</span>
              </h4>
              <span className="text-xs text-[#7C6656]">Indiranagar, Bengaluru</span>
            </div>

            {/* Visual map preview canvas */}
            <div className="relative rounded-2xl overflow-hidden border border-[#EDE4DC] aspect-16/9 bg-[#F4EFEA] flex items-center justify-center">
              {/* Map grid styled SVG background */}
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#3D2314_1px,transparent_1px)] [background-size:16px_16px]" />
              
              <div className="relative z-10 text-center space-y-2 p-6 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-[#EDE4DC] max-w-sm">
                <div className="w-10 h-10 rounded-full bg-[#3D2314] text-[#FAF7F2] flex items-center justify-center mx-auto shadow-md">
                  <MapPin className="w-5 h-5 text-[#E6C9A8]" />
                </div>
                <h5 className="font-serif text-base font-bold text-[#2C1810]">
                  Brew & Bloom Café
                </h5>
                <p className="text-[11px] text-[#6B5749]">
                  42 Bloom Heritage Boulevard, Indiranagar, Bengaluru
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => alert("Redirecting to Google Maps for directions to Brew & Bloom Café (Demo)")}
                    className="px-4 py-1.5 rounded-full bg-[#3D2314] text-white text-[11px] font-semibold hover:bg-[#25150B] transition-colors"
                  >
                    Open in Maps →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
