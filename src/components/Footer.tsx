import React, { useState } from 'react';
import { 
  Coffee, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Instagram, 
  Facebook, 
  Twitter, 
  Music, 
  ArrowRight, 
  Heart,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PageView } from '../types';

export const Footer: React.FC = () => {
  const { navigateTo } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim() && newsletterEmail.includes('@')) {
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer id="main-footer" className="bg-[#24140B] text-[#D8C7BA] pt-16 pb-12 border-t border-[#3A2213]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#3D2617]">
          {/* Brand & Story */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#E6C9A8] text-[#24140B] flex items-center justify-center font-bold">
                <Coffee className="w-5 h-5 text-[#24140B]" />
              </div>
              <span className="font-serif text-2xl font-bold text-[#FAF7F2] tracking-wide">
                Brew & Bloom
              </span>
            </div>
            <p className="text-xs italic text-[#C2AA96]">"Good Coffee. Great Moments."</p>
            <p className="text-sm text-[#A89485] leading-relaxed">
              An oasis of artisan coffee, botanical serenity, and handcrafted bakes. Sourced ethically from shade-grown estates in Chikmagalur and roasted to perfection.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="#instagram" 
                onClick={(e) => { e.preventDefault(); alert("Follow us on Instagram: @brewandbloom.cafe"); }}
                className="w-9 h-9 rounded-full bg-[#351E11] hover:bg-[#E6C9A8] hover:text-[#24140B] text-[#E6C9A8] flex items-center justify-center transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="#facebook" 
                onClick={(e) => { e.preventDefault(); alert("Follow us on Facebook: @brewandbloomcafe"); }}
                className="w-9 h-9 rounded-full bg-[#351E11] hover:bg-[#E6C9A8] hover:text-[#24140B] text-[#E6C9A8] flex items-center justify-center transition-colors"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="#twitter" 
                onClick={(e) => { e.preventDefault(); alert("Follow us on Twitter/X: @brewandbloom"); }}
                className="w-9 h-9 rounded-full bg-[#351E11] hover:bg-[#E6C9A8] hover:text-[#24140B] text-[#E6C9A8] flex items-center justify-center transition-colors"
                title="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="#spotify" 
                onClick={(e) => { e.preventDefault(); alert("Listen to our 'Bloom Café Chill & Jazz' Spotify playlist!"); }}
                className="w-9 h-9 rounded-full bg-[#351E11] hover:bg-[#4A6B53] hover:text-white text-[#88B093] flex items-center justify-center transition-colors"
                title="Café Spotify Playlist"
              >
                <Music className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold text-[#FAF7F2] tracking-wide">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  onClick={() => navigateTo('home')} 
                  className="hover:text-[#FAF7F2] transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E6C9A8]"></span>
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('menu')} 
                  className="hover:text-[#FAF7F2] transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E6C9A8]"></span>
                  Artisan Menu
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('booking')} 
                  className="hover:text-[#FAF7F2] transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E6C9A8]"></span>
                  Table Reservation
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('about')} 
                  className="hover:text-[#FAF7F2] transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E6C9A8]"></span>
                  Our Story & Beans
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('gallery')} 
                  className="hover:text-[#FAF7F2] transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E6C9A8]"></span>
                  Photo Gallery
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('contact')} 
                  className="hover:text-[#FAF7F2] transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E6C9A8]"></span>
                  Contact & Hours
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('admin')} 
                  className="text-[#88B093] hover:text-white transition-colors flex items-center gap-1.5 font-medium"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#88B093]"></span>
                  Admin Portal (Demo)
                </button>
              </li>
            </ul>
          </div>

          {/* Operating Hours & Location */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold text-[#FAF7F2] tracking-wide">
              Hours & Location
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3 text-[#A89485]">
                <Clock className="w-4 h-4 text-[#E6C9A8] shrink-0 mt-1" />
                <div>
                  <p className="text-[#FAF7F2] font-medium">Monday - Friday</p>
                  <p className="text-xs">7:30 AM – 10:30 PM</p>
                  <p className="text-[#FAF7F2] font-medium mt-1.5">Saturday - Sunday</p>
                  <p className="text-xs">8:00 AM – 11:30 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-[#A89485] pt-1">
                <MapPin className="w-4 h-4 text-[#E6C9A8] shrink-0 mt-1" />
                <div>
                  <p className="text-xs leading-relaxed">
                    42 Bloom Heritage Boulevard, 12th Main, Indiranagar, Bengaluru, KA 560038
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-[#A89485]">
                <Phone className="w-4 h-4 text-[#E6C9A8] shrink-0" />
                <p className="text-xs">+91 80 4567 8900</p>
              </div>
            </div>
          </div>

          {/* Newsletter Club */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold text-[#FAF7F2] tracking-wide">
              The Bloom Club
            </h4>
            <p className="text-xs text-[#A89485] leading-relaxed">
              Subscribe for secret seasonal roasts, weekend live music invites, and 15% off your first online order.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Your email address..."
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-[#321C0F] border border-[#4D2E1A] text-sm text-[#FAF7F2] placeholder-[#8A7263] focus:outline-none focus:border-[#E6C9A8]"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-3 rounded-lg bg-[#E6C9A8] hover:bg-[#D4B38E] text-[#24140B] text-xs font-semibold flex items-center transition-colors"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <div className="flex items-center gap-1.5 text-xs text-[#88B093] mt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Welcome to the Bloom Club! Check your inbox.</span>
                </div>
              )}
            </form>

            <div className="p-3 rounded-xl bg-[#321C0F]/60 border border-[#442816] text-[11px] text-[#A69384] space-y-1">
              <div className="flex items-center gap-1.5 text-[#E6C9A8] font-semibold">
                <Coffee className="w-3.5 h-3.5" />
                <span>Pet-Friendly & High-Speed WiFi</span>
              </div>
              <p>Bring your companions & laptops. Outdoor patio seating available.</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#8A7566]">
          <p>© {new Date().getFullYear()} Brew & Bloom Café Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-1">
              Handcrafted with <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" /> for coffee lovers
            </span>
            <span className="px-2.5 py-1 rounded bg-[#331C0E] text-[#A38D7D] font-mono text-[10px]">
              Demo Business Portal
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
