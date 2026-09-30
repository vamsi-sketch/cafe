import React, { useState } from 'react';
import { Eye, Sparkles, Filter, Maximize2 } from 'lucide-react';
import { galleryItems } from '../data/galleryData';
import { LightboxModal } from '../components/LightboxModal';
import { GalleryItem } from '../types';

export const GalleryPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Café Interior', 'Coffee', 'Food', 'Events'];

  const filteredItems = selectedCategory === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.category === selectedCategory);

  const handleOpenLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#4A6B53]">
          Visual Journal
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#2C1810]">
          Moments at Brew & Bloom
        </h1>
        <p className="text-sm sm:text-base text-[#6B5749]">
          Explore the soul of our café through curated snapshots of our botanic interior, artisan barista pours, fresh bakery batches, and weekend acoustic gatherings.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              id={`gallery-cat-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-[#3D2314] text-white shadow-md'
                  : 'bg-white text-[#6B5749] border border-[#EDE4DC] hover:bg-[#FAF7F2]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, idx) => (
          <div
            key={item.id}
            id={`gallery-item-${item.id}`}
            onClick={() => handleOpenLightbox(idx)}
            className="group relative rounded-2xl overflow-hidden bg-stone-200 border border-[#EDE4DC] shadow-xs cursor-pointer aspect-4/3 hover:shadow-xl transition-all duration-300"
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              loading="lazy"
            />

            {/* Subtle category badge on top right */}
            <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#24140B]/80 text-[#FAF7F2] backdrop-blur-xs">
              {item.category}
            </span>

            {/* Hover Dark Overlay with Content */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#24140B]/90 via-[#24140B]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
              <div className="space-y-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="font-serif text-base font-bold text-white leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-[#D8C7BA] line-clamp-2">
                  {item.description}
                </p>
                <div className="pt-2 flex items-center gap-1.5 text-xs text-[#E6C9A8] font-semibold">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Click to expand</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        items={filteredItems}
        currentIndex={activeLightboxIndex}
        onClose={() => setActiveLightboxIndex(null)}
        onNavigate={(newIdx) => setActiveLightboxIndex(newIdx)}
      />
    </div>
  );
};
