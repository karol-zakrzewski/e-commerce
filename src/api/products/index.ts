import axios from "axios";
import { ResponseApi } from "@/api/types";
import { Product } from "@/api/products/types";

export const getProducts = async (): Promise<
  ResponseApi.Error | ResponseApi.Success<Product[]>
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

export const getProduct = async (
  id: string,
): Promise<ResponseApi.Error | ResponseApi.Success<Product>> => {
  try {
    const data = await axios.get<Product>(
      `https://gf-ecommerce.vercel.app/api/products/${id}`,
    );

    return {
      success: true,
      error: null,
      data: data.data,
    };
  } catch (error) {
    const errorData = {
      success: false as const,
      data: null,
    };
    if (error instanceof Error) {
      return {
        ...errorData,
        error: error.message,
      };
    }
    return {
      ...errorData,
      error: "Failed to fetch product",
    };
  }
};
