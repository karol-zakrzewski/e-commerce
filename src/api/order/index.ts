import { Order } from "@/api/order/types";
import { ResponseApi } from "@/api/types";
import { getSession } from "next-auth/react";

export const createOrder = async (
  shippingData: Pick<Order, "shipping">,
): Promise<ResponseApi.Error | ResponseApi.Success<Order>> => {
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
      body: JSON.stringify(shippingData),
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
