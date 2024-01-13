import { ProductCard } from "@/components/products/ProductCard";
import { getProducts } from "@/api/products";
import { Product } from "@/api/products/types";

type Props = {
  products: Product[];
};

export const ProductsList = async ({ products }: Props) => {
  return (
    <div className="flex flex-wrap justify-center gap-6 rounded-lg">
      {products.map((product) => {
        return <ProductCard key={product._id} product={product} />;
      })}
    </div>
  );
};
