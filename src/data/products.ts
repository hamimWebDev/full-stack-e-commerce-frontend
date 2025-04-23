import { Product } from '../types';

export const products: Product[] = [
  {
    id: "1",
    name: "Wireless Noise-Cancelling Headphones",
    description: "Premium noise-cancelling headphones with crystal clear sound quality and 30-hour battery life.",
    price: 349.99,
    discountPrice: 299.99,
    category: "electronics",
    images: [
      "https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    stock: 45,
    featured: true,
    rating: 4.8,
    reviews: 234,
    createdAt: new Date("2023-05-12"),
    updatedAt: new Date("2023-09-25")
  },
  {
    id: "2",
    name: "Ultra HD Smart TV - 55\"",
    description: "Experience stunning 4K resolution and smart features for all your entertainment needs.",
    price: 799.99,
    category: "electronics",
    images: [
      "https://images.pexels.com/photos/6782570/pexels-photo-6782570.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/6976094/pexels-photo-6976094.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    stock: 15,
    featured: true,
    rating: 4.6,
    reviews: 178,
    createdAt: new Date("2023-06-15"),
    updatedAt: new Date("2023-10-01")
  },
  {
    id: "3",
    name: "Professional Camera Kit",
    description: "Complete camera kit with DSLR camera, multiple lenses, and accessories for professional photography.",
    price: 1299.99,
    discountPrice: 1099.99,
    category: "electronics",
    images: [
      "https://images.pexels.com/photos/243757/pexels-photo-243757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1787236/pexels-photo-1787236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    stock: 8,
    featured: false,
    rating: 4.9,
    reviews: 92,
    createdAt: new Date("2023-04-20"),
    updatedAt: new Date("2023-09-10")
  },
  {
    id: "4",
    name: "Ergonomic Office Chair",
    description: "Comfortable office chair with lumbar support and adjustable features for all-day comfort.",
    price: 249.99,
    category: "furniture",
    images: [
      "https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/5668859/pexels-photo-5668859.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    stock: 32,
    featured: false,
    rating: 4.5,
    reviews: 115,
    createdAt: new Date("2023-07-08"),
    updatedAt: new Date("2023-11-15")
  },
  {
    id: "5",
    name: "Minimalist Watch",
    description: "Elegant watch with a minimalist design, suitable for everyday wear and special occasions.",
    price: 179.99,
    discountPrice: 149.99,
    category: "accessories",
    images: [
      "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    stock: 65,
    featured: true,
    rating: 4.7,
    reviews: 208,
    createdAt: new Date("2023-08-30"),
    updatedAt: new Date("2023-12-05")
  },
  {
    id: "6",
    name: "Leather Laptop Bag",
    description: "Premium leather laptop bag with multiple compartments and sleek design for professionals.",
    price: 129.99,
    category: "accessories",
    images: [
      "https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/6767782/pexels-photo-6767782.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    stock: 20,
    featured: false,
    rating: 4.6,
    reviews: 78,
    createdAt: new Date("2023-09-12"),
    updatedAt: new Date("2023-12-20")
  },
  {
    id: "7",
    name: "Leather Laptop Bag",
    description: "Premium leather laptop bag with multiple compartments and sleek design for professionals.",
    price: 129.99,
    category: "accessories",
    images: [
      "https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/6767782/pexels-photo-6767782.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    stock: 20,
    featured: false,
    rating: 4.6,
    reviews: 78,
    createdAt: new Date("2023-09-12"),
    updatedAt: new Date("2023-12-20")
  },
  {
    id: "8",
    name: "Leather Laptop Bag",
    description: "Premium leather laptop bag with multiple compartments and sleek design for professionals.",
    price: 129.99,
    category: "accessories",
    images: [
      "https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/6767782/pexels-photo-6767782.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    stock: 20,
    featured: false,
    rating: 4.6,
    reviews: 78,
    createdAt: new Date("2023-09-12"),
    updatedAt: new Date("2023-12-20")
  },
  {
    id: "9",
    name: "Leather Laptop Bag",
    description: "Premium leather laptop bag with multiple compartments and sleek design for professionals.",
    price: 129.99,
    category: "accessories",
    images: [
      "https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/6767782/pexels-photo-6767782.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    stock: 20,
    featured: false,
    rating: 4.6,
    reviews: 78,
    createdAt: new Date("2023-09-12"),
    updatedAt: new Date("2023-12-20")
  },
  {
    id: "10",
    name: "Leather Laptop Bag",
    description: "Premium leather laptop bag with multiple compartments and sleek design for professionals.",
    price: 129.99,
    category: "accessories",
    images: [
      "https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/6767782/pexels-photo-6767782.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    stock: 20,
    featured: false,
    rating: 4.6,
    reviews: 78,
    createdAt: new Date("2023-09-12"),
    updatedAt: new Date("2023-12-20")
  },
  {
    id: "11",
    name: "Leather Laptop Bag",
    description: "Premium leather laptop bag with multiple compartments and sleek design for professionals.",
    price: 129.99,
    category: "accessories",
    images: [
      "https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/6767782/pexels-photo-6767782.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    stock: 20,
    featured: false,
    rating: 4.6,
    reviews: 78,
    createdAt: new Date("2023-09-12"),
    updatedAt: new Date("2023-12-20")
  },
  {
    id: "12",
    name: "Leather Laptop Bag",
    description: "Premium leather laptop bag with multiple compartments and sleek design for professionals.",
    price: 129.99,
    category: "accessories",
    images: [
      "https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/6767782/pexels-photo-6767782.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    stock: 20,
    featured: false,
    rating: 4.6,
    reviews: 78,
    createdAt: new Date("2023-09-12"),
    updatedAt: new Date("2023-12-20")
  },
  {
    id: "13",
    name: "Leather Laptop Bag",
    description: "Premium leather laptop bag with multiple compartments and sleek design for professionals.",
    price: 129.99,
    category: "accessories",
    images: [
      "https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/6767782/pexels-photo-6767782.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    stock: 20,
    featured: false,
    rating: 4.6,
    reviews: 78,
    createdAt: new Date("2023-09-12"),
    updatedAt: new Date("2023-12-20")
  },
  {
    id: "14",
    name: "Leather Laptop Bag",
    description: "Premium leather laptop bag with multiple compartments and sleek design for professionals.",
    price: 129.99,
    category: "accessories",
    images: [
      "https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/6767782/pexels-photo-6767782.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    stock: 20,
    featured: false,
    rating: 4.6,
    reviews: 78,
    createdAt: new Date("2023-09-12"),
    updatedAt: new Date("2023-12-20")
  },
  {
    id: "15",
    name: "Leather Laptop Bag",
    description: "Premium leather laptop bag with multiple compartments and sleek design for professionals.",
    price: 129.99,
    category: "accessories",
    images: [
      "https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/6767782/pexels-photo-6767782.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    stock: 20,
    featured: false,
    rating: 4.6,
    reviews: 78,
    createdAt: new Date("2023-09-12"),
    updatedAt: new Date("2023-12-20")
  },
  {
    id: "16",
    name: "Leather Laptop Bag",
    description: "Premium leather laptop bag with multiple compartments and sleek design for professionals.",
    price: 129.99,
    category: "accessories",
    images: [
      "https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/6767782/pexels-photo-6767782.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    stock: 20,
    featured: false,
    rating: 4.6,
    reviews: 78,
    createdAt: new Date("2023-09-12"),
    updatedAt: new Date("2023-12-20")
  },
  {
    id: "17",
    name: "Leather Laptop Bag",
    description: "Premium leather laptop bag with multiple compartments and sleek design for professionals.",
    price: 129.99,
    category: "accessories",
    images: [
      "https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/6767782/pexels-photo-6767782.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    stock: 20,
    featured: false,
    rating: 4.6,
    reviews: 78,
    createdAt: new Date("2023-09-12"),
    updatedAt: new Date("2023-12-20")
  },
  {
    id: "18",
    name: "Leather Laptop Bag",
    description: "Premium leather laptop bag with multiple compartments and sleek design for professionals.",
    price: 129.99,
    category: "accessories",
    images: [
      "https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/6767782/pexels-photo-6767782.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    stock: 20,
    featured: false,
    rating: 4.6,
    reviews: 78,
    createdAt: new Date("2023-09-12"),
    updatedAt: new Date("2023-12-20")
  },
  {
    id: "19",
    name: "Leather Laptop Bag",
    description: "Premium leather laptop bag with multiple compartments and sleek design for professionals.",
    price: 129.99,
    category: "accessories",
    images: [
      "https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/6767782/pexels-photo-6767782.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    stock: 20,
    featured: false,
    rating: 4.6,
    reviews: 78,
    createdAt: new Date("2023-09-12"),
    updatedAt: new Date("2023-12-20")
  },
  {
    id: "20",
    name: "Leather Laptop Bag",
    description: "Premium leather laptop bag with multiple compartments and sleek design for professionals.",
    price: 129.99,
    category: "accessories",
    images: [
      "https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/6767782/pexels-photo-6767782.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    stock: 20,
    featured: false,
    rating: 4.6,
    reviews: 78,
    createdAt: new Date("2023-09-12"),
    updatedAt: new Date("2023-12-20")
  },
  {
    id: "21",
    name: "Leather Laptop Bag",
    description: "Premium leather laptop bag with multiple compartments and sleek design for professionals.",
    price: 129.99,
    category: "accessories",
    images: [
      "https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/6767782/pexels-photo-6767782.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    stock: 20,
    featured: false,
    rating: 4.6,
    reviews: 78,
    createdAt: new Date("2023-09-12"),
    updatedAt: new Date("2023-12-20")
  },
  {
    id: "22",
    name: "Leather Laptop Bag",
    description: "Premium leather laptop bag with multiple compartments and sleek design for professionals.",
    price: 129.99,
    category: "accessories",
    images: [
      "https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/6767782/pexels-photo-6767782.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    stock: 20,
    featured: false,
    rating: 4.6,
    reviews: 78,
    createdAt: new Date("2023-09-12"),
    updatedAt: new Date("2023-12-20")
  },
  {
    id: "23",
    name: "Leather Laptop Bag",
    description: "Premium leather laptop bag with multiple compartments and sleek design for professionals.",
    price: 129.99,
    category: "accessories",
    images: [
      "https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/6767782/pexels-photo-6767782.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    stock: 20,
    featured: false,
    rating: 4.6,
    reviews: 78,
    createdAt: new Date("2023-09-12"),
    updatedAt: new Date("2023-12-20")
  },
  {
    id: "24",
    name: "Leather Laptop Bag",
    description: "Premium leather laptop bag with multiple compartments and sleek design for professionals.",
    price: 129.99,
    category: "accessories",
    images: [
      "https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/6767782/pexels-photo-6767782.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    stock: 20,
    featured: false,
    rating: 4.6,
    reviews: 78,
    createdAt: new Date("2023-09-12"),
    updatedAt: new Date("2023-12-20")
  },
  {
    id: "25",
    name: "Leather Laptop Bag",
    description: "Premium leather laptop bag with multiple compartments and sleek design for professionals.",
    price: 129.99,
    category: "accessories",
    images: [
      "https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/6767782/pexels-photo-6767782.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    stock: 20,
    featured: false,
    rating: 4.6,
    reviews: 78,
    createdAt: new Date("2023-09-12"),
    updatedAt: new Date("2023-12-20")
  },
  {
    id: "26",
    name: "Leather Laptop Bag",
    description: "Premium leather laptop bag with multiple compartments and sleek design for professionals.",
    price: 129.99,
    category: "accessories",
    images: [
      "https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/6767782/pexels-photo-6767782.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    stock: 20,
    featured: false,
    rating: 4.6,
    reviews: 78,
    createdAt: new Date("2023-09-12"),
    updatedAt: new Date("2023-12-20")
  },
];