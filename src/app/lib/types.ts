import { Product } from "@/app/lib/products/types";

export namespace ResponseApi {
  export type Success<T> = {
    error: null;
    success: true;
    data: T;
  };

  export type Error = {
    error: string;
    success: false;
    data: null;
  };
}
