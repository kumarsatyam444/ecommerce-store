export const SORT_OPTIONS = [
  { value: 'name', label: 'Name (A-Z)' },
  { value: 'name-desc', label: 'Name (Z-A)' },
  { value: 'price', label: 'Price (Low to High)' },
  { value: 'price-desc', label: 'Price (High to Low)' },
  { value: 'rating', label: 'Rating (High to Low)' },
  { value: 'newest', label: 'Newest First' },
];

export const RATING_FILTERS = [
  { value: 0, label: 'All Ratings' },
  { value: 4, label: '4+ Stars' },
  { value: 3, label: '3+ Stars' },
  { value: 2, label: '2+ Stars' },
  { value: 1, label: '1+ Stars' },
];

export const CATEGORIES = [
  'Electronics',
  'Clothing',
  'Books',
  'Home & Garden',
  'Sports',
  'Beauty',
  'Toys',
  'Automotive',
];

export const PAYMENT_METHODS = {
  RAZORPAY: 'razorpay',
  COD: 'cod',
};

export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

export const LOCAL_STORAGE_KEYS = {
  CART: 'ecommerce_cart',
  WISHLIST: 'ecommerce_wishlist',
  USER: 'ecommerce_user',
  THEME: 'ecommerce_theme',
};

export const API_ENDPOINTS = {
  PRODUCTS: '/products',
  CATEGORIES: '/categories',
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/profile',
  },
  ORDERS: '/orders',
  PAYMENTS: '/payments',
};

export const BREAKPOINTS = {
  MOBILE: 480,
  TABLET: 768,
  DESKTOP: 1024,
  LARGE: 1200,
};
