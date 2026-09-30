import React from 'react';
import { 
  CheckCircle, 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  Coffee, 
  ShieldAlert, 
  Share2 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const BookingSuccessPage: React.FC = () => {
  const { lastBooking, navigateTo } = useApp();

  if (!lastBooking) {
    return (
      <div className="pt-36 pb-24 max-w-md mx-auto px-4 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#2C1810]">No Active Booking</h2>
        <p className="text-xs text-[#7C6656]">Please use our table booking page to make a reservation.</p>
        <button
          onClick={() => navigateTo('booking')}
          className="px-6 py-2.5 rounded-full bg-[#3D2314] text-white text-xs font-semibold"
        >
          Book a Table
        </button>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 max-w-2xl mx-auto px-4 sm:px-6 space-y-8">
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EDE4DC] shadow-xl text-center space-y-5">
        <div className="w-16 h-16 rounded-full bg-[#EAF2EC] text-[#4A6B53] mx-auto flex items-center justify-center shadow-inner">
          <CheckCircle className="w-10 h-10" />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-[#4A6B53]">
            Table Reservation Confirmed
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#2C1810]">
            We're Ready for You, {lastBooking.name}!
          </h1>
          <p className="text-sm text-[#6B5749]">
            A confirmation SMS & email have been recorded. Your reserved table will be held in our {lastBooking.seatingArea || 'Indoor Garden'}.
          </p>
        </div>

        {/* Booking Code */}
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-[#FAF4ED] border border-[#E8DFD8]">
          <span className="text-xs text-[#7C6656] uppercase tracking-wider font-semibold">Booking ID:</span>
          <span className="font-mono text-xl font-black text-[#3D2314]">
            {lastBooking.bookingCode}
          </span>
        </div>

        {/* Reservation Card Details */}
        <div className="pt-4 border-t border-[#F2ECE6] grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
          <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EFE9E2]">
            <div className="flex items-center gap-1.5 text-xs text-[#7C6656] mb-1">
              <Calendar className="w-3.5 h-3.5 text-[#4A6B53]" />
              <span>Date</span>
            </div>
            <p className="text-sm font-bold text-[#2C1810]">{lastBooking.date}</p>
          </div>

          <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EFE9E2]">
            <div className="flex items-center gap-1.5 text-xs text-[#7C6656] mb-1">
              <Clock className="w-3.5 h-3.5 text-[#4A6B53]" />
              <span>Time Slot</span>
            </div>
            <p className="text-sm font-bold text-[#2C1810]">{lastBooking.time}</p>
          </div>

          <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EFE9E2]">
            <div className="flex items-center gap-1.5 text-xs text-[#7C6656] mb-1">
              <Users className="w-3.5 h-3.5 text-[#4A6B53]" />
              <span>Guests</span>
            </div>
            <p className="text-sm font-bold text-[#2C1810]">{lastBooking.guests} People</p>
          </div>

          <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EFE9E2]">
            <div className="flex items-center gap-1.5 text-xs text-[#7C6656] mb-1">
              <MapPin className="w-3.5 h-3.5 text-[#4A6B53]" />
              <span>Seating</span>
            </div>
            <p className="text-xs font-bold text-[#2C1810] line-clamp-1">{lastBooking.seatingArea || 'Indoor Garden'}</p>
          </div>
        </div>

        {lastBooking.specialRequest && (
          <div className="p-3 rounded-xl bg-[#FAF7F2] text-left text-xs text-[#6B5749] border border-[#EDE4DC]">
            <strong className="text-[#3D2314]">Special Request noted:</strong> "{lastBooking.specialRequest}"
          </div>
        )}

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => navigateTo('menu')}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#3D2314] hover:bg-[#25150B] text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Coffee className="w-4 h-4 text-[#E6C9A8]" />
            <span>Pre-Select Menu Drinks</span>
          </button>

          <button
            onClick={() => navigateTo('admin')}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-white hover:bg-[#FAF7F2] text-[#3D2314] border border-[#D9CFC7] text-xs font-semibold shadow-xs transition-all flex items-center justify-center gap-2"
          >
            <ShieldAlert className="w-4 h-4 text-[#4A6B53]" />
            <span>View in Admin Dashboard</span>
          </button>
        </div>
      </div>
    </div>
  );
};
