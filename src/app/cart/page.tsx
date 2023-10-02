import { getUserCart } from "@/lib/cart";
import React from "react";

const GetCart = async () => {
  const { data, error, success } = await getUserCart();

  if (!success) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="text-center text-2xl">Koszyk</h2>
      <ul>
        {data.products.map(({ product, count, price }) => {
          return (
            <li key={product._id}>
              {product.name} - {count} szt. - {price} zł
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default GetCart;
