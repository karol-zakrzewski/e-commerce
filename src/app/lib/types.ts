import { Product } from "@/app/lib/products/types";

export namespace ResponseApi {
  export type Success = {
    error: null;
    success: true;
    data: Product[];
  };

  export type Error = {
    error: string;
    success: false;
    data: null;
  };
}
