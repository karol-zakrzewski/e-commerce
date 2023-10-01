"use client";
import { addToCart } from "@/lib/cart";
import { ProductVariant } from "@/lib/products/types";
import { useRef } from "react";

export const TableRow = ({
  variant,
  productId,
}: {
  variant: ProductVariant;
  productId: string;
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { code, dimensions, price, stock } = variant;
  const [mainDimension] = dimensions;
  return (
    <tr className="border-b bg-white">
      <td
        scope="row"
        className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 "
      >
        {code}
      </td>
      <td className="px-6 py-4 text-center">
        {mainDimension.standard}
        {mainDimension.nominal}
      </td>
      <td className="px-6 py-4 text-center">{price} zł</td>
      <td className="px-6 py-4 text-center">{stock} szt.</td>
      <td className="px-6 py-4 text-center">
        <input
          ref={inputRef}
          defaultValue={0}
          type="number"
          min={0}
          max={1000}
          className="w-11 border text-center"
        />
      </td>
      <td className="px-6 py-4 text-end">
        <button
          className="rounded-full border-2 border-brand-orange bg-white px-6 py-2 font-bold text-brand-orange"
          onClick={async () => {
            if (!inputRef.current || !Number(inputRef.current.value)) {
              alert("Ilość produktów musi być większa od 0");
              return;
            }
            await addToCart({
              productId,
              productVariant: {
                code: variant.code,
                count: Number(inputRef.current.value),
              },
            });
          }}
        >
          Dodaj
        </button>
      </td>
    </tr>
  );
};
