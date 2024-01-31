"use client";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa6";
import { ProductVariant } from "@/api/products/types";
import { addToCart } from "@/components/products/serverAction";

type AddToCardBtnProps = {
  variant: ProductVariant;
  productId: string;
  amount: number;
};

export const AddToCardButton = ({
  variant,
  productId,
  amount,
}: AddToCardBtnProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isError, setIsError] = useState(false);

  const addToCartHandler = async () => {
    if (amount <= 0) {
      alert("Ilość produktów musi być większa od 0");
      return;
    }

    setIsProcessing(true);
    const response = await addToCart(productId, [
      {
        code: variant.code,
        count: amount,
      },
    ]);
    setIsProcessing(false);
  };

  return (
    <button
      className={`rounded-full border-2  bg-white px-6 py-2 font-bold  ${
        isError
          ? "border-red-500 text-red-500"
          : "border-brand-orange text-brand-orange"
      }`}
      onClick={addToCartHandler}
    >
      {isProcessing ? (
        <FaSpinner className="h-5 w-5 animate-spin" />
      ) : isError ? (
        "Błąd"
      ) : (
        "Dodaj"
      )}
    </button>
  );
};
