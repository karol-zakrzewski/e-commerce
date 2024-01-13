"use client";
import { removeProductVariant } from "@/api/cart";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaSpinner, FaTrash } from "react-icons/fa6";

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
  const { refresh } = useRouter();
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex items-center gap-4">
      <p>
        {code} - {dimension} - {count} szt. - {price * count}
        zł
      </p>

      <button
        onClick={async () => {
          setLoading(true);
          const x = await removeProductVariant({
            productId,
            variantCode: code,
          });
          setLoading(false);
          refresh();
        }}
        className="cursor-pointer rounded-full p-4 text-brand-orange transition-all duration-300 hover:bg-slate-100"
      >
        {loading ? <FaSpinner /> : <FaTrash />}
      </button>
    </div>
  );
};
