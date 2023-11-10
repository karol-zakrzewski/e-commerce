"use client";
import { addToCart } from "@/lib/cart";
import { ProductVariant } from "@/lib/products/types";
import { useRef, useState } from "react";
import { FaSpinner } from "react-icons/fa6";

export const TableRow = ({
  variant,
  productId,
}: {
  variant: ProductVariant;
  productId: string;
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isError, setIsError] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { code, dimensions, price, stock } = variant;
  const [mainDimension] = dimensions;
  return (
    <>
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
            className={`rounded-full border-2  bg-white px-6 py-2 font-bold  ${
              isError
                ? "border-red-500 text-red-500"
                : "border-brand-orange text-brand-orange"
            }`}
            onClick={async () => {
              if (!inputRef.current || !Number(inputRef.current.value)) {
                alert("Ilość produktów musi być większa od 0");
                return;
              }
              setIsProcessing(true);
              const { error } = await addToCart({
                productId,
                productVariants: [
                  {
                    code: variant.code,
                    count: Number(inputRef.current.value),
                  },
                ],
              });

              if (error) {
                setIsError(true);
                setTimeout(() => setIsError(false), 3000);
                return;
              }

              setIsProcessing(false);
            }}
          >
            {isProcessing ? (
              <FaSpinner className="h-5 w-5 animate-spin" />
            ) : isError ? (
              "Błąd"
            ) : (
              "Dodaj"
            )}
          </button>
        </td>
      </tr>
    </>
  );
};
