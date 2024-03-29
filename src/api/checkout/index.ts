import { Cart } from "@/api/cart/types";
import { ResponseApi } from "@/api/types";
import { getSession } from "next-auth/react";

type PaymentSession = {
  id: string;
  url: string;
};

type HandlePaymentProps = {
  cart: Cart;
  orderId: string;
};

export const handlePayment = async ({
  cart,
  orderId,
}: HandlePaymentProps): Promise<
  ResponseApi.Error | ResponseApi.Success<PaymentSession>
> => {
  try {
    const session = await getSession();

    if (!session) {
      throw Error("Please authenticate. Cannot get auth session");
    }

    const jwt = session.token;

    const deliveryPrice = 20 * 100;

    const delivery = {
      id: "delivery",
      name: "Koszt dostawy",
      quantity: 1,
      price: deliveryPrice,
    };

    const payload = {
      orderId,
      successUrl: `${window.origin}/payment?orderId=${orderId}&status=success`,
      errorUrl: `${window.origin}/payment?orderId=${orderId}&status=error`,
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

    const data = (await res.json()) as PaymentSession;

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
