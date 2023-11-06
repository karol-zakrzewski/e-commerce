"use client";
import { FaTrash } from "react-icons/fa6";

type Props = {
  code: number;
  dimension: string;
  count: number;
  price: number;

  productId: string;
};

export const CartItem = ({
  code,
  dimension,
  count,
  price,
  productId,
}: Props) => {
  return (
    <div className="flex items-center gap-4">
      <p>
        {code} - {dimension} - {count} szt. - {price * count}
        zł
      </p>

      <button
        onClick={() => {
          console.log("Usunieto produkt", productId, code);
        }}
        className="cursor-pointer rounded-full p-4 text-brand-orange transition-all duration-300 hover:bg-slate-100"
      >
        <FaTrash />
      </button>
    </div>
  );
};
