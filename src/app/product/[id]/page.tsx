import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { getProduct, getProducts } from "@/api/products";
import { Suspense } from "react";
import { ProductDetails } from "@/components/products/ProductDetails";
import { Product } from "@/api/products/types";
import { notFound } from "next/navigation";

const LINKS = [
  { name: "Strona główna", url: "/" },
  { name: "Produkty", url: "/" },
  { name: "Zawory", url: "/" },
];

const ProductDetailsPage = async ({ params }: { params: { id: string } }) => {
  const { data: product, success, error } = await getProduct(params.id);
  if (!success || error) {
    return notFound();
  }
  return (
    <div className="px-6">
      <Breadcrumb links={LINKS} />
      {/* <Suspense fallback={<div>Loading...</div>}> */}
      <ProductDetails product={product} />
      {/* </Suspense> */}
    </div>
  );
};

export default ProductDetailsPage;

export async function generateStaticParams() {
  const { data: products, error, success } = await getProducts();
  if (success) {
    return products.map((product) => ({
      id: product._id,
    }));
  }
  return [];
}
