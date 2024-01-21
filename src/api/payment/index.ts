import { ResponseApi } from "@/api/types";
import { getSession } from "next-auth/react";

export const handleCheckPayment = async (): Promise<
  ResponseApi.Error | ResponseApi.Success<{ url: string }>
> => {
  try {
    const session = await getSession();

    if (!session) {
      throw Error("Please authenticate. Cannot get auth session");
    }

    const jwt = session.token;

    const res = await fetch(
      "https://gf-ecommerce.vercel.app/api/check-payment",
      {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({ paymentId: "pi_3MtwBwLkdIwHu7ix28a3tqPa" }),
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
