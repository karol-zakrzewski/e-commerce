import { getSession } from "@/api/auth/session";
import { Order } from "@/api/order/types";
import { ResponseApi } from "@/api/types";

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

export const getOrder = async (
  orderId?: string,
): Promise<ResponseApi.Error | ResponseApi.Success<Order>> => {
  try {
    if (!orderId) {
      throw Error("Invalid order id");
    }

    const session = await getSession();

    if (!session) {
      throw Error("Please authenticate. Cannot get auth session");
    }

    const jwt = session.token;

    const res = await fetch(
      `https://gf-ecommerce.vercel.app/api/order/${orderId}`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${jwt}`,
        },
      },
    );

    const data = await res.json();

    if (!data) {
      throw Error("Cannot fetch order");
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
