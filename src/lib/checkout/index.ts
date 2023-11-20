import { Cart } from "@/lib/cart/types";
import { ResponseApi } from "@/lib/types";
import { getSession } from "next-auth/react";

export const handlePayment = async (
  cart: Cart,
): Promise<ResponseApi.Error | ResponseApi.Success<{ url: string }>> => {
  try {
    // TODO: replace getServerSession. It a big cost
    const session = await getSession();

    if (!session) {
      throw Error("Please authenticate. Cannot get auth session");
    }

    const jwt = session.user.token;

    const payload = {
      items: cart.products.map(
        ({ product: { name, _id: id }, productVariants }) => {
          const variantsDetails = productVariants.reduce(
            (acc, variant) => {
              return {
                quantity: acc.quantity + variant.count,
                price: acc.price + variant.price,
              };
            },
            { quantity: 0, price: 0 },
          );
          return {
            id,
            name,
            quantity: variantsDetails.quantity,
            price: variantsDetails.price,
          };
        },
      ),
    };

    const res = await fetch(
      "https://gf-ecommerce.vercel.app/api/create-checkout-session",
      {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(payload),
      },
    );

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
