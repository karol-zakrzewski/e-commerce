import { Button } from "@/components/form/Button";
import { Product } from "@/api/products/types";
import { getJoiningType } from "@/api/products/utils";
import Image from "next/image";
import Link from "next/link";

type Props = { product: Product };

export const ProductCard = ({ product }: Props) => {
  const { _id: id, name, images, isAvailable, material, endType } = product;
  const [mainImage] = images;
  const joiningType = getJoiningType(material);

  return (
    <div className="flex flex-col gap-1.5 rounded-lg p-4 pt-0 text-sm shadow-2xl">
      <div className="max-w-sm">
        <Image
          width={245}
          height={245}
          src={mainImage}
          alt={product.name}
          className="w-full object-cover"
        />
      </div>
      <p className="text-center text-lg font-bold">{name}</p>
      <p>Typ łączenia: {joiningType}</p>
      <p>Zakończenie: {endType}</p>
      <ProductStatus isAvailable={isAvailable} />
      <Link className="mx-auto" href={`/product/${id}`}>
        <Button icon={<FaCartShopping />}>Zobacz szcegóły</Button>
      </Link>
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
