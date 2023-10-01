import { authOptions } from "@/lib/auth/tools";
import { getUserCart } from "@/lib/cart";
import { getServerSession } from "next-auth/next";
import React from "react";

const GetCart = async () => {
  const session = await getServerSession(authOptions);
  // @ts-ignore
  const jwt = session?.user?.token as string;
  const { data, error, success } = await getUserCart(jwt);
  console.log("🚀  cart data:", data);
  if (!success) {
    return <div>Error</div>;
  }

  return (
    <div>
      <h2 className="text-center text-2xl">Koszyk</h2>
      <ul>
        {data.products.map(({ product }) => {
          console.log("🚀  product:", product);
          return <li key={product._id}>{product.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default GetCart;
