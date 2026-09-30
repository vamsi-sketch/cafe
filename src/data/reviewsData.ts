import { Review } from '../types';

export const customerReviews: Review[] = [
  {
    id: 'rev-1',
    name: 'Ananya Sharma',
    role: 'Architect & Coffee Enthusiast',
    rating: 5,
    comment: 'Brew & Bloom is hands-down the best café in town. The serene botanical vibe, soft jazz, and their Artisan Cappuccino make it my absolute favorite spot for afternoon sketches and client meetings.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    date: '3 days ago',
    favoriteItem: 'Artisan Cappuccino & Butter Croissant'
  },
  {
    id: 'rev-2',
    name: 'Rohan Mehta',
    role: 'Tech Lead & Remote Worker',
    rating: 5,
    comment: 'Incredible coffee quality. The baristas actually know their extraction ratios and bean notes. High-speed WiFi, plenty of power outlets, and peaceful seating. Can’t recommend the Cold Brew enough!',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    date: '1 week ago',
    favoriteItem: 'Vietnamese Cold Brew'
  },
  {
    id: 'rev-3',
    name: 'Priya & Kabir Nair',
    role: 'Weekend Regulars',
    rating: 5,
    comment: 'We booked a table for our anniversary Sunday brunch and the staff made it unforgettable! Warm hospitality, fresh New York Cheesecake, and delicious avocado toast. It feels like a breath of fresh air.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    date: '2 weeks ago',
    favoriteItem: 'New York Cheesecake & Garden Club Sandwich'
  },
  {
    id: 'rev-4',
    name: 'Devansh Kulkarni',
    role: 'Product Designer',
    rating: 5,
    comment: 'The attention to detail in everything—from the earth-toned ceramics to the playlist and the flaky pastries—is world class. Brew & Bloom raises the bar for specialty café experiences.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    date: 'Last month',
    favoriteItem: 'Signature Double Espresso'
  }
];
