import { ResponseApi } from "@/lib/types";
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
): Promise<ResponseApi.Error | ResponseApi.Success<Order>> => {
  try {
    // TODO: replace getServerSession. It a big cost
    const session = await getSession();

    if (!session) {
      throw Error("Please authenticate. Cannot get auth session");
    }

    const jwt = session.user.token;

    const res = await fetch("http://localhost:4000/api/order", {
      // const res = await fetch("https://gf-ecommerce.vercel.app/api/order", {
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
      error: "Something went wrong with get cart",
    };
  }
};
