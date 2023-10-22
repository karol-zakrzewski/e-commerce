import { Cart } from "@/lib/cart/types";
import { ResponseApi } from "@/lib/types";
import axios from "axios";
import { getSession } from "next-auth/react";

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

    const jwt = session.user.token;

    const res = await fetch("https://gf-ecommerce.vercel.app/api/cart", {
      method: "POST",
      headers: {
        authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        cart: {
          productId,
          productVariants,
        },
      }),
    });

    const data = await res.json();
    return { data: data, success: true, error: null };
  } catch (error) {
    // @ts-ignore
    return { data: null, success: true, error: error?.message };
  }
};

export const getUserCart = async (): Promise<
  ResponseApi.Error | ResponseApi.Success<Cart>
> => {
  try {
    const session = await getSession();

    if (!session) {
      throw Error("Please authenticate. Cannot get auth session");
    }

    const jwt = session.user.token;
    const res = await axios.get<Cart>(
      "https://gf-ecommerce.vercel.app/api/cart",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${jwt}`,
        },
      },
    );

    return { data: res.data, success: true, error: null };
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
