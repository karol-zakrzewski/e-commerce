import { ButtonSection } from "@/components/checkout/ButtonSection";
import { getUserCart } from "@/lib/cart";

const Checkout = async () => {
  const cart = await getUserCart();

  if (!cart.success) {
    return <div> Error: {cart.error}</div>;
  }
  const deliveryPrice = 20;
  return (
    <div className="p-6">
      <h2 className="text-center text-lg font-bold uppercase">Podsumowanie</h2>
      <div className="mt-4 flex justify-between gap-4">
        <div className="grow rounded-lg bg-slate-100 p-4">
          <h3 className=" border-b text-center font-semibold uppercase">
            Adres dostawy
          </h3>
        </div>
        <div className="flex min-w-[328px] flex-col gap-4 rounded-lg bg-slate-100 p-4">
          <h3 className="border-b text-center text-lg font-semibold">
            Podsumowanie
          </h3>
          <div className="flex items-center justify-between">
            <p>Wartość produktów</p>
            <p>{cart.data.totalPrice} zł</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Dostawa</p>
            <p>od {deliveryPrice} zł</p>
          </div>

          <div className="flex items-center justify-between">
            <p className="border-t">Razem</p>
            <p>{cart.data.totalPrice + deliveryPrice} zł</p>
          </div>
          <ButtonSection cart={cart.data} />
        </div>
      </div>

      {/* formularz z adresem dostawy */}
    </div>
  );
};

export default Checkout;
