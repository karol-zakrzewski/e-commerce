import { Product } from "@/api/products/types";

type Payment = {
  id: string;
  status: "paid" | "unpaid" | "no_payment_required";
};

type OrderStatus = {
  type: "ordered" | "shipped" | "delivered" | "canceled";
};

type Shipping = {
  type: "selfPickup" | "standard" | "large" | "individual";
  address: Address;
};

type Address = {
  city: string;
  street: string;
  zipcode: string;
  contactPerson: string;
  phone: string;
};

type ProductVariants = {
  code: number;
  count: number;
  price: number;
};

export type Order = {
  id: string;
  products: { product: Product; productVariants: ProductVariants[] }[];
  payment: Payment;
  totalPrice: number;
  orderStatus: OrderStatus;
  shipping: Shipping;
  /**
   * ISO string date
   */
  createdAt: string;
  /**
   * ISO string date
   */
  updatedAt: string;
  orderBy: string;
};
