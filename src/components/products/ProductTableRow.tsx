"use client";
import { ProductVariant } from "@/api/products/types";
import { AddToCardButton } from "./AddToCardButton";
import { ChangeEvent, useCallback, useState } from "react";

type TableRowProps = {
  variant: ProductVariant;
  productId: string;
};

export const TableRow = ({ variant, productId }: TableRowProps) => {
  const [amount, setAmount] = useState(0);
  const { code, dimensions, price, stock } = variant;
  const [mainDimension] = dimensions;

  const handleAmountChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const amount = Number(value) || 0;
    setAmount(amount);
  }, []);

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
            defaultValue={0}
            type="number"
            min={0}
            max={1000}
            className="w-11 border text-center"
            onChange={handleAmountChange}
          />
        </td>
        <td className="px-6 py-4 text-end">
          <AddToCardButton
            variant={variant}
            productId={productId}
            amount={amount}
          />
        </td>
      </tr>
    </>
  );
};
