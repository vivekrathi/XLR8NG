import { Retailer, Category } from './types';

export const RETAILERS: Record<string, Retailer> = {
  flipkart: {
    id: 'flipkart',
    name: 'Flipkart',
    logoUrl: 'https://logo.clearbit.com/flipkart.com',
    primaryColor: '#2874f0',
    secondaryColor: '#ffffff',
    website: 'https://flipkart.com'
  },
  amazon: {
    id: 'amazon',
    name: 'Amazon',
    logoUrl: 'https://logo.clearbit.com/amazon.com',
    primaryColor: '#ff9900',
    secondaryColor: '#232f3e',
    website: 'https://amazon.in'
  },
  myntra: {
    id: 'myntra',
    name: 'Myntra',
    logoUrl: 'https://logo.clearbit.com/myntra.com',
    primaryColor: '#ff3f6c',
    secondaryColor: '#ffffff',
    website: 'https://myntra.com'
  },
  ajio: {
    id: 'ajio',
    name: 'Ajio',
    logoUrl: 'https://logo.clearbit.com/ajio.com',
    primaryColor: '#d4af37',
    secondaryColor: '#000000',
    website: 'https://ajio.com'
  },
  snapdeal: {
    id: 'snapdeal',
    name: 'Snapdeal',
    logoUrl: 'https://logo.clearbit.com/snapdeal.com',
    primaryColor: '#e40046',
    secondaryColor: '#ffffff',
    website: 'https://snapdeal.com'
  }
};

export const CATEGORIES: Record<string, Category> = {
  electronics: {
    id: 'electronics',
    name: 'Electronics',
    slug: 'electronics',
    icon: '📱',
    description: 'Smartphones, laptops, accessories and more'
  },
  fashion: {
    id: 'fashion',
    name: 'Fashion',
    slug: 'fashion',
    icon: '👕',
    description: 'Clothing, shoes, accessories for men and women'
  },
  home: {
    id: 'home',
    name: 'Home & Kitchen',
    slug: 'home-kitchen',
    icon: '🏠',
    description: 'Home appliances, furniture, decor'
  },
  beauty: {
    id: 'beauty',
    name: 'Beauty & Personal Care',
    slug: 'beauty',
    icon: '💄',
    description: 'Skincare, makeup, grooming products'
  },
  books: {
    id: 'books',
    name: 'Books & Media',
    slug: 'books',
    icon: '📚',
    description: 'Books, movies, music, games'
  },
  sports: {
    id: 'sports',
    name: 'Sports & Fitness',
    slug: 'sports',
    icon: '⚽',
    description: 'Sports equipment, fitness gear, outdoor activities'
  },
  toys: {
    id: 'toys',
    name: 'Toys & Games',
    slug: 'toys',
    icon: '🧸',
    description: 'Toys, games, baby products'
  },
  automotive: {
    id: 'automotive',
    name: 'Automotive',
    slug: 'automotive',
    icon: '🚗',
    description: 'Car accessories, bike gear, automotive tools'
  }
};

export const DEAL_TAGS = {
  SUPER_DEAL: 'Super Deal',
  HOT_DEAL: 'Hot Deal',
  LIMITED_TIME: 'Limited Time',
  PRICE_DROP: 'Price Drop',
  CLEARANCE: 'Clearance',
  NEW_ARRIVAL: 'New Arrival',
  BEST_SELLER: 'Best Seller',
  FLASH_SALE: 'Flash Sale'
};

export const API_ENDPOINTS = {
  DEALS: '/api/deals',
  SUPER_DEALS: '/api/deals/super',
  LATEST_DEALS: '/api/deals/latest',
  PRICE_DROPS: '/api/deals/price-drops',
  EVENTS: '/api/deals/events',
  SEARCH: '/api/deals/search',
  CATEGORIES: '/api/categories',
  RETAILERS: '/api/retailers'
};