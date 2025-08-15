import { Deal, DealResponse, FilterOptions, SearchOptions } from './types';
import { RETAILERS, CATEGORIES, DEAL_TAGS } from './constants';
import { generateId, calculateDiscountPercentage } from './utils';

// Sample product images (using placeholder images)
const SAMPLE_IMAGES = [
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop'
];

const SAMPLE_TITLES = [
  'Premium Wireless Bluetooth Headphones',
  'Smart Fitness Tracker Watch',
  'Designer Casual Running Shoes',
  'Ultra HD Smart TV 55 Inch',
  'Wireless Mouse with RGB Lighting',
  'Cotton Blend Casual T-Shirt',
  'Professional Hair Dryer',
  'Stainless Steel Water Bottle',
  'Gaming Mechanical Keyboard',
  'Women\'s Ethnic Wear Kurti',
  'Men\'s Formal Leather Shoes',
  'Smartphone Back Cover Case',
  'Home Security Camera System',
  'Yoga Mat with Carry Bag',
  'Electric Kettle 1.5L',
  'Bluetooth Speaker Portable',
  'Laptop Backpack Waterproof',
  'Face Moisturizer Cream',
  'Car Mobile Phone Holder',
  'LED Desk Lamp Adjustable'
];

const SAMPLE_DESCRIPTIONS = [
  'High-quality product with premium features',
  'Best-selling item with excellent reviews',
  'Limited time offer with massive savings',
  'Popular choice among customers',
  'Top-rated product with warranty',
  'Trending item with latest technology',
  'Customer favorite with great value',
  'Premium quality at affordable price'
];

// Generate mock deals
function generateMockDeal(): Deal {
  const retailerKeys = Object.keys(RETAILERS);
  const categoryKeys = Object.keys(CATEGORIES);
  const retailer = RETAILERS[retailerKeys[Math.floor(Math.random() * retailerKeys.length)]];
  const category = CATEGORIES[categoryKeys[Math.floor(Math.random() * categoryKeys.length)]];
  
  const originalPrice = Math.floor(Math.random() * 10000) + 500;
  const discountPercentage = Math.floor(Math.random() * 50) + 30; // 30-80% discount
  const discountedPrice = Math.floor(originalPrice * (100 - discountPercentage) / 100);
  
  const now = new Date();
  const createdAt = new Date(now.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000); // Random date within last 7 days
  const expiresAt = Math.random() > 0.7 ? new Date(now.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000) : undefined; // 30% chance of expiry
  
  const tags = [];
  if (discountPercentage >= 70) tags.push(DEAL_TAGS.SUPER_DEAL);
  if (discountPercentage >= 60) tags.push(DEAL_TAGS.HOT_DEAL);
  if (Math.random() > 0.8) tags.push(DEAL_TAGS.LIMITED_TIME);
  if (Math.random() > 0.7) tags.push(DEAL_TAGS.PRICE_DROP);
  
  return {
    id: generateId(),
    title: SAMPLE_TITLES[Math.floor(Math.random() * SAMPLE_TITLES.length)],
    description: SAMPLE_DESCRIPTIONS[Math.floor(Math.random() * SAMPLE_DESCRIPTIONS.length)],
    originalPrice,
    discountedPrice,
    discountPercentage: calculateDiscountPercentage(originalPrice, discountedPrice),
    imageUrl: SAMPLE_IMAGES[Math.floor(Math.random() * SAMPLE_IMAGES.length)],
    productUrl: `${retailer.website}/product/${generateId()}`,
    retailer,
    category,
    tags,
    isFeatured: Math.random() > 0.8,
    isHot: discountPercentage >= 60,
    createdAt,
    updatedAt: createdAt,
    expiresAt
  };
}

// Generate a pool of mock deals
const MOCK_DEALS: Deal[] = Array.from({ length: 200 }, generateMockDeal);

// API simulation with delay
function simulateApiDelay(): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 200));
}

