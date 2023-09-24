import { Product } from "@/app/lib/products/types";
import { getJoiningType } from "@/app/lib/products/utils";
import Image from "next/image";
import { ButtonHTMLAttributes, PropsWithChildren, ReactNode } from "react";
import { IconType } from "react-icons";

type Props = { product: Product };

export const ProductCard = ({ product }: Props) => {
  const { name, images, isAvailable, material, endType } = product;
  const [mainImage] = images;
  // TODO: change product model on the backend:  move material field to main props, add endType
  const joiningType = getJoiningType(material);
  return (
    <div className="flex flex-col gap-1.5 rounded-lg p-4 pt-0 text-sm shadow-2xl">
      <Image
        width={300}
        height={300}
        src={mainImage}
        alt={product.name}
        className="w-full object-cover"
      />
      <p className="text-center text-lg font-bold">{name}</p>
      <p>Typ łączenia: {joiningType}</p>
      <p>Zakończenie: {endType}</p>
      <ProductStatus isAvailable={isAvailable} />
      <Button icon={<FaCartShopping />}>Zobacz szcegóły</Button>
    </div>
  );
};

export const ProductStatus = ({ isAvailable }: { isAvailable: boolean }) => {
  const isAvailableContent = isAvailable ? "dostępny" : "niedostępny";
  return (
    <div className="flex items-center gap-2">
      <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
      Produkt {isAvailableContent}
    </div>
  );
};

import { FaCartShopping } from "react-icons/fa6";

export const Button = ({
  children,
  icon,
  ...props
}: {
  children: ReactNode;
  icon?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className="bg-brand-orange flex items-center justify-center gap-2 rounded-full px-6 py-2 text-white"
    >
      {icon} {children}
    </button>
  );
};
