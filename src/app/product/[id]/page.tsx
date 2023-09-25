import { ProductCard } from "@/app/components/products/ProductCard";
import { Breadcrumb } from "@/app/components/ui/Breadcrumb";
import { getProduct } from "@/app/lib/products";
import { ProductVariant } from "@/app/lib/products/types";

const ProductDetails = async ({ params }: { params: { id: string } }) => {
  const data = await getProduct(params.id);
  console.log("🚀  productData:", data);

  if (!data.success) {
    return <div>Error: {data.error}</div>;
  }

  return (
    <div>
      <Breadcrumb links={[{ name: "Strona główna", url: "/" }]} />
      {data.data && (
        <div className="w-1/3">
          <ProductCard product={data.data} />
        </div>
      )}
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
          {data.data.variants.map((variant) => (
            <TableRow key={variant.code} variant={variant} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const TableRow = ({ variant }: { variant: ProductVariant }) => {
  const { code, dimensions, price, stock } = variant;
  const [mainDimension] = dimensions;
  return (
    <tr className="border-b bg-white">
      <td
        scope="row"
        className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 "
      >
        {code}
      </td>
      <td className="px-6 py-4">
        {mainDimension.standard}
        {mainDimension.nominal}
      </td>
      <td className="px-6 py-4">{price} zł</td>
      <td className="px-6 py-4">{stock} szt.</td>
      <td className="px-6 py-4">
        <input
          type="number"
          min={0}
          max={1000}
          className="w-11 border text-center"
        />
      </td>
      <td className="px-6 py-4">Dodaj</td>
    </tr>
  );
};

export default ProductDetails;
