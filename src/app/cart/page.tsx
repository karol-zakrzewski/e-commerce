import { CartItems } from "@/components/cart/CartItems";
import { getUserCart } from "@/lib/cart";
import { Suspense } from "react";

const GetCart = async () => {
  return (
    <div>
      <h2 className="text-center text-2xl">Koszyk</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <CartItems getUserCart={getUserCart} />
      </Suspense>
    </div>
  );
};

export default GetCart;
