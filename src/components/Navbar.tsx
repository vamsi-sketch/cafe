import React, { useState, useEffect } from 'react';
import { 
  Coffee, 
  ShoppingBag, 
  Calendar, 
  Menu as MenuIcon, 
  X, 
  ShieldAlert, 
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PageView } from '../types';

export const Navbar: React.FC = () => {
  const { currentPage, navigateTo, cartCount } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { id: PageView; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'about', label: 'About' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (page: PageView) => {
    navigateTo(page);
    setMobileMenuOpen(false);
  };

  return (
    <header 
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-sm border-b border-[#E6DED8] py-3' 
          : 'bg-[#FAF7F2]/80 backdrop-blur-sm py-4 md:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <button
            id="brand-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group text-left transition-transform active:scale-95"
          >
            <div className="w-10 h-10 rounded-full bg-[#3D2314] text-[#FAF7F2] flex items-center justify-center shadow-md group-hover:bg-[#2B180D] transition-colors">
              <Coffee className="w-5 h-5 text-[#E6C9A8]" />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#2C1810] block leading-none">
                Brew & Bloom
              </span>
              <span className="text-[11px] font-medium uppercase tracking-widest text-[#7C6656] block mt-1">
                Café & Roastery
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav" className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative text-sm font-medium transition-colors py-1 ${
                    isActive 
                      ? 'text-[#3D2314] font-semibold' 
                      : 'text-[#655245] hover:text-[#2C1810]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4A6B53] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Actions: Admin, Cart, Book Table */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Admin toggle link */}
            <button
              id="admin-dashboard-link-btn"
              onClick={() => handleNavClick('admin')}
              className={`text-xs px-3 py-1.5 rounded-full font-medium flex items-center gap-1.5 border transition-all ${
                currentPage === 'admin'
                  ? 'bg-[#3D2314] text-white border-[#3D2314]'
                  : 'text-[#7C6656] border-[#D9CFC7] hover:border-[#3D2314] hover:text-[#3D2314] bg-white/50'
              }`}
              title="Open Admin Dashboard (Manage orders, bookings & menu)"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </button>

            {/* Cart Button */}
            <button
              id="cart-nav-btn"
              onClick={() => handleNavClick('cart')}
              className="relative p-2.5 rounded-full bg-[#EFE9E2] hover:bg-[#E4DCCE] text-[#2C1810] transition-colors"
              aria-label="View shopping cart"
            >
              <ShoppingBag className="w-5 h-5 text-[#3D2314]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#4A6B53] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Book Table Button */}
            <button
              id="book-table-nav-btn"
              onClick={() => handleNavClick('booking')}
              className="px-5 py-2.5 rounded-full bg-[#3D2314] hover:bg-[#25150B] text-[#FAF7F2] text-sm font-semibold shadow-sm transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-[#E6C9A8]" />
              <span>Book a Table</span>
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Mobile Cart Button */}
            <button
              id="mobile-cart-btn"
              onClick={() => handleNavClick('cart')}
              className="relative p-2 rounded-full bg-[#EFE9E2] text-[#2C1810]"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-5 h-5 text-[#3D2314]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#4A6B53] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#3D2314] hover:bg-[#EFE9E2] transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div 
            id="mobile-dropdown-menu"
            className="lg:hidden mt-3 pt-3 pb-5 border-t border-[#E6DED8] bg-[#FAF7F2] rounded-2xl px-3 shadow-lg animate-fadeIn"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  id={`mobile-nav-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    currentPage === link.id
                      ? 'bg-[#3D2314] text-white'
                      : 'text-[#4A3B32] hover:bg-[#EFE9E2]'
                  }`}
                >
                  {link.label}
                </button>
              ))}

              <div className="pt-2 border-t border-[#EAE3DC] flex flex-col gap-2">
                <button
                  id="mobile-book-table-btn"
                  onClick={() => handleNavClick('booking')}
                  className="w-full text-center px-4 py-3 rounded-xl bg-[#4A6B53] hover:bg-[#3B5742] text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-sm"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book a Table</span>
                </button>

                <button
                  id="mobile-admin-btn"
                  onClick={() => handleNavClick('admin')}
                  className="w-full text-center px-4 py-2.5 rounded-xl border border-[#D5C9BE] text-[#5A483E] text-xs font-semibold flex items-center justify-center gap-2 hover:bg-[#EFE9E2]"
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Admin Dashboard</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
