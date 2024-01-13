import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { getProduct } from "@/api/products";
import { Suspense } from "react";
import { ProductDetails } from "@/components/products/ProductDetails";

const ProductDetailsPage = async ({ params }: { params: { id: string } }) => {
  return (
    <div className="px-6">
      <Breadcrumb
        links={[
          { name: "Strona główna", url: "/" },
          { name: "Produkty", url: "/" },
          { name: "Zawory", url: "/" },
        ]}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <ProductDetails getProduct={() => getProduct(params.id)} />
      </Suspense>
    </div>
  );
};

export default ProductDetailsPage;
