import { Product } from "@/lib/products/types";

export type Cart = {
  products: { product: Product; count: number; price: number }[];
  totalPrice: number;
  orderby: string;
};