export class MockApiService {
  static async getDeals(
    page: number = 1,
    limit: number = 20,
    filters?: FilterOptions
  ): Promise<DealResponse> {
    await simulateApiDelay();
    
    let filteredDeals = [...MOCK_DEALS];
    
    // Apply filters
    if (filters) {
      if (filters.category) {
        filteredDeals = filteredDeals.filter(deal => deal.category.id === filters.category);
      }
      
      if (filters.retailer) {
        filteredDeals = filteredDeals.filter(deal => deal.retailer.id === filters.retailer);
      }
      
      if (filters.minDiscount) {
        filteredDeals = filteredDeals.filter(deal => deal.discountPercentage >= filters.minDiscount!);
      }
      
      if (filters.maxPrice) {
        filteredDeals = filteredDeals.filter(deal => deal.discountedPrice <= filters.maxPrice!);
      }
      
      // Apply sorting
      if (filters.sortBy) {
        filteredDeals.sort((a, b) => {
          let comparison = 0;
          
          switch (filters.sortBy) {
            case 'newest':
              comparison = b.createdAt.getTime() - a.createdAt.getTime();
              break;
            case 'discount':
              comparison = b.discountPercentage - a.discountPercentage;
              break;
            case 'price':
              comparison = a.discountedPrice - b.discountedPrice;
              break;
            case 'popularity':
              comparison = (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
              break;
          }
          
          return filters.sortOrder === 'desc' ? comparison : -comparison;
        });
      }
    }
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedDeals = filteredDeals.slice(startIndex, endIndex);
    
    return {
      deals: paginatedDeals,
      totalCount: filteredDeals.length,
      page,
      limit,
      hasMore: endIndex < filteredDeals.length
    };
  }
  
  static async getSuperDeals(page: number = 1, limit: number = 12): Promise<DealResponse> {
    return this.getDeals(page, limit, { minDiscount: 70, sortBy: 'discount', sortOrder: 'desc' });
  }
  
  static async getLatestDeals(page: number = 1, limit: number = 20): Promise<DealResponse> {
    return this.getDeals(page, limit, { sortBy: 'newest', sortOrder: 'desc' });
  }
  
  static async getPriceDrops(page: number = 1, limit: number = 20): Promise<DealResponse> {
    await simulateApiDelay();
    
    const priceDropDeals = MOCK_DEALS.filter(deal => 
      deal.tags.includes(DEAL_TAGS.PRICE_DROP)
    );
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedDeals = priceDropDeals.slice(startIndex, endIndex);
    
    return {
      deals: paginatedDeals,
      totalCount: priceDropDeals.length,
      page,
      limit,
      hasMore: endIndex < priceDropDeals.length
    };
  }
  
  static async getEventOffers(page: number = 1, limit: number = 16): Promise<DealResponse> {
    return this.getDeals(page, limit, { minDiscount: 50, sortBy: 'discount', sortOrder: 'desc' });
  }
  
  static async searchDeals(options: SearchOptions): Promise<DealResponse> {
    await simulateApiDelay();
    
    const searchQuery = options.query.toLowerCase();
    let searchResults = MOCK_DEALS.filter(deal =>
      deal.title.toLowerCase().includes(searchQuery) ||
      deal.description.toLowerCase().includes(searchQuery) ||
      deal.category.name.toLowerCase().includes(searchQuery) ||
      deal.retailer.name.toLowerCase().includes(searchQuery)
    );
    
    // Apply additional filters
    const filters: FilterOptions = {
      category: options.category,
      retailer: options.retailer,
      minDiscount: options.minDiscount,
      maxPrice: options.maxPrice,
      sortBy: options.sortBy,
      sortOrder: options.sortOrder
    };
    
    if (filters.category) {
      searchResults = searchResults.filter(deal => deal.category.id === filters.category);
    }
    
    if (filters.retailer) {
      searchResults = searchResults.filter(deal => deal.retailer.id === filters.retailer);
    }
    
    if (filters.minDiscount) {
      searchResults = searchResults.filter(deal => deal.discountPercentage >= filters.minDiscount!);
    }
    
    if (filters.maxPrice) {
      searchResults = searchResults.filter(deal => deal.discountedPrice <= filters.maxPrice!);
    }
    
    const page = 1;
    const limit = 20;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedResults = searchResults.slice(startIndex, endIndex);
    
    return {
      deals: paginatedResults,
      totalCount: searchResults.length,
      page,
      limit,
      hasMore: endIndex < searchResults.length
    };
  }
  
  static async getDealById(id: string): Promise<Deal | null> {
    await simulateApiDelay();
    return MOCK_DEALS.find(deal => deal.id === id) || null;
  }
}