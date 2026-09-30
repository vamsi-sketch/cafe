import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/Toast';
import { FloatingCartButton } from './components/FloatingCartButton';

import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { TableBookingPage } from './pages/TableBookingPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { BookingSuccessPage } from './pages/BookingSuccessPage';
import { AboutPage } from './pages/AboutPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

const AppContent: React.FC = () => {
  const { currentPage } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2C1810]">
      {/* Sticky Premium Navbar */}
      <Navbar />

      {/* Main Page Content */}
      <main className="flex-grow">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'menu' && <MenuPage />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'gallery' && <GalleryPage />}
        {currentPage === 'contact' && <ContactPage />}
        {currentPage === 'cart' && <CartPage />}
        {currentPage === 'checkout' && <CheckoutPage />}
        {currentPage === 'booking' && <TableBookingPage />}
        {currentPage === 'order-success' && <OrderSuccessPage />}
        {currentPage === 'booking-success' && <BookingSuccessPage />}
        {currentPage === 'admin' && <AdminDashboardPage />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Mobile / Desktop Cart Preview Pill */}
      <FloatingCartButton />

      {/* Toast Notification Container */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
