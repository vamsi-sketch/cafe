# Brew & Bloom Café

> *"Good Coffee. Great Moments."*

A modern café web application built with React, TypeScript, and Tailwind CSS. Features an interactive menu, live shopping cart with local persistence, demo checkout system, table booking with instant confirmation, photo gallery lightbox, and an operational Admin Dashboard.

---

## ✨ Features

- **Hero & Story**: Floating coffee cup animation with rising steam, single-origin tasting profiles, customer reviews, and live opening status.
- **Interactive Menu**: Filter by categories (Coffee, Cold Beverages, Tea, Breakfast, Snacks, Desserts), search by keyword, vegetarian filters, and live cart stepper.
- **Persistent Shopping Cart**: Calculate subtotal, 5% GST, item quantities, and grand total in Indian Rupees (₹) with `localStorage` sync.
- **Demo Checkout**: Supports Dine-In (with table selection) and Takeaway modes, contact information validation, and celebratory confetti upon order placement.
- **Table Reservation System**: Date picker, time slot selector, guest counter, seating area preference (Indoor Garden, Window Lounge, Patio Terrace), and generated booking code.
- **Photo Gallery with Lightbox**: Masonry-style grid featuring Café Interior, Coffee, Food, and Events with keyboard and touch navigation.
- **Contact & Map**: Operating hours, feedback contact form, and Google Maps directions card.
- **Admin Portal**: Track total revenue, live order queues (Pending → Preparing → Ready → Completed), table bookings, and full CRUD menu item catalog.

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### Installation

```bash
# 1. Clone or download the repository
cd brew-and-bloom-cafe

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

The application will be accessible at:
```
http://localhost:3000
```

### Production Build

```bash
npm run build
npm run preview
```
