"use client";
import { Product } from "@/api/products/types";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ButtonSection } from "@/components/checkout/ButtonSection";
import { Cart } from "@/api/cart/types";
import { ResponseApi } from "@/api/types";
import { createOrder } from "@/api/order";
import { handlePayment } from "@/api/checkout";
import { useRouter } from "next/navigation";

const shippingAddressSchema = z.object({
  city: z.string().min(1, "To pole jest wymagane"),
  street: z.string().min(1, "To pole jest wymagane"),
  zipcode: z.string().min(1, "To pole jest wymagane"),
  phone: z.string().min(1, "To pole jest wymagane"),
  contactPerson: z.string().min(1, "To pole jest wymagane"),
});

type ShippingAddress = z.infer<typeof shippingAddressSchema>;

type Props = {
  cart: ResponseApi.Success<Cart>;
};

export const CheckoutForm = ({ cart }: Props) => {
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
  } = useForm({
    defaultValues: {
      city: "",
      street: "",
      zipcode: "",
      phone: "",
      contactPerson: "",
    },
    resolver: zodResolver(shippingAddressSchema),
  });

  const deliveryPrice = 20;

  return (
    <>
      <div className="grow rounded-lg bg-slate-100 p-4">
        <h3 className=" border-b text-center font-semibold uppercase">
          Adres dostawy
        </h3>
        <form
          // onSubmit={}
          className="flex w-fit flex-col gap-4"
        >
          <div className="flex w-fit flex-col gap-4">
            <h3 className="text-lg font-bold">Adres dostawy</h3>
            {Object.keys(errors).length > 0 && (
              <div className="rounded-sm bg-red-300 px-4 py-1 text-red-900">
                Wszystkie pola są wymagane
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <fieldset className="flex flex-col gap-2">
                <label htmlFor="city">Miasto</label>
                <input {...register("city")} id="city" />
              </fieldset>
              <fieldset className="flex flex-col gap-2">
                <label htmlFor="street">Ulica i numer budynku</label>
                <input id="street" {...register("street")} />
              </fieldset>
              <fieldset className="flex flex-col gap-2">
                <label htmlFor="zipcode">Kod pocztowy</label>
                <input id="zipcode" {...register("zipcode")} />
              </fieldset>
              <fieldset className="flex flex-col gap-2">
                <label htmlFor="companyName">Osoba kontaktowa</label>
                <input id="companyName" {...register("contactPerson")} />
              </fieldset>
              <fieldset className="flex flex-col gap-2">
                <label htmlFor="address">Numer telefonu</label>
                <input id="address" {...register("phone")} />
              </fieldset>
            </div>
          </div>
          {/* <Button>Zapisz</Button> */}
        </form>
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
          <p>{deliveryPrice} zł</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="border-t">Razem</p>
          <p>{cart.data.totalPrice + deliveryPrice} zł</p>
        </div>

        <ButtonSection
          onClick={async () => {
            const isValid = await trigger();

            if (!isValid) {
              return;
            }
            const formData = getValues();
            await createOrder({
              shippingAddress: formData,
              shippingCost: deliveryPrice,
            });

            const { data, success } = await handlePayment(cart.data);

            if (!success) {
              return;
            }

            push(data.url);
          }}
          cart={cart.data}
        />
      </div>
    </>
  );
};

type Order = {
  products: Product[];
  paymentStatus: "paid" | "notPaid" | "pending";
  shippingAddress: {
    city: string;
    street: string;
    zipcode: string;
    contactPerson: string;
    phone: string;
  };
  shippingCost: number;
  productsValue: number;
  totalCost: number;
};
