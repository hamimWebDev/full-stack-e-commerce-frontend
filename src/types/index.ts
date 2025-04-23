export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  category: string;
  images: string[];
  stock: number;
  featured: boolean;
  rating: number;
  reviews: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  profilePhoto?: string;
  phoneNumber?: string;
  address?: string;
}

export interface Order {
  id: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  products: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    total: number;
  }[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'paid' | 'pending' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}