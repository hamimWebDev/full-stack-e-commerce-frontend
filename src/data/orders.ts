import { Order } from '../types';

export const orders: Order[] = [
  {
    id: "ORD-001",
    user: {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com"
    },
    products: [
      {
        id: "1",
        name: "Wireless Noise-Cancelling Headphones",
        price: 299.99,
        quantity: 1,
        total: 299.99
      },
      {
        id: "5",
        name: "Minimalist Watch",
        price: 149.99,
        quantity: 1,
        total: 149.99
      }
    ],
    total: 449.98,
    status: "delivered",
    paymentStatus: "paid",
    createdAt: new Date("2023-09-15"),
    updatedAt: new Date("2023-09-20")
  },
  {
    id: "ORD-002",
    user: {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com"
    },
    products: [
      {
        id: "3",
        name: "Professional Camera Kit",
        price: 1099.99,
        quantity: 1,
        total: 1099.99
      }
    ],
    total: 1099.99,
    status: "shipped",
    paymentStatus: "paid",
    createdAt: new Date("2023-10-02"),
    updatedAt: new Date("2023-10-05")
  },
  {
    id: "ORD-003",
    user: {
      id: "3",
      name: "Robert Johnson",
      email: "robert.johnson@example.com"
    },
    products: [
      {
        id: "2",
        name: "Ultra HD Smart TV - 55\"",
        price: 799.99,
        quantity: 1,
        total: 799.99
      },
      {
        id: "4",
        name: "Ergonomic Office Chair",
        price: 249.99,
        quantity: 1,
        total: 249.99
      }
    ],
    total: 1049.98,
    status: "processing",
    paymentStatus: "paid",
    createdAt: new Date("2023-11-10"),
    updatedAt: new Date("2023-11-12")
  },
  {
    id: "ORD-004",
    user: {
      id: "4",
      name: "Sarah Williams",
      email: "sarah.williams@example.com"
    },
    products: [
      {
        id: "6",
        name: "Leather Laptop Bag",
        price: 129.99,
        quantity: 1,
        total: 129.99
      }
    ],
    total: 129.99,
    status: "pending",
    paymentStatus: "pending",
    createdAt: new Date("2023-12-01"),
    updatedAt: new Date("2023-12-01")
  }
];