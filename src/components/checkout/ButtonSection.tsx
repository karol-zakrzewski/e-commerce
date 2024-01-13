"use client";

import { Button } from "@/components/form/Button";
import { Cart } from "@/api/cart/types";
import { handlePayment } from "@/api/checkout";
import { useRouter } from "next/navigation";
import { MouseEventHandler, ReactHTMLElement } from "react";

type Props = {
  cart: Cart;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const ButtonSection = ({ cart, onClick }: Props) => {
  return (
    <Button
      onClick={onClick}
      className="mx-auto self-center rounded-full bg-brand-orange px-4 py-2 text-white"
    >
      Zapłać
    </Button>
  );
};
