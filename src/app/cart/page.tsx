import { CartItems } from "@/components/cart/CartItems";
import { getUserCart } from "@/api/cart";
import Link from "next/link";
import { Suspense } from "react";

const GetCart = async () => {
  return (
    <div className="p-6">
      <h2 className="text-center text-2xl font-bold uppercase">Koszyk</h2>
      {/* <Suspense fallback={<div>Loading...</div>}> */}
      <CartItems getUserCart={getUserCart} />
      <Link href="/checkout">Przejdz dalej</Link>
      {/* </Suspense> */}
    </div>
  );
};

export default GetCart;
