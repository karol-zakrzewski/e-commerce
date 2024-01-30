import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { getUserCart } from "@/api/cart";

const Checkout = async () => {
  const cart = await getUserCart();

  if (!cart.success) {
    return <div> Error: {cart.error}</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-center text-lg font-bold uppercase">Podsumowanie</h2>
      <div className="mt-4 flex justify-between gap-4">
        <CheckoutForm cart={cart} />
      </div>
    </div>
  );
};

export default Checkout;
