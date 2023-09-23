import { getProducts } from "@/app/lib/products";

export const ProductsList = async () => {
  const name = await getProducts();
  console.log("🚀  name:", name);

  return <div>Products</div>;
};
