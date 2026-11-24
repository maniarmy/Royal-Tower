export interface AccommodationService {
  id: string;
  number: string;
  title: string;
  seoSubtitle: string;
  category: 'families-couples' | 'girls' | 'private';
  description: string;
  highlights: string[];
  image: string;
  imageAlt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'bedrooms' | 'suites' | 'facilities';
  caption: string;
  image: string;
  alt: string;
}

export const SITE_CONFIG = {
  businessName: 'Royal Tower Mohali',
  tagline: 'Best Room Rental Services in Mohali',
  phoneDisplay: '98157 29900',
  phoneHref: 'tel:+919815729900',
  whatsappNumber: '919815729900',
  whatsappDisplay: '+91 98157 29900',
  email: 'info@royaltowermohali.com',
  addressLine1: 'Royal Tower Mohali',
  addressLine2: 'Sector 78, Sohana, Landran Road, Mohali, Punjab',
  visitingHours: 'Open Daily · 9:00 AM – 8:30 PM IST',
  coordinates: {
    lat: 30.7046,
    lng: 76.7179,
  },
  directionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=Sector+78,+Sohana,+Landran+Road,+Mohali,+Punjab',
  googleMapsPlaceUrl:
    'https://www.google.com/maps/search/?api=1&query=Sector+78,+Sohana,+Landran+Road,+Mohali,+Punjab',
};

export const HERO_IMAGE = {
  src: '/src/assets/images/simple_pg_building_1795487765724.jpg',
  alt: 'Royal Tower Mohali building offering neat and clean rooms for rent in Mohali, Punjab',
};

export const ABOUT_IMAGE = {
  src: '/src/assets/images/simple_pg_family_room_1795487766822.jpg',
  alt: 'Simple, neat, and clean furnished room for rent at Royal Tower Mohali',
};

export const SERVICES: AccommodationService[] = [
  {
    id: 'family-room-rent',
    number: '01',
    title: 'Family Room for Rent',
    seoSubtitle: 'Family Room for Rent in Mohali',
    category: 'families-couples',
    description:
      'Clean, peaceful, and practical rooms for rent tailored for families visiting or relocating to Mohali. Enjoy home-like comfort with tidy rooms and respectful surroundings.',
    highlights: [
      'Clean double-bed room with wooden almirah',
      'Calm family-friendly floor',
      'Short-term & monthly stay options',
    ],
    image: '/src/assets/images/simple_pg_family_room_1795487766822.jpg',
    imageAlt: 'Simple and clean Family Room for Rent bedroom at Royal Tower Mohali',
  },
  {
    id: 'couple-room-rent',
    number: '02',
    title: 'Couple Room for Rent',
    seoSubtitle: 'Couple Room for Rent in Mohali',
    category: 'families-couples',
    description:
      'Comfortable and private rooms for rent for couples seeking a neat, welcoming, and dignified stay in Mohali with simple furnishings and transparent monthly terms.',
    highlights: [
      'Complete privacy & quiet environment',
      'Double bed, study desk & storage',
      'Flexible stay duration',
    ],
    image: '/src/assets/images/simple_pg_couple_room_1795487767079.jpg',
    imageAlt: 'Simple furnished Couple Room for Rent with double bed and study desk in Mohali',
  },
  {
    id: 'girls-room-rent',
    number: '03',
    title: 'Girls Room for Rent',
    seoSubtitle: 'Girls Room for Rent in Mohali',
    category: 'girls',
    description:
      'Dedicated, safe, and hygienic rooms for rent designed for female students and working women in Mohali, featuring bright rooms, study tables, and individual lockers.',
    highlights: [
      'Dedicated girls room for rent wing',
      'Individual almirahs & study table',
      'Safe, clean & peaceful environment',
    ],
    image: '/src/assets/images/simple_pg_girls_room_1795487767645.jpg',
    imageAlt: 'Simple and neat Girls Room for Rent twin-sharing room with study table in Mohali',
  },
  {
    id: 'private-budget-rooms',
    number: '04',
    title: 'Private & Affordable Rooms for Rent',
    seoSubtitle: 'Rooms for Rent in Mohali',
    category: 'private',
    description:
      'Move-in ready private and budget-friendly rooms for rent in Mohali with clean attached washrooms, geyser, and everyday upkeep—ideal for students and working professionals.',
    highlights: [
      'Budget-friendly monthly tariffs',
      'Spotless attached bathrooms with geyser',
      'Available for short & long stays',
    ],
    image: '/src/assets/images/simple_pg_clean_bathroom_1795487767486.jpg',
    imageAlt: 'Clean attached bathroom and bright hallway for rental rooms at Royal Tower Mohali',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'family-bedroom',
    title: 'Family Room for Rent',
    category: 'suites',
    caption: 'Clean double-bed family room with AC, fan, almirah, and natural daylight',
    image: '/src/assets/images/simple_pg_family_room_1795487766822.jpg',
    alt: 'Simple neat and clean family room for rent with wooden almirah at Royal Tower Mohali',
  },
  {
    id: 'couple-private-room',
    title: 'Couple & Private Room for Rent',
    category: 'suites',
    caption: 'Tidy furnished private room with double bed, work desk, and cupboard',
    image: '/src/assets/images/simple_pg_couple_room_1795487767079.jpg',
    alt: 'Simple furnished couple and private room for rent in Mohali',
  },
  {
    id: 'girls-twin-room',
    title: 'Girls Twin Sharing Room for Rent',
    category: 'bedrooms',
    caption: 'Bright two-bed girls room with study desk and individual lockers',
    image: '/src/assets/images/simple_pg_girls_room_1795487767645.jpg',
    alt: 'Neat and clean girls twin room for rent with wooden beds and study table in Mohali',
  },
  {
    id: 'clean-bathroom-corridor',
    title: 'Clean Attached Bathroom & Hallway',
    category: 'facilities',
    caption: 'Hygienic tiled washroom with geyser and clean residential corridor',
    image: '/src/assets/images/simple_pg_clean_bathroom_1795487767486.jpg',
    alt: 'Clean modern bathroom with geyser and bright corridor at Royal Tower Mohali',
  },
];

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
