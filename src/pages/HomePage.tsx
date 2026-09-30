import React from 'react';
import { 
  Coffee, 
  Calendar, 
  ArrowRight, 
  Star, 
  Sparkles, 
  Clock, 
  MapPin, 
  Wifi, 
  ShieldCheck, 
  Leaf, 
  Heart, 
  Plus, 
  Check, 
  Award,
  Flame
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { customerReviews } from '../data/reviewsData';
import { galleryItems } from '../data/galleryData';
import { MenuItem } from '../types';

export const HomePage: React.FC = () => {
  const { navigateTo, menuItems, addToCart, setSelectedCategory } = useApp();

  const popularItems = menuItems.filter((i) => i.isPopular).slice(0, 6);

  const instagramPosts = galleryItems.slice(0, 6);

  return (
    <div className="space-y-24 pb-16">
      {/* 1. HERO SECTION */}
      <section 
        id="hero-section"
        className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden"
      >
        {/* Atmospheric café background with warm gradient mask */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=2000&q=80"
            alt="Brew & Bloom Café Ambiance"
            className="w-full h-full object-cover object-center filter brightness-[0.38] scale-105 transition-transform duration-10000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F2] via-[#24140B]/60 to-[#180C06]/85" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6C9A8]/20 border border-[#E6C9A8]/40 text-[#FAF7F2] text-xs font-semibold backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-[#E6C9A8]" />
                <span className="tracking-wider uppercase">Bengaluru’s Premier Botanical Specialty Café</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#FAF7F2] tracking-tight leading-[1.1] drop-shadow-sm">
                Your Daily Dose of <span className="text-[#E6C9A8] italic font-serif">Happiness</span>
              </h1>

              <p className="text-lg sm:text-xl text-[#E8DFD8] max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
                Freshly brewed coffee, delicious bites, and beautiful moments. Step inside our tranquil sunlit conservatory or order your favorites directly to your table.
              </p>

              {/* Call to Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  id="hero-explore-menu-btn"
                  onClick={() => navigateTo('menu')}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#E6C9A8] hover:bg-[#D8B48F] text-[#24140B] font-bold text-base shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group"
                >
                  <Coffee className="w-5 h-5 text-[#24140B]" />
                  <span>Explore Menu</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  id="hero-book-table-btn"
                  onClick={() => navigateTo('booking')}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#FAF7F2]/15 hover:bg-[#FAF7F2]/25 text-[#FAF7F2] border border-[#FAF7F2]/40 font-semibold text-base backdrop-blur-md transition-all flex items-center justify-center gap-2"
                >
                  <Calendar className="w-5 h-5 text-[#E6C9A8]" />
                  <span>Book a Table</span>
                </button>
              </div>

              {/* Badges / Micro proof */}
              <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-[#D8C7BA]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#88B093] animate-ping" />
                  <span className="font-medium text-white">Open Now</span> · 7:30 AM – 11:30 PM
                </div>
                <div className="hidden sm:block text-[#7A6759]">•</div>
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="font-bold text-white">4.9 / 5.0</span>
                  <span>(1,800+ Verified Diners)</span>
                </div>
                <div className="hidden sm:block text-[#7A6759]">•</div>
                <div className="flex items-center gap-1.5">
                  <Leaf className="w-4 h-4 text-[#88B093]" />
                  <span>100% Shade-Grown Arabica</span>
                </div>
              </div>
            </div>

            {/* Right: Floating Coffee Cup & Visual Feature */}
            <div className="lg:col-span-5 flex justify-center items-center relative">
              <div className="relative w-72 sm:w-88 aspect-square flex items-center justify-center">
                {/* Radial Glow */}
                <div className="absolute inset-0 bg-[#E6C9A8]/20 rounded-full filter blur-3xl" />
                
                {/* Decorative Circular Ring */}
                <div className="absolute inset-4 rounded-full border border-[#E6C9A8]/30 border-dashed animate-spin-slow pointer-events-none" />

                {/* Floating Cup Asset Container */}
                <div className="relative z-10 animate-float-cup">
                  {/* Rising Steam Effect */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex gap-3 pointer-events-none">
                    <div className="w-2 h-10 bg-white/40 rounded-full filter blur-[2px] animate-steam" style={{ animationDelay: '0s' }} />
                    <div className="w-2 h-14 bg-white/30 rounded-full filter blur-[2px] animate-steam" style={{ animationDelay: '0.8s' }} />
                    <div className="w-1.5 h-8 bg-white/40 rounded-full filter blur-[2px] animate-steam" style={{ animationDelay: '1.6s' }} />
                  </div>

                  <div className="w-64 h-64 sm:w-76 sm:h-76 rounded-full overflow-hidden shadow-2xl border-4 border-[#E6C9A8]/50 bg-[#2C1810]">
                    <img
                      src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80"
                      alt="Artisan Brew in Handcrafted Cup"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Floating badge top right */}
                  <div className="absolute -top-3 -right-4 px-3.5 py-2 rounded-2xl bg-[#FAF7F2] text-[#24140B] shadow-xl border border-[#E8DFD8] flex items-center gap-2">
                    <Flame className="w-4 h-4 text-amber-600" />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#7C6656]">Fresh Roast</p>
                      <p className="text-xs font-extrabold">Batch #402 Today</p>
                    </div>
                  </div>

                  {/* Floating badge bottom left */}
                  <div className="absolute -bottom-4 -left-4 px-4 py-2.5 rounded-2xl bg-[#24140B]/90 backdrop-blur-md text-[#FAF7F2] shadow-xl border border-[#52301B] flex items-center gap-2.5">
                    <Award className="w-4 h-4 text-[#E6C9A8]" />
                    <div>
                      <p className="text-xs font-bold text-white">Award Winning</p>
                      <p className="text-[10px] text-[#C2AA96]">Specialty Coffee Guild 2025</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SIGNATURE ROAST & TASTING HIGHLIGHT */}
      <section id="signature-roast-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#EDE5DD] rounded-3xl p-8 sm:p-12 border border-[#DECFC3] relative overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-md">
              <img
                src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=900&q=80"
                alt="Chikmagalur Single Origin Coffee Beans"
                className="w-full h-80 object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#3D2314] text-[#FAF7F2] text-xs font-semibold">
                Origin Spotlight
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#4A6B53]">
                <Leaf className="w-4 h-4" />
                <span>Direct Trade Specialty Beans</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2C1810]">
                Chikmagalur Cloud Mist Estate · Altitude 1,450m
              </h2>

              <p className="text-sm sm:text-base text-[#5A483E] leading-relaxed">
                Slow-ripened under silver oak and wild cardamom canopies in the Western Ghats. Hand-picked at peak crimson maturity, naturally fermented for 36 hours, and medium-dark roasted in small 5kg batches every morning.
              </p>

              {/* Flavor Profile Badges */}
              <div className="pt-2">
                <p className="text-xs font-semibold text-[#7C6656] uppercase tracking-wider mb-2">
                  Tasting Notes & Palate
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Salted Caramel', 'Single-Origin Cocoa', 'Toasted Hazelnut', 'Orange Blossom'].map((note) => (
                    <span 
                      key={note}
                      className="px-3 py-1.5 rounded-full bg-[#FAF7F2] border border-[#DECFC3] text-xs font-medium text-[#3D2314] shadow-2xs"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => {
                    setSelectedCategory('Coffee');
                    navigateTo('menu');
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#3D2314] hover:bg-[#25150B] text-[#FAF7F2] text-sm font-semibold transition-all flex items-center gap-2"
                >
                  <Coffee className="w-4 h-4 text-[#E6C9A8]" />
                  <span>Taste Our Coffee</span>
                </button>
                <button
                  onClick={() => navigateTo('about')}
                  className="px-5 py-2.5 rounded-full bg-transparent hover:bg-[#DFD3C7] text-[#3D2314] text-sm font-semibold transition-all"
                >
                  Read Our Bean Sourcing Story →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. POPULAR MENU ITEMS */}
      <section id="popular-menu-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E8DFD8] pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#4A6B53] block mb-1">
              Curated Favorites
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C1810]">
              Most Loved at Bloom
            </h2>
          </div>
          <button
            id="view-full-menu-btn"
            onClick={() => navigateTo('menu')}
            className="text-sm font-semibold text-[#3D2314] hover:text-[#4A6B53] flex items-center gap-1 group"
          >
            <span>View All Menu Items</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Popular Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl overflow-hidden border border-[#EDE4DC] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Image with badge */}
              <div className="relative h-52 overflow-hidden bg-stone-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {item.badge && (
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold bg-[#3D2314] text-[#FAF7F2] shadow-md">
                    {item.badge}
                  </span>
                )}
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#FAF7F2]/90 backdrop-blur-sm text-[#2C1810] shadow-sm flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                  {item.rating || 4.9}
                </span>
              </div>

              {/* Details */}
              <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#7C6656] uppercase tracking-wider">
                      {item.category}
                    </span>
                    {item.isVegetarian && (
                      <span className="w-4 h-4 rounded border border-green-600 flex items-center justify-center p-0.5" title="100% Vegetarian">
                        <span className="w-2 h-2 rounded-full bg-green-600"></span>
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#2C1810] group-hover:text-[#4A6B53] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-[#6B5749] line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#F4EFEA]">
                  <div>
                    <span className="text-xs text-[#8A7566] block">Price</span>
                    <span className="text-lg font-extrabold text-[#2C1810]">
                      ₹{item.price}
                    </span>
                  </div>
                  <button
                    id={`add-popular-${item.id}-btn`}
                    onClick={() => addToCart(item, 1)}
                    className="px-4 py-2 rounded-xl bg-[#3D2314] hover:bg-[#25150B] text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 active:scale-95"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#E6C9A8]" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. ABOUT CAFÉ HIGHLIGHTS / WHY US */}
      <section id="why-us-section" className="bg-[#FAF4ED] py-16 border-y border-[#E8DFD8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#4A6B53]">
              The Bloom Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C1810]">
              Crafted with Care, Poured with Love
            </h2>
            <p className="text-sm sm:text-base text-[#6B5749]">
              More than just coffee. We designed Brew & Bloom as an urban refuge where exceptional flavor, green flora, and community converge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-[#E8DFD8] shadow-xs space-y-3 hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 rounded-xl bg-[#F2ECE4] text-[#3D2314] flex items-center justify-center">
                <Coffee className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#2C1810]">Artisan Extraction</h3>
              <p className="text-xs text-[#6B5749] leading-relaxed">
                Dual boiler custom machines calibrated daily for precise temperature, water TDS, and consistent micro-foam.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E8DFD8] shadow-xs space-y-3 hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 rounded-xl bg-[#EAF2EC] text-[#4A6B53] flex items-center justify-center">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#2C1810]">Botanical Atmosphere</h3>
              <p className="text-xs text-[#6B5749] leading-relaxed">
                Surrounded by over 120 varieties of live potted plants, purified air, and natural skylights for restorative moments.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E8DFD8] shadow-xs space-y-3 hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 rounded-xl bg-[#F2ECE4] text-[#3D2314] flex items-center justify-center">
                <Wifi className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#2C1810]">Remote Work Haven</h3>
              <p className="text-xs text-[#6B5749] leading-relaxed">
                Ergonomic wood seating, dedicated high-speed fiber WiFi (300 Mbps), and power outlets at every booth.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E8DFD8] shadow-xs space-y-3 hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 rounded-xl bg-[#F8EFE7] text-[#915B38] flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#2C1810]">In-House Bakery</h3>
              <p className="text-xs text-[#6B5749] leading-relaxed">
                Fresh buttery croissants, rustic sourdough loaves, and cheesecakes baked from scratch every dawn.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CUSTOMER REVIEWS */}
      <section id="customer-reviews-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#4A6B53]">
            Guest Impressions
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C1810]">
            Loved by Our Community
          </h2>
          <p className="text-sm text-[#6B5749]">
            Real feedback from our regular coffee lovers, students, and brunch families.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {customerReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-white border border-[#EDE5DD] shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#8C7667]">{rev.date}</span>
                </div>
                <p className="text-sm text-[#48362B] italic leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#F2ECE6] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#DECFC3]"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-[#2C1810]">{rev.name}</h4>
                    <p className="text-[11px] text-[#7C6656]">{rev.role}</p>
                  </div>
                </div>
                <div className="text-right hidden sm:block">
                  <span className="text-[10px] text-[#947F70] block">Favorite item</span>
                  <span className="text-xs font-semibold text-[#4A6B53]">{rev.favoriteItem}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. INSTAGRAM PHOTO FEED */}
      <section id="instagram-gallery-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#4A6B53]">
              @brewandbloom.cafe
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C1810]">
              Life at Brew & Bloom
            </h2>
          </div>
          <button
            onClick={() => navigateTo('gallery')}
            className="text-xs font-semibold text-[#3D2314] hover:text-[#4A6B53] flex items-center gap-1"
          >
            <span>View High-Res Photo Gallery</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {instagramPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => navigateTo('gallery')}
              className="group relative aspect-square rounded-xl overflow-hidden bg-stone-200 cursor-pointer shadow-xs"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-[#24140B]/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center text-white">
                <Heart className="w-5 h-5 text-red-400 fill-red-400 mb-1" />
                <span className="text-[10px] font-medium line-clamp-1">{post.title}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. LOCATION & LIVE OPENING HOURS */}
      <section id="location-hours-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#2C1810] text-[#FAF7F2] rounded-3xl p-8 sm:p-12 shadow-xl border border-[#44281A] relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#88B093]/20 border border-[#88B093]/40 text-[#A2CCAB] text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-[#88B093] animate-pulse"></span>
                <span>Open for Dine-In, Takeaway & Online Orders</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-wide">
                Visit Our Conservatory Café
              </h2>

              <div className="space-y-3 text-sm text-[#D8C7BA]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#E6C9A8] shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-white">Brew & Bloom Café</strong><br />
                    42 Bloom Heritage Boulevard, 12th Main Road, Indiranagar, Bengaluru, KA 560038
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#E6C9A8] shrink-0 mt-0.5" />
                  <div>
                    <p><strong className="text-white">Weekdays:</strong> 7:30 AM – 10:30 PM</p>
                    <p><strong className="text-white">Weekends:</strong> 8:00 AM – 11:30 PM</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={() => navigateTo('booking')}
                  className="px-6 py-3 rounded-full bg-[#E6C9A8] hover:bg-[#D4B38E] text-[#24140B] font-bold text-sm shadow-md transition-all flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reserve Table Ahead</span>
                </button>
                <button
                  onClick={() => navigateTo('contact')}
                  className="px-6 py-3 rounded-full bg-[#3D2314] hover:bg-[#4D2E1B] text-white border border-[#5A3822] text-sm font-semibold transition-all"
                >
                  Get Directions & Contact
                </button>
              </div>
            </div>

            {/* Visual map preview card */}
            <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-[#52321E] shadow-2xl relative bg-[#1E0F07] aspect-4/3 sm:aspect-16/10 flex flex-col justify-end p-6">
              <img
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80"
                alt="Café Interior Map Preview"
                className="absolute inset-0 w-full h-full object-cover filter brightness-[0.4]"
              />
              <div className="relative z-10 space-y-2 bg-[#24140B]/90 backdrop-blur-md p-4 rounded-xl border border-[#44281A]">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#E6C9A8]">Indiranagar Flagship</span>
                  <span className="text-[#88B093] font-semibold">Valet Parking Available</span>
                </div>
                <p className="text-xs text-[#C7B5A6]">
                  5 mins walk from Indiranagar Metro Station. Lush patio with outdoor pet seating.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
