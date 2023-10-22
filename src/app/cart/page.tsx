import { getUserCart } from "@/lib/cart";
import { getVariantDimension } from "@/lib/products/utils";

const GetCart = async () => {
  const { data, error, success } = await getUserCart();

  if (!success) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="text-center text-2xl">Koszyk</h2>
      <ul>
        {data.products.map(({ product, productVariants }) => {
          return (
            <li key={product._id}>
              <h3>{product.name}</h3>
              <div>
                {productVariants.map(({ code, count, price }) => {
                  const dimension = getVariantDimension(product, code);

                  return (
                    <div key={code}>
                      {code} - {dimension} - {count} szt. - {price * count} zł
                    </div>
                  );
                })}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default GetCart;
