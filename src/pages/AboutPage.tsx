import React from 'react';
import { 
  Coffee, 
  Leaf, 
  Heart, 
  Award, 
  Sparkles, 
  Users, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  ArrowRight 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="pt-28 pb-20 space-y-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. HERO STORY */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAF2EC] text-[#4A6B53] text-xs font-semibold">
            <Leaf className="w-3.5 h-3.5" />
            <span>Rooted in Passion Since 2021</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#2C1810] leading-tight">
            Where Specialty Coffee Meets Botanical Serenity
          </h1>

          <p className="text-base sm:text-lg text-[#5A483E] leading-relaxed">
            Brew & Bloom Café began with a single conviction: that coffee should not merely be a rushed morning utility, but a mindful daily ritual. We set out to build a calm sanctuary where people could breathe, think, converse, and taste the genuine magic of ethical, shade-grown Arabica.
          </p>

          <p className="text-sm sm:text-base text-[#6B5749] leading-relaxed">
            Nestled in the lush greenery of Indiranagar, Bengaluru, our sun-drenched conservatory café blends Scandinavian minimalism with rich colonial woodcraft and over 120 curated botanicals.
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <button
              onClick={() => navigateTo('menu')}
              className="px-7 py-3.5 rounded-full bg-[#3D2314] hover:bg-[#25150B] text-[#FAF7F2] text-sm font-semibold shadow-md transition-all flex items-center gap-2"
            >
              <Coffee className="w-4 h-4 text-[#E6C9A8]" />
              <span>Explore Our Roasts</span>
            </button>
            <button
              onClick={() => navigateTo('booking')}
              className="px-7 py-3.5 rounded-full bg-white hover:bg-[#FAF7F2] text-[#3D2314] border border-[#D9CFC7] text-sm font-semibold shadow-xs transition-all"
            >
              Book a Visit
            </button>
          </div>
        </div>

        {/* Hero Collage */}
        <div className="lg:col-span-5 relative">
          <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/5 relative bg-stone-200">
            <img
              src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1000&q=80"
              alt="Barista brewing artisan espresso at Brew & Bloom"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Overlay Floating Card */}
          <div className="absolute -bottom-6 -left-6 bg-[#FAF7F2] p-4 sm:p-5 rounded-2xl shadow-xl border border-[#EDE4DC] max-w-xs space-y-1">
            <div className="flex items-center gap-2 text-[#4A6B53] font-bold text-xs">
              <Sparkles className="w-4 h-4" />
              <span>100% Traceable Estates</span>
            </div>
            <p className="text-xs text-[#6B5749]">
              Sourced directly from heritage biodiversity estates in Baba Budangiri & Chikmagalur.
            </p>
          </div>
        </div>
      </section>

      {/* 2. OUR PILLARS / MISSION */}
      <section className="bg-white rounded-3xl p-8 sm:p-14 border border-[#EDE4DC] shadow-sm space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#4A6B53]">
            What Drives Us
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C1810]">
            The Four Bloom Commitments
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-3 p-5 rounded-2xl bg-[#FAF7F2] border border-[#F0E8E1]">
            <div className="w-12 h-12 rounded-xl bg-[#3D2314] text-[#E6C9A8] flex items-center justify-center">
              <Coffee className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#2C1810]">Peak Roasting</h3>
            <p className="text-xs text-[#6B5749] leading-relaxed">
              We never serve beans roasted older than 18 days or younger than 4 days. Small-batch air roasters ensure clear acidity and caramel sweetness.
            </p>
          </div>

          <div className="space-y-3 p-5 rounded-2xl bg-[#FAF7F2] border border-[#F0E8E1]">
            <div className="w-12 h-12 rounded-xl bg-[#4A6B53] text-white flex items-center justify-center">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#2C1810]">Fair Sourcing</h3>
            <p className="text-xs text-[#6B5749] leading-relaxed">
              We pay 35% above Fair Trade minimums directly to smallholder estate owners, funding clean rainwater harvesting and pollinator corridors.
            </p>
          </div>

          <div className="space-y-3 p-5 rounded-2xl bg-[#FAF7F2] border border-[#F0E8E1]">
            <div className="w-12 h-12 rounded-xl bg-[#915B38] text-white flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#2C1810]">Daily Bakery Craft</h3>
            <p className="text-xs text-[#6B5749] leading-relaxed">
              Real Normandy butter, wild yeast sourdough starters, organic vanilla pods, and unrefined raw cane sugar for honest, uncompromised flavors.
            </p>
          </div>

          <div className="space-y-3 p-5 rounded-2xl bg-[#FAF7F2] border border-[#F0E8E1]">
            <div className="w-12 h-12 rounded-xl bg-[#24140B] text-[#88B093] flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#2C1810]">Inclusive Haven</h3>
            <p className="text-xs text-[#6B5749] leading-relaxed">
              A welcoming community space with wheelchair accessibility, pet-friendly outdoor patios, gender-neutral restrooms, and zero noise pressure.
            </p>
          </div>
        </div>
      </section>

      {/* 3. PHOTO TRIPTYCH & ATMOSPHERE */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#4A6B53]">
            Inside the Sanctuary
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#2C1810]">
            Designed for Savoring the Moment
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl overflow-hidden shadow-sm border border-[#EDE4DC] aspect-4/3 relative group">
            <img
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80"
              alt="Café Interior with living plants"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-5">
              <div>
                <h4 className="font-serif text-white text-base font-bold">Botanical Solace</h4>
                <p className="text-xs text-white/80">Lush indoor greenery & daylight</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-sm border border-[#EDE4DC] aspect-4/3 relative group">
            <img
              src="https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80"
              alt="Barista crafting latte art"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-5">
              <div>
                <h4 className="font-serif text-white text-base font-bold">Artisan Baristas</h4>
                <p className="text-xs text-white/80">SCA certified extraction techniques</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-sm border border-[#EDE4DC] aspect-4/3 relative group">
            <img
              src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80"
              alt="Fresh pastries from bakery"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-5">
              <div>
                <h4 className="font-serif text-white text-base font-bold">Dawn Bakehouse</h4>
                <p className="text-xs text-white/80">27-layer buttery French croissants</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INVITATION CTA */}
      <section className="bg-[#24140B] text-white rounded-3xl p-8 sm:p-12 text-center space-y-5 border border-[#3A2213]">
        <span className="text-xs font-bold uppercase tracking-widest text-[#E6C9A8]">
          Experience It Yourself
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold">
          We would love to welcome you to Brew & Bloom
        </h2>
        <p className="text-sm text-[#D8C7BA] max-w-xl mx-auto">
          Drop by anytime between 7:30 AM and 11:30 PM, or reserve a table ahead for birthdays, study sessions, and dates.
        </p>
        <div className="pt-2 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => navigateTo('booking')}
            className="px-8 py-3.5 rounded-full bg-[#E6C9A8] hover:bg-[#D4B38E] text-[#24140B] text-sm font-bold shadow-md transition-all"
          >
            Book a Table Today
          </button>
          <button
            onClick={() => navigateTo('contact')}
            className="px-8 py-3.5 rounded-full bg-[#381F12] hover:bg-[#4D2C1B] text-white border border-[#522F1B] text-sm font-semibold transition-all"
          >
            Location & Hours
          </button>
        </div>
      </section>
    </div>
  );
};
