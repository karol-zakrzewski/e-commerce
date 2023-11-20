"use client";

import { Button } from "@/components/ui/Button";
import { Cart } from "@/lib/cart/types";
import { handlePayment } from "@/lib/checkout";
import { useRouter } from "next/navigation";

type Props = {
  cart: Cart;
};

export const ButtonSection = ({ cart }: Props) => {
  const { push } = useRouter();
  return (
    <Button
      onClick={async () => {
        const { data, success } = await handlePayment(cart);

        if (!success) {
          return;
        }

        push(data.url);
      }}
      className="mx-auto self-center rounded-full bg-brand-orange px-4 py-2 text-white"
    >
      Zapłać
    </Button>
  );
};
