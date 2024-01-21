import { ProductVariant } from "@/api/products/types";
import { AddToCardButton } from "./AddToCardButton";
import { Suspense } from "react";

export const TableRow = ({
  variant,
  productId,
}: {
  variant: ProductVariant;
  productId: string;
}) => {
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
            defaultValue={0}
            type="number"
            min={0}
            max={1000}
            className="w-11 border text-center"
          />
        </td>
        <td className="px-6 py-4 text-end">
          <Suspense fallback={<>Loading...</>}>
            <AddToCardButton variant={variant} productId={productId} />
          </Suspense>
        </td>
      </tr>
    </>
  );
};
