import { ProductCard } from "@/components/products/ProductCard";
import { TableRow } from "@/components/products/ProductTableRow";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { getProduct } from "@/lib/products";

const ProductDetails = async ({ params }: { params: { id: string } }) => {
  const { data: product, success, error } = await getProduct(params.id);

  if (!success) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="px-6">
      <Breadcrumb
        links={[
          { name: "Strona główna", url: "/" },
          { name: "Produkty", url: "/" },
          { name: "Zawory", url: "/" },
        ]}
      />
      <div className="my-6 flex items-start gap-6">
        {product && (
          <div className="w-1/3">
            <ProductCard product={product} />
          </div>
        )}
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl">{product.name}</h2>
          <table className="w-full table-auto text-left text-sm text-gray-500">
            <thead className="bg-brand-orange text-xs font-bold uppercase text-white">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Numer kodowy
                </th>
                <th scope="col" className="px-6 py-3">
                  Średnica
                </th>
                <th scope="col" className="px-6 py-3">
                  Cena (netto)
                </th>
                <th scope="col" className="px-6 py-3">
                  Dostępne
                </th>
                <th scope="col" className="px-6 py-3">
                  Liczba
                </th>
                <th scope="col" className="px-6 py-3">
                  Akcja
                </th>
              </tr>
            </thead>
            <tbody>
              {product.variants.map((variant) => (
                <TableRow
                  key={variant.code}
                  variant={variant}
                  productId={product._id}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
