"use client";
import { Button } from "@/components/ui/Button";
import { Product } from "@/lib/products/types";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const checkoutSchema = z.object({
  city: z.string(),
  street: z.string(),
  zipcode: z.string(),
  phone: z.string(),
  contactPerson: z.string(),
});

type CheckoutSchema = z.infer<typeof checkoutSchema>;

export const CheckoutForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      city: null,
      street: null,
      zipcode: null,
      phone: null,
      contactPerson: null,
    },
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="grow rounded-lg bg-slate-100 p-4">
      <h3 className=" border-b text-center font-semibold uppercase">
        Adres dostawy
      </h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
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
        <Button>Zapisz</Button>
      </form>
    </div>
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
