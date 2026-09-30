import React, { useState, useMemo } from 'react';
import { 
  Search, 
  X, 
  Plus, 
  Minus, 
  Check, 
  ShoppingBag, 
  Sparkles, 
  Filter, 
  Clock, 
  Flame, 
  Leaf,
  Coffee,
  CupSoda,
  UtensilsCrossed,
  Cake,
  Croissant
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CategoryType, MenuItem } from '../types';

export const MenuPage: React.FC = () => {
  const { 
    menuItems, 
    addToCart, 
    cart, 
    updateCartQuantity, 
    selectedCategory, 
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    navigateTo
  } = useApp();

  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'popular'>('all');

  const categories: { id: CategoryType | 'All'; label: string; icon: React.ReactNode }[] = [
    { id: 'All', label: 'All Delights', icon: <UtensilsCrossed className="w-4 h-4" /> },
    { id: 'Coffee', label: 'Artisan Coffee', icon: <Coffee className="w-4 h-4" /> },
    { id: 'Cold Beverages', label: 'Cold Brews & Frappés', icon: <CupSoda className="w-4 h-4" /> },
    { id: 'Tea', label: 'Teas & Infusions', icon: <Leaf className="w-4 h-4" /> },
    { id: 'Breakfast', label: 'Bakery & Breakfast', icon: <Croissant className="w-4 h-4" /> },
    { id: 'Snacks', label: 'Savory Bites', icon: <UtensilsCrossed className="w-4 h-4" /> },
    { id: 'Desserts', label: 'Handcrafted Desserts', icon: <Cake className="w-4 h-4" /> }
  ];

  // Filter items based on category, search, dietary preference
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      // Category match
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }
      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(query);
        const matchDesc = item.description.toLowerCase().includes(query);
        const matchCategory = item.category.toLowerCase().includes(query);
        if (!matchName && !matchDesc && !matchCategory) {
          return false;
        }
      }
      // Dietary filter
      if (dietaryFilter === 'veg' && !item.isVegetarian) {
        return false;
      }
      if (dietaryFilter === 'popular' && !item.isPopular) {
        return false;
      }
      return true;
    });
  }, [menuItems, selectedCategory, searchQuery, dietaryFilter]);

  // Helper to find quantity in cart
  const getItemCartQty = (id: string): number => {
    const item = cart.find((ci) => ci.menuItem.id === id);
    return item ? item.quantity : 0;
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#4A6B53]">
          Curated Café Menu
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#2C1810]">
          Artisan Brews & Handcrafted Bites
        </h1>
        <p className="text-sm sm:text-base text-[#6B5749]">
          Every coffee is ground fresh to order from single-origin beans, and our bakery treats are baked every morning at sunrise.
        </p>
      </div>

      {/* Search & Dietary Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#EDE4DC] shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full md:max-w-md">
            <Search className="w-4 h-4 text-[#8C7667] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="menu-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search espresso, cheesecake, croissant..."
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E2D7CE] text-sm text-[#2C1810] placeholder-[#9E8B7E] focus:outline-none focus:border-[#3D2314]"
            />
            {searchQuery && (
              <button
                id="clear-menu-search-btn"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C7667] hover:text-[#2C1810]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Dietary Filters */}
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <span className="text-xs font-semibold text-[#7C6656] mr-1 hidden sm:inline">Filter:</span>
            <button
              onClick={() => setDietaryFilter('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                dietaryFilter === 'all'
                  ? 'bg-[#3D2314] text-white'
                  : 'bg-[#FAF7F2] text-[#6B5749] border border-[#E2D7CE] hover:bg-[#EFE9E2]'
              }`}
            >
              All Items
            </button>
            <button
              onClick={() => setDietaryFilter('veg')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                dietaryFilter === 'veg'
                  ? 'bg-[#4A6B53] text-white'
                  : 'bg-[#FAF7F2] text-[#4A6B53] border border-[#C6D9CB] hover:bg-[#E8F2EA]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-green-600"></span>
              Vegetarian Only
            </button>
            <button
              onClick={() => setDietaryFilter('popular')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                dietaryFilter === 'popular'
                  ? 'bg-[#B46738] text-white'
                  : 'bg-[#FAF7F2] text-[#B46738] border border-[#F0D5C3] hover:bg-[#F9EFE7]'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              Bestsellers
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-[#F2ECE6] no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`cat-btn-${cat.id.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#3D2314] text-white shadow-sm'
                    : 'bg-[#FAF7F2] text-[#655245] border border-[#E5DCD4] hover:bg-[#EFE9E2]'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Menu Item Counter & Summary */}
      <div className="flex items-center justify-between text-xs text-[#7C6656] px-1">
        <span>Showing <strong>{filteredItems.length}</strong> delicacies</span>
        {(searchQuery || selectedCategory !== 'All' || dietaryFilter !== 'all') && (
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
              setDietaryFilter('all');
            }}
            className="text-[#3D2314] font-semibold underline hover:text-[#4A6B53]"
          >
            Reset all filters
          </button>
        )}
      </div>

      {/* Menu Cards Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const cartQty = getItemCartQty(item.id);

            return (
              <div
                key={item.id}
                id={`menu-item-${item.id}`}
                className="group bg-white rounded-2xl overflow-hidden border border-[#EDE4DC] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image & Badges */}
                <div className="relative h-56 overflow-hidden bg-[#FAF7F2]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                    {item.badge && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#3D2314] text-white shadow-md">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    {item.isVegetarian && (
                      <span className="w-5 h-5 rounded-md bg-white/90 backdrop-blur-xs border border-green-600 flex items-center justify-center" title="Vegetarian">
                        <span className="w-2.5 h-2.5 rounded-full bg-green-600"></span>
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/90 text-[#2C1810] shadow-xs flex items-center gap-1">
                      ★ {item.rating || 4.9}
                    </span>
                  </div>

                  {/* Bottom Image details */}
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-white/90">
                    <span className="font-medium">{item.category}</span>
                    {item.preparationTime && (
                      <span className="flex items-center gap-1 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-full">
                        <Clock className="w-3 h-3 text-[#E6C9A8]" />
                        {item.preparationTime}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                  <div className="space-y-1.5">
                    <h3 className="font-serif text-lg font-bold text-[#2C1810] group-hover:text-[#4A6B53] transition-colors leading-tight">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#6B5749] leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                    {item.calories && (
                      <span className="text-[11px] text-[#917E72] block">
                        Approx. {item.calories} kcal
                      </span>
                    )}
                  </div>

                  {/* Price & Action */}
                  <div className="pt-3 border-t border-[#F4EFEA] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#8C7667] block uppercase tracking-wider font-semibold">Price</span>
                      <span className="text-xl font-black text-[#2C1810]">
                        ₹{item.price}
                      </span>
                    </div>

                    {/* Add to Cart or Stepper */}
                    {cartQty === 0 ? (
                      <button
                        id={`add-btn-${item.id}`}
                        onClick={() => addToCart(item, 1)}
                        className="px-4 py-2.5 rounded-xl bg-[#3D2314] hover:bg-[#25150B] text-[#FAF7F2] text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 active:scale-95"
                      >
                        <Plus className="w-3.5 h-3.5 text-[#E6C9A8]" />
                        <span>Add to Cart</span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 bg-[#FAF7F2] p-1 rounded-xl border border-[#D9CFC7]">
                        <button
                          onClick={() => updateCartQuantity(item.id, cartQty - 1)}
                          className="w-7 h-7 rounded-lg bg-white text-[#3D2314] hover:bg-[#EFE9E2] border border-[#DECFC3] flex items-center justify-center transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-[#2C1810]">
                          {cartQty}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, cartQty + 1)}
                          className="w-7 h-7 rounded-lg bg-[#3D2314] text-white hover:bg-[#25150B] flex items-center justify-center transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-2xl p-12 text-center border border-[#EDE4DC] space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#FAF4ED] text-[#8C7667] mx-auto flex items-center justify-center">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-xl font-bold text-[#2C1810]">No dishes found</h3>
          <p className="text-xs text-[#7C6656] leading-relaxed">
            We couldn't find any items matching "{searchQuery}". Try browsing a different category or clear your search.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setDietaryFilter('all');
            }}
            className="px-5 py-2.5 rounded-xl bg-[#3D2314] text-white text-xs font-semibold hover:bg-[#25150B]"
          >
            Clear Search Filters
          </button>
        </div>
      )}
    </div>
  );
};
