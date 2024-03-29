import { Product } from "@/api/products/types";

export type Cart = {
  products: {
    product: Product;
    productVariants: { count: number; price: number; code: number }[];
  }[];
  totalPrice: number;
  orderby: string;
};
