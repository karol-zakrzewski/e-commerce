import { authOptions } from "@/api/auth/tools";
import { ResponseApi } from "@/api/types";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";

type Order = {
  // TODO: product without ordered variants {products: {product: Product, variants:Variants[]}[]}
  shippingAddress: {
    city: string;
    street: string;
    zipcode: string;
    contactPerson: string;
    phone: string;
  };
  shippingCost: number;
};

export const createOrder = async (
  order: Order,
  // TODO make better type
): Promise<ResponseApi.Error | ResponseApi.Success<{ id: string } & Order>> => {
  try {
    const session = await getSession();

    if (!session) {
      throw Error("Please authenticate. Cannot get auth session");
    }

    const jwt = session.token;

    const res = await fetch("https://gf-ecommerce.vercel.app/api/order", {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(order),
    });

    const data = await res.json();

    if (!data) {
      throw Error("Cannot create order. Please try again");
    }

    return { data, success: true, error: null };
  } catch (error) {
    if (error instanceof Error) {
      return { data: null, success: false, error: error.message };
    }
    return {
      data: null,
      success: false,
      error: "Something went wrong with create order",
    };
  }
};

export const updateOrderPayment = async ({
  orderId,
  paymentSessionId,
}: {
  orderId: string;
  paymentSessionId: string;
}): Promise<ResponseApi.Error | ResponseApi.Success<Order>> => {
  try {
    const session = await getSession();

    if (!session) {
      throw Error("Please authenticate. Cannot get auth session");
    }

    const jwt = session.token;

    const res = await fetch(
      "https://gf-ecommerce.vercel.app/api/update-order-payment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          orderId,
          paymentSessionId,
        }),
      },
    );

    const data = await res.json();

    if (!data) {
      throw Error("Cannot update order");
    }

    return { data, success: true, error: null };
  } catch (error) {
    if (error instanceof Error) {
      return { data: null, success: false, error: error.message };
    }
    return {
      data: null,
      success: false,
      error: "Something went wrong with update order payment status",
    };
  }
};

export const getOrder = async (): Promise<
  ResponseApi.Error | ResponseApi.Success<Order>
> => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw Error("Please authenticate. Cannot get auth session");
    }

    const jwt = session.token;

    const res = await fetch("https://gf-ecommerce.vercel.app/api/order", {
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
