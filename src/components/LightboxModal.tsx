import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Tag } from 'lucide-react';
import { GalleryItem } from '../types';

interface LightboxModalProps {
  items: GalleryItem[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  items,
  currentIndex,
  onClose,
  onNavigate
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentIndex === null) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') {
        onNavigate((currentIndex - 1 + items.length) % items.length);
      }
      if (e.key === 'ArrowRight') {
        onNavigate((currentIndex + 1) % items.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, items.length, onClose, onNavigate]);

  if (currentIndex === null || !items[currentIndex]) return null;

  const currentItem = items[currentIndex];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate((currentIndex - 1 + items.length) % items.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate((currentIndex + 1) % items.length);
  };

  return (
    <div
      id="lightbox-modal-backdrop"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
    >
      <div 
        className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-lightbox-btn"
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white transition-colors bg-white/10 rounded-full hover:bg-white/20"
          aria-label="Close Lightbox"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Image Container with Prev / Next */}
        <div className="relative w-full flex items-center justify-center overflow-hidden rounded-2xl bg-black/40">
          <img
            src={currentItem.image}
            alt={currentItem.title}
            className="max-h-[72vh] w-auto max-w-full object-contain rounded-xl shadow-2xl transition-all"
          />

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 text-white/90 hover:text-white hover:bg-black/90 transition-all backdrop-blur-sm"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 text-white/90 hover:text-white hover:bg-black/90 transition-all backdrop-blur-sm"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Caption */}
        <div className="w-full mt-4 text-center px-4">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#4A6B53] text-white flex items-center gap-1">
              <Tag className="w-3 h-3" />
              {currentItem.category}
            </span>
            <span className="text-xs text-stone-400">
              {currentIndex + 1} of {items.length}
            </span>
          </div>
          <h3 className="font-serif text-xl font-bold text-white tracking-wide">
            {currentItem.title}
          </h3>
          <p className="text-sm text-stone-300 max-w-2xl mx-auto mt-1">
            {currentItem.description}
          </p>
        </div>
      </div>
    </div>
  );
};
