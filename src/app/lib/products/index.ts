import axios from "axios";
import { ResponseApi } from "@/app/lib/types";
import { Product } from "@/app/lib/products/types";

export const getProducts = async (): Promise<
  ResponseApi.Error | ResponseApi.Success
> => {
  try {
    const data = await axios.get<Product[]>(
      "https://gf-ecommerce.vercel.app/api/products",
    );

    return {
      success: true,
      error: null,
      data: data.data,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        data: null,
        error: error.message,
      };
    }
    return {
      success: false,
      error: "Failed to fetch products",
      data: null,
    };
  }
};
