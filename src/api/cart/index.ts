"use server";
import { Cart } from "@/api/cart/types";
import { ResponseApi } from "@/api/types";
import { getSession } from "next-auth/react";
import { revalidatePath } from "next/cache";

type CartItem = {
  productId: string;
  productVariants: {
    code: number;
    count: number;
  }[];
};

export const addToCart = async ({ productId, productVariants }: CartItem) => {
  try {
    const session = await getSession();

    if (!session) {
      throw Error("Please authenticate. Cannot get auth session");
    }

    const jwt = session.token;

    const res = await fetch("https://gf-ecommerce.vercel.app/api/cart", {
      method: "POST",
      cache: "no-cache",
      headers: {
        authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cart: {
          productId,
          productVariants,
        },
      }),
    });

    const data = await res.json();
    revalidatePath("/cart", "page");
    return { data: data, success: true, error: null };
  } catch (error) {
    if (error instanceof Error) {
      return { data: null, success: true, error: error.message };
    }
    return {
      data: null,
      success: true,
      error: "Something went wrong with adding product to cart",
    };
  }
};

export const removeProductVariant = async ({
  productId,
  variantCode,
}: {
  productId: string;
  variantCode: number;
}): Promise<ResponseApi.Error | ResponseApi.Success<Cart>> => {
  try {
    const session = await getSession();

    if (!session) {
      throw Error("Please authenticate. Cannot get auth session");
    }

    const jwt = session.token;

    const res = await fetch("https://gf-ecommerce.vercel.app/api/cart", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({ productId, variantCode }),
    });

    const data = (await res.json()) as Cart;

    return { data, success: true, error: null };
  } catch (error) {
    if (error instanceof Error) {
      return { data: null, success: false, error: error.message };
    }
    return {
      data: null,
      success: false,
      error: "Something went wrong with get cart",
    };
  }
};
