export interface Deal {
  id: string;
  title: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  imageUrl: string;
  productUrl: string;
  retailer: Retailer;
  category: Category;
  tags: string[];
  isFeatured: boolean;
  isHot: boolean;
  createdAt: Date;
  updatedAt: Date;
  expiresAt?: Date;
}

export interface Retailer {
  id: string;
  name: string;
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  website: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description?: string;
}

export interface DealResponse {
  deals: Deal[];
  totalCount: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface ApiError {
  message: string;
  code: string;
  details?: any;
}

export interface FilterOptions {
  category?: string;
  retailer?: string;
  minDiscount?: number;
  maxPrice?: number;
  sortBy?: 'newest' | 'discount' | 'price' | 'popularity';
  sortOrder?: 'asc' | 'desc';
}

export interface SearchOptions extends FilterOptions {
  query: string;
}

export interface UserPreferences {
  favoriteDeals: string[];
  favoriteCategories: string[];
  favoriteRetailers: string[];
  notifications: {
    newDeals: boolean;
    priceDrops: boolean;
    favorites: boolean;
  };
}