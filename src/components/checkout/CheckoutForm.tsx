"use client";
import { Button } from "@/components/ui/Button";
import React from "react";
import { useForm } from "react-hook-form";

export const CheckoutForm = () => {
  const { register, handleSubmit } = useForm();

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
        <div className="flex w-fit gap-4">
          <div className="flex flex-col gap-4">
            <fieldset className="flex flex-col gap-2">
              <label htmlFor="city">Miasto</label>
              <input {...register("city")} id="city" />
            </fieldset>

            <fieldset className="flex flex-col gap-2">
              <label htmlFor="street">Ulica i numer budynku</label>
              <input id="street" {...register} />
            </fieldset>

            <fieldset className="flex flex-col gap-2">
              <label htmlFor="zipcode">Kod pocztowy</label>
              <input id="zipcode" {...register} />
            </fieldset>
          </div>

          <div className="flex flex-col gap-4">
            <fieldset className="flex flex-col gap-2">
              <label htmlFor="nip">NIP</label>
              <input id="nip" {...register} />
            </fieldset>

            <fieldset className="flex flex-col gap-2">
              <label htmlFor="companyName">Nazwa firmy</label>
              <input id="companyName" {...register} />
            </fieldset>

            <fieldset className="flex flex-col gap-2">
              <label htmlFor="address">Adres firmy</label>
              <input id="address" {...register} />
            </fieldset>
          </div>
        </div>
        <Button>Zapisz</Button>
      </form>
    </div>
  );
};
