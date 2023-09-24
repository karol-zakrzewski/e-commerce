import { ProductCard } from "@/app/components/products/ProductCard";
import { getProducts } from "@/app/lib/products";

export const ProductsList = async () => {
  const { data: products, error, success } = await getProducts();

  if (!success) {
    return <div>Error: {error} </div>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-6 rounded-lg">
      {products.map((product) => {
        return <ProductCard key={product._id} product={product} />;
      })}
    </div>
  );
};
