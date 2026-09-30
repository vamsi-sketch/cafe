import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Users, 
  Sparkles, 
  Phone, 
  User, 
  CheckCircle, 
  Leaf, 
  Coffee,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';

export const TableBookingPage: React.FC = () => {
  const { createBooking } = useApp();

  const todayStr = new Date().toISOString().split('T')[0];

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState(todayStr);
  const [time, setTime] = useState('05:00 PM');
  const [guests, setGuests] = useState(2);
  const [seatingArea, setSeatingArea] = useState<'Indoor Garden' | 'Window Lounge' | 'Patio Terrace' | 'Any'>('Indoor Garden');
  const [specialRequest, setSpecialRequest] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableTimeSlots = [
    '08:30 AM', '09:30 AM', '11:00 AM', 
    '12:30 PM', '02:00 PM', '03:30 PM', 
    '05:00 PM', '06:30 PM', '08:00 PM', '09:30 PM'
  ];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Please enter your name';
    if (!phone.trim()) {
      errs.phone = 'Please enter your phone number';
    } else if (phone.trim().length < 8) {
      errs.phone = 'Please enter a valid phone number';
    }
    if (!date) errs.date = 'Please pick a reservation date';
    if (!time) errs.time = 'Please select a time slot';
    if (guests < 1 || guests > 20) errs.guests = 'Guests must be between 1 and 20';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#4A6B53', '#E6C9A8', '#3D2314']
        });
      } catch (err) {
        // safe fallback
      }

      createBooking({
        name: name.trim(),
        phone: phone.trim(),
        date,
        time,
        guests,
        seatingArea,
        specialRequest: specialRequest.trim() || undefined
      });

      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF2EC] text-[#4A6B53] text-xs font-semibold">
          <Leaf className="w-3.5 h-3.5" />
          <span>Complimentary Table Reservation</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#2C1810]">
          Reserve Your Cozy Corner
        </h1>
        <p className="text-sm sm:text-base text-[#6B5749]">
          Whether it’s a focused work morning, an intimate date, or a joyful family brunch, we’ll have your table prepared with personalized care.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Booking Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-[#EDE4DC] shadow-sm space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Party Size & Date/Time */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#2C1810] border-b border-[#F2ECE6] pb-2">
                1. Date, Time & Party Size
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#2C1810] block mb-1">
                    Select Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-[#8C7667] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="booking-date-input"
                      type="date"
                      min={todayStr}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#D9CFC7] text-sm text-[#2C1810] focus:outline-none focus:border-[#3D2314]"
                    />
                  </div>
                  {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date}</p>}
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#2C1810] block mb-1">
                    Number of Guests <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Users className="w-4 h-4 text-[#8C7667] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <select
                      id="booking-guests-select"
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#D9CFC7] text-sm text-[#2C1810] focus:outline-none focus:border-[#3D2314]"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 16].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Time Slots Grid */}
              <div>
                <label className="text-xs font-semibold text-[#2C1810] block mb-2">
                  Select Time Slot <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {availableTimeSlots.map((slot) => {
                    const isSelected = time === slot;
                    return (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => setTime(slot)}
                        className={`py-2 px-2.5 rounded-xl text-xs font-semibold transition-all text-center ${
                          isSelected
                            ? 'bg-[#3D2314] text-white shadow-xs'
                            : 'bg-[#FAF7F2] text-[#6B5749] border border-[#E5DCD4] hover:bg-[#EFE9E2]'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Step 2: Ambiance & Seating Area */}
            <div className="space-y-3 pt-2">
              <h3 className="font-serif text-lg font-bold text-[#2C1810] border-b border-[#F2ECE6] pb-2">
                2. Preferred Seating Atmosphere
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'Indoor Garden', label: 'Indoor Garden' },
                  { id: 'Window Lounge', label: 'Window View' },
                  { id: 'Patio Terrace', label: 'Patio Terrace' },
                  { id: 'Any', label: 'Any Open Table' }
                ].map((area) => (
                  <button
                    type="button"
                    key={area.id}
                    onClick={() => setSeatingArea(area.id as any)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-medium text-center border transition-all ${
                      seatingArea === area.id
                        ? 'border-[#4A6B53] bg-[#EAF2EC] text-[#2C1810] font-bold'
                        : 'border-[#EDE4DC] text-[#6B5749] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    {area.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Contact Info */}
            <div className="space-y-4 pt-2">
              <h3 className="font-serif text-lg font-bold text-[#2C1810] border-b border-[#F2ECE6] pb-2">
                3. Lead Guest Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#2C1810] block mb-1">
                    Your Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#8C7667] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="booking-name-input"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rohini Sen"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF7F2] border text-sm text-[#2C1810] focus:outline-none ${
                        errors.name ? 'border-red-400' : 'border-[#D9CFC7] focus:border-[#3D2314]'
                      }`}
                    />
                  </div>
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#2C1810] block mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#8C7667] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="booking-phone-input"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF7F2] border text-sm text-[#2C1810] focus:outline-none ${
                        errors.phone ? 'border-red-400' : 'border-[#D9CFC7] focus:border-[#3D2314]'
                      }`}
                    />
                  </div>
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#2C1810] block mb-1">
                  Special Request (Anniversary, quiet laptop corner, birthday, etc.)
                </label>
                <textarea
                  id="booking-request-input"
                  rows={2}
                  value={specialRequest}
                  onChange={(e) => setSpecialRequest(e.target.value)}
                  placeholder="Tell us any special arrangement you'd like us to prepare..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#D9CFC7] text-sm text-[#2C1810] focus:outline-none focus:border-[#3D2314]"
                />
              </div>
            </div>

            <button
              type="submit"
              id="confirm-booking-btn"
              disabled={isSubmitting}
              className="w-full py-4 rounded-full bg-[#3D2314] hover:bg-[#25150B] disabled:bg-stone-400 text-[#FAF7F2] font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Confirming Reservation...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E6C9A8]" />
                  Confirm Table Reservation
                </span>
              )}
            </button>
          </form>
        </div>

        {/* Right: Café Reservation Policies & Atmosphere */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#FAF4ED] rounded-3xl p-6 sm:p-8 border border-[#EDE4DC] space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#2C1810]">
              Reservation Notes
            </h3>
            <ul className="space-y-3 text-xs text-[#6B5749] leading-relaxed">
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-[#4A6B53] shrink-0 mt-0.5" />
                <span><strong>15-Minute Grace Period:</strong> We hold reserved tables for 15 minutes past your booked time.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-[#4A6B53] shrink-0 mt-0.5" />
                <span><strong>Complimentary Welcome Filter Water:</strong> Every table receives fresh mint-infused glass water bottles.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-[#4A6B53] shrink-0 mt-0.5" />
                <span><strong>No Reservation Fee:</strong> Bookings are 100% free of charge. You only pay for what you order.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-[#4A6B53] shrink-0 mt-0.5" />
                <span><strong>Pets on Patio:</strong> Dogs and cats are wholeheartedly welcome in our shaded terrace garden.</span>
              </li>
            </ul>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-md border border-[#EDE4DC] relative aspect-4/3">
            <img
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80"
              alt="Cozy Botanical Seating at Brew & Bloom"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#24140B]/80 via-transparent to-transparent flex items-end p-6">
              <p className="text-xs text-white font-medium">
                Our conservatory seating offers soothing natural daylight, soft acoustic jazz, and comfortable velvet chairs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
