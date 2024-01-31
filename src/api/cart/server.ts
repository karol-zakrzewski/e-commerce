"use server";
import { authOptions } from "@/api/auth/tools";
import { Cart } from "@/api/cart/types";
import { ResponseApi } from "@/api/types";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const getUserCart = async (): Promise<
  ResponseApi.Error | ResponseApi.Success<Cart>
> => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw Error("Please authenticate. Cannot get auth session");
    }

    const jwt = session.token;

    const res = await fetch("https://gf-ecommerce.vercel.app/api/cart", {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwt}`,
      },
    });

    const data = await res.json();

    if (!data) {
      throw Error("Cannot fetch products in cart");
    }

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

export const removeProductVariant = async ({
  productId,
  variantCode,
}: {
  productId: string;
  variantCode: number;
}): Promise<ResponseApi.Error | ResponseApi.Success<Cart>> => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw Error("Please authenticate. Cannot get auth session");
    }

    const jwt = session.token;

    const res = await fetch("https://gf-ecommerce.vercel.app/api/cart", {
      method: "DELETE",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({ productId, variantCode }),
    });

    const data = (await res.json()) as Cart;
    revalidatePath("/cart", "page");
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
