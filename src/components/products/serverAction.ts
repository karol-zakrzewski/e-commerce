"use server";
import { authOptions } from "@/api/auth/tools";
import { getServerSession } from "next-auth/next";
import { revalidatePath } from "next/cache";

export const addToCart = async (
  productId: string,
  productVariants: {
    code: number;
    count: number;
  }[],
) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return;
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
  return data;
};
