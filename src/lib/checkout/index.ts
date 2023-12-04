import { Cart } from "@/lib/cart/types";
import { ResponseApi } from "@/lib/types";
import { getSession } from "next-auth/react";

export const handlePayment = async (
  cart: Cart,
): Promise<ResponseApi.Error | ResponseApi.Success<{ url: string }>> => {
  try {
    const session = await getSession();

    if (!session) {
      throw Error("Please authenticate. Cannot get auth session");
    }

    const jwt = session.user.token;

    const deliveryPrice = 20 * 100;

    const delivery = {
      id: "delivery",
      name: "Koszt dostawy",
      quantity: 1,
      price: deliveryPrice,
    };

    const payload = {
      successUrl: `${window.origin}/payment?status=success`,
      errorUrl: `${window.origin}/payment?status=error`,
      items: cart.products
        .map(({ product: { name, _id: id }, productVariants }) => {
          const variantsDetails = productVariants.reduce(
            (acc, variant, index, array) => {
              const price = variant.price * variant.count;

              return {
                quantity: acc.quantity + variant.count,
                price: acc.price + price,
              };
            },
            { quantity: 0, price: 0 },
          );

          return {
            id,
            name,
            quantity: 1,
            price: variantsDetails.price * 100,
          };
        })
        .concat(delivery),
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
    // const data = {};

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
